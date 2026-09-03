import { Trans, useTranslation } from "react-i18next";

import keysImage from "@/assets/hss-keys.jpg";
import { tList } from "@/i18n/list";
import { Reveal } from "@/components/Reveal";

export function KeyCustody() {
  const { t } = useTranslation();
  const lines = tList<string>(t, "hss.keys.lines");

  return (
    <section className="jr-section">
      <div className="jr-container grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">
        <Reveal>
          <img
            src={keysImage}
            alt={t("hss.keys.alt")}
            loading="lazy"
            width={1280}
            height={1600}
            className="jr-photo-lift w-full object-cover"
          />
        </Reveal>

        <Reveal delay={120} className="flex min-w-0 flex-col gap-6">
          <p className="jr-label">{t("hss.keys.label")}</p>
          <h2 className="jr-display-1 text-jr-white">
            <Trans
              i18nKey="hss.keys.title"
              components={[<span className="text-jr-gold" />]}
            />
          </h2>
          <div className="jr-measure flex flex-col gap-4 text-lg text-muted-foreground">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
