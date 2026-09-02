import { useTranslation } from "react-i18next";

import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";

type Detail = { label: string; value: string };

export function CompanyDetails() {
  const { t } = useTranslation();
  const items = tList<Detail>(t, "contact.company.items");

  return (
    <section className="jr-section jr-surface-bone">
      <div className="jr-container flex flex-col gap-8">
        <Reveal className="flex flex-col gap-3">
          <h2 className="jr-display-2">{t("contact.company.title")}</h2>
          <p className="text-black/60">{t("contact.company.note")}</p>
        </Reveal>

        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.label} className="flex min-w-0 flex-col gap-1 border-t border-black/15 pt-4">
              <dt className="jr-label text-black/60">{item.label}</dt>
              <dd className="text-black/80">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
