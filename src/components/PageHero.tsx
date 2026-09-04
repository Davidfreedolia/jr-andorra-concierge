import { useTranslation } from "react-i18next";

import { GoldText } from "@/components/GoldText";

/**
 * The site-wide hero treatment, taken from the Home hero:
 * full-bleed cinematic image with Ken Burns motion, gold veil,
 * label in gold letterspacing and a display headline with gold accents.
 *
 * Sense imatge ni video pinta la mateixa capçalera sobre banda fosca amb filet.
 * La pagina d'equip ho fa servir: ha d'obrir amb les cares, no amb un paisatge.
 */
export function PageHero({
  image,
  video,
  altKey,
  labelKey,
  titleKey,
  introKey,
}: {
  image?: string;
  video?: string;
  altKey?: string;
  labelKey: string;
  titleKey: string;
  introKey?: string;
}) {
  const { t } = useTranslation();

  if (!image && !video) {
    return (
      <section className="flex w-full items-end border-b bg-jr-night-deep pt-24 pb-14 lg:pt-32 lg:pb-20">
        <div className="jr-container w-full">
          <p className="jr-label text-jr-gold">{t(labelKey)}</p>
          <h1 className="jr-display-1 jr-measure mt-4 text-jr-white">
            <GoldText text={t(titleKey)} />
          </h1>
          {introKey ? (
            <p className="jr-measure mt-6 text-lg text-muted-foreground">{t(introKey)}</p>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="relative isolate flex h-[68vh] min-h-[460px] w-full items-end overflow-hidden bg-jr-black">
      {video ? (
        <video
          className="jr-photo-lift absolute inset-0 -z-20 h-full w-full object-cover"
          src={video}
          poster={image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={altKey ? t(altKey) : undefined}
        />
      ) : (
        <img
          src={image}
          alt={altKey ? t(altKey) : ""}
          width={1920}
          height={1088}
          fetchPriority="high"
          decoding="async"
          className="jr-kenburns jr-photo-lift absolute inset-0 -z-20 h-full w-full object-cover"
        />
      )}
      <div className="jr-hero-veil" aria-hidden="true" />


      <div className="jr-container relative w-full pb-16 lg:pb-24">
        <p className="jr-label text-jr-gold">{t(labelKey)}</p>
        <h1 className="jr-display-1 jr-measure mt-4 text-jr-white">
          <GoldText text={t(titleKey)} />
        </h1>
      </div>
    </section>
  );
}
