import { AdminHead, Kpi, Section } from "@/components/admin/AdminUI";
import { AlertItem } from "@/components/admin/AlertItem";
import { StaffTag } from "@/components/admin/StaffChip";
import { ALERTS, STAFF, alertsForMember, openAlerts } from "@/mocks/staff";

export function AlertsScreen() {
  const open = openAlerts();
  const urgent = open.filter((alert) => alert.level === "urgent");
  const unassigned = open.filter((alert) => !alert.ownerId);
  const closed = ALERTS.filter((alert) => alert.done);

  return (
    <>
      <AdminHead
        title="Avisos"
        intro="El que reclama atenció avui, amb nom i data límit. Un avís sense responsable no és un avís: és una preocupació."
        action={
          <button type="button" className="jr-button jr-button-quiet">
            Crear un avís
          </button>
        }
      />

      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Oberts" value={String(open.length)} />
        <Kpi label="Urgents" value={String(urgent.length)} hint="Amb data límit aquesta setmana" />
        <Kpi label="Sense responsable" value={String(unassigned.length)} />
        <Kpi label="Tancats" value={String(closed.length)} hint="Darrers 30 dies" />
      </div>

      <div className="flex flex-col gap-10">
        <Section title="Oberts">
          {open.length === 0 ? (
            <p className="jr-area-empty jr-measure">Res pendent. No passa sovint.</p>
          ) : (
            <div className="flex flex-col">
              {open.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          )}
        </Section>

        <Section title="Càrrega per persona">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {STAFF.filter((member) => member.active).map((member) => {
              const mine = alertsForMember(member.id);
              return (
                <div key={member.id} className="jr-area-card flex items-center justify-between gap-4">
                  <StaffTag member={member} />
                  <span className="jr-admin-kpi">{mine.length}</span>
                </div>
              );
            })}
          </div>
        </Section>

        {closed.length > 0 ? (
          <Section title="Tancats">
            <div className="flex flex-col">
              {closed.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
          </Section>
        ) : null}
      </div>
    </>
  );
}
