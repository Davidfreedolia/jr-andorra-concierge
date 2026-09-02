import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { LANGUAGES, LANGUAGE_LABELS, type Language } from "@/i18n/config";
import { routeForPathname } from "@/lib/routes";

export function LanguageSwitcher({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const to = routeForPathname(pathname);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className="jr-tap jr-label flex items-center gap-2 border border-jr-gold/30 px-3 text-jr-bone hover:border-jr-gold/60"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("language.select")}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{LANGUAGE_LABELS[lang]}</span>
        <span aria-hidden="true" className="text-jr-gold-deep">
          {open ? "\u2303" : "\u2304"}
        </span>
      </button>

      {open ? (
        <nav
          aria-label={t("language.select")}
          className="absolute right-0 z-50 mt-2 min-w-[9rem] border border-jr-gold/30 bg-jr-black py-1 shadow-lg"
        >
          {LANGUAGES.map((code) => (
            <Link
              key={code}
              to={to}
              params={{ lang: code }}
              hrefLang={code}
              aria-current={code === lang ? "true" : undefined}
              onClick={() => setOpen(false)}
              className={`jr-tap jr-label block w-full justify-start px-4 py-2 text-left ${
                code === lang
                  ? "text-jr-gold-deep"
                  : "text-jr-bone/70 hover:text-jr-bone"
              }`}
            >
              {LANGUAGE_LABELS[code]}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
