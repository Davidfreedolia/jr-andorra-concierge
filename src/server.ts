import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { DEFAULT_LANGUAGE, languageFromAcceptLanguage } from "./i18n/config";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

/**
 * "/" reparteix per idioma del navegador.
 *
 * Es resol aqui, al servidor, i no dins del router: la capçalera Accept-Language
 * nomes existeix al servidor, i resolent-ho abans el visitant ja rep la pagina
 * en el seu idioma, sense pampallugues ni un salt visible.
 *
 * Si el navegador no demana cap dels cinc idiomes, cau al catala, que es la
 * llengua oficial d'Andorra. Nomes afecta l'arrel: un enllaç a /es o a /de mana
 * sempre sobre la deteccio, perque qui comparteix una adreça comparteix
 * l'idioma que hi ha escrit.
 */
function languageRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  if (url.pathname !== "/") return null;

  const lang =
    languageFromAcceptLanguage(request.headers.get("accept-language")) ?? DEFAULT_LANGUAGE;

  url.pathname = `/${lang}`;
  return new Response(null, {
    status: 307,
    headers: {
      location: url.toString(),
      // La resposta depen de la capçalera: sense aixo, una cache intermedia
      // serviria el mateix idioma a tothom.
      vary: "accept-language",
      "cache-control": "no-store",
    },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const redirected = languageRedirect(request);
      if (redirected) return redirected;

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
