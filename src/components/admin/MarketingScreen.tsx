import { AdminHead, Kpi, Section, TableWrap } from "@/components/admin/AdminUI";
import { StatusPill } from "@/components/area/StatusPill";
import {
  ADMIN_CAMPAIGNS,
  ADMIN_REQUESTS,
  LEAD_SOURCE_LABEL,
  LEAD_STATUS_LABEL,
  money,
  shortDate,
  type LeadSource,
} from "@/mocks/admin";

const SEGMENTS = [
  { name: "Propietaris actius", count: 14, note: "Contracte viu. Comunicació de servei, no de venda." },
  { name: "Leads web sense contractar", count: 212, note: "Han demanat valoració i no han signat." },
  { name: "Prescriptors i agències", count: 31, note: "Immobiliàries, family offices, arquitectes." },
  { name: "Clients de mobilitat", count: 46, note: "Només trasllats. La porta d'entrada més barata." },
];

export function MarketingScreen() {
  const bySource = ADMIN_REQUESTS.reduce<Record<string, number>>((acc, r) => {
    acc[r.source] = (acc[r.source] ?? 0) + 1;
    return acc;
  }, {});
  const won = ADMIN_REQUESTS.filter((r) => r.status === "won");
  const conversion = Math.round((won.length / ADMIN_REQUESTS.length) * 100);
  const contacts = SEGMENTS.reduce((s, seg) => s + seg.count, 0);

  return (
    <>
      <AdminHead
        title="Màrqueting i base de contactes"
        intro="Una sola base de contactes, segmentada, i les campanyes que hi surten. Res de fulls de càlcul solts."
        action={
          <button type="button" className="jr-button">
            Nova campanya
          </button>
        }
      />

      <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Contactes" value={String(contacts)} hint={`${SEGMENTS.length} segments`} />
        <Kpi label="Sol·licituds" value={String(ADMIN_REQUESTS.length)} hint="Històric complet" />
        <Kpi label="Conversió" value={`${conversion}%`} hint={`${won.length} contractes signats`} />
        <Kpi
          label="Valor guanyat"
          value={money(won.reduce((s, r) => s + r.estimatedValue, 0))}
          hint="Any en curs"
        />
      </div>

      <div className="flex flex-col gap-10">
        <Section title="Segments">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {SEGMENTS.map((s) => (
              <div key={s.name} className="jr-area-card flex flex-col gap-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="jr-area-figure">{s.name}</span>
                  <span className="jr-admin-kpi text-base">{s.count}</span>
                </div>
                <span className="text-xs text-muted-foreground">{s.note}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Campanyes">
          <TableWrap>
            <thead>
              <tr>
                <th>Campanya</th>
                <th>Segment</th>
                <th>Data</th>
                <th>Estat</th>
                <th className="jr-admin-num">Enviats</th>
                <th className="jr-admin-num">Obertura</th>
                <th className="jr-admin-num">Clics</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_CAMPAIGNS.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.segment}</td>
                  <td>{shortDate(c.date)}</td>
                  <td>
                    <StatusPill
                      tone={c.status === "sent" ? "good" : "neutral"}
                      label={c.status === "sent" ? "Enviada" : c.status === "scheduled" ? "Programada" : "Esborrany"}
                    />
                  </td>
                  <td className="jr-admin-num">{c.sent || "—"}</td>
                  <td className="jr-admin-num">{c.sent ? `${c.openRate}%` : "—"}</td>
                  <td className="jr-admin-num">{c.sent ? `${c.clickRate}%` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Section>

        <Section title="D'on venen les sol·licituds">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {(Object.keys(bySource) as LeadSource[]).map((source) => (
              <div key={source} className="jr-area-card flex flex-col gap-1">
                <span className="jr-label">{LEAD_SOURCE_LABEL[source]}</span>
                <span className="jr-admin-kpi">{bySource[source]}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Embut">
          <TableWrap>
            <thead>
              <tr>
                <th>Etapa</th>
                <th className="jr-admin-num">Sol·licituds</th>
                <th className="jr-admin-num">Valor estimat</th>
              </tr>
            </thead>
            <tbody>
              {(["new", "contacted", "visit", "proposal", "won", "lost"] as const).map((stage) => {
                const rows = ADMIN_REQUESTS.filter((r) => r.status === stage);
                return (
                  <tr key={stage}>
                    <td>{LEAD_STATUS_LABEL[stage]}</td>
                    <td className="jr-admin-num">{rows.length}</td>
                    <td className="jr-admin-num">
                      {money(rows.reduce((s, r) => s + r.estimatedValue, 0))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </TableWrap>
        </Section>
      </div>
    </>
  );
}
