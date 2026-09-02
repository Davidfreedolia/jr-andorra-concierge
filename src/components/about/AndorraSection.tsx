import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/Reveal";
import andorraJpg from "@/assets/about-andorra.jpg";
import andorra800 from "@/assets/about-andorra-800.webp";
import andorra1600 from "@/assets/about-andorra-1600.webp";

export function AndorraSection() {
  const { t } = useTranslation();

  return (
    <section className="jr-section">
      <div className="jr-container flex flex-col gap-10">
        <Reveal className="flex flex-col gap-5">
          <p className="jr-label">{t("about.andorra.label")}</p>
          <h2 className="jr-display-1 jr-measure text-jr-gold">{t("about.andorra.title")}</h2>
          <p className="jr-measure text-lg text-muted-foreground">{t("about.andorra.text")}</p>
        </Reveal>

        <Reveal>
          <picture>
            <source
              type="image/webp"
              srcSet={`${andorra800} 800w, ${andorra1600} 1600w`}
              sizes="(min-width: 1200px) 1120px, 100vw"
            />
            <img
              src={andorraJpg}
              alt={t("about.andorra.imageAlt")}
              width={1920}
              height={1088}
              loading="lazy"
              decoding="async"
              className="w-full object-cover"
            />
          </picture>
        </Reveal>
      </div>
    </section>
  );
}
