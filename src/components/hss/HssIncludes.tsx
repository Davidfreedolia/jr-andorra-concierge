import { useTranslation } from "react-i18next";

import { tList } from "@/i18n/list";

export function HssIncludes() {
  const { t } = useTranslation();
  const items = tList<string>(t, "hss.includes.items");

  return (
    <section className="jr-section jr-surface-bone">
      <div className="jr-container flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <p className="jr-label text-jr-gold-deep">{t("hss.includes.label")}</p>
          <h2 className="jr-display-2 jr-measure">{t("hss.includes.title")}</h2>
        </div>

        <ul className="flex flex-col border-t">
          {items.map((item) => (
            <li key={item} className="border-b py-7 text-lg lg:py-9">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
