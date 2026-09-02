import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

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
          <h2 className="jr-display-2 jr-measure text-jr-bone">{t("home.hss.title")}</h2>
        </Reveal>

        <Reveal className="jr-panel">
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <Reveal
                as="li"
                key={item}
                delay={index * 70}
                className="flex min-w-0 flex-col items-start gap-4"
              >
                <IconTile index={index} />
                <p className="text-jr-bone">{item}</p>
              </Reveal>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <Link to="/$lang/home-stay-safe" params={{ lang }} className="jr-button">
            {t("home.hss.cta")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
