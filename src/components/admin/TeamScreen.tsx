import { Link } from "@tanstack/react-router";

import { AdminHead, Section, TableWrap } from "@/components/admin/AdminUI";
import { AreaChip, StaffTag } from "@/components/admin/StaffChip";
import { ADMIN_CLIENTS } from "@/mocks/admin";
import { SERVICE_AREAS, STAFF, alertsForMember, assignmentsForMember } from "@/mocks/staff";

const PERMISSIONS = [
  { area: "Sol·licituds i contactes", owner: "Sí", tech: "Només lectura", gestor: "No" },
  { area: "Propietats i accessos", owner: "Sí", tech: "Sense claus ni alarmes", gestor: "No" },
  { area: "Visites i Home Report", owner: "Sí", tech: "Sí", gestor: "No" },
  { area: "Avisos i notes internes", owner: "Sí", tech: "Només els seus clients", gestor: "No" },
  { area: "Facturació", owner: "Sí", tech: "No", gestor: "Sí" },
  { area: "Despeses", owner: "Sí", tech: "Pot adjuntar tiquets", gestor: "Sí" },
  { area: "Màrqueting", owner: "Sí", tech: "No", gestor: "No" },
];

export function TeamScreen() {
  return (
    <>
      <AdminHead
        title="Equip"
        intro="Cada persona cobreix àrees concretes de clients concrets. El client no parla amb una empresa: parla amb qui li toca."
        action={
          <button type="button" className="jr-button jr-button-quiet">
            Convidar una persona
          </button>
        }
      />

      <div className="flex flex-col gap-10">
        <Section title="Persones i cobertura">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {STAFF.filter((member) => member.active).map((member) => {
              const assignments = assignmentsForMember(member.id);
              const clientIds = [...new Set(assignments.map((entry) => entry.clientId))];
              const leads = assignments.filter((entry) => entry.lead).length;

              return (
                <article key={member.id} className="jr-area-card flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <StaffTag member={member} />
                    <span className="text-right text-xs text-muted-foreground">
                      {clientIds.length} client{clientIds.length === 1 ? "" : "s"}
                      <br />
                      {leads} com a referent
                      <br />
                      {alertsForMember(member.id).length} avisos oberts
                    </span>
                  </div>

                  <span className="flex flex-wrap gap-2">
                    {member.areas.map((area) => (
                      <AreaChip key={area} area={area} />
                    ))}
                  </span>

                  {clientIds.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Sense clients assignats.</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {clientIds.map((clientId, index) => {
                        const client = ADMIN_CLIENTS.find((entry) => entry.id === clientId);
                        if (!client) return null;
                        return (
                          <span key={clientId}>
                            {index > 0 ? " · " : ""}
                            <Link
                              to="/admin/clients/$id"
                              params={{ id: client.id }}
                              className="jr-admin-link"
                            >
                              {client.name}
                            </Link>
                          </span>
                        );
                      })}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </Section>

        <Section title="Àrees de servei">
          <TableWrap>
            <thead>
              <tr>
                <th>Àrea</th>
                <th>Què hi entra</th>
                <th>Qui la pot cobrir</th>
              </tr>
            </thead>
            <tbody>
              {SERVICE_AREAS.map((area) => (
                <tr key={area.key}>
                  <td>{area.label}</td>
                  <td>{area.detail}</td>
                  <td>
                    {STAFF.filter((member) => member.active && member.areas.includes(area.key))
                      .map((member) => member.name)
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Section>

        <Section title="Matriu de permisos">
          <TableWrap>
            <thead>
              <tr>
                <th>Àrea</th>
                <th>Propietari</th>
                <th>Tècnic de camp</th>
                <th>Gestor extern</th>
              </tr>
            </thead>
            <tbody>
              {PERMISSIONS.map((permission) => (
                <tr key={permission.area}>
                  <td>{permission.area}</td>
                  <td>{permission.owner}</td>
                  <td>{permission.tech}</td>
                  <td>{permission.gestor}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <p className="jr-measure text-sm text-muted-foreground">
            Aquesta matriu no és decorativa: es tradueix directament a les polítiques RLS de la base
            de dades. Cada taula porta workspace_id des de la primera línia, i el permís es comprova
            al servidor, no al navegador.
          </p>
        </Section>
      </div>
    </>
  );
}
