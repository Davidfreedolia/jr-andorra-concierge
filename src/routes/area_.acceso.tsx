import { createFileRoute } from "@tanstack/react-router";

import { AccessScreen } from "@/components/area/AccessScreen";

export const Route = createFileRoute("/area_/acceso")({
  head: () => ({
    meta: [
      { title: "Acceso — Área privada JR Hospitality" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AccessScreen,
});
