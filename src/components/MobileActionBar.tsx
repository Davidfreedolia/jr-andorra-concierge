import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import type { Language } from "@/i18n/config";
import { WHATSAPP_URL } from "@/lib/contact";

/** Fixed bottom action bar, mobile only. Appears once the hero is left behind. */
export function MobileActionBar({ lang }: { lang: Language }) {
  const { t } = useTranslation();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.6) setShown(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [shown]);

  return (
    <div className={`jr-actionbar md:hidden${shown ? " jr-actionbar-in" : ""}`} aria-hidden={!shown}>
      <Link
        to="/$lang/home-stay-safe"
        params={{ lang }}
        hash="valoracion"
        className="jr-button flex-1"
        tabIndex={shown ? undefined : -1}
      >
        {t("actionBar.assessment")}
      </Link>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("actionBar.whatsappAria")}
        className="jr-wa-circle"
        tabIndex={shown ? undefined : -1}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.86.5 3.6 1.36 5.1L2 22l5.2-1.52a9.8 9.8 0 0 0 4.84 1.26h.01c5.43 0 9.84-4.4 9.84-9.84S17.47 2 12.04 2Zm0 17.94h-.01a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-3.08.9.82-3-.2-.31a8.07 8.07 0 0 1-1.24-4.32c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.4a8.11 8.11 0 0 1 2.39 5.77c0 4.5-3.66 8.03-8.2 8.03Zm4.49-6.05c-.25-.13-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.17.25-.63.8-.78.96-.14.17-.28.19-.53.06a6.6 6.6 0 0 1-1.95-1.2 7.3 7.3 0 0 1-1.35-1.68c-.14-.25-.02-.38.11-.5.11-.12.25-.29.37-.44.13-.15.17-.25.25-.42.09-.17.04-.31-.02-.44-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.06s.89 2.39 1.01 2.55c.13.17 1.74 2.66 4.21 3.73.59.25 1.05.4 1.4.52.59.18 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z"
          />
        </svg>
        <span className="sr-only">{t("actionBar.whatsapp")}</span>
      </a>
    </div>
  );
}
