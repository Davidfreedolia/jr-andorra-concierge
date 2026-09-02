/**
 * DATOS DE EJEMPLO — PROVISIONAL.
 * Nada de esto es real ni está conectado a ningún backend.
 * La lógica, los roles y los permisos se implementan más adelante fuera de aquí.
 * Los nombres son deliberadamente de ejemplo.
 */

import photoLiving from "@/assets/hss-report.jpg.asset.json";
import photoExterior from "@/assets/hss-hero.jpg.asset.json";
import photoTechnical from "@/assets/door-home.jpg.asset.json";

export type AreaRole = "owner" | "family" | "manager" | "guest";

export const AREA_ROLES: AreaRole[] = ["owner", "family", "manager", "guest"];

export type CheckState = "ok" | "attention" | "na";
export type IssueStatus = "open" | "inProgress" | "resolved";
export type ReportStatus = "ok" | "issue";

export type ReportPhoto = {
  id: string;
  url: string;
  zoneKey: string;
  date: string;
};

export type ReportIssue = {
  id: string;
  textKey: string;
  status: IssueStatus;
  followUpKey: string;
  followUpDate: string;
};

export type HomeReport = {
  id: string;
  date: string;
  time: string;
  technician: string;
  status: ReportStatus;
  checklist: { pointKey: string; state: CheckState }[];
  photos: ReportPhoto[];
  issues: ReportIssue[];
};

export const DEMO_PROPERTY = {
  name: "Casa Exemple",
  address: "Carrer Exemple, 00 — Ordino (dirección de ejemplo)",
  parish: "Ordino",
  type: "Chalet",
  area: "320 m²",
  bedrooms: "4",
  wifiNetwork: "CASA-EXEMPLE",
  wifiPassword: "exemple-0000",
  level: "Premium",
  nextVisit: "2026-09-15",
};

export const DEMO_USERS: Record<AreaRole, { name: string; email: string }> = {
  owner: { name: "Cliente Ejemplo", email: "cliente.ejemplo@example.com" },
  family: { name: "Familiar Ejemplo", email: "familiar.ejemplo@example.com" },
  manager: { name: "Gestor Ejemplo", email: "gestor.ejemplo@example.com" },
  guest: { name: "Invitado Ejemplo", email: "invitado.ejemplo@example.com" },
};

const CHECKLIST_POINTS = [
  "doors",
  "water",
  "heating",
  "electricity",
  "humidity",
  "appliances",
  "exterior",
  "alarm",
];

function checklist(attention: string[] = [], na: string[] = []) {
  return CHECKLIST_POINTS.map((pointKey) => ({
    pointKey,
    state: (attention.includes(pointKey)
      ? "attention"
      : na.includes(pointKey)
        ? "na"
        : "ok") as CheckState,
  }));
}

const PHOTOS = [
  { id: "p1", url: photoLiving.url, zoneKey: "living" },
  { id: "p2", url: photoExterior.url, zoneKey: "exterior" },
  { id: "p3", url: photoTechnical.url, zoneKey: "technical" },
  { id: "p4", url: photoLiving.url, zoneKey: "kitchen" },
  { id: "p5", url: photoExterior.url, zoneKey: "entrance" },
  { id: "p6", url: photoTechnical.url, zoneKey: "bedroom" },
];

function photos(date: string, count: number): ReportPhoto[] {
  return PHOTOS.slice(0, count).map((photo) => ({ ...photo, date }));
}

export const DEMO_REPORTS: HomeReport[] = [
  {
    id: "2026-08",
    date: "2026-08-21",
    time: "10:20",
    technician: "Técnico Ejemplo A",
    status: "issue",
    checklist: checklist(["heating"], ["alarm"]),
    photos: photos("2026-08-21", 6),
    issues: [
      {
        id: "i1",
        textKey: "boiler",
        status: "inProgress",
        followUpKey: "notified",
        followUpDate: "2026-08-22",
      },
    ],
  },
  {
    id: "2026-07",
    date: "2026-07-17",
    time: "09:40",
    technician: "Técnico Ejemplo B",
    status: "issue",
    checklist: checklist(["doors"]),
    photos: photos("2026-07-17", 5),
    issues: [
      {
        id: "i2",
        textKey: "terrace",
        status: "open",
        followUpKey: "scheduled",
        followUpDate: "2026-07-18",
      },
    ],
  },
  {
    id: "2026-06",
    date: "2026-06-12",
    time: "11:05",
    technician: "Técnico Ejemplo A",
    status: "ok",
    checklist: checklist(),
    photos: photos("2026-06-12", 4),
    issues: [],
  },
  {
    id: "2025-12",
    date: "2025-12-19",
    time: "16:30",
    technician: "Técnico Ejemplo B",
    status: "issue",
    checklist: checklist(["electricity"]),
    photos: photos("2025-12-19", 3),
    issues: [
      {
        id: "i3",
        textKey: "lamp",
        status: "resolved",
        followUpKey: "done",
        followUpDate: "2026-01-14",
      },
    ],
  },
  {
    id: "2025-11",
    date: "2025-11-08",
    time: "10:00",
    technician: "Técnico Ejemplo A",
    status: "ok",
    checklist: checklist([], ["alarm"]),
    photos: photos("2025-11-08", 4),
    issues: [],
  },
];

