import { createFileRoute } from "@tanstack/react-router";

import { ReportsList } from "@/components/area/ReportsList";

export const Route = createFileRoute("/area/informes/")({
  component: ReportsList,
});
