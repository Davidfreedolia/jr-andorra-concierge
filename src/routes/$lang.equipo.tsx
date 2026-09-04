import { createFileRoute } from "@tanstack/react-router";

import { TeamSection } from "@/components/about/TeamSection";

/**
 * Maqueta de la seccio d'equip. Encara no penja del menu: es una pantalla per
 * ensenyar i decidir, amb fotografies i adreces de contacte pendents.
 */
export const Route = createFileRoute("/$lang/equipo")({
  head: () => ({
    meta: [
      { title: "Equipo — JR Hospitality" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  const { lang } = Route.useParams();
  return <TeamSection lang={lang} />;
}
