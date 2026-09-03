import { AdminHead, Section, TableWrap } from "@/components/admin/AdminUI";
import { ADMIN_TEAM } from "@/mocks/admin";

const PERMISSIONS = [
  { area: "Sol·licituds i contactes", owner: "Sí", tech: "Només lectura", gestor: "No" },
  { area: "Propietats i accessos", owner: "Sí", tech: "Sense claus ni alarmes", gestor: "No" },
  { area: "Visites i Home Report", owner: "Sí", tech: "Sí", gestor: "No" },
  { area: "Facturació", owner: "Sí", tech: "No", gestor: "Sí" },
  { area: "Despeses", owner: "Sí", tech: "Pot adjuntar tiquets", gestor: "Sí" },
  { area: "Màrqueting", owner: "Sí", tech: "No", gestor: "No" },
];

export function TeamScreen() {
  return (
    <>
      <AdminHead
        title="Equip i rols"
        intro="Qui veu què. El gestor extern entra des de fora i només arriba a facturació i despeses: mai a les claus d'una casa."
        action={
          <button type="button" className="jr-button jr-button-quiet">
            Convidar una persona
          </button>
        }
      />

      <div className="flex flex-col gap-10">
        <Section title="Persones">
          <TableWrap>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Rol</th>
                <th>Abast</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_TEAM.map((p) => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td>{p.role}</td>
                  <td>{p.scope}</td>
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
              {PERMISSIONS.map((p) => (
                <tr key={p.area}>
                  <td>{p.area}</td>
                  <td>{p.owner}</td>
                  <td>{p.tech}</td>
                  <td>{p.gestor}</td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          <p className="jr-measure text-sm text-muted-foreground">
            Aquesta matriu no és decorativa: es tradueix directament a les polítiques RLS de la base de
            dades. Cada taula porta workspace_id des de la primera línia, i el permís es comprova al
            servidor, no al navegador.
          </p>
        </Section>
      </div>
    </>
  );
}
