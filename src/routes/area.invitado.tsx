import { createFileRoute } from "@tanstack/react-router";

import { GuestScreen } from "@/components/area/GuestScreen";

export const Route = createFileRoute("/area/invitado")({
  component: GuestScreen,
});
