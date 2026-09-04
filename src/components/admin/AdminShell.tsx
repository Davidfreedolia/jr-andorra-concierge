import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { AdminIcon } from "@/components/admin/AdminIcon";
import { LogoJR } from "@/components/LogoJR";
import { ADMIN_NAV, ADMIN_NAV_COMPANY } from "@/lib/admin-nav";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="jr-area">
      <aside className="jr-area-sidebar" aria-label="Menú d'administració">
        <Link to="/admin" className="mb-1 block" aria-label="Panell">
          <LogoJR title="JR Hospitality" variant="horizontal" className="jr-area-logo" />
        </Link>
        <p className="jr-label mb-6 px-3">Administració</p>

        <nav className="flex flex-col gap-1">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              activeOptions={{ exact: item.to === "/admin" }}
              activeProps={{ "data-active": "true" }}
              className="jr-area-sidelink"
            >
              <AdminIcon name={item.key} />
              <span className="jr-area-sidelabel">{item.label}</span>
            </Link>
          ))}
        </nav>

        <p className="jr-label mt-6 mb-2 px-3">Empresa</p>
        <nav className="flex flex-col gap-1">
          {ADMIN_NAV_COMPANY.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              activeProps={{ "data-active": "true" }}
              className="jr-area-sidelink"
            >
              <AdminIcon name={item.key} />
              <span className="jr-area-sidelabel">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="jr-admin-user">
          <span className="jr-label">Sessió</span>
          <span className="text-sm text-foreground">Jaume Roca</span>
          <span className="text-xs text-muted-foreground">Propietari · accés total</span>
        </div>

        <Link to="/$lang" params={{ lang: "ca" }} className="jr-area-sidelink jr-area-exit">
          <AdminIcon name="exit" />
          <span className="jr-area-sidelabel">Sortir al lloc públic</span>
        </Link>
      </aside>

      <div className="jr-area-main">
        <header className="jr-area-topbar">
          <Link to="/admin" className="flex items-center gap-3" aria-label="Panell">
            <LogoJR title="JR Hospitality" variant="horizontal" className="jr-area-logo" />
            <span className="jr-label">Administració</span>
          </Link>
          <Link to="/$lang" params={{ lang: "ca" }} className="jr-area-inline-link">
            Sortir
          </Link>
        </header>

        <div className="jr-area-content">{children}</div>

        <nav aria-label="Empresa" className="jr-area-morerow md:hidden">
          {ADMIN_NAV_COMPANY.map((item) => (
            <Link key={item.key} to={item.to} className="jr-button jr-button-quiet flex-1">
              {item.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Menú d'administració" className="jr-area-tabbar md:hidden">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              activeOptions={{ exact: item.to === "/admin" }}
              activeProps={{ "data-active": "true" }}
              className="jr-area-tab"
            >
              <AdminIcon name={item.key} />
              <span className="jr-area-tablabel">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
