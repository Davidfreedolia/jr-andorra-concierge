import { createFileRoute } from "@tanstack/react-router";

import { PropertyScreen } from "@/components/area/PropertyScreen";

export const Route = createFileRoute("/area/propiedad")({
  component: PropertyScreen,
});
