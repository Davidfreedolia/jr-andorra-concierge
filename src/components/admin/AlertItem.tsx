import { Link } from "@tanstack/react-router";

import { AreaChip, StaffTag } from "@/components/admin/StaffChip";
import { ADMIN_CLIENTS } from "@/mocks/admin";
import { ALERT_LEVEL_LABEL, dateTime, staffById, type Alert } from "@/mocks/staff";

/** Un avis. Sempre amb responsable i, si en te, amb data limit. */
export function AlertItem({ alert, showClient = true }: { alert: Alert; showClient?: boolean }) {
  const client = ADMIN_CLIENTS.find((entry) => entry.id === alert.clientId);

  return (
    <article className="jr-admin-alert" data-level={alert.level}>
      <div className="jr-admin-notemeta">
        <span className="jr-label">{ALERT_LEVEL_LABEL[alert.level]}</span>
        <span className="text-sm text-foreground">{alert.title}</span>
        {alert.area ? <AreaChip area={alert.area} /> : null}
      </div>

      <p className="jr-measure text-sm text-muted-foreground">{alert.detail}</p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <StaffTag
          member={staffById(alert.ownerId ?? "")}
          detail={alert.due ? `Data límit ${dateTime(alert.due)}` : "Sense data límit"}
        />
        {showClient && client ? (
          <Link to="/admin/clients/$id" params={{ id: client.id }} className="jr-admin-link">
            {client.name}
          </Link>
        ) : null}
        <span className="text-xs text-muted-foreground">Obert {dateTime(alert.at)}</span>
      </div>
    </article>
  );
}
