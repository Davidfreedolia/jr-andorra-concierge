import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { tList } from "@/i18n/list";

import founder from "@/assets/founder.jpg.asset.json";
import type { Language } from "@/i18n/config";

export function AboutTeaser({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const lines = tList<string>(t, "home.about.lines");

  return (
    <section className="jr-section">
      <div className="jr-container grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <img
          src={founder.url}
          alt={t("home.about.portraitAlt")}
          loading="lazy"
          width={960}
          height={1200}
          className="w-full max-w-sm object-cover"
        />

        <div className="flex min-w-0 flex-col gap-5">
          <p className="jr-label">{t("home.about.label")}</p>
          <h2 className="jr-display-2 text-jr-gold">{t("home.about.title")}</h2>
          <div className="jr-measure flex flex-col gap-2 text-muted-foreground">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div>
            <Link to="/$lang/about" params={{ lang }} className="jr-button">
              {t("home.about.link")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
