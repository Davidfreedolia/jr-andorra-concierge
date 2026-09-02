import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/Reveal";

export function SingleVoice() {
  const { t } = useTranslation();

  return (
    <section className="jr-section">
      <div className="jr-container">
        <Reveal className="jr-panel flex flex-col items-center gap-8 text-center">
          <p className="jr-display-2 max-w-[22ch] text-jr-bone">{t("home.voice.quote")}</p>
          <hr className="jr-divider w-full" />
          <div className="jr-measure flex flex-col gap-3 text-muted-foreground">
            <p>{t("home.voice.line1")}</p>
            <p>{t("home.voice.line2")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
