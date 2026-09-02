import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import type { Language } from "@/i18n/config";

type ConnectionLike = {
  saveData?: boolean;
  effectiveType?: string;
};

const SLOW_TYPES = ["slow-2g", "2g", "3g"];

function allowsVideo(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & { connection?: ConnectionLike }).connection;
  if (!connection) return true;
  if (connection.saveData) return false;
  if (connection.effectiveType && SLOW_TYPES.includes(connection.effectiveType)) return false;
  return true;
}

export function HeroVideo({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const [source, setSource] = useState<"vertical" | "wide" | null>(null);

  useEffect(() => {
    // The poster is the LCP element: only consider the video once it has painted.
    const start = () => {
      if (!allowsVideo()) return;
      setSource(window.matchMedia("(max-width: 767px)").matches ? "vertical" : "wide");
    };
    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  const base = source === "vertical" ? "/media/hero-9x16" : "/media/hero-16x9";

  return (
    <section className="relative isolate flex h-[78vh] min-h-[520px] w-full items-end overflow-hidden bg-jr-black">
      <img
        src="/hero.jpg"
        alt={t("home.hero.videoAlt")}
        width={1920}
        height={1088}
        fetchPriority="high"
        decoding="async"
        className="jr-kenburns jr-photo-lift absolute inset-0 -z-20 h-full w-full object-cover"
      />

      {source ? (
        <video
          key={base}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/hero.jpg"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        >
          <source src={`${base}.webm`} type="video/webm" />
          <source src={`${base}.mp4`} type="video/mp4" />
        </video>
      ) : null}

      <div className="jr-hero-veil" aria-hidden="true" />

      <div className="jr-container relative w-full pb-16 lg:pb-24">
        <h1 className="jr-display-1 jr-measure text-jr-white">
          <Trans
            i18nKey="home.hero.title"
            components={{
              1: <span className="text-jr-gold" />,
              2: <span className="text-jr-gold" />,
              3: <span className="text-jr-gold" />,
            }}
          />
        </h1>
        <p className="jr-label mt-6">{t("home.hero.subtitle")}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link to="/$lang/home-stay-safe" params={{ lang }} className="jr-button">
            {t("home.hero.ctaHome")}
          </Link>
          <Link to="/$lang/conciergerie-mobility" params={{ lang }} className="jr-button">
            {t("home.hero.ctaMobility")}
          </Link>
        </div>
      </div>
    </section>
  );
}
