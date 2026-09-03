import { useState } from "react";

import { AdminHead, Section } from "@/components/admin/AdminUI";
import { StatusPill } from "@/components/area/StatusPill";
import { ADMIN_VISITS, shortDate, type CheckState } from "@/mocks/admin";

const STATES: { key: CheckState; label: string }[] = [
  { key: "ok", label: "Correcte" },
  { key: "attention", label: "Atenció" },
  { key: "na", label: "N/A" },
];

function stateTone(state: CheckState) {
  if (state === "attention") return "warn" as const;
  if (state === "na") return "neutral" as const;
  return "good" as const;
}

export function VisitsScreen() {
  const [visitId, setVisitId] = useState(ADMIN_VISITS[0]?.id ?? "");
  const [states, setStates] = useState<Record<string, CheckState>>({});
  const [report, setReport] = useState(false);

  const visit = ADMIN_VISITS.find((v) => v.id === visitId);
  if (!visit) return null;

  const stateOf = (checkId: string): CheckState =>
    states[`${visit.id}:${checkId}`] ?? visit.checks.find((c) => c.id === checkId)?.state ?? "ok";

  const attention = visit.checks.filter((c) => stateOf(c.id) === "attention");

  return (
    <>
      <AdminHead
        title="Visites i Home Report"
        intro="La pantalla que el tècnic fa servir a casa del client: vuit punts, tres estats i l'informe surt sol."
      />

      <div className="jr-admin-filters mb-8">
        {ADMIN_VISITS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => {
              setVisitId(v.id);
              setReport(false);
            }}
            data-active={visitId === v.id ? "true" : undefined}
            className="jr-admin-filter"
          >
            {shortDate(v.date)} · {v.propertyName}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
        <section className="flex flex-col gap-5">
          <div className="jr-area-card flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="jr-label">{visit.ref}</span>
              <span className="jr-area-figure">{visit.propertyName}</span>
              <span className="text-sm text-muted-foreground">
                {shortDate(visit.date)} · {visit.time} · {visit.technician}
              </span>
            </div>
            <StatusPill
              tone={visit.status === "done" ? "good" : "neutral"}
              label={visit.status === "done" ? "Informe tancat" : "Programada"}
            />
          </div>

          <Section title="Checklist">
            <ul className="jr-area-checklist">
              {visit.checks.map((c) => {
                const current = stateOf(c.id);
                return (
                  <li key={c.id} className="jr-admin-check">
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="text-sm text-foreground">{c.label}</span>
                      {c.note && current === "attention" ? (
                        <span className="text-xs text-muted-foreground">{c.note}</span>
                      ) : null}
                    </div>
                    <div className="jr-admin-seg">
                      {STATES.map((s) => (
                        <button
                          key={s.key}
                          type="button"
                          data-active={current === s.key ? "true" : undefined}
                          onClick={() =>
                            setStates((prev) => ({ ...prev, [`${visit.id}:${c.id}`]: s.key }))
                          }
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Section>

          <div className="flex flex-wrap gap-2">
            <button type="button" className="jr-button" onClick={() => setReport(true)}>
              Generar Home Report
            </button>
            <button type="button" className="jr-button jr-button-quiet">
              Afegir fotografia
            </button>
          </div>
        </section>

        <aside className="jr-area-card flex flex-col gap-4">
          <span className="jr-label">Home Report</span>
          {report ? (
            <>
              <p className="jr-area-figure">{visit.propertyName}</p>
              <p className="text-sm text-muted-foreground">
                Visita del {shortDate(visit.date)} a les {visit.time}, per {visit.technician}.
              </p>
              <p className="text-sm text-foreground">
                {attention.length === 0
                  ? "Tots els punts revisats són correctes. Cap acció pendent."
                  : `${attention.length} punt${attention.length > 1 ? "s" : ""} requereix${attention.length > 1 ? "en" : ""} atenció:`}
              </p>
              {attention.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {attention.map((c) => (
                    <li key={c.id} className="flex flex-col gap-1">
                      <span className="text-sm text-foreground">· {c.label}</span>
                      {c.note ? (
                        <span className="pl-3 text-xs text-muted-foreground">{c.note}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-2 flex flex-wrap gap-2">
                <button type="button" className="jr-button">
                  Enviar al client
                </button>
                <button type="button" className="jr-button jr-button-quiet">
                  Descarregar PDF
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Provisional: l'informe encara no s'envia ni es desa. És el mateix informe que el
                client veu a la seva àrea privada.
              </p>
            </>
          ) : (
            <p className="jr-area-empty">
              Marca el checklist i prem «Generar Home Report». L'informe es munta amb el que has
              marcat, sense tornar a escriure res.
            </p>
          )}

          <div className="mt-2 flex flex-col gap-2">
            <span className="jr-label">Incidències d'aquesta visita</span>
            {visit.issues.length === 0 ? (
              <span className="text-sm text-muted-foreground">Cap.</span>
            ) : (
              visit.issues.map((i) => (
                <span key={i.id} className="text-sm text-foreground">
                  · {i.text}
                </span>
              ))
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
