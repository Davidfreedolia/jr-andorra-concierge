import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { IconTile } from "@/components/IconTile";
import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";

import type { Language } from "@/i18n/config";

type Card = { title: string; text: string };

export function MobilityCards({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const cards = tList<Card>(t, "home.mobility.cards");

  return (
    <section className="jr-section">
      <div className="jr-container flex flex-col gap-10">
        <Reveal>
          <h2 className="jr-display-2 jr-measure text-jr-gold">{t("home.mobility.title")}</h2>
        </Reveal>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal
              as="li"
              key={card.title}
              delay={index * 90}
              className="jr-panel flex min-w-0 flex-col gap-4"
            >
              <IconTile index={index + 8} />
              <h3 className="font-display text-2xl text-jr-bone">{card.title}</h3>
              <p className="text-muted-foreground">{card.text}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <Link to="/$lang/conciergerie-mobility" params={{ lang }} className="jr-button">
            {t("home.mobility.cta")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
