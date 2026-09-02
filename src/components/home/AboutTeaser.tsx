import { Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

import { tList } from "@/i18n/list";

import founder from "@/assets/founder.jpg.asset.json";
import type { Language } from "@/i18n/config";
import { Reveal } from "@/components/Reveal";

export function AboutTeaser({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const lines = tList<string>(t, "home.about.lines");

  return (
    <section className="jr-section">
      <div className="jr-container grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Reveal className="flex justify-center md:justify-start">
          <img
            src={founder.url}
            alt={t("home.about.portraitAlt")}
            loading="lazy"
            decoding="async"
            width={960}
            height={1200}
            className="w-full max-w-sm object-cover"
          />
        </Reveal>


        <Reveal className="flex min-w-0 flex-col gap-5" delay={120}>
          <p className="jr-label">{t("home.about.label")}</p>
          <h2 className="jr-display-2 text-jr-white">
            <Trans i18nKey="home.about.title" components={[<span className="text-jr-gold" />]} />
          </h2>
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
        </Reveal>
      </div>
    </section>
  );
}
