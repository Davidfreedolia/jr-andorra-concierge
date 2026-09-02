import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import doorHome from "@/assets/door-home.jpg.asset.json";
import doorMobility from "@/assets/door-mobility.jpg.asset.json";
import type { Language } from "@/i18n/config";

export function TwoDoors({ lang }: { lang: Language }) {
  const { t } = useTranslation();

  const doors = [
    {
      to: "/$lang/home-stay-safe" as const,
      image: doorHome.url,
      title: t("home.doors.home.title"),
      line: t("home.doors.home.line"),
      link: t("home.doors.home.link"),
    },
    {
      to: "/$lang/conciergerie-mobility" as const,
      image: doorMobility.url,
      title: t("home.doors.mobility.title"),
      line: t("home.doors.mobility.line"),
      link: t("home.doors.mobility.link"),
    },
  ];

  return (
    <section aria-label={t("home.doors.label")} className="grid grid-cols-1 md:grid-cols-2">
      {doors.map((door) => (
        <Link
          key={door.title}
          to={door.to}
          params={{ lang }}
          className="group relative isolate flex min-h-[52vh] flex-col justify-end overflow-hidden bg-jr-black p-6 lg:p-12"
        >
          <img
            src={door.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1440}
            height={1080}
            className="absolute inset-0 -z-10 h-full w-full object-cover jr-kenburns jr-photo-lift opacity-80 transition-opacity duration-500 group-hover:opacity-95"
          />
          <div className="jr-door-veil" aria-hidden="true" />
          <div className="relative flex flex-col gap-3">
            <h2 className="jr-display-2 text-jr-gold">{door.title}</h2>
            <p className="jr-measure text-muted-foreground">{door.line}</p>
            <span className="jr-label">{door.link}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
