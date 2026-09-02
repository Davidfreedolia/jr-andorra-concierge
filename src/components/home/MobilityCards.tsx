import { Link } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

import { IconTile } from "@/components/IconTile";
import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";
import mobilityBgAsset from "@/assets/mobility-bg.jpg.asset.json";
import mobilityVideoAsset from "@/assets/mobility-bg.mp4.asset.json";

import type { Language } from "@/i18n/config";

type Card = { title: string; text: string };

export function MobilityCards({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const cards = tList<Card>(t, "home.mobility.cards");

  return (
    <section className="jr-section relative overflow-hidden">
      {/* Background: snowy mountain road with luxury SUV — fixed video */}
      <div
        className="absolute inset-0 -z-20"
        aria-hidden="true"
      >
        <video
          src={mobilityVideoAsset.url}
          poster={mobilityBgAsset.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover jr-photo-lift"
        />
      </div>

      {/* Dark reading veil */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-jr-black/82 via-jr-black/72 to-jr-black/88"
        aria-hidden="true"
      />

      <div className="jr-container relative z-10 flex flex-col gap-10">
        <Reveal>
          <h2 className="jr-display-2 jr-measure text-jr-white">
            <Trans
              i18nKey="home.mobility.title"
              components={[
                <span className="text-jr-gold" />,
                <span className="text-jr-gold" />,
              ]}
            />
          </h2>
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
