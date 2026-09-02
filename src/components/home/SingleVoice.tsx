import { useTranslation } from "react-i18next";

export function SingleVoice() {
  const { t } = useTranslation();

  return (
    <section className="jr-section">
      <div className="jr-container flex flex-col items-center gap-10 text-center">
        <p className="jr-display-2 max-w-[22ch] text-jr-bone">{t("home.voice.quote")}</p>
        <div className="jr-measure flex flex-col gap-3 text-muted-foreground">
          <p>{t("home.voice.line1")}</p>
          <p>{t("home.voice.line2")}</p>
        </div>
      </div>
    </section>
  );
}
