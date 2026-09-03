import { createFileRoute } from "@tanstack/react-router";

import { TeamScreen } from "@/components/admin/TeamScreen";

export const Route = createFileRoute("/admin/equip")({ component: TeamScreen });
