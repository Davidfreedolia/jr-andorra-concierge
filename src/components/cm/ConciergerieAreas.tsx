import { useTranslation } from "react-i18next";

import { IconTile } from "@/components/IconTile";
import { Reveal } from "@/components/Reveal";
import { tList } from "@/i18n/list";

import bgNightPoster from "@/assets/cc-bg-night.jpg";
import bgNightVideo from "@/assets/cc-bg-night.mp4.asset.json";

type Area = { title: string; text: string };

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
              className="jr-panel jr-card-hover flex min-w-0 flex-col gap-4"
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
