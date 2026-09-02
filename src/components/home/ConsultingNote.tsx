import { useTranslation } from "react-i18next";

export function ConsultingNote() {
  const { t } = useTranslation();

  return (
    <section className="jr-section jr-surface-bone">
      <div className="jr-container flex flex-col gap-4">
        <p className="jr-label text-jr-gold-deep">{t("home.consulting.label")}</p>
        <h2 className="jr-display-2 jr-measure">{t("home.consulting.title")}</h2>
        <div className="jr-measure flex flex-col gap-2 opacity-70">
          <p>{t("home.consulting.line1")}</p>
          <p>{t("home.consulting.line2")}</p>
        </div>
        <p className="jr-label text-jr-gold-deep">{t("home.consulting.note")}</p>
      </div>
    </section>
  );
}
