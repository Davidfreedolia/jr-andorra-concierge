import { Link } from "@tanstack/react-router";

import { AdminHead, Kpi, TableWrap } from "@/components/admin/AdminUI";
import { StatusPill } from "@/components/area/StatusPill";
import {
  ADMIN_CLIENTS,
  ADMIN_INVOICES,
  ADMIN_PROPERTIES,
  CLIENT_STATUS_LABEL,
  invoiceTotals,
  money,
  type Client,
} from "@/mocks/admin";

function tone(status: Client["status"]) {
  if (status === "active") return "good" as const;
  if (status === "paused") return "warn" as const;
  return "neutral" as const;
}

function billed(client: Client) {
  return ADMIN_INVOICES.filter((i) => i.client === client.name && i.status !== "draft").reduce(
    (s, i) => s + invoiceTotals(i).total,
    0,
  );
}

export function ClientsScreen() {
  const active = ADMIN_CLIENTS.filter((c) => c.status === "active");
  const overdue = ADMIN_INVOICES.filter((i) => i.status === "overdue");
  const total = ADMIN_CLIENTS.reduce((s, c) => s + billed(c), 0);

  return (
    <>
      <AdminHead
        title="Clients"
        intro="La fitxa fiscal, separada de la propietat: una persona pot tenir dues cases i una casa pot canviar de mans."
        action={
          <button type="button" className="jr-button jr-button-quiet">
            Nou client
          </button>
        }
      />

      <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Clients actius" value={String(active.length)} hint={`${ADMIN_CLIENTS.length} fitxes obertes`} />
        <Kpi label="Propietats" value={String(ADMIN_PROPERTIES.length)} hint="Sota contracte" />
        <Kpi label="Facturat" value={money(total)} hint="Factures emeses" />
        <Kpi
          label="Impagats"
          value={String(overdue.length)}
          hint={overdue.length ? money(overdue.reduce((s, i) => s + invoiceTotals(i).total, 0)) : "Res vençut"}
        />
      </div>

      <TableWrap>
        <thead>
          <tr>
            <th>Client</th>
            <th>NRT</th>
            <th>Facturació a</th>
            <th>Idioma</th>
            <th>Estat</th>
            <th>Propietats</th>
            <th className="jr-admin-num">Facturat</th>
          </tr>
        </thead>
        <tbody>
          {ADMIN_CLIENTS.map((c) => {
            const properties = ADMIN_PROPERTIES.filter((p) => p.owner === c.name);
            return (
              <tr key={c.id}>
                <td>
                  <Link to="/admin/clients/$id" params={{ id: c.id }} className="jr-admin-link">
                    {c.name}
                  </Link>
                  <span className="block text-xs text-muted-foreground">{c.legalName}</span>
                </td>
                <td className="jr-admin-mono">{c.nrt}</td>
                <td>
                  {c.billingAddress}
                  <span className="block text-xs text-muted-foreground">{c.country}</span>
                </td>
                <td>{c.language.toUpperCase()}</td>
                <td>
                  <StatusPill tone={tone(c.status)} label={CLIENT_STATUS_LABEL[c.status]} />
                </td>
                <td>
                  {properties.length === 0
                    ? "—"
                    : properties.map((p) => p.name).join(", ")}
                </td>
                <td className="jr-admin-num">{billed(c) ? money(billed(c)) : "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </TableWrap>

      <p className="jr-measure mt-6 text-sm text-muted-foreground">
        El NRT i l'adreça de facturació viuen aquí, no a la propietat: són el que va imprès a la
        factura i el que la gestoria necessita. Un client sense NRT no pot passar d'esborrany.
      </p>
    </>
  );
}
