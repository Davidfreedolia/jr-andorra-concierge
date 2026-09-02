import { useTranslation } from "react-i18next";

import { IconTile } from "@/components/IconTile";
import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";

import bgNightPoster from "@/assets/cc-bg-night.jpg";
import bgNightVideo from "@/assets/cc-bg-night.mp4.asset.json";
import ccGastronomy from "@/assets/cc-gastronomy.jpg";
import ccWellness from "@/assets/cc-wellness.jpg";
import ccSki from "@/assets/cc-ski.jpg";
import ccCasino from "@/assets/cc-casino.jpg";
import ccHotel from "@/assets/cc-hotel.jpg";
import ccCoordination from "@/assets/cc-coordination.jpg";

type Area = { title: string; text: string };

const AREA_IMAGES = [
  ccGastronomy,
  ccWellness,
  ccSki,
  ccCasino,
  ccHotel,
  ccCoordination,
];

export function ConciergerieAreas() {
  const { t } = useTranslation();
  const areas = tList<Area>(t, "cm.concierge.items");

  return (
    <section className="jr-section relative overflow-hidden">
      {/* Background: exclusive Andorra by night — video */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <video
          src={bgNightVideo.url}
          poster={bgNightPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-jr-black/88 via-jr-black/80 to-jr-black/92"
        aria-hidden="true"
      />

      <div className="jr-container relative z-10 flex flex-col gap-10">
        <Reveal className="flex flex-col gap-4">
          <h2 className="jr-display-2 jr-measure text-jr-gold">{t("cm.concierge.title")}</h2>
        </Reveal>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => (
            <Reveal
              as="li"
              key={area.title}
              delay={index * 70}
              className="jr-panel jr-card-hover group relative flex min-w-0 flex-col gap-4 overflow-hidden"
            >
              {/* Themed image, revealed on hover/focus */}
              <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
                <img
                  src={AREA_IMAGES[index % AREA_IMAGES.length]}
                  alt=""
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="h-full w-full scale-105 object-cover opacity-25 transition-all duration-[900ms] ease-out group-hover:scale-100 group-hover:opacity-70 group-focus-within:scale-100 group-focus-within:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jr-black via-jr-black/85 to-jr-black/55 transition-opacity duration-[900ms] group-hover:from-jr-black/95 group-hover:via-jr-black/70 group-hover:to-jr-black/35" />
              </div>

              <IconTile index={index + 10} />
              <h3 className="font-display text-2xl text-jr-bone">{area.title}</h3>
              <p className="text-muted-foreground">{area.text}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="jr-measure text-muted-foreground">{t("cm.concierge.note")}</p>
        </Reveal>
      </div>
    </section>
  );
}
