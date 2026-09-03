import { createFileRoute } from "@tanstack/react-router";

import { ExpensesScreen } from "@/components/admin/ExpensesScreen";

export const Route = createFileRoute("/admin/despeses")({ component: ExpensesScreen });
