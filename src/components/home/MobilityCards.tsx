import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import type { Language } from "@/i18n/config";

type Card = { title: string; text: string };

export function MobilityCards({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const cards = t("home.mobility.cards", { returnObjects: true }) as Card[];

  return (
    <section className="jr-section">
      <div className="jr-container flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="jr-label">{t("home.mobility.label")}</p>
          <h2 className="jr-display-2 jr-measure text-jr-bone">{t("home.mobility.title")}</h2>
        </div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title} className="flex flex-col gap-3 border bg-card p-6">
              <h3 className="font-display text-2xl text-jr-bone">{card.title}</h3>
              <p className="text-muted-foreground">{card.text}</p>
            </li>
          ))}
        </ul>

        <div>
          <Link to="/$lang/conciergerie-mobility" params={{ lang }} className="jr-button">
            {t("home.mobility.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
