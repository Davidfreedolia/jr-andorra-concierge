import { useTranslation } from "react-i18next";

import { GoldText } from "@/components/GoldText";
import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";

const STAGGER_MS = 320;

type Milestone = { period: string; title: string; text: string };

export function Milestones() {
  const { t } = useTranslation();
  const items = tList<Milestone>(t, "about.milestones.items");

  return (
    <section className="jr-section jr-surface-deep">
      <div className="jr-container flex flex-col gap-14">
        <Reveal className="flex flex-col gap-4">
          <p className="jr-label">{t("about.milestones.label")}</p>
          <h2 className="jr-display-1 jr-measure">
            <GoldText text={t("about.milestones.title")} />
          </h2>
        </Reveal>

        <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * STAGGER_MS}
              className="group flex min-w-0 flex-col gap-4"
            >
              {/* Numbered marker */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-jr-gold bg-jr-night text-xs font-medium tracking-widest text-jr-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-jr-gold group-hover:text-jr-black">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Card content */}
              <div className="flex flex-col gap-3 border-t border-jr-gold/25 pt-5 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-jr-gold">
                <p className="jr-label">{item.period}</p>
                <h3 className="jr-display-2">{item.title}</h3>
                <p className="text-jr-bone/70">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
