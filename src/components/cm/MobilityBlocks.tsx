import { Trans, useTranslation } from "react-i18next";

import andorraImage from "@/assets/cm-andorra.jpg";
import chauffeurImage from "@/assets/cm-chauffeur.jpg";
import transfersImage from "@/assets/cm-transfers.jpg";
import { tList } from "@/i18n/list";
import { Reveal } from "@/components/Reveal";

type Block = { title: string; text: string; alt: string };

const IMAGES = [transfersImage, chauffeurImage, andorraImage];

export function MobilityBlocks() {
  const { t } = useTranslation();
  const blocks = tList<Block>(t, "cm.mobility.blocks");

  return (
    <section id="mobility" className="jr-section">
      <div className="jr-container flex flex-col gap-12 lg:gap-20">
        <Reveal className="flex flex-col gap-4">
          <p className="jr-label">{t("cm.mobility.label")}</p>
          <h2 className="jr-display-2 jr-measure text-jr-white">
            <Trans
              i18nKey="cm.mobility.title"
              components={[
                <span className="text-jr-gold" />,
                <span className="text-jr-gold" />,
                <span className="text-jr-gold" />,
              ]}
            />
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block, index) => (
            <Reveal as="article"
              key={block.title}
              className="jr-panel jr-card-hover group flex flex-col overflow-hidden p-0"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={IMAGES[index] ?? transfersImage}
                  alt={block.alt}
                  width={1280}
                  height={960}
                  loading="lazy"
                  decoding="async"
                  className="jr-photo-lift h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-jr-gold/50 to-transparent" />
              </div>
              <div className="flex flex-col gap-4 p-6 lg:p-8">
                <h3 className="font-display text-2xl text-jr-gold lg:text-3xl">{block.title}</h3>
                <p className="jr-measure text-jr-white/85">{block.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
