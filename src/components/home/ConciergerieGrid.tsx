import { Trans, useTranslation } from "react-i18next";

import { IconTile } from "@/components/IconTile";
import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";

type Item = { title: string; text: string };

export function ConciergerieGrid() {
  const { t } = useTranslation();
  const items = tList<Item>(t, "home.concierge.items");

  return (
    <section className="jr-section">
      <div className="jr-container flex flex-col gap-10">
        <Reveal>
          <h2 className="jr-display-2 jr-measure text-jr-white">
            <Trans i18nKey="home.concierge.title" components={[<span className="text-jr-gold" />]} />
          </h2>
        </Reveal>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 70}
              className="jr-panel flex min-w-0 flex-col gap-4"
            >
              <IconTile index={index + 8} />
              <h3 className="font-display text-2xl text-jr-bone">{item.title}</h3>
              <p className="text-muted-foreground">{item.text}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="jr-measure text-muted-foreground">{t("home.concierge.note")}</p>
        </Reveal>
      </div>
    </section>
  );
}
