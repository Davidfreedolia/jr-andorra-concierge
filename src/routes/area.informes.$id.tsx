import { createFileRoute } from "@tanstack/react-router";

import { ReportDetail } from "@/components/area/ReportDetail";

export const Route = createFileRoute("/area/informes/$id")({
  component: ReportDetailRoute,
});

function ReportDetailRoute() {
  const { id } = Route.useParams();
  return <ReportDetail id={id} />;
}
