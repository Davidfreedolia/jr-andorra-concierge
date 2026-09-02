import { useTranslation } from "react-i18next";

import { AreaCard } from "@/components/area/AreaCard";
import { AreaEmpty } from "@/components/area/AreaEmpty";
import { formatDate } from "@/lib/area-format";
import { DEMO_PEOPLE } from "@/mocks/area";

export function PeopleScreen() {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="jr-area-title">{t("area.people.title")}</h1>
        <p className="jr-measure text-muted-foreground">{t("area.people.intro")}</p>
      </header>

      {DEMO_PEOPLE.length === 0 ? (
        <AreaEmpty text={t("area.people.empty")} />
      ) : (
        <ul className="flex flex-col gap-3">
          {DEMO_PEOPLE.map((person) => (
            <AreaCard
              as="li"
              key={person.id}
              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="flex min-w-0 flex-col gap-1">
                <span className="jr-area-figure">{t(person.name)}</span>
                <span className="jr-label">{t(`area.roles.${person.role}`)}</span>
              </span>
              <span className="text-sm text-muted-foreground">
                {person.until
                  ? t("area.people.until", { date: formatDate(person.until, i18n.language) })
                  : t("area.people.permanent")}
              </span>
            </AreaCard>
          ))}
        </ul>
      )}

      <div className="flex flex-col gap-2">
        <button type="button" className="jr-button self-start">
          {t("area.people.invite")}
        </button>
        <p className="text-sm text-muted-foreground">{t("area.people.inviteNote")}</p>
      </div>
    </div>
  );
}
