import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/Reveal";
import founder from "@/assets/founder.jpg.asset.json";
import { tList } from "@/i18n/list";

export function FounderLetter() {
  const { t } = useTranslation();
  const paragraphs = tList<string>(t, "about.letter.paragraphs");

  return (
    <section className="jr-section">
      <div className="jr-container grid grid-cols-1 items-start gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
        <Reveal>
          <img
            src={founder.url}
            alt={t("about.letter.portraitAlt")}
            width={960}
            height={1200}
            loading="lazy"
            decoding="async"
            className="w-full max-w-sm object-cover"
          />
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
