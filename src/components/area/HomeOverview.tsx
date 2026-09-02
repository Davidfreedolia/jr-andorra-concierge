import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { AreaCard } from "@/components/area/AreaCard";
import { AreaEmpty } from "@/components/area/AreaEmpty";
import { useRole } from "@/components/area/RoleContext";
import { StatusPill } from "@/components/area/StatusPill";
import { formatDate } from "@/lib/area-format";
import {
  DEMO_PROPERTY,
  DEMO_REPORTS,
  DEMO_TIMELINE,
  DEMO_USERS,
} from "@/mocks/area";

export function HomeOverview() {
  const { t, i18n } = useTranslation();
  const { role } = useRole();
  const lang = i18n.language;

  const user = DEMO_USERS[role];
  const lastReport = DEMO_REPORTS[0];
  const hasOpenIssue = DEMO_REPORTS.some((report) =>
    report.issues.some((issue) => issue.status !== "resolved"),
  );

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="jr-area-title">{t("area.home.greeting", { name: user.name })}</h1>
        <p className="text-muted-foreground">{DEMO_PROPERTY.name}</p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AreaCard className="flex flex-col gap-2">
          <p className="jr-label">{t("area.home.nextVisit")}</p>
          <p className="jr-area-figure">{formatDate(DEMO_PROPERTY.nextVisit, lang)}</p>
        </AreaCard>

        <AreaCard className="flex flex-col gap-2">
          <p className="jr-label">{t("area.home.lastReport")}</p>
          <p className="jr-area-figure">{lastReport ? formatDate(lastReport.date, lang) : "—"}</p>
          {lastReport ? (
            <Link
              to="/area/informes/$id"
              params={{ id: lastReport.id }}
              className="jr-area-inline-link"
            >
              {t("area.home.lastReportLink")}
            </Link>
          ) : null}
        </AreaCard>

        <AreaCard className="flex flex-col gap-2">
          <p className="jr-label">{t("area.home.status")}</p>
          <p className="jr-area-figure">
            {hasOpenIssue ? t("area.home.statusIssue") : t("area.home.statusOk")}
          </p>
          <StatusPill
            tone={hasOpenIssue ? "warn" : "good"}
            label={hasOpenIssue ? t("area.reports.issue") : t("area.reports.ok")}
          />
        </AreaCard>

        <AreaCard className="flex flex-col gap-2">
          <p className="jr-label">{t("area.home.level")}</p>
          <p className="jr-area-figure">{DEMO_PROPERTY.level}</p>
        </AreaCard>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/area/llegada" className="jr-button flex-1">
          {t("area.home.quickArrival")}
        </Link>
        <Link to="/area/peticiones" className="jr-button jr-button-quiet flex-1">
          {t("area.home.quickRequest")}
        </Link>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="jr-area-subtitle">{t("area.home.timeline")}</h2>
        {DEMO_TIMELINE.length === 0 ? (
          <AreaEmpty text={t("area.home.timelineEmpty")} />
        ) : (
          <ol className="jr-area-timeline">
            {DEMO_TIMELINE.map((entry) => (
              <li key={entry.id} className="jr-area-timeline-item">
                <span className="jr-label">{formatDate(entry.date, lang)}</span>
                <span className="text-foreground">{t(`area.timeline.${entry.key}`)}</span>
                {entry.reportId ? (
                  <Link
                    to="/area/informes/$id"
                    params={{ id: entry.reportId }}
                    className="jr-area-inline-link"
                  >
                    {t("area.home.lastReportLink")}
                  </Link>
                ) : null}
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
