import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { tList } from "@/i18n/list";

import type { Language } from "@/i18n/config";

export function HomeStaySafeSummary({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const items = tList<string>(t, "home.hss.items");

  return (
    <section className="jr-section jr-surface-bone">
      <div className="jr-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="jr-label">{t("home.hss.label")}</p>
          <h2 className="jr-display-2 jr-measure">{t("home.hss.title")}</h2>
        </div>

        <ul className="flex flex-col border-t">
          {items.map((item) => (
            <li key={item} className="border-b py-4">
              {item}
            </li>
          ))}
        </ul>

        <div>
          <Link
            to="/$lang/home-stay-safe"
            params={{ lang }}
            className="jr-button border-jr-gold-deep text-jr-gold-deep hover:bg-jr-gold-deep hover:text-jr-bone"
          >
            {t("home.hss.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
