import { useTranslation } from "react-i18next";

import { AreaCard } from "@/components/area/AreaCard";
import { AreaEmpty } from "@/components/area/AreaEmpty";
import { useRole } from "@/components/area/RoleContext";
import { tList } from "@/i18n/list";
import { formatDate } from "@/lib/area-format";
import { DEMO_CONTACTS, DEMO_DOCUMENTS, DEMO_PROPERTY } from "@/mocks/area";

export function PropertyScreen() {
  const { t, i18n } = useTranslation();
  const { role } = useRole();
  const instructions = tList<string>(t, "area.property.instructionsList");
  const isOwner = role === "owner";

  const details = [
    { key: "name", value: DEMO_PROPERTY.name },
    { key: "address", value: DEMO_PROPERTY.address },
    { key: "parish", value: DEMO_PROPERTY.parish },
    { key: "type", value: DEMO_PROPERTY.type },
    { key: "area", value: DEMO_PROPERTY.area },
    { key: "bedrooms", value: DEMO_PROPERTY.bedrooms },
  ].filter((row) => isOwner || !["address"].includes(row.key));

  return (
    <div className="flex flex-col gap-8">
      <h1 className="jr-area-title">{t("area.property.title")}</h1>

      <section className="flex flex-col gap-4">
        <h2 className="jr-area-subtitle">{t("area.property.details")}</h2>
        <AreaCard>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {details.map((row) => (
              <div key={row.key} className="flex min-w-0 flex-col gap-1">
                <dt className="jr-label text-muted-foreground">
                  {t(`area.property.detailLabels.${row.key}`)}
                </dt>
                <dd className="text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
          {!isOwner ? (
            <p className="mt-4 border-t pt-3 text-sm text-muted-foreground">
              {t("area.property.ownerOnly")}
            </p>
          ) : null}
        </AreaCard>
      </section>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <AreaCard className="flex flex-col gap-3">
          <h2 className="jr-area-subtitle">{t("area.property.wifi")}</h2>
          <dl className="flex flex-col gap-3">
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
          <h2 className="jr-area-subtitle">{t("area.property.instructions")}</h2>
          <ul className="flex flex-col gap-2 text-muted-foreground">
            {instructions.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </AreaCard>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="jr-area-subtitle">{t("area.property.contacts")}</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {DEMO_CONTACTS.map((contact) => (
            <AreaCard as="li" key={contact.id} className="flex flex-col gap-1">
              <span className="jr-label">{t(`area.property.contactRoles.${contact.roleKey}`)}</span>
              <span className="text-foreground">{contact.name}</span>
            </AreaCard>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="jr-area-subtitle">{t("area.property.documents")}</h2>
        {DEMO_DOCUMENTS.length === 0 ? (
          <AreaEmpty text={t("area.property.documentsEmpty")} />
        ) : (
          <ul className="flex flex-col gap-3">
            {DEMO_DOCUMENTS.map((document) => (
              <AreaCard
                as="li"
                key={document.id}
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-foreground">
                    {t(`area.property.documentsList.${document.nameKey}`)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(document.date, i18n.language)}
                  </span>
                </span>
                <button type="button" className="jr-button jr-button-quiet">
                  {t("area.download")}
                </button>
              </AreaCard>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
