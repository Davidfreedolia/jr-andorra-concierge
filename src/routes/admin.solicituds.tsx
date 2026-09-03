import { createFileRoute } from "@tanstack/react-router";

import { RequestsInbox } from "@/components/admin/RequestsInbox";

export const Route = createFileRoute("/admin/solicituds")({ component: RequestsInbox });
