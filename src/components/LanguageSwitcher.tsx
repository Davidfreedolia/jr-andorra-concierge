import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { LANGUAGES, LANGUAGE_LABELS, type Language } from "@/i18n/config";

export function LanguageSwitcher({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const suffix = pathname.replace(/^\/[a-z]{2}/, "");

  return (
    <nav aria-label={t("language.select")} className="flex flex-wrap items-center">
      {LANGUAGES.map((code) => (
        <Link
          key={code}
          to={`/$lang${suffix}` as string}
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
