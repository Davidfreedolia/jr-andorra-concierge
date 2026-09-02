import { createFileRoute } from "@tanstack/react-router";

import { RequestsScreen } from "@/components/area/RequestsScreen";

export const Route = createFileRoute("/area/peticiones")({
  component: RequestsScreen,
});
