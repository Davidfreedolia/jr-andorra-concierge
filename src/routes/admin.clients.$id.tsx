import { createFileRoute } from "@tanstack/react-router";

import { ClientDetail } from "@/components/admin/ClientDetail";

export const Route = createFileRoute("/admin/clients/$id")({ component: ClientRoute });

function ClientRoute() {
  const { id } = Route.useParams();
  return <ClientDetail id={id} />;
}
