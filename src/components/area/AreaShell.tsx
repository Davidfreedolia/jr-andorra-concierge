import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";

import { AreaIcon } from "@/components/area/AreaIcon";
import { useRole } from "@/components/area/RoleContext";
import { LogoJR } from "@/components/LogoJR";
import {
  AREA_GUEST_NAV,
  AREA_MAIN_NAV,
  AREA_MORE_NAV,
  type AreaNavItem,
} from "@/lib/area-nav";

function NavLinks({ items, variant }: { items: AreaNavItem[]; variant: "side" | "bottom" }) {
  const { t } = useTranslation();

  return (
    <>
      {items.map((item) => (
        <Link
          key={item.key}
          to={item.to}
          activeOptions={{ exact: item.to === "/area" }}
          activeProps={{ "data-active": "true" }}
          className={variant === "side" ? "jr-area-sidelink" : "jr-area-tab"}
        >
          <AreaIcon name={item.key} />
          <span className={variant === "side" ? "jr-area-sidelabel" : "jr-area-tablabel"}>
            {t(`area.nav.${item.key}`)}
          </span>
        </Link>
      ))}
    </>
  );
}

export function AreaShell({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const { role, can } = useRole();

  const isGuest = role === "guest";
  const mainNav = isGuest ? AREA_GUEST_NAV : AREA_MAIN_NAV;
  const moreNav = isGuest ? [] : AREA_MORE_NAV.filter((item) => can(item.key));

  return (
    <div className="jr-area">
      <aside className="jr-area-sidebar" aria-label={t("area.nav.menu")}>
        <Link to="/area" className="mb-6 block">
          <LogoJR title={t("common.logoAlt")} className="jr-area-logo" />
        </Link>
        <nav className="flex flex-col gap-1">
          <NavLinks items={mainNav} variant="side" />
        </nav>
        {moreNav.length > 0 ? (
          <>
            <p className="jr-label mt-6 mb-2 px-3">{t("area.nav.more")}</p>
            <nav className="flex flex-col gap-1">
              <NavLinks items={moreNav} variant="side" />
            </nav>
          </>
        ) : null}
      </aside>

      <div className="jr-area-main">
        <header className="jr-area-topbar">
          <Link to="/area" className="md:hidden">
            <LogoJR title={t("common.logoAlt")} className="jr-area-logo" />
          </Link>
        </header>

        <div className="jr-area-content">{children}</div>

        {moreNav.length > 0 ? (
          <nav aria-label={t("area.nav.more")} className="jr-area-morerow md:hidden">
            {moreNav.map((item) => (
              <Link key={item.key} to={item.to} className="jr-button jr-button-quiet flex-1">
                {t(`area.nav.${item.key}`)}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>

      <nav aria-label={t("area.nav.menu")} className="jr-area-tabbar md:hidden">
        <NavLinks items={mainNav} variant="bottom" />
      </nav>
    </div>
  );
}