export const DEMO_TIMELINE = [
  { id: "t1", key: "report", date: "2026-08-21", reportId: "2026-08" },
  { id: "t2", key: "issue", date: "2026-08-21" },
  { id: "t3", key: "visit", date: "2026-08-21" },
  { id: "t4", key: "request", date: "2026-08-10" },
  { id: "t5", key: "arrival", date: "2026-08-02" },
];

export type ArrivalPrep = "received" | "preparing" | "ready";

export const DEMO_ARRIVALS = [
  { id: "a1", checkIn: "2026-09-18", checkOut: "2026-09-25", guests: 4, prep: "preparing" as ArrivalPrep },
  { id: "a2", checkIn: "2026-08-02", checkOut: "2026-08-16", guests: 6, prep: "ready" as ArrivalPrep },
];

export type RequestStatus = "received" | "inProgress" | "confirmed";

export const DEMO_REQUESTS = [
  { id: "q1", typeKey: "restaurant", date: "2026-09-19", people: 4, status: "confirmed" as RequestStatus },
  { id: "q2", typeKey: "ski", date: "2026-09-20", people: 3, status: "inProgress" as RequestStatus },
  { id: "q3", typeKey: "chauffeur", date: "2026-09-21", people: 2, status: "received" as RequestStatus },
];

export const DEMO_CONTACTS = [
  { id: "c1", roleKey: "concierge", name: "Oficina JR (ejemplo)" },
  { id: "c2", roleKey: "plumber", name: "Instal·lacions Exemple" },
  { id: "c3", roleKey: "electrician", name: "Electricitat Exemple" },
  { id: "c4", roleKey: "emergency", name: "Servicio de ejemplo" },
];

export const DEMO_DOCUMENTS = [
  { id: "d1", nameKey: "insurance", date: "2026-01-10" },
  { id: "d2", nameKey: "manual", date: "2025-10-04" },
  { id: "d3", nameKey: "inventory", date: "2025-09-30" },
];

export const DEMO_INVOICES = [
  { id: "f1", date: "2026-08-01", conceptKey: "monthly", amount: "— €", paid: true },
  { id: "f2", date: "2026-07-01", conceptKey: "monthly", amount: "— €", paid: true },
  { id: "f3", date: "2026-06-20", conceptKey: "extra", amount: "— €", paid: false },
];

export const DEMO_SUBSCRIPTION = {
  plan: "Premium",
  renewal: "2026-10-01",
  method: "Tarjeta terminada en 00 (ejemplo)",
};

export const DEMO_PEOPLE = [
  { id: "u1", name: "Cliente Ejemplo", role: "owner" as AreaRole, until: null },
  { id: "u2", name: "Familiar Ejemplo", role: "family" as AreaRole, until: null },
  { id: "u3", name: "Gestor Ejemplo", role: "manager" as AreaRole, until: null },
  { id: "u4", name: "Invitado Ejemplo", role: "guest" as AreaRole, until: "2026-09-26" },
];

export const DEMO_GUEST_ACCESS_UNTIL = "2026-09-26";

/** Visibilidad puramente visual: los permisos reales se definen fuera de aquí. */
export const ROLE_SECTIONS: Record<AreaRole, string[]> = {
  owner: ["home", "reports", "arrival", "requests", "property", "billing", "people"],
  family: ["home", "reports", "arrival", "requests", "property"],
  manager: ["home", "reports", "arrival", "requests", "property", "billing"],
  guest: ["guest"],
};
