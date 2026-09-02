import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AreaShell } from "@/components/area/AreaShell";
import { RoleProvider } from "@/components/area/RoleContext";

export const Route = createFileRoute("/area")({
  head: () => ({
    meta: [
      { title: "Área privada — JR Hospitality" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AreaLayout,
});

function AreaLayout() {
  return (
    <RoleProvider>
      <AreaShell>
        <Outlet />
      </AreaShell>
    </RoleProvider>
  );
}
