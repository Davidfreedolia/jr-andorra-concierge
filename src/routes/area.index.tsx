import { createFileRoute } from "@tanstack/react-router";

import { HomeOverview } from "@/components/area/HomeOverview";

export const Route = createFileRoute("/area/")({
  component: HomeOverview,
});
