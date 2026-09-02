import { useTranslation } from "react-i18next";

import { IconTile } from "@/components/IconTile";
import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";

type Principle = { title: string; line: string };

export function Principles() {
  const { t } = useTranslation();
  const items = tList<Principle>(t, "about.principles.items");

  return (
    <section className="jr-section">
      <div className="jr-container flex flex-col gap-12">
        <Reveal>
          <h2 className="jr-display-1 jr-measure text-jr-gold">{t("about.principles.title")}</h2>
        </Reveal>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 80}
              className="jr-panel flex min-w-0 flex-col gap-4"
            >
              <IconTile index={index + 6} />
              <h3 className="jr-display-2 text-jr-gold">{item.title}</h3>
              <p className="text-lg text-muted-foreground">{item.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
