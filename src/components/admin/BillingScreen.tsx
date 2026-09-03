import { useState } from "react";

import { AdminHead, Kpi, Row, Section, TableWrap } from "@/components/admin/AdminUI";
import { StatusPill } from "@/components/area/StatusPill";
import {
  ADMIN_EXPENSES,
  ADMIN_INVOICES,
  IGI_RATES,
  invoiceTotals,
  money,
  shortDate,
  type Invoice,
} from "@/mocks/admin";

const STATUS: Record<Invoice["status"], { label: string; tone: "good" | "warn" | "neutral" }> = {
  draft: { label: "Esborrany", tone: "neutral" },
  issued: { label: "Emesa", tone: "neutral" },
  paid: { label: "Cobrada", tone: "good" },
  overdue: { label: "Vençuda", tone: "warn" },
};

export function BillingScreen() {
  const [openId, setOpenId] = useState(ADMIN_INVOICES[0]?.id ?? "");
  const selected = ADMIN_INVOICES.find((i) => i.id === openId);

  const issued = ADMIN_INVOICES.filter((i) => i.status !== "draft");
  const billed = issued.reduce((s, i) => s + invoiceTotals(i).total, 0);
  const igiDue = issued.reduce((s, i) => s + invoiceTotals(i).igi, 0);
  const pending = ADMIN_INVOICES.filter((i) => i.status === "issued" || i.status === "overdue").reduce(
    (s, i) => s + invoiceTotals(i).total,
    0,
  );
  const expenses = ADMIN_EXPENSES.reduce((s, e) => s + e.amount, 0);

  return (
    <>
      <AdminHead
        title="Facturació i despeses"
        intro="Facturació andorrana: IGI per línia, NRT a cada factura i una exportació neta per a la gestoria."
        action={
          <button type="button" className="jr-button jr-button-quiet">
            Exportar per a la gestoria
          </button>
        }
      />

      <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Facturat" value={money(billed)} hint="Factures emeses" />
        <Kpi label="IGI repercutit" value={money(igiDue)} hint="Pendent de liquidar" />
        <Kpi label="Pendent de cobrar" value={money(pending)} hint="Emeses i vençudes" />
        <Kpi label="Despeses" value={money(expenses)} hint={`${ADMIN_EXPENSES.length} apunts`} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
        <Section title="Factures">
          <TableWrap>
            <thead>
              <tr>
                <th>Número</th>
                <th>Client</th>
                <th>Data</th>
                <th>Estat</th>
                <th className="jr-admin-num">Base</th>
                <th className="jr-admin-num">Total</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_INVOICES.map((i) => {
                const t = invoiceTotals(i);
                return (
                  <tr
                    key={i.id}
                    onClick={() => setOpenId(i.id)}
                    data-active={openId === i.id ? "true" : undefined}
                    className="jr-admin-clickable"
                  >
                    <td className="jr-admin-mono">{i.number}</td>
                    <td>
                      {i.client}
                      <span className="block text-xs text-muted-foreground">{i.propertyName}</span>
                    </td>
                    <td>{shortDate(i.date)}</td>
                    <td>
                      <StatusPill tone={STATUS[i.status].tone} label={STATUS[i.status].label} />
                    </td>
                    <td className="jr-admin-num">{money(t.base)}</td>
                    <td className="jr-admin-num">{money(t.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </TableWrap>
        </Section>

        {selected ? (
          <aside className="jr-area-card flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="jr-label">Factura {selected.number}</span>
              <h2 className="jr-area-subtitle">{selected.client}</h2>
              <StatusPill tone={STATUS[selected.status].tone} label={STATUS[selected.status].label} />
            </div>

            <div className="flex flex-col">
              <Row label="NRT" value={selected.nrt} />
              <Row label="Propietat" value={selected.propertyName} />
              <Row label="Data" value={shortDate(selected.date)} />
              <Row label="Venciment" value={shortDate(selected.dueDate)} />
            </div>

            <div className="flex flex-col gap-2">
              <span className="jr-label">Línies</span>
              {selected.lines.map((l) => (
                <div key={l.concept} className="jr-admin-line">
                  <span className="text-sm text-foreground">{l.concept}</span>
                  <span className="text-xs text-muted-foreground">
                    {l.qty} × {money(l.price)} · IGI {l.igi.toString().replace(".", ",")}%
                  </span>
                  <span className="jr-admin-num text-sm text-foreground">
                    {money(l.qty * l.price)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col border-t border-[color-mix(in_srgb,var(--jr-gold)_18%,transparent)] pt-3">
              <Row label="Base imposable" value={money(invoiceTotals(selected).base)} />
              <Row label="IGI" value={money(invoiceTotals(selected).igi)} />
              <Row label="Total" value={<strong>{money(invoiceTotals(selected).total)}</strong>} />
            </div>

            <p className="text-xs text-muted-foreground">
              Tipus d'IGI disponibles: {IGI_RATES.map((r) => `${r.toString().replace(".", ",")}%`).join(" · ")}. La
              cura de la propietat i el transport de passatgers no van al mateix tipus, i res no queda
              fixat al codi: la gestoria valida cada línia.
            </p>
          </aside>
        ) : null}
      </div>

      <div className="mt-10">
        <Section
          title="Despeses"
          aside={<span className="text-xs text-muted-foreground">El gestor extern només veu aquesta secció i les factures</span>}
        >
          <TableWrap>
            <thead>
              <tr>
                <th>Data</th>
                <th>Proveïdor</th>
                <th>Concepte</th>
                <th>Categoria</th>
                <th>Propietat</th>
                <th>Estat</th>
                <th className="jr-admin-num">Import</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_EXPENSES.map((e) => (
                <tr key={e.id}>
                  <td>{shortDate(e.date)}</td>
                  <td>{e.supplier}</td>
                  <td>{e.concept}</td>
                  <td>{e.category}</td>
                  <td>{e.propertyName}</td>
                  <td>
                    <StatusPill
                      tone={e.status === "accounted" ? "good" : "warn"}
                      label={e.status === "accounted" ? "Comptabilitzada" : "Pendent"}
                    />
                  </td>
                  <td className="jr-admin-num">{money(e.amount)}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Section>
      </div>
    </>
  );
}
