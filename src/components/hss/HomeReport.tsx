import { useTranslation } from "react-i18next";

import reportImage from "@/assets/hss-report.jpg.asset.json";
import { tList } from "@/i18n/list";
import { Reveal } from "@/components/Reveal";

export function HomeReport() {
  const { t } = useTranslation();
  const lines = tList<string>(t, "hss.report.lines");

  return (
    <section className="jr-section">
      <div className="jr-container grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">
        <Reveal className="flex min-w-0 flex-col gap-6">
          <p className="jr-label">{t("hss.report.label")}</p>
          <h2 className="jr-display-1 text-jr-gold">{t("hss.report.title")}</h2>
          <div className="jr-measure flex flex-col gap-4 text-lg text-muted-foreground">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
        <img
          src={reportImage.url}
          alt={t("hss.report.alt")}
          loading="lazy"
          width={1280}
          height={1600}
          className="jr-photo-lift w-full object-cover"
        />
        </Reveal>
      </div>
    </section>
  );
}
