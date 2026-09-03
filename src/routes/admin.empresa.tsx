import { createFileRoute } from "@tanstack/react-router";

import { CompanyScreen } from "@/components/admin/CompanyScreen";

export const Route = createFileRoute("/admin/empresa")({ component: CompanyScreen });
