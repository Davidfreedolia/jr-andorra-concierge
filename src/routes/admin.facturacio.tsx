import { createFileRoute } from "@tanstack/react-router";

import { BillingScreen } from "@/components/admin/BillingScreen";

export const Route = createFileRoute("/admin/facturacio")({ component: BillingScreen });
