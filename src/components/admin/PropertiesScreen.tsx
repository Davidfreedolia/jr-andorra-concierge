import { Link } from "@tanstack/react-router";

import { AdminHead, TableWrap } from "@/components/admin/AdminUI";
import { StatusPill } from "@/components/area/StatusPill";
import { ADMIN_PROPERTIES, money, shortDate } from "@/mocks/admin";

export function PropertiesScreen() {
  return (
    <>
      <AdminHead
        title="Propietats"
        intro="Cada casa amb el seu expedient: accessos, contactes, historial de visites i què se li factura."
      />

      <TableWrap>
        <thead>
          <tr>
            <th>Ref.</th>
            <th>Propietat</th>
            <th>Parròquia</th>
            <th>Nivell</th>
            <th>Propera visita</th>
            <th>Incidències</th>
            <th className="jr-admin-num">Quota</th>
          </tr>
        </thead>
        <tbody>
          {ADMIN_PROPERTIES.map((p) => (
            <tr key={p.id}>
              <td className="jr-admin-mono">{p.ref}</td>
              <td>
                <Link to="/admin/propietats/$id" params={{ id: p.id }} className="jr-admin-link">
                  {p.name}
                </Link>
                <span className="block text-xs text-muted-foreground">{p.owner}</span>
              </td>
              <td>{p.parish}</td>
              <td>{p.level}</td>
              <td>{shortDate(p.nextVisit)}</td>
              <td>
                <StatusPill
                  tone={p.openIssues === 0 ? "good" : "warn"}
                  label={p.openIssues === 0 ? "Cap" : `${p.openIssues} obertes`}
                />
              </td>
              <td className="jr-admin-num">{money(p.monthlyFee)}</td>
            </tr>
          ))}
        </tbody>
      </TableWrap>
    </>
  );
}
