import { createFileRoute } from "@tanstack/react-router";

import { AlertsScreen } from "@/components/admin/AlertsScreen";

export const Route = createFileRoute("/admin/avisos")({ component: AlertsScreen });
