import { createFileRoute } from "@tanstack/react-router";

import { TeamHero } from "@/components/about/TeamHero";
import { TeamSection } from "@/components/about/TeamSection";
import { DEFAULT_LANGUAGE, isLanguage } from "@/i18n/config";
import { pageHead } from "@/lib/seo";

/**
 * Pagina d'equip. Penja del menu principal, pero encara no s'indexa: quatre de
 * les cinc fotografies son d'estoc i les adreces de contacte no existeixen.
 * Quan arribin les fotografies reals, es treu la linia de robots i prou.
 */
export const Route = createFileRoute("/$lang/equipo")({
  head: ({ params }) => {
    const lang = isLanguage(params.lang) ? params.lang : DEFAULT_LANGUAGE;
    const head = pageHead("team", lang);
    return { ...head, meta: [...head.meta, { name: "robots", content: "noindex, nofollow" }] };
  },
  component: TeamPage,
});

function TeamPage() {
  const { lang } = Route.useParams();
  return (
    <>
      <TeamHero />
      <TeamSection lang={lang} />
    </>
  );
}
