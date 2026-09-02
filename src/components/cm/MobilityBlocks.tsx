import { useTranslation } from "react-i18next";

import andorraImage from "@/assets/cm-andorra.jpg";
import chauffeurImage from "@/assets/cm-chauffeur.jpg";
import transfersImage from "@/assets/cm-transfers.jpg";
import { tList } from "@/i18n/list";

type Block = { title: string; text: string; alt: string };

const IMAGES = [transfersImage, chauffeurImage, andorraImage];

export function MobilityBlocks() {
  const { t } = useTranslation();
  const blocks = tList<Block>(t, "cm.mobility.blocks");

  return (
    <section id="mobility" className="jr-section">
      <div className="jr-container flex flex-col gap-12 lg:gap-20">
        <div className="flex flex-col gap-4">
          <p className="jr-label">{t("cm.mobility.label")}</p>
          <h2 className="jr-display-2 jr-measure text-jr-bone">{t("cm.mobility.title")}</h2>
        </div>

        {blocks.map((block, index) => (
          <article
            key={block.title}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
          >
            <img
              src={IMAGES[index] ?? transfersImage}
              alt={block.alt}
              width={1280}
              height={960}
              loading="lazy"
              decoding="async"
              className={`w-full object-cover ${index % 2 === 1 ? "lg:order-2" : ""}`}
            />
            <div className="flex min-w-0 flex-col gap-4">
              <h3 className="font-display text-3xl text-jr-bone lg:text-4xl">{block.title}</h3>
              <p className="jr-measure text-muted-foreground">{block.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
