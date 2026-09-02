import { useTranslation } from "react-i18next";

import { tList } from "@/i18n/list";

type Area = { title: string; text: string };

export function ConciergerieAreas() {
  const { t } = useTranslation();
  const areas = tList<Area>(t, "cm.concierge.items");

  return (
    <section className="jr-section jr-surface-bone">
      <div className="jr-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="jr-label text-jr-gold-deep">{t("cm.concierge.label")}</p>
          <h2 className="jr-display-2 jr-measure">{t("cm.concierge.title")}</h2>
        </div>

        <ul className="grid grid-cols-1 gap-px border bg-current/10 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <li key={area.title} className="jr-surface-bone flex flex-col gap-2 p-6">
              <h3 className="font-display text-2xl">{area.title}</h3>
              <p className="opacity-70">{area.text}</p>
            </li>
          ))}
        </ul>

        <p className="jr-measure opacity-70">{t("cm.concierge.note")}</p>
      </div>
    </section>
  );
}
