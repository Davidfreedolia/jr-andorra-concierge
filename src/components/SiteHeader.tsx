import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LogoJR } from "@/components/LogoJR";
import type { Language } from "@/i18n/config";
import { NAV_ITEMS } from "@/lib/routes";

export function SiteHeader({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="jr-container grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4">
        <Link
          to="/$lang"
          params={{ lang }}
          className="jr-tap min-w-0 justify-start text-primary"
          aria-label={t("common.logoAlt")}
        >
          <LogoJR title={t("common.logoAlt")} variant="horizontal" className="jr-logo" />
        </Link>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher lang={lang} />
          <button
            type="button"
            className="jr-tap jr-label"
            aria-expanded={open}
            aria-controls="jr-mobile-nav"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            {t("nav.menu")}
          </button>
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          <nav aria-label={t("nav.primary")} className="flex flex-wrap items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                params={{ lang }}
                activeOptions={{ exact: item.suffix === "" }}
                activeProps={{ "aria-current": "page" }}
                className="jr-tap jr-label text-foreground opacity-70 hover:opacity-100 aria-[current=page]:text-primary aria-[current=page]:opacity-100"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
          <Link
            to="/area/acceso"
            className="jr-tap jr-label border border-jr-gold/30 px-3 text-jr-gold-deep hover:border-jr-gold/60"
          >
            {t("nav.area")}
          </Link>
          <LanguageSwitcher lang={lang} />
        </div>

      </div>

      {open ? (
        <nav
          id="jr-mobile-nav"
          aria-label={t("nav.primary")}
          className="jr-container flex flex-col border-t py-2 lg:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              params={{ lang }}
              activeOptions={{ exact: item.suffix === "" }}
              activeProps={{ "aria-current": "page" }}
              onClick={() => setOpen(false)}
              className="jr-tap jr-label justify-start py-3 text-foreground aria-[current=page]:text-primary"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
          <Link
            to="/area/acceso"
            onClick={() => setOpen(false)}
            className="jr-tap jr-label justify-start py-3 text-jr-gold-deep"
          >
            {t("nav.area")}
          </Link>
        </nav>

      ) : null}
    </header>
  );
}
