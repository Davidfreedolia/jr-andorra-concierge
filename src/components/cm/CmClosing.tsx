import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { WHATSAPP_URL } from "@/lib/contact";

import type { Language } from "@/i18n/config";

export function CmClosing({ lang }: { lang: Language }) {
  const { t } = useTranslation();

  return (
    <section className="jr-section">
      <div className="jr-container flex flex-col gap-6">
        <h2 className="jr-display-2 jr-measure text-jr-gold">{t("cm.closing.title")}</h2>
        <p className="jr-measure text-muted-foreground">{t("cm.closing.text")}</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link to="/$lang/contact" params={{ lang }} className="jr-button">
            {t("cm.closing.cta")}
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="jr-button jr-button-quiet"
          >
            {t("cm.closing.whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}
