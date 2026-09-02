import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import type { Language } from "@/i18n/config";
import { Reveal } from "@/components/Reveal";

export function ConsultingNote({ lang }: { lang: Language }) {
  const { t } = useTranslation();

  return (
    <section className="jr-section">
      <div className="jr-container">
        <Reveal className="jr-panel jr-card-hover mx-auto flex max-w-3xl flex-col items-center gap-5 text-center md:gap-6">
          <p className="jr-label">{t("home.consulting.label")}</p>
          <h2 className="jr-display-2 text-jr-gold">{t("home.consulting.title")}</h2>
          <p className="jr-measure text-balance opacity-80">
            {t("home.consulting.line1")} {t("home.consulting.line2")}
          </p>
          <div className="pt-1">
            <Link to="/$lang/contact" params={{ lang }} className="jr-button">
              {t("home.consulting.cta")}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
