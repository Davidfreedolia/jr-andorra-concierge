import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { IconTile } from "@/components/IconTile";
import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";

import bgNightPoster from "@/assets/cc-bg-night.jpg";
import bgNightVideo from "@/assets/cc-bg-night.mp4.asset.json";
import ccCasino from "@/assets/cc-casino.jpg";
import ccCoordination from "@/assets/cc-coordination.jpg";
import ccGastronomy from "@/assets/cc-gastronomy.jpg";
import ccHotel from "@/assets/cc-hotel.jpg";
import ccSki from "@/assets/cc-ski.jpg";
import ccWellness from "@/assets/cc-wellness.jpg";

type Area = { title: string; text: string };

// Default image index: activities / mountains — shown when no card is hovered.
const DEFAULT_INDEX = 2;

const AREA_IMAGES = [
  { src: ccGastronomy, label: "Gastronomia" },
  { src: ccWellness, label: "Wellness" },
  { src: ccSki, label: "Activitats i muntanya" },
  { src: ccCasino, label: "Oci nocturn" },
  { src: ccHotel, label: "Estades a mida" },
  { src: ccCoordination, label: "Coordinació integral" },
];

export function ConciergerieAreas() {
  const { t } = useTranslation();
  const areas = tList<Area>(t, "cm.concierge.items");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [displayIndex, setDisplayIndex] = useState(DEFAULT_INDEX);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const target = hoverIndex ?? DEFAULT_INDEX;
    if (target === displayIndex) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
    timerRef.current = setTimeout(() => {
      setDisplayIndex(target);
      setVisible(true);
    }, 350);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hoverIndex, displayIndex]);

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

      {/* Section background changes on card hover — only one image at a time */}
      <div className="absolute inset-0 -z-[15]" aria-hidden="true">
        <img
          src={AREA_IMAGES[displayIndex]!.src}
          alt=""
          loading="eager"
          width={1600}
          height={1067}
          className={`h-full w-full object-cover transition-opacity duration-700 ease-out ${
            visible ? "opacity-45" : "opacity-0"
          }`}
        />
      </div>

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-jr-black/90 via-jr-black/82 to-jr-black/94"
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
              className="jr-panel jr-card-hover relative flex min-w-0 flex-col gap-4"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
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
