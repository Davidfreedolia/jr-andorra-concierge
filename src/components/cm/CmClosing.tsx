import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { GoldText } from "@/components/GoldText";
import { WHATSAPP_URL } from "@/lib/contact";
import closingImage from "@/assets/cm-andorra.jpg";

import type { Language } from "@/i18n/config";
import { Reveal } from "@/components/Reveal";

export function CmClosing({ lang }: { lang: Language }) {
  const { t } = useTranslation();

  return (
    <section className="jr-section">
      <Reveal className="jr-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="jr-display-2 jr-measure text-jr-white">
            <GoldText text={t("cm.closing.title")} />
          </h2>
          <p className="jr-measure text-muted-foreground">{t("cm.closing.text")}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/$lang/contact" params={{ lang }} className="jr-button">
              {t("cm.closing.cta")}
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="jr-button"
            >
              {t("cm.closing.whatsapp")}
            </a>
          </div>
        </div>
        <div className="jr-panel overflow-hidden">
          <img
            src={closingImage}
            alt={t("cm.closing.alt")}
            className="h-72 w-full object-cover lg:h-[28rem]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Reveal>
    </section>
  );
}
