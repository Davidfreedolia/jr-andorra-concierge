import { Section } from "@/components/admin/AdminUI";
import { AreaChip, StaffTag } from "@/components/admin/StaffChip";
import { StatusPill } from "@/components/area/StatusPill";
import {
  SERVICE_AREAS,
  assignmentsForClient,
  coverageGaps,
  staffById,
  type AreaKey,
} from "@/mocks/staff";

/**
 * Qui cobreix que d'aquest client. La pregunta util no es qui hi ha assignat,
 * sino quina area es queda sense nom: aixo es el que el client nota quan truca.
 */
export function ClientTeam({ clientId }: { clientId: string }) {
  const assignments = assignmentsForClient(clientId);
  const gaps = coverageGaps(clientId);

  const byArea = new Map<AreaKey, typeof assignments>();
  for (const area of SERVICE_AREAS) {
    const forArea = assignments.filter((assignment) => assignment.area === area.key);
    if (forArea.length > 0) byArea.set(area.key, forArea);
  }

  return (
    <Section
      title="Equip assignat"
      aside={
        <button type="button" className="jr-button jr-button-quiet">
          Assignar una persona
        </button>
      }
    >
      {assignments.length === 0 ? (
        <p className="jr-area-empty jr-measure">
          Aquest client no té ningú assignat. Si truca avui, no hi ha nom que li respongui.
        </p>
      ) : (
        <div className="flex flex-col">
          {SERVICE_AREAS.filter((area) => byArea.has(area.key)).map((area) => (
            <div key={area.key} className="jr-admin-assign flex-wrap">
              <span className="w-40 shrink-0">
                <AreaChip area={area.key} />
              </span>
              <span className="flex min-w-0 flex-1 flex-wrap items-center gap-6">
                {byArea.get(area.key)?.map((assignment) => (
                  <span key={assignment.id} className="flex items-center gap-3">
                    <StaffTag member={staffById(assignment.memberId)} />
                    {assignment.lead ? <StatusPill tone="good" label="Referent" /> : null}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      )}

      {gaps.length > 0 ? (
        <div className="jr-area-card flex flex-col gap-3">
          <span className="jr-label">Àrees sense cobrir</span>
          <span className="flex flex-wrap gap-2">
            {gaps.map((area) => (
              <AreaChip key={area.key} area={area.key} />
            ))}
          </span>
          <p className="jr-measure text-sm text-muted-foreground">
            {gaps.map((area) => area.label).join(", ")}: ningú hi respon. Mentre estigui així, la
            petició acaba a la direcció encara que no li toqui.
          </p>
        </div>
      ) : null}
    </Section>
  );
}
