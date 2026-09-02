import { createFileRoute } from "@tanstack/react-router";

import { BillingScreen } from "@/components/area/BillingScreen";

export const Route = createFileRoute("/area/facturacion")({
  component: BillingScreen,
});
