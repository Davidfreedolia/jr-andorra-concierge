import { useTranslation } from "react-i18next";

import { AreaCard } from "@/components/area/AreaCard";
import { AreaEmpty } from "@/components/area/AreaEmpty";
import { StatusPill } from "@/components/area/StatusPill";
import { formatDate } from "@/lib/area-format";
import { DEMO_INVOICES, DEMO_SUBSCRIPTION } from "@/mocks/area";

export function BillingScreen() {
  const { t, i18n } = useTranslation();

  const subscription = [
    { label: t("area.billing.plan"), value: DEMO_SUBSCRIPTION.plan },
    { label: t("area.billing.renewal"), value: formatDate(DEMO_SUBSCRIPTION.renewal, i18n.language) },
    { label: t("area.billing.method"), value: t(DEMO_SUBSCRIPTION.method) },
  ];

  return (
    <div className="flex flex-col gap-8">
      <h1 className="jr-area-title">{t("area.billing.title")}</h1>

      <section className="flex flex-col gap-4">
        <h2 className="jr-area-subtitle">{t("area.billing.subscription")}</h2>
        <AreaCard>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {subscription.map((row) => (
              <div key={row.label} className="flex min-w-0 flex-col gap-1">
                <dt className="jr-label text-muted-foreground">{row.label}</dt>
                <dd className="text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </AreaCard>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="jr-area-subtitle">{t("area.billing.invoices")}</h2>
        {DEMO_INVOICES.length === 0 ? (
          <AreaEmpty text={t("area.billing.empty")} />
        ) : (
          <ul className="flex flex-col gap-3">
            {DEMO_INVOICES.map((invoice) => (
              <AreaCard
                as="li"
                key={invoice.id}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="jr-area-figure">
                    {t(`area.billing.concepts.${invoice.conceptKey}`)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(invoice.date, i18n.language)} · {invoice.amount}
                  </span>
                </span>
                <span className="flex flex-wrap items-center gap-3">
                  <StatusPill
                    tone={invoice.paid ? "good" : "warn"}
                    label={invoice.paid ? t("area.billing.paid") : t("area.billing.pending")}
                  />
                  <button type="button" className="jr-button jr-button-quiet">
                    {t("area.download")}
                  </button>
                </span>
              </AreaCard>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
