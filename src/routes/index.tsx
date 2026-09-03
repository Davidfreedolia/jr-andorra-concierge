import { createFileRoute, redirect } from "@tanstack/react-router";

import { DEFAULT_LANGUAGE } from "@/i18n/config";

/**
 * El repartiment per idioma del navegador es fa al servidor (src/server.ts),
 * abans que el router entri: aixi el visitant ja rep la pagina en el seu idioma,
 * sense pampallugues. Aixo d'aqui nomes cobreix una navegacio interna cap a "/",
 * i cau al catala, que es la llengua oficial d'Andorra.
 */
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$lang", params: { lang: DEFAULT_LANGUAGE } });
  },
  component: () => null,
});
