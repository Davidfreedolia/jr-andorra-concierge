import { createFileRoute } from "@tanstack/react-router";

import { PropertyDetail } from "@/components/admin/PropertyDetail";

export const Route = createFileRoute("/admin/propietats/$id")({ component: PropertyRoute });

function PropertyRoute() {
  const { id } = Route.useParams();
  return <PropertyDetail id={id} />;
}
