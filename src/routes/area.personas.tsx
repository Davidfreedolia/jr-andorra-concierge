import { createFileRoute } from "@tanstack/react-router";

import { PeopleScreen } from "@/components/area/PeopleScreen";

export const Route = createFileRoute("/area/personas")({
  component: PeopleScreen,
});
