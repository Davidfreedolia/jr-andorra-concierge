import { Trans, useTranslation } from "react-i18next";

import { IconTile } from "@/components/IconTile";
import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";

export function HssIncludes() {
  const { t } = useTranslation();
  const items = tList<string>(t, "hss.includes.items");

  return (
    <section id="servicios" className="jr-section">
      <div className="jr-container flex flex-col gap-12">
        <Reveal>
          <h2 className="jr-display-2 jr-measure text-jr-white">
            <Trans
              i18nKey="hss.includes.title"
              components={[<span className="text-jr-gold" />]}
            />
          </h2>
        </Reveal>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal
              as="li"
              key={item}
              delay={index * 110}
              className="jr-panel jr-card-hover flex min-w-0 flex-col items-start gap-4"
            >
              <IconTile index={index} />
              <p className="text-lg text-jr-bone">{item}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
