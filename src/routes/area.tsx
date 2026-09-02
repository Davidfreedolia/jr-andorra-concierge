import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { AreaShell } from "@/components/area/AreaShell";
import { RoleProvider } from "@/components/area/RoleContext";
import { isLanguage } from "@/i18n/config";
import { AREA_LANG_KEY } from "@/lib/area-lang";

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
  const { i18n } = useTranslation();

  useEffect(() => {
    const stored = window.localStorage.getItem(AREA_LANG_KEY);
    if (stored && isLanguage(stored) && stored !== i18n.language) {
      void i18n.changeLanguage(stored);
    }
  }, [i18n]);

  return (
    <RoleProvider>
      <AreaShell>
        <Outlet />
      </AreaShell>
    </RoleProvider>
  );
}
