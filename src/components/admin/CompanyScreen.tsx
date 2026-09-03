import { AdminHead, Row, Section, TableWrap } from "@/components/admin/AdminUI";
import { StatusPill } from "@/components/area/StatusPill";
import {
  ADMIN_EXPENSES,
  ADMIN_INVOICES,
  COMPANY,
  IGI_RATES,
  INVOICE_SERIES,
  SERVICE_TAXES,
  expenseTotals,
  invoiceTotals,
  money,
  fullDate,
} from "@/mocks/admin";

export function CompanyScreen() {
  const issued = ADMIN_INVOICES.filter((i) => i.status !== "draft");
  const igiOut = issued.reduce((s, i) => s + invoiceTotals(i).igi, 0);
  const igiIn = expenseTotals(ADMIN_EXPENSES).igi;

  return (
    <>
      <AdminHead
        title="L'empresa"
        intro="Les dades que surten impreses a cada factura, les sèries de numeració i els tipus d'IGI per línia de servei."
        action={
          <button type="button" className="jr-button jr-button-quiet">
            Editar dades
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="jr-area-card flex flex-col">
          <span className="jr-label mb-3">Dades fiscals</span>
          <Row label="Raó social" value={COMPANY.legalName} />
          <Row label="Nom comercial" value={COMPANY.tradeName} />
          <Row label="NRT" value={COMPANY.nrt} />
          <Row label="Adreça" value={COMPANY.address} />
          <Row label="País" value={COMPANY.country} />
          <Row label="Registre" value={COMPANY.registry} />
        </section>

        <section className="jr-area-card flex flex-col">
          <span className="jr-label mb-3">Administració</span>
          <Row label="Correu" value={COMPANY.email} />
          <Row label="Telèfon" value={COMPANY.phone} />
          <Row label="Compte bancari" value={COMPANY.bank} />
          <Row label="Activitat" value={COMPANY.activity} />
          <Row label="Exercici fiscal" value={COMPANY.fiscalYear} />
          <Row label="Liquidació d'IGI" value={COMPANY.igiPeriod} />
        </section>
      </div>

      <div className="mt-10 flex flex-col gap-10">
        <Section title="Liquidació d'IGI del període">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="jr-area-card flex flex-col gap-1">
              <span className="jr-label">Repercutit</span>
              <span className="jr-admin-kpi">{money(igiOut)}</span>
              <span className="text-xs text-muted-foreground">{issued.length} factures emeses</span>
            </div>
            <div className="jr-area-card flex flex-col gap-1">
              <span className="jr-label">Suportat</span>
              <span className="jr-admin-kpi">{money(igiIn)}</span>
              <span className="text-xs text-muted-foreground">{ADMIN_EXPENSES.length} despeses</span>
            </div>
            <div className="jr-area-card flex flex-col gap-1">
              <span className="jr-label">A ingressar</span>
              <span className="jr-admin-kpi">{money(Math.max(0, igiOut - igiIn))}</span>
              <span className="text-xs text-muted-foreground">Xifra provisional, la valida la gestoria</span>
            </div>
          </div>
        </Section>

        <Section title="Sèries de facturació">
          <TableWrap>
            <thead>
              <tr>
                <th>Codi</th>
                <th>Sèrie</th>
                <th>Última emesa</th>
                <th>Estat</th>
                <th className="jr-admin-num">Següent número</th>
              </tr>
            </thead>
            <tbody>
              {INVOICE_SERIES.map((s) => (
                <tr key={s.code}>
                  <td className="jr-admin-mono">{s.code}</td>
                  <td>{s.name}</td>
                  <td className="jr-admin-mono">{s.lastIssued}</td>
                  <td>
                    <StatusPill
                      tone={s.locked ? "neutral" : "good"}
                      label={s.locked ? "Tancada" : "Oberta"}
                    />
                  </td>
                  <td className="jr-admin-num">{s.locked ? "—" : s.next}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <p className="jr-measure text-sm text-muted-foreground">
            Numeració correlativa i sense forats. Un període tancat es bloqueja: les correccions van
            per rectificativa, mai reescrivint una factura ja emesa.
          </p>
        </Section>

        <Section title="Tipus d'IGI per línia de servei">
          <TableWrap>
            <thead>
              <tr>
                <th>Línia de servei</th>
                <th>Nota</th>
                <th>Vigent des de</th>
                <th className="jr-admin-num">Tipus</th>
              </tr>
            </thead>
            <tbody>
              {SERVICE_TAXES.map((t) => (
                <tr key={t.line}>
                  <td>{t.line}</td>
                  <td>{t.note}</td>
                  <td>{fullDate(t.validFrom)}</td>
                  <td className="jr-admin-num">{t.rate.toString().replace(".", ",")}%</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <p className="jr-measure text-sm text-muted-foreground">
            Tipus disponibles a Andorra: {IGI_RATES.map((r) => `${r.toString().replace(".", ",")}%`).join(" · ")}.
            Cap d'aquests valors està escrit al codi: viuen en aquesta taula, amb data de vigència, i
            qui els fixa és la gestoria del client. Si demà canvia un tipus, es canvia aquí i les
            factures noves ja surten bé.
          </p>
        </Section>
      </div>
    </>
  );
}
