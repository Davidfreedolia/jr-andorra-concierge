import { useState } from "react";

import { AdminHead, Kpi, Section, TableWrap } from "@/components/admin/AdminUI";
import { StatusPill } from "@/components/area/StatusPill";
import {
  ADMIN_EXPENSES,
  ADMIN_INVOICES,
  expenseTotals,
  invoiceTotals,
  money,
  shortDate,
  type ExpenseCategory,
} from "@/mocks/admin";

const CATEGORIES: ExpenseCategory[] = [
  "Manteniment",
  "Mobilitat",
  "Exterior",
  "Estructura",
  "Subcontractes",
];

export function ExpensesScreen() {
  const [filter, setFilter] = useState<"all" | ExpenseCategory>("all");
  const list = filter === "all" ? ADMIN_EXPENSES : ADMIN_EXPENSES.filter((e) => e.category === filter);

  const totals = expenseTotals(ADMIN_EXPENSES);
  const pending = ADMIN_EXPENSES.filter((e) => e.status === "pending");
  const rebillable = ADMIN_EXPENSES.filter((e) => e.rebillable && e.status === "pending");
  const noReceipt = ADMIN_EXPENSES.filter((e) => !e.receipt);
  const igiOut = ADMIN_INVOICES.filter((i) => i.status !== "draft").reduce(
    (s, i) => s + invoiceTotals(i).igi,
    0,
  );

  return (
    <>
      <AdminHead
        title="Despeses"
        intro="Cada euro que surt, amb el seu justificant, el seu IGI suportat i la casa a qui pertoca."
        action={
          <button type="button" className="jr-button">
            Registrar despesa
          </button>
        }
      />

      <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Despesa del període" value={money(totals.base)} hint={`${ADMIN_EXPENSES.length} apunts`} />
        <Kpi label="IGI suportat" value={money(totals.igi)} hint="Deduïble en la liquidació" />
        <Kpi
          label="Pendents de comptabilitzar"
          value={String(pending.length)}
          hint={pending.length ? money(expenseTotals(pending).base) : "Cap"}
        />
        <Kpi
          label="Per repercutir al client"
          value={String(rebillable.length)}
          hint={rebillable.length ? money(expenseTotals(rebillable).base) : "Cap"}
        />
      </div>

      <div className="jr-admin-filters mb-6">
        <button
          type="button"
          onClick={() => setFilter("all")}
          data-active={filter === "all" ? "true" : undefined}
          className="jr-admin-filter"
        >
          Totes
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            data-active={filter === c ? "true" : undefined}
            className="jr-admin-filter"
          >
            {c}
          </button>
        ))}
      </div>

      <TableWrap>
        <thead>
          <tr>
            <th>Data</th>
            <th>Proveïdor</th>
            <th>Document</th>
            <th>Concepte</th>
            <th>Categoria</th>
            <th>Estat</th>
            <th className="jr-admin-num">Base</th>
            <th className="jr-admin-num">IGI</th>
            <th className="jr-admin-num">Total</th>
          </tr>
        </thead>
        <tbody>
          {list.map((e) => (
            <tr key={e.id}>
              <td>{shortDate(e.date)}</td>
              <td>
                {e.supplier}
                <span className="block text-xs text-muted-foreground">{e.supplierNrt}</span>
              </td>
              <td className="jr-admin-mono">
                {e.docRef}
                {e.receipt ? null : (
                  <span className="block text-xs text-[color:var(--jr-gold)]">Sense justificant</span>
                )}
              </td>
              <td>
                {e.concept}
                <span className="block text-xs text-muted-foreground">
                  {e.propertyName !== "—" ? e.propertyName : "Estructura"}
                  {e.rebillable ? " · es repercuteix" : ""}
                </span>
              </td>
              <td>{e.category}</td>
              <td>
                <StatusPill
                  tone={e.status === "accounted" ? "good" : "warn"}
                  label={e.status === "accounted" ? "Comptabilitzada" : "Pendent"}
                />
              </td>
              <td className="jr-admin-num">{money(e.amount)}</td>
              <td className="jr-admin-num">{money((e.amount * e.igi) / 100)}</td>
              <td className="jr-admin-num">{money(e.amount * (1 + e.igi / 100))}</td>
            </tr>
          ))}
        </tbody>
      </TableWrap>

      <div className="mt-10">
        <Section
          title="Per a la gestoria"
          aside={
            <button type="button" className="jr-button jr-button-quiet">
              Exportar el període
            </button>
          }
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="jr-area-card flex flex-col gap-1">
              <span className="jr-label">IGI repercutit</span>
              <span className="jr-admin-kpi">{money(igiOut)}</span>
              <span className="text-xs text-muted-foreground">Ve de les factures emeses</span>
            </div>
            <div className="jr-area-card flex flex-col gap-1">
              <span className="jr-label">IGI suportat</span>
              <span className="jr-admin-kpi">{money(totals.igi)}</span>
              <span className="text-xs text-muted-foreground">Ve d'aquesta pantalla</span>
            </div>
            <div className="jr-area-card flex flex-col gap-1">
              <span className="jr-label">Sense justificant</span>
              <span className="jr-admin-kpi">{noReceipt.length}</span>
              <span className="text-xs text-muted-foreground">Bloquegen el tancament del període</span>
            </div>
          </div>
          <p className="jr-measure text-sm text-muted-foreground">
            El gestor extern entra amb el seu propi accés i només veu factures i despeses. No arriba
            als accessos de les cases ni a la base de contactes.
          </p>
        </Section>
      </div>
    </>
  );
}
