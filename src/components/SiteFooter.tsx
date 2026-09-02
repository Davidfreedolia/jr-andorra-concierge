import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { LogoJR } from "@/components/LogoJR";
import type { Language } from "@/i18n/config";
import { NAV_ITEMS } from "@/lib/routes";

const LEGAL_KEYS = ["legal", "privacy", "cookies"] as const;

export function SiteFooter({ lang }: { lang: Language }) {
  const { t } = useTranslation();

  return (
    <footer className="border-t">
      <div className="jr-container flex flex-col gap-10 py-16 lg:flex-row lg:justify-between lg:py-20">
        <div className="flex min-w-0 flex-col gap-4 text-primary">
          <LogoJR title={t("common.logoAlt")} className="h-8 w-auto" />
          <p className="jr-measure text-muted-foreground">{t("brand.tagline")}</p>
        </div>

        <nav aria-label={t("nav.footer")} className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              params={{ lang }}
              className="jr-tap jr-label justify-start text-foreground opacity-70 hover:opacity-100"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <nav aria-label={t("footer.legal")} className="flex flex-col gap-1">
          {LEGAL_KEYS.map((key) => (
            <span key={key} className="jr-tap jr-label justify-start text-muted-foreground">
              {t(`footer.${key}`)}
            </span>
          ))}
        </nav>
      </div>

      <div className="jr-container border-t py-6">
        <p className="jr-label text-muted-foreground">
          © {new Date().getFullYear()} {t("brand.name")} · {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
