import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";

type Principle = { title: string; line: string };

export function Principles() {
  const { t } = useTranslation();
  const items = tList<Principle>(t, "about.principles.items");

  return (
    <section className="jr-section">
      <div className="jr-container flex flex-col gap-14">
        <Reveal className="flex flex-col gap-4">
          <p className="jr-label">{t("about.principles.label")}</p>
          <h2 className="jr-display-1 jr-measure text-jr-bone">{t("about.principles.title")}</h2>
        </Reveal>

        <ul className="flex flex-col gap-12 md:gap-16">
          {items.map((item) => (
            <Reveal
              as="li"
              key={item.title}
              className="flex min-w-0 flex-col gap-3 border-t pt-8 md:flex-row md:items-baseline md:gap-12"
            >
              <h3 className="jr-display-2 text-jr-bone md:basis-1/3">{item.title}</h3>
              <p className="jr-measure text-lg text-muted-foreground md:basis-2/3">{item.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
