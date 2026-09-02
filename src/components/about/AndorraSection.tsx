import { useTranslation } from "react-i18next";

import { GoldText } from "@/components/GoldText";
import { Reveal } from "@/components/Reveal";
import andorraPoster from "@/assets/about-andorra.jpg";
import andorraVideo from "@/assets/about-andorra-mountains.mp4.asset.json";

export function AndorraSection() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate flex min-h-[68vh] items-center justify-center overflow-hidden bg-jr-black py-20 lg:py-32">
      <video
        className="jr-photo-lift absolute inset-0 -z-20 h-full w-full object-cover"
        src={andorraVideo.url}
        poster={andorraPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={t("about.andorra.imageAlt")}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-jr-black/90 via-jr-black/50 to-jr-black/60" aria-hidden="true" />

      <div className="jr-container relative w-full">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="jr-panel">
            <p className="jr-label text-jr-gold">{t("about.andorra.label")}</p>
            <h2 className="jr-display-1 mt-5 text-jr-white">
              <GoldText text={t("about.andorra.title")} />
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-jr-bone/80">
              {t("about.andorra.text")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
