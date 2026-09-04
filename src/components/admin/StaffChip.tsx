import { AREA_LABEL, type AreaKey, type StaffMember } from "@/mocks/staff";

/** Etiqueta d'una area de servei. */
export function AreaChip({ area }: { area: AreaKey }) {
  return <span className="jr-admin-chip">{AREA_LABEL[area]}</span>;
}

/** Inicials + nom. Es repeteix a tot arreu: assignacions, notes i avisos. */
export function StaffTag({
  member,
  detail,
}: {
  member: StaffMember | undefined;
  detail?: string;
}) {
  if (!member) {
    return <span className="text-sm text-muted-foreground">Sense assignar</span>;
  }

  return (
    <span className="flex min-w-0 items-center gap-3">
      <span className="jr-admin-avatar" aria-hidden="true">
        {member.initials}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-sm text-foreground">{member.name}</span>
        <span className="text-xs text-muted-foreground">{detail ?? member.role}</span>
      </span>
    </span>
  );
}
