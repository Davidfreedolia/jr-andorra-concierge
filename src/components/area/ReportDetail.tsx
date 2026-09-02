import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { AreaCard } from "@/components/area/AreaCard";
import { AreaEmpty } from "@/components/area/AreaEmpty";
import { PhotoViewer } from "@/components/area/PhotoViewer";
import { StatusPill } from "@/components/area/StatusPill";
import { formatDate } from "@/lib/area-format";
import { DEMO_PROPERTY, DEMO_REPORTS } from "@/mocks/area";

export function ReportDetail({ id }: { id: string }) {
  const { t, i18n } = useTranslation();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const report = DEMO_REPORTS.find((item) => item.id === id);
  const lang = i18n.language;

  if (!report) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="jr-area-title">{t("area.report.title")}</h1>
        <AreaEmpty text={t("area.report.notFound")} />
        <Link to="/area/informes" className="jr-button self-start">
          {t("area.report.back")}
        </Link>
      </div>
    );
  }

  const header = [
    { label: t("area.report.property"), value: DEMO_PROPERTY.name },
    { label: t("area.report.address"), value: DEMO_PROPERTY.address },
    { label: t("area.report.visit"), value: `${formatDate(report.date, lang)} — ${report.time}` },
    { label: t("area.report.by"), value: report.technician },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Link to="/area/informes" className="jr-area-inline-link self-start">
        {t("area.report.back")}
      </Link>

      <header className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="jr-area-title">{t("area.report.title")}</h1>
          <StatusPill
            tone={report.status === "ok" ? "good" : "warn"}
            label={report.status === "ok" ? t("area.reports.ok") : t("area.reports.issue")}
          />
        </div>

        <AreaCard>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {header.map((row) => (
              <div key={row.label} className="flex min-w-0 flex-col gap-1">
                <dt className="jr-label text-muted-foreground">{row.label}</dt>
                <dd className="text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </AreaCard>

        <button
          type="button"
          className="jr-button self-start"
          onClick={() => window.print()}
        >
          {t("area.report.download")}
        </button>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="jr-area-subtitle">{t("area.report.checklist")}</h2>
        <AreaCard>
          <ul className="jr-area-checklist">
            {report.checklist.map((point) => (
              <li key={point.pointKey} className="jr-area-checkrow">
                <span className="min-w-0">{t(`area.report.points.${point.pointKey}`)}</span>
                <StatusPill
                  tone={point.state === "ok" ? "good" : point.state === "attention" ? "warn" : "neutral"}
                  label={t(`area.report.states.${point.state}`)}
                />
              </li>
            ))}
          </ul>
        </AreaCard>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="jr-area-subtitle">{t("area.report.photosTitle")}</h2>
        {report.photos.length === 0 ? (
          <AreaEmpty text={t("area.report.photosEmpty")} />
        ) : (
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {report.photos.map((photo, index) => (
              <li key={photo.id}>
                <button
                  type="button"
                  className="jr-area-photo"
                  onClick={() => setViewerIndex(index)}
                >
                  <img
                    src={photo.url}
                    alt={`${t(`area.zones.${photo.zoneKey}`)} — ${formatDate(photo.date, lang)}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="jr-area-photo-caption">
                    <span className="jr-label">{t(`area.zones.${photo.zoneKey}`)}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(photo.date, lang)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="jr-area-subtitle">{t("area.report.issuesTitle")}</h2>
        {report.issues.length === 0 ? (
          <AreaEmpty text={t("area.report.issuesEmpty")} />
        ) : (
          <ul className="flex flex-col gap-3">
            {report.issues.map((issue) => (
              <AreaCard as="li" key={issue.id} className="flex flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="jr-measure text-foreground">
                    {t(`area.report.issueTexts.${issue.textKey}`)}
                  </p>
                  <StatusPill
                    tone={issue.status === "resolved" ? "good" : "warn"}
                    label={t(`area.report.issueStatus.${issue.status}`)}
                  />
                </div>
                <div className="flex flex-col gap-1 border-t pt-3">
                  <span className="jr-label text-muted-foreground">{t("area.report.followUp")}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(issue.followUpDate, lang)} — {t(`area.report.followUps.${issue.followUpKey}`)}
                  </span>
                </div>
              </AreaCard>
            ))}
          </ul>
        )}
      </section>

      {viewerIndex !== null ? (
        <PhotoViewer
          photos={report.photos}
          index={viewerIndex}
          onClose={() => setViewerIndex(null)}
          onIndexChange={setViewerIndex}
        />
      ) : null}
    </div>
  );
}
