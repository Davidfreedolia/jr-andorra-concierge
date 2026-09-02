import { createFileRoute } from "@tanstack/react-router";

import { ArrivalScreen } from "@/components/area/ArrivalScreen";

export const Route = createFileRoute("/area/llegada")({
  component: ArrivalScreen,
});
