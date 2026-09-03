import { Link } from "@tanstack/react-router";

import { AdminHead, Kpi, Section, TableWrap } from "@/components/admin/AdminUI";
import { StatusPill } from "@/components/area/StatusPill";
import {
  ADMIN_INVOICES,
  ADMIN_PROPERTIES,
  ADMIN_REQUESTS,
  ADMIN_VISITS,
  LEAD_SOURCE_LABEL,
  LEAD_STATUS_LABEL,
  invoiceTotals,
  money,
  shortDate,
} from "@/mocks/admin";

export function DashboardScreen() {
  const open = ADMIN_REQUESTS.filter((r) => !["won", "lost"].includes(r.status));
  const pipeline = open.reduce((sum, r) => sum + r.estimatedValue, 0);
  const planned = ADMIN_VISITS.filter((v) => v.status === "planned");
  const issues = ADMIN_VISITS.flatMap((v) => v.issues).filter((i) => i.status !== "resolved");
  const billedMonth = ADMIN_INVOICES.filter(
    (i) => i.status !== "draft" && i.date.startsWith("2026-09"),
  ).reduce((sum, i) => sum + invoiceTotals(i).total, 0);
  const overdue = ADMIN_INVOICES.filter((i) => i.status === "overdue");

  return (
    <>
      <AdminHead
        title="Panell"
        intro="Tot el que passa avui a JR: què entra per la web, què s'ha de visitar i què està pendent de cobrar."
      />

      <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi
          label="Sol·licituds obertes"
          value={String(open.length)}
          hint={`${money(pipeline)} de valor estimat`}
        />
        <Kpi
          label="Visites programades"
          value={String(planned.length)}
          hint={planned[0] ? `La propera, ${shortDate(planned[0].date)}` : "Cap de programada"}
        />
        <Kpi
          label="Incidències obertes"
          value={String(issues.length)}
          hint={`${ADMIN_PROPERTIES.length} propietats sota contracte`}
        />
        <Kpi
          label="Facturat aquest mes"
          value={money(billedMonth)}
          hint={overdue.length ? `${overdue.length} factura vençuda` : "Res vençut"}
        />
      </div>

      <div className="flex flex-col gap-10">
        <Section
          title="Entrades recents des de la web"
          aside={
            <Link to="/admin/solicituds" className="jr-area-inline-link">
              Veure la safata
            </Link>
          }
        >
          <TableWrap>
            <thead>
              <tr>
                <th>Ref.</th>
                <th>Contacte</th>
                <th>Parròquia</th>
                <th>Origen</th>
                <th>Estat</th>
                <th className="jr-admin-num">Estimat</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_REQUESTS.slice(0, 4).map((r) => (
                <tr key={r.id}>
                  <td className="jr-admin-mono">{r.ref}</td>
                  <td>{r.name}</td>
                  <td>{r.parish}</td>
                  <td>{LEAD_SOURCE_LABEL[r.source]}</td>
                  <td>
                    <StatusPill
                      tone={r.status === "new" ? "warn" : r.status === "won" ? "good" : "neutral"}
                      label={LEAD_STATUS_LABEL[r.status]}
                    />
                  </td>
                  <td className="jr-admin-num">{money(r.estimatedValue)}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Section>

        <Section
          title="Agenda de visites"
          aside={
            <Link to="/admin/visites" className="jr-area-inline-link">
              Totes les visites
            </Link>
          }
        >
          <ul className="jr-area-timeline">
            {ADMIN_VISITS.map((v) => (
              <li key={v.id} className="jr-area-timeline-item">
                <span className="jr-label">
                  {shortDate(v.date)} · {v.time}
                </span>
                <span className="text-sm text-foreground">
                  {v.propertyName} — {v.technician}
                  {v.status === "done" ? " · informe tancat" : ""}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </>
  );
}
