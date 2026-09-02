import { useTranslation } from "react-i18next";

import { tList } from "@/i18n/list";
import { Reveal } from "@/components/Reveal";

type Level = { name: string; summary: string; features: string[] };

export function HssLevels() {
  const { t } = useTranslation();
  const levels = tList<Level>(t, "hss.levels.items");

  return (
    <section className="jr-section jr-surface-deep">
      <div className="jr-container flex flex-col gap-12">
        <Reveal className="flex flex-col gap-4">
          <p className="jr-label text-jr-gold-deep">{t("hss.levels.label")}</p>
          <h2 className="jr-display-2 jr-measure">{t("hss.levels.title")}</h2>
        </Reveal>

        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {levels.map((level, index) => {
            const featured = index === 1;
            return (
              <Reveal as="li" key={level.name} delay={index * 140}>
              <div
                className={
                  featured
                    ? "jr-card-hover flex flex-col gap-5 border border-jr-gold bg-jr-night p-7 lg:p-9"
                    : "jr-card-hover flex flex-col gap-5 border bg-jr-night p-7 lg:p-9"
                }
              >
                <span className="jr-label min-h-[16px] text-jr-gold-deep">
                  {featured ? t("hss.levels.featured") : "\u00A0"}
                </span>
                <h3 className="font-display text-3xl">{level.name}</h3>
                <p className="opacity-70">{level.summary}</p>
                <ul className="flex flex-col gap-3 border-t pt-5">
                  {level.features.map((feature) => (
                    <li key={feature} className="opacity-80">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              </Reveal>
            );
          })}
        </ul>

        <p className="jr-measure opacity-70">{t("hss.levels.note")}</p>
      </div>
    </section>
  );
}
