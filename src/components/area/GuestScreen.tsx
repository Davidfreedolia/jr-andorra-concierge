import { useTranslation } from "react-i18next";

import { AreaCard } from "@/components/area/AreaCard";
import { tList } from "@/i18n/list";
import { formatDate } from "@/lib/area-format";
import { WHATSAPP_URL } from "@/lib/contact";
import { DEMO_GUEST_ACCESS_UNTIL, DEMO_PROPERTY } from "@/mocks/area";

export function GuestScreen() {
  const { t, i18n } = useTranslation();
  const instructions = tList<string>(t, "area.property.instructionsList");

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="jr-area-title">{t("area.guest.welcome", { property: t(DEMO_PROPERTY.name) })}</h1>
        <p className="jr-measure text-muted-foreground">{t("area.guest.intro")}</p>
      </header>

      <AreaCard className="flex flex-col gap-3">
        <h2 className="jr-area-subtitle">{t("area.guest.wifi")}</h2>
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <dt className="jr-label text-muted-foreground">{t("area.property.wifiNetwork")}</dt>
            <dd className="jr-area-figure">{DEMO_PROPERTY.wifiNetwork}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="jr-label text-muted-foreground">{t("area.property.wifiPassword")}</dt>
            <dd className="jr-area-figure">{DEMO_PROPERTY.wifiPassword}</dd>
          </div>
        </dl>
      </AreaCard>

      <AreaCard className="flex flex-col gap-3">
        <h2 className="jr-area-subtitle">{t("area.guest.instructions")}</h2>
        <ul className="flex flex-col gap-2 text-muted-foreground">
          {instructions.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </AreaCard>

      <div className="flex flex-col gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="jr-button self-start"
        >
          {t("area.guest.concierge")}
        </a>
        <p className="text-sm text-muted-foreground">{t("area.guest.note")}</p>
      </div>

      <p className="jr-label">
        {t("area.guest.expiry", { date: formatDate(DEMO_GUEST_ACCESS_UNTIL, i18n.language) })}
      </p>
    </div>
  );
}
