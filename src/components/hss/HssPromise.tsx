import { useTranslation } from "react-i18next";

import promiseImage from "@/assets/hss-promise.jpg.asset.json";
import { GoldText } from "@/components/GoldText";
import { Reveal } from "@/components/Reveal";

export function HssPromise() {
  const { t } = useTranslation();

  return (
    <section className="jr-section">
      <div className="jr-container grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col gap-6">
          <p className="jr-display-2 max-w-[32ch] text-jr-white">
            <GoldText text={t("hss.promise.quote")} />
          </p>
          <p className="jr-measure text-muted-foreground">
            {t("hss.promise.line")}
          </p>
          <a href="#servicios" className="jr-button w-fit">
            {t("hss.promise.cta")}
          </a>
        </Reveal>

        <Reveal delay={120}>
          <img
            src={promiseImage.url}
            alt={t("hss.promise.alt")}
            loading="lazy"
            width={1024}
            height={1280}
            className="jr-photo-lift h-72 w-full object-cover lg:h-[28rem]"
          />
        </Reveal>
      </div>
    </section>
  );
}
