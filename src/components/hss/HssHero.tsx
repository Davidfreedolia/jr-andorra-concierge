import { useTranslation } from "react-i18next";

import heroImage from "@/assets/hss-hero.jpg.asset.json";

export function HssHero() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate flex h-[60vh] min-h-[420px] w-full items-end overflow-hidden bg-jr-black">
      <img
        src={heroImage.url}
        alt={t("hss.hero.alt")}
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="jr-hero-veil" aria-hidden="true" />

      <div className="jr-container relative w-full pb-14 lg:pb-20">
        <p className="jr-label">{t("pages.homeStaySafe.title")}</p>
        <h1 className="jr-display-1 jr-measure mt-4 text-jr-white">{t("hss.hero.title")}</h1>
      </div>
    </section>
  );
}
