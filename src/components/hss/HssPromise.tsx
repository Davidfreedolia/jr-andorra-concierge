import { useTranslation } from "react-i18next";

export function HssPromise() {
  const { t } = useTranslation();

  return (
    <section className="jr-section">
      <div className="jr-container flex flex-col items-center gap-8 text-center">
        <p className="jr-display-2 max-w-[20ch] text-jr-bone">{t("hss.promise.quote")}</p>
        <p className="jr-measure text-muted-foreground">{t("hss.promise.line")}</p>
      </div>
    </section>
  );
}
