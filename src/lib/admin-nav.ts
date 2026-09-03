export type AdminNavKey =
  | "dashboard"
  | "requests"
  | "clients"
  | "properties"
  | "visits"
  | "billing"
  | "expenses"
  | "marketing"
  | "company"
  | "team";

export type AdminNavItem = {
  key: AdminNavKey;
  label: string;
  to:
    | "/admin"
    | "/admin/solicituds"
    | "/admin/clients"
    | "/admin/propietats"
    | "/admin/visites"
    | "/admin/facturacio"
    | "/admin/despeses"
    | "/admin/marqueting"
    | "/admin/empresa"
    | "/admin/equip";
};

/** Operativa del dia a dia. */
export const ADMIN_NAV: AdminNavItem[] = [
  { key: "dashboard", label: "Panell", to: "/admin" },
  { key: "requests", label: "Sol·licituds", to: "/admin/solicituds" },
  { key: "clients", label: "Clients", to: "/admin/clients" },
  { key: "properties", label: "Propietats", to: "/admin/propietats" },
  { key: "visits", label: "Visites", to: "/admin/visites" },
];

/** Administració de l'empresa. */
export const ADMIN_NAV_COMPANY: AdminNavItem[] = [
  { key: "billing", label: "Factures", to: "/admin/facturacio" },
  { key: "expenses", label: "Despeses", to: "/admin/despeses" },
  { key: "marketing", label: "Màrqueting", to: "/admin/marqueting" },
  { key: "company", label: "L'empresa", to: "/admin/empresa" },
  { key: "team", label: "Equip i rols", to: "/admin/equip" },
];

export const ADMIN_NAV_ALL = [...ADMIN_NAV, ...ADMIN_NAV_COMPANY];
