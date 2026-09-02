import { Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

import { IconTile } from "@/components/IconTile";
import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";

import type { Language } from "@/i18n/config";

export function HomeStaySafeSummary({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const items = tList<string>(t, "home.hss.items");

  return (
    <section className="jr-section">
      <div className="jr-container flex flex-col gap-10">
        <Reveal>
          <h2 className="jr-display-2 jr-measure text-jr-white">
            <Trans i18nKey="home.hss.title" components={[<span className="text-jr-gold" />]} />
          </h2>
        </Reveal>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal
              as="li"
              key={item}
              delay={index * 110}
              className="jr-panel jr-card-hover flex min-w-0 flex-col items-start gap-4"
            >
              <IconTile index={index} />
              <p className="text-jr-bone">{item}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <Link to="/$lang/home-stay-safe" params={{ lang }} className="jr-button">
            {t("home.hss.cta")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
