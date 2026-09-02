import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";

type Milestone = { period: string; title: string; text: string };

export function Milestones() {
  const { t } = useTranslation();
  const items = tList<Milestone>(t, "about.milestones.items");

  return (
    <section className="jr-section jr-surface-deep">
      <div className="jr-container flex flex-col gap-12">
        <Reveal className="flex flex-col gap-4">
          <p className="jr-label">{t("about.milestones.label")}</p>
          <h2 className="jr-display-1 jr-measure">{t("about.milestones.title")}</h2>
        </Reveal>

        <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {items.map((item) => (
            <Reveal as="li" key={item.title} className="flex min-w-0 flex-col gap-3 border-t pt-6">
              <p className="jr-label">{item.period}</p>
              <h3 className="jr-display-2">{item.title}</h3>
              <p className="text-black/70">{item.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
