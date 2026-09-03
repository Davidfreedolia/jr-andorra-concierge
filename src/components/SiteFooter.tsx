import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { LogoJR } from "@/components/LogoJR";
import type { Language } from "@/i18n/config";
import { NAV_ITEMS } from "@/lib/routes";

const LEGAL_KEYS = ["legal", "privacy", "cookies"] as const;

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="18.5" cy="5.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M7.5 10v6M7.5 7.25V7.3M12 16v-3a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="7.5" cy="7.25" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function SiteFooter({ lang }: { lang: Language }) {
  const { t } = useTranslation();

  return (
    <footer className="border-t">
      <div className="jr-container flex flex-col gap-6 py-8 lg:flex-row lg:items-start lg:justify-between lg:py-10">
        <div className="flex min-w-0 flex-col gap-3 text-primary">
          <LogoJR title={t("common.logoAlt")} className="jr-logo jr-logo-lg" />
          <p className="jr-measure max-w-[28ch] text-muted-foreground">{t("brand.tagline")}</p>

          <nav aria-label={t("footer.socialLabel")}>
            <ul className="flex items-center gap-3">
              <li>
                <a
                  href="#"
                  aria-label={t("footer.socialInstagram")}
                  className="jr-tap inline-flex text-jr-gold-deep transition-colors duration-200 hover:text-jr-gold"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label={t("footer.socialLinkedin")}
                  className="jr-tap inline-flex text-jr-gold-deep transition-colors duration-200 hover:text-jr-gold"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </nav>
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

      <div className="jr-container border-t py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="jr-label text-muted-foreground">
            © {new Date().getFullYear()} {t("brand.name")} · {t("footer.rights")}
          </p>
          <p className="jr-label text-muted-foreground">{t("footer.credits")}</p>
        </div>
      </div>
    </footer>
  );
}
