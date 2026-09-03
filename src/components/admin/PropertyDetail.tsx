import { Link } from "@tanstack/react-router";

import { AdminHead, Row, Section, TableWrap } from "@/components/admin/AdminUI";
import { StatusPill } from "@/components/area/StatusPill";
import {
  ADMIN_INVOICES,
  ADMIN_PROPERTIES,
  ADMIN_VISITS,
  invoiceTotals,
  money,
  shortDate,
} from "@/mocks/admin";

export function PropertyDetail({ id }: { id: string }) {
  const property = ADMIN_PROPERTIES.find((p) => p.id === id);

  if (!property) {
    return (
      <>
        <AdminHead title="Propietat no trobada" />
        <Link to="/admin/propietats" className="jr-area-inline-link">
          Tornar a propietats
        </Link>
      </>
    );
  }

  const visits = ADMIN_VISITS.filter((v) => v.propertyId === property.id);
  const invoices = ADMIN_INVOICES.filter((i) => i.propertyName === property.name);
  const issues = visits.flatMap((v) => v.issues).filter((i) => i.status !== "resolved");

  return (
    <>
      <AdminHead
        title={property.name}
        intro={`${property.type} · ${property.area} · ${property.address}`}
        action={
          <Link to="/admin/propietats" className="jr-area-inline-link">
            Totes les propietats
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="jr-area-card flex flex-col">
          <span className="jr-label mb-3">Expedient</span>
          <Row label="Referència" value={property.ref} />
          <Row label="Propietari" value={property.owner} />
          <Row label="Nivell de servei" value={property.level} />
          <Row label="Client des de" value={shortDate(property.since)} />
          <Row label="Habitacions" value={String(property.bedrooms)} />
          <Row label="Quota mensual" value={money(property.monthlyFee)} />
        </section>

        <section className="jr-area-card flex flex-col">
          <span className="jr-label mb-3">Accessos i seguretat</span>
          <Row label="Accés" value={property.accessNote} />
          <Row label="Alarma" value={property.alarm} />
          <Row label="Claus" value={property.keyholder} />
          <p className="mt-4 text-xs text-muted-foreground">
            Aquesta informació és la més sensible de tot el sistema. Amb Supabase quedarà restringida
            per rol: el gestor extern no la veu mai.
          </p>
        </section>
      </div>

      <div className="mt-10 flex flex-col gap-10">
        <Section title="Contactes autoritzats">
          <TableWrap>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Rol</th>
                <th>Telèfon</th>
              </tr>
            </thead>
            <tbody>
              {property.contacts.map((c) => (
                <tr key={c.name}>
                  <td>{c.name}</td>
                  <td>{c.role}</td>
                  <td className="jr-admin-mono">{c.phone}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Section>

        <Section title="Incidències obertes">
          {issues.length === 0 ? (
            <p className="jr-area-empty jr-measure">Cap incidència oberta en aquesta propietat.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {issues.map((i) => (
                <li
                  key={i.id}
                  className="jr-area-card flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm text-foreground">{i.text}</span>
                  <StatusPill
                    tone={i.status === "open" ? "warn" : "neutral"}
                    label={i.status === "open" ? "Oberta" : "En curs"}
                  />
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Historial de visites">
          <ul className="jr-area-timeline">
            {visits.map((v) => (
              <li key={v.id} className="jr-area-timeline-item">
                <span className="jr-label">
                  {shortDate(v.date)} · {v.time}
                </span>
                <span className="text-sm text-foreground">
                  {v.technician} —{" "}
                  {v.status === "done" ? "informe tancat" : "visita programada"}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Facturació">
          {invoices.length === 0 ? (
            <p className="jr-area-empty jr-measure">Encara no hi ha factures d'aquesta propietat.</p>
          ) : (
            <TableWrap>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Data</th>
                  <th>Estat</th>
                  <th className="jr-admin-num">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((i) => (
                  <tr key={i.id}>
                    <td className="jr-admin-mono">{i.number}</td>
                    <td>{shortDate(i.date)}</td>
                    <td>{i.status === "paid" ? "Cobrada" : i.status === "overdue" ? "Vençuda" : "Emesa"}</td>
                    <td className="jr-admin-num">{money(invoiceTotals(i).total)}</td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          )}
        </Section>
      </div>
    </>
  );
}
