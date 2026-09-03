import { useState } from "react";

import { AdminHead, Row, Section, TableWrap } from "@/components/admin/AdminUI";
import { StatusPill } from "@/components/area/StatusPill";
import {
  ADMIN_REQUESTS,
  LEAD_SOURCE_LABEL,
  LEAD_STATUS_LABEL,
  money,
  shortDate,
  type LeadStatus,
} from "@/mocks/admin";

const FILTERS: { key: "all" | LeadStatus; label: string }[] = [
  { key: "all", label: "Totes" },
  { key: "new", label: "Noves" },
  { key: "contacted", label: "Contactades" },
  { key: "visit", label: "Visita" },
  { key: "proposal", label: "Proposta" },
  { key: "won", label: "Guanyades" },
];

function tone(status: LeadStatus) {
  if (status === "new") return "warn" as const;
  if (status === "won") return "good" as const;
  return "neutral" as const;
}

export function RequestsInbox() {
  const [filter, setFilter] = useState<"all" | LeadStatus>("all");
  const [openId, setOpenId] = useState<string | null>(ADMIN_REQUESTS[0]?.id ?? null);

  const list = filter === "all" ? ADMIN_REQUESTS : ADMIN_REQUESTS.filter((r) => r.status === filter);
  const selected = ADMIN_REQUESTS.find((r) => r.id === openId) ?? null;

  return (
    <>
      <AdminHead
        title="Sol·licituds de valoració"
        intro="La frontissa amb la web: cada formulari enviat cau aquí i no es perd. Un contacte, un estat, un responsable."
      />

      <div className="jr-admin-filters mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            data-active={filter === f.key ? "true" : undefined}
            className="jr-admin-filter"
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
        <TableWrap>
          <thead>
            <tr>
              <th>Ref.</th>
              <th>Contacte</th>
              <th>Propietat</th>
              <th>Origen</th>
              <th>Estat</th>
              <th className="jr-admin-num">Estimat</th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr
                key={r.id}
                onClick={() => setOpenId(r.id)}
                data-active={openId === r.id ? "true" : undefined}
                className="jr-admin-clickable"
              >
                <td className="jr-admin-mono">{r.ref}</td>
                <td>
                  {r.name}
                  <span className="block text-xs text-muted-foreground">{shortDate(r.createdAt)}</span>
                </td>
                <td>
                  {r.propertyType} · {r.area}
                  <span className="block text-xs text-muted-foreground">{r.parish}</span>
                </td>
                <td>{LEAD_SOURCE_LABEL[r.source]}</td>
                <td>
                  <StatusPill tone={tone(r.status)} label={LEAD_STATUS_LABEL[r.status]} />
                </td>
                <td className="jr-admin-num">{money(r.estimatedValue)}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>

        {selected ? (
          <aside className="jr-area-card flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="jr-label">{selected.ref}</span>
              <h2 className="jr-area-subtitle">{selected.name}</h2>
              <StatusPill tone={tone(selected.status)} label={LEAD_STATUS_LABEL[selected.status]} />
            </div>

            <div className="flex flex-col">
              <Row label="Correu" value={selected.email} />
              <Row label="Telèfon" value={selected.phone} />
              <Row label="Propietat" value={`${selected.propertyType} · ${selected.area} · ${selected.parish}`} />
              <Row label="Origen" value={LEAD_SOURCE_LABEL[selected.source]} />
              <Row label="Responsable" value={selected.owner} />
              <Row label="Valor estimat" value={money(selected.estimatedValue)} />
            </div>

            <div className="flex flex-col gap-2">
              <span className="jr-label">Nota</span>
              <p className="jr-measure text-sm text-muted-foreground">{selected.note}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" className="jr-button">
                Programar visita
              </button>
              <button type="button" className="jr-button jr-button-quiet">
                Enviar proposta
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Provisional: les accions encara no envien res. La lògica entra amb Supabase.
            </p>
          </aside>
        ) : null}
      </div>

      <div className="mt-10">
        <Section title="Com hi arriba">
          <p className="jr-measure text-sm text-muted-foreground">
            El formulari de la web escriu directament aquí amb el seu idioma, la parròquia i el tipus
            de propietat. Cap sol·licitud viu en un correu solt: totes tenen referència, estat i
            responsable des del primer segon.
          </p>
        </Section>
      </div>
    </>
  );
}
