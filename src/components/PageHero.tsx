import { Trans, useTranslation } from "react-i18next";

/**
 * The site-wide hero treatment, taken from the Home hero:
 * full-bleed cinematic image with Ken Burns motion, gold veil,
 * label in gold letterspacing and a display headline with gold accents.
 */
export function PageHero({
  image,
  video,
  altKey,
  labelKey,
  titleKey,
}: {
  image: string;
  video?: string;
  altKey: string;
  labelKey: string;
  titleKey: string;
}) {
  const { t } = useTranslation();

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
          aria-label={t(altKey)}
        />
      ) : (
        <img
          src={image}
          alt={t(altKey)}
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
          <Trans
            i18nKey={titleKey}
            components={[
              <span className="text-jr-gold" />,
              <span className="text-jr-gold" />,
            ]}
          />
        </h1>
      </div>
    </section>
  );
}
