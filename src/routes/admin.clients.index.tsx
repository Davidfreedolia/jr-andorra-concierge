import { createFileRoute } from "@tanstack/react-router";

import { ClientsScreen } from "@/components/admin/ClientsScreen";

export const Route = createFileRoute("/admin/clients/")({ component: ClientsScreen });
