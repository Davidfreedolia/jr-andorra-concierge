import { useTranslation } from "react-i18next";

import { tList } from "@/i18n/list";

export function KeyCustody() {
  const { t } = useTranslation();
  const lines = tList<string>(t, "hss.keys.lines");

  return (
    <section className="jr-section">
      <div className="jr-container flex flex-col gap-6">
        <p className="jr-label">{t("hss.keys.label")}</p>
        <h2 className="jr-display-2 jr-measure text-jr-bone">{t("hss.keys.title")}</h2>
        <div className="jr-measure flex flex-col gap-3 text-muted-foreground">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
