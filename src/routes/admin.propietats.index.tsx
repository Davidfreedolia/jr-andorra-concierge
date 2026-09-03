import { createFileRoute } from "@tanstack/react-router";

import { PropertiesScreen } from "@/components/admin/PropertiesScreen";

export const Route = createFileRoute("/admin/propietats/")({ component: PropertiesScreen });
