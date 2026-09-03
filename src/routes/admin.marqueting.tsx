import { createFileRoute } from "@tanstack/react-router";

import { MarketingScreen } from "@/components/admin/MarketingScreen";

export const Route = createFileRoute("/admin/marqueting")({ component: MarketingScreen });
