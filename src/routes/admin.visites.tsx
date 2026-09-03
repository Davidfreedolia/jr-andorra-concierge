import { createFileRoute } from "@tanstack/react-router";

import { VisitsScreen } from "@/components/admin/VisitsScreen";

export const Route = createFileRoute("/admin/visites")({ component: VisitsScreen });
