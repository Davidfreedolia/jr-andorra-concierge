import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/Reveal";
import founder from "@/assets/jaume-roca-portrait.png.asset.json";
import { tList } from "@/i18n/list";

export function FounderLetter() {
  const { t } = useTranslation();
  const paragraphs = tList<string>(t, "about.letter.paragraphs");

  return (
    <section className="jr-section">
      <div className="jr-container grid grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
        <Reveal className="flex justify-center md:justify-start">
          <figure className="jr-panel relative w-full max-w-sm overflow-hidden p-0">
            {/* Subtle golden backdrop for the transparent portrait */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-jr-night via-jr-black to-jr-night-deep"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-jr-gold/10 blur-3xl"
              aria-hidden="true"
            />
            <img
              src={founder.url}
              alt={t("about.letter.portraitAlt")}
              width={960}
              height={1200}
              loading="lazy"
              decoding="async"
              className="relative z-10 w-full object-contain"
            />
          </figure>
        </Reveal>

        <Reveal className="flex min-w-0 flex-col gap-6">
          <p className="jr-label">{t("about.letter.label")}</p>
          <h1 className="jr-display-1 jr-measure text-jr-gold">{t("about.letter.title")}</h1>
          <div className="jr-measure flex flex-col gap-4 text-lg text-muted-foreground">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-2 flex flex-col gap-1">
            <span className="jr-display-2 text-jr-gold">{t("about.letter.signature")}</span>
            <span className="jr-label">{t("about.letter.role")}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
