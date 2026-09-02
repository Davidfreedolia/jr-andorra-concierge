import { useTranslation } from "react-i18next";

import { tList } from "@/i18n/list";

type Item = { title: string; text: string };

export function ConciergerieGrid() {
  const { t } = useTranslation();
  const items = tList<Item>(t, "home.concierge.items");

  return (
    <section className="jr-section jr-surface-bone">
      <div className="jr-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="jr-label text-jr-gold-deep">{t("home.concierge.label")}</p>
          <h2 className="jr-display-2 jr-measure">{t("home.concierge.title")}</h2>
        </div>

        <ul className="grid grid-cols-1 gap-px border bg-current/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className="flex flex-col gap-2 jr-surface-bone p-6">
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="opacity-70">{item.text}</p>
            </li>
          ))}
        </ul>

        <p className="jr-measure opacity-70">{t("home.concierge.note")}</p>
      </div>
    </section>
  );
}
