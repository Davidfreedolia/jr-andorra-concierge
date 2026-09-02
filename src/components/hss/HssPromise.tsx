import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/Reveal";

export function HssPromise() {
  const { t } = useTranslation();

  return (
    <section className="jr-section">
      <Reveal className="jr-container flex flex-col items-center gap-8 text-center">
        <p className="jr-display-2 max-w-[20ch] text-jr-gold">{t("hss.promise.quote")}</p>
        <p className="jr-measure text-muted-foreground">{t("hss.promise.line")}</p>
      </Reveal>
    </section>
  );
}
