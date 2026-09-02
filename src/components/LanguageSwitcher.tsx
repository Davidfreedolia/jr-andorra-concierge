import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { LANGUAGES, LANGUAGE_LABELS, type Language } from "@/i18n/config";
import { routeForPathname } from "@/lib/routes";

export function LanguageSwitcher({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const to = routeForPathname(pathname);

  return (
    <nav aria-label={t("language.select")} className="flex flex-wrap items-center">
      {LANGUAGES.map((code) => (
        <Link
          key={code}
          to={to}
          params={{ lang: code }}
          hrefLang={code}
          aria-current={code === lang ? "true" : undefined}
          className={`jr-tap jr-label px-2 ${
            code === lang ? "opacity-100" : "opacity-55 hover:opacity-100"
          }`}
        >
          {LANGUAGE_LABELS[code]}
        </Link>
      ))}
    </nav>
  );
}
