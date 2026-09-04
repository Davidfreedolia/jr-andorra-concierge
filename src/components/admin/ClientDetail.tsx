import { Link } from "@tanstack/react-router";

import { AdminHead, Row, Section, TableWrap } from "@/components/admin/AdminUI";
import { AlertItem } from "@/components/admin/AlertItem";
import { ClientNotes } from "@/components/admin/ClientNotes";
import { ClientTeam } from "@/components/admin/ClientTeam";
import { StatusPill } from "@/components/area/StatusPill";
import {
  ADMIN_CLIENTS,
  ADMIN_INVOICES,
  ADMIN_PROPERTIES,
  ADMIN_REQUESTS,
  CLIENT_STATUS_LABEL,
  invoiceTotals,
  money,
  shortDate,
} from "@/mocks/admin";
import { alertsForClient } from "@/mocks/staff";

const INVOICE_LABEL = {
  draft: "Esborrany",
  issued: "Emesa",
  paid: "Cobrada",
  overdue: "Vençuda",
} as const;

export function ClientDetail({ id }: { id: string }) {
  const client = ADMIN_CLIENTS.find((c) => c.id === id);

  if (!client) {
    return (
      <>
        <AdminHead title="Client no trobat" />
        <Link to="/admin/clients" className="jr-area-inline-link">
          Tornar a clients
        </Link>
      </>
    );
  }

  const properties = ADMIN_PROPERTIES.filter((p) => p.owner === client.name);
  const invoices = ADMIN_INVOICES.filter((i) => i.client === client.name);
  const requests = ADMIN_REQUESTS.filter((r) => r.name === client.name);
  const alerts = alertsForClient(client.id);
  const outstanding = invoices
    .filter((i) => i.status === "issued" || i.status === "overdue")
    .reduce((s, i) => s + invoiceTotals(i).total, 0);

  return (
    <>
      <AdminHead
        title={client.name}
        {...(client.legalName !== "—" ? { intro: client.legalName } : {})}
        action={
          <Link to="/admin/clients" className="jr-area-inline-link">
            Tots els clients
          </Link>
        }
      />

      <div className="mb-8">
        <StatusPill
          tone={client.status === "active" ? "good" : client.status === "paused" ? "warn" : "neutral"}
          label={CLIENT_STATUS_LABEL[client.status]}
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="jr-area-card flex flex-col">
          <span className="jr-label mb-3">Dades fiscals</span>
          <Row label="Raó social" value={client.legalName} />
          <Row label="NRT" value={client.nrt} />
          <Row label="Adreça de facturació" value={client.billingAddress} />
          <Row label="País" value={client.country} />
          <Row label="Condicions de pagament" value={client.paymentTerms} />
          <Row label="Mandat" value={client.mandate} />
        </section>

        <section className="jr-area-card flex flex-col">
          <span className="jr-label mb-3">Contacte</span>
          <Row label="Persona" value={client.contactName} />
          <Row label="Correu" value={client.email} />
          <Row label="Telèfon" value={client.phone} />
          <Row label="Idioma" value={client.language.toUpperCase()} />
          <Row label="Client des de" value={shortDate(client.since)} />
          <Row label="Pendent de cobrar" value={outstanding ? money(outstanding) : "Res"} />
        </section>
      </div>

      <div className="mt-10 flex flex-col gap-10">
        <ClientTeam clientId={client.id} />

        <Section title="Avisos oberts">
          {alerts.length === 0 ? (
            <p className="jr-area-empty jr-measure">Res pendent d'aquest client.</p>
          ) : (
            <div className="flex flex-col">
              {alerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} showClient={false} />
              ))}
            </div>
          )}
        </Section>

        <ClientNotes clientId={client.id} />

        <Section title="Propietats">
          {properties.length === 0 ? (
            <p className="jr-area-empty jr-measure">Encara no té cap propietat donada d'alta.</p>
          ) : (
            <TableWrap>
              <thead>
                <tr>
                  <th>Propietat</th>
                  <th>Parròquia</th>
                  <th>Nivell</th>
                  <th className="jr-admin-num">Quota</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link to="/admin/propietats/$id" params={{ id: p.id }} className="jr-admin-link">
                        {p.name}
                      </Link>
                    </td>
                    <td>{p.parish}</td>
                    <td>{p.level}</td>
                    <td className="jr-admin-num">{money(p.monthlyFee)}</td>
                  </tr>
                ))}
              </tbody>
            </TableWrap>
          )}
        </Section>

        <Section title="Factures">
          {invoices.length === 0 ? (
            <p className="jr-area-empty jr-measure">Encara no se li ha emès cap factura.</p>
          ) : (
            <TableWrap>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Data</th>
                  <th>Venciment</th>
                  <th>Estat</th>
                  <th className="jr-admin-num">Base</th>
                  <th className="jr-admin-num">IGI</th>
                  <th className="jr-admin-num">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((i) => {
                  const t = invoiceTotals(i);
                  return (
                    <tr key={i.id}>
                      <td className="jr-admin-mono">{i.number}</td>
                      <td>{shortDate(i.date)}</td>
                      <td>{shortDate(i.dueDate)}</td>
                      <td>{INVOICE_LABEL[i.status]}</td>
                      <td className="jr-admin-num">{money(t.base)}</td>
                      <td className="jr-admin-num">{money(t.igi)}</td>
                      <td className="jr-admin-num">{money(t.total)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </TableWrap>
          )}
        </Section>

        <Section title="Historial comercial">
          {requests.length === 0 ? (
            <p className="jr-area-empty jr-measure">Sense sol·licituds registrades.</p>
          ) : (
            <ul className="jr-area-timeline">
              {requests.map((r) => (
                <li key={r.id} className="jr-area-timeline-item">
                  <span className="jr-label">{shortDate(r.createdAt)}</span>
                  <span className="text-sm text-foreground">
                    {r.ref} — {r.propertyType} a {r.parish} · {money(r.estimatedValue)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section title="Nota interna">
          <p className="jr-measure text-sm text-muted-foreground">{client.notes}</p>
        </Section>
      </div>
    </>
  );
}
