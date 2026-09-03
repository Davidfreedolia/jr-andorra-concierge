import type { ReactNode } from "react";

export function AdminHead({
  title,
  intro,
  action,
}: {
  title: string;
  intro?: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="jr-area-title">{title}</h1>
        {intro ? <p className="jr-measure text-muted-foreground">{intro}</p> : null}
      </div>
      {action}
    </header>
  );
}

export function Kpi({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="jr-area-card flex flex-col gap-1">
      <span className="jr-label">{label}</span>
      <span className="jr-admin-kpi">{value}</span>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </div>
  );
}

export function Section({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="jr-area-subtitle">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

/** Taula amb scroll horitzontal propi: mai fa scrollejar la pagina. */
export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <div className="jr-admin-tablewrap">
      <table className="jr-admin-table">{children}</table>
    </div>
  );
}

export function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="jr-admin-row">
      <span className="jr-label">{label}</span>
      <span className="text-sm text-foreground">{value}</span>
    </div>
  );
}
