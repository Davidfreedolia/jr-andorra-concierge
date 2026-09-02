import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { AreaCard } from "@/components/area/AreaCard";
import { AreaEmpty } from "@/components/area/AreaEmpty";
import { StatusPill } from "@/components/area/StatusPill";
import { formatDate } from "@/lib/area-format";
import { DEMO_REPORTS } from "@/mocks/area";

export function ReportsList() {
  const { t, i18n } = useTranslation();
  const [year, setYear] = useState("all");

  const years = useMemo(
    () => Array.from(new Set(DEMO_REPORTS.map((report) => report.date.slice(0, 4)))).sort().reverse(),
    [],
  );

  const reports = useMemo(
    () =>
      [...DEMO_REPORTS]
        .filter((report) => year === "all" || report.date.startsWith(year))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [year],
  );

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="jr-area-title">{t("area.reports.title")}</h1>
        <p className="text-muted-foreground">{t("area.reports.intro")}</p>
      </header>

      <label className="flex flex-col gap-1 sm:max-w-[220px]">
        <span className="jr-label text-muted-foreground">{t("area.reports.year")}</span>
        <select
          className="min-h-[var(--jr-tap)] w-full border bg-transparent px-3 py-2 text-foreground"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        >
          <option value="all">{t("area.reports.allYears")}</option>
          {years.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      {DEMO_REPORTS.length === 0 ? (
        <AreaEmpty text={t("area.reports.empty")} />
      ) : reports.length === 0 ? (
        <AreaEmpty text={t("area.reports.emptyYear")} />
      ) : (
        <ul className="flex flex-col gap-3">
          {reports.map((report) => (
            <AreaCard as="li" key={report.id}>
              <Link
                to="/area/informes/$id"
                params={{ id: report.id }}
                aria-label={`${t("area.reports.open")} — ${formatDate(report.date, i18n.language)}`}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="jr-area-figure">{formatDate(report.date, i18n.language)}</span>
                  <span className="text-sm text-muted-foreground">
                    {t("area.reports.technician")}: {report.technician}
                  </span>
                </span>
                <span className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    {report.photos.length} {t("area.reports.photos").toLowerCase()}
                  </span>
                  <StatusPill
                    tone={report.status === "ok" ? "good" : "warn"}
                    label={report.status === "ok" ? t("area.reports.ok") : t("area.reports.issue")}
                  />
                </span>
              </Link>
            </AreaCard>
          ))}
        </ul>
      )}
    </div>
  );
}
