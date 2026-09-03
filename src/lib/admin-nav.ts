export type AdminNavKey =
  | "dashboard"
  | "requests"
  | "properties"
  | "visits"
  | "billing"
  | "marketing"
  | "team";

export type AdminNavItem = {
  key: AdminNavKey;
  label: string;
  to:
    | "/admin"
    | "/admin/solicituds"
    | "/admin/propietats"
    | "/admin/visites"
    | "/admin/facturacio"
    | "/admin/marqueting"
    | "/admin/equip";
};

export const ADMIN_NAV: AdminNavItem[] = [
  { key: "dashboard", label: "Panell", to: "/admin" },
  { key: "requests", label: "Sol·licituds", to: "/admin/solicituds" },
  { key: "properties", label: "Propietats", to: "/admin/propietats" },
  { key: "visits", label: "Visites", to: "/admin/visites" },
  { key: "billing", label: "Facturació", to: "/admin/facturacio" },
  { key: "marketing", label: "Màrqueting", to: "/admin/marqueting" },
  { key: "team", label: "Equip i rols", to: "/admin/equip" },
];
