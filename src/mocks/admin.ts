/**
 * DADES D'EXEMPLE — PROVISIONAL.
 * Res d'això és real ni està connectat a cap backend.
 * Quan entri Supabase, cada taula portarà workspace_id i RLS des del primer dia.
 */

export type LeadStatus = "new" | "contacted" | "visit" | "proposal" | "won" | "lost";
export type LeadSource = "web" | "phone" | "referral" | "agency";

export type ValuationRequest = {
  id: string;
  ref: string;
  name: string;
  email: string;
  phone: string;
  parish: string;
  propertyType: string;
  area: string;
  source: LeadSource;
  status: LeadStatus;
  createdAt: string;
  estimatedValue: number;
  note: string;
  owner: string;
};

export const ADMIN_REQUESTS: ValuationRequest[] = [
  {
    id: "r1",
    ref: "SOL-2026-041",
    name: "Client exemple A",
    email: "exemple.a@example.com",
    phone: "+376 000 001",
    parish: "Ordino",
    propertyType: "Xalet",
    area: "420 m²",
    source: "web",
    status: "new",
    createdAt: "2026-09-02",
    estimatedValue: 9600,
    note: "Segona residència, hi són 8 setmanes l'any. Vol control de la casa i xofer a l'aeroport.",
    owner: "Sense assignar",
  },
  {
    id: "r2",
    ref: "SOL-2026-040",
    name: "Client exemple B",
    email: "exemple.b@example.com",
    phone: "+376 000 002",
    parish: "La Massana",
    propertyType: "Àtic",
    area: "180 m²",
    source: "referral",
    status: "contacted",
    createdAt: "2026-08-30",
    estimatedValue: 5400,
    note: "Ve d'un client actual. Només vol el Home Stay Safe, de moment.",
    owner: "Jaume R.",
  },
  {
    id: "r3",
    ref: "SOL-2026-038",
    name: "Client exemple C",
    email: "exemple.c@example.com",
    phone: "+376 000 003",
    parish: "Escaldes-Engordany",
    propertyType: "Pis",
    area: "140 m²",
    source: "web",
    status: "visit",
    createdAt: "2026-08-27",
    estimatedValue: 4200,
    note: "Visita de valoració programada pel 9 de setembre.",
    owner: "Jaume R.",
  },
  {
    id: "r4",
    ref: "SOL-2026-035",
    name: "Client exemple D",
    email: "exemple.d@example.com",
    phone: "+376 000 004",
    parish: "Canillo",
    propertyType: "Xalet",
    area: "560 m²",
    source: "agency",
    status: "proposal",
    createdAt: "2026-08-21",
    estimatedValue: 14800,
    note: "Proposta Signature enviada. Pendent de resposta del family office.",
    owner: "Jaume R.",
  },
  {
    id: "r5",
    ref: "SOL-2026-030",
    name: "Client exemple E",
    email: "exemple.e@example.com",
    phone: "+376 000 005",
    parish: "Ordino",
    propertyType: "Xalet",
    area: "320 m²",
    source: "web",
    status: "won",
    createdAt: "2026-08-11",
    estimatedValue: 8900,
    note: "Contracte Premium signat. Alta feta i primera visita programada.",
    owner: "Jaume R.",
  },
  {
    id: "r6",
    ref: "SOL-2026-028",
    name: "Client exemple F",
    email: "exemple.f@example.com",
    phone: "+376 000 006",
    parish: "Sant Julià",
    propertyType: "Casa",
    area: "210 m²",
    source: "phone",
    status: "lost",
    createdAt: "2026-08-05",
    estimatedValue: 3600,
    note: "Preu fora de rang. Reprendre d'aquí sis mesos.",
    owner: "Jaume R.",
  },
];

export type ServiceLevel = "Essential" | "Premium" | "Signature";

export type PropertyRecord = {
  id: string;
  ref: string;
  name: string;
  owner: string;
  parish: string;
  address: string;
  type: string;
  area: string;
  bedrooms: number;
  level: ServiceLevel;
  since: string;
  nextVisit: string;
  lastVisit: string;
  openIssues: number;
  monthlyFee: number;
  accessNote: string;
  alarm: string;
  keyholder: string;
  contacts: { name: string; role: string; phone: string }[];
};

export const ADMIN_PROPERTIES: PropertyRecord[] = [
  {
    id: "p1",
    ref: "PRO-014",
    name: "Casa Ordino",
    owner: "Client exemple E",
    parish: "Ordino",
    address: "Carrer d'exemple 14, Ordino",
    type: "Xalet",
    area: "320 m²",
    bedrooms: 4,
    level: "Premium",
    since: "2026-08-14",
    nextVisit: "2026-09-15",
    lastVisit: "2026-09-01",
    openIssues: 1,
    monthlyFee: 740,
    accessNote: "Caixa forta de claus a l'entrada de servei. Codi rotatiu mensual.",
    alarm: "Codi propi de JR, sector 2 sempre actiu",
    keyholder: "JR — joc complet + comandament garatge",
    contacts: [
      { name: "Client exemple E", role: "Propietari", phone: "+376 000 005" },
      { name: "Familiar exemple", role: "Familiar autoritzat", phone: "+376 000 015" },
      { name: "Gestor exemple", role: "Gestor patrimonial", phone: "+376 000 025" },
    ],
  },
  {
    id: "p2",
    ref: "PRO-011",
    name: "Atic La Massana",
    owner: "Client exemple B",
    parish: "La Massana",
    address: "Avinguda d'exemple 3, La Massana",
    type: "Àtic",
    area: "180 m²",
    bedrooms: 3,
    level: "Essential",
    since: "2026-05-02",
    nextVisit: "2026-09-11",
    lastVisit: "2026-08-28",
    openIssues: 0,
    monthlyFee: 390,
    accessNote: "Consergeria de l'edifici. Avisar amb 24 h.",
    alarm: "Sense alarma",
    keyholder: "JR — joc simple",
    contacts: [{ name: "Client exemple B", role: "Propietari", phone: "+376 000 002" }],
  },
  {
    id: "p3",
    ref: "PRO-007",
    name: "Xalet Canillo",
    owner: "Client exemple D",
    parish: "Canillo",
    address: "Camí d'exemple 21, Canillo",
    type: "Xalet",
    area: "560 m²",
    bedrooms: 6,
    level: "Signature",
    since: "2025-12-19",
    nextVisit: "2026-09-08",
    lastVisit: "2026-09-02",
    openIssues: 2,
    monthlyFee: 1480,
    accessNote: "Accés biomètric. JR dóna d'alta cada visitant amb 48 h.",
    alarm: "Central connectada, JR és contacte 1",
    keyholder: "JR — joc complet, garatge i caseta tècnica",
    contacts: [
      { name: "Client exemple D", role: "Propietari", phone: "+376 000 004" },
      { name: "Family office", role: "Administracio", phone: "+34 000 000 004" },
    ],
  },
];

export type CheckState = "ok" | "attention" | "na";

export type VisitCheck = { id: string; label: string; state: CheckState; note?: string | undefined };

export type Visit = {
  id: string;
  ref: string;
  propertyId: string;
  propertyName: string;
  date: string;
  time: string;
  technician: string;
  status: "planned" | "inProgress" | "done";
  checks: VisitCheck[];
  issues: { id: string; text: string; status: "open" | "inProgress" | "resolved" }[];
};

const BASE_CHECKS: { id: string; label: string }[] = [
  { id: "doors", label: "Portes, finestres i tancaments" },
  { id: "water", label: "Aigua: fuites, pressió i desguassos" },
  { id: "heating", label: "Calefacció i climatització" },
  { id: "electricity", label: "Quadre elèctric i il·luminació" },
  { id: "humidity", label: "Humitat i ventilació" },
  { id: "appliances", label: "Electrodomèstics i xarxa" },
  { id: "exterior", label: "Exterior, jardí i accessos" },
  { id: "alarm", label: "Alarma i càmeres" },
];

function checks(attention: string[] = [], na: string[] = [], notes: Record<string, string> = {}) {
  return BASE_CHECKS.map((c) => ({
    ...c,
    state: (attention.includes(c.id) ? "attention" : na.includes(c.id) ? "na" : "ok") as CheckState,
    note: notes[c.id],
  }));
}

export const ADMIN_VISITS: Visit[] = [
  {
    id: "v1",
    ref: "VIS-2026-118",
    propertyId: "p3",
    propertyName: "Xalet Canillo",
    date: "2026-09-08",
    time: "09:30",
    technician: "Tècnic exemple 1",
    status: "planned",
    checks: checks(),
    issues: [],
  },
  {
    id: "v2",
    ref: "VIS-2026-117",
    propertyId: "p2",
    propertyName: "Atic La Massana",
    date: "2026-09-11",
    time: "11:00",
    technician: "Tècnic exemple 2",
    status: "planned",
    checks: checks(),
    issues: [],
  },
  {
    id: "v3",
    ref: "VIS-2026-116",
    propertyId: "p1",
    propertyName: "Casa Ordino",
    date: "2026-09-01",
    time: "10:00",
    technician: "Tècnic exemple 1",
    status: "done",
    checks: checks(
      ["humidity"],
      ["alarm"],
      { humidity: "Taca a la paret nord del soterrani, 40 x 25 cm. Fotografiada." },
    ),
    issues: [
      { id: "i1", text: "Humitat al soterrani — pressupost de reparació demanat", status: "inProgress" },
    ],
  },
  {
    id: "v4",
    ref: "VIS-2026-115",
    propertyId: "p3",
    propertyName: "Xalet Canillo",
    date: "2026-09-02",
    time: "08:45",
    technician: "Tècnic exemple 2",
    status: "done",
    checks: checks(["water", "exterior"], [], {
      water: "Degoteig a l'aixeta de la cuina exterior.",
      exterior: "Branca caiguda sobre el camí d'accés, retirada.",
    }),
    issues: [
      { id: "i2", text: "Aixeta exterior — canviar junta", status: "open" },
      { id: "i3", text: "Poda preventiva abans de l'hivern", status: "open" },
    ],
  },
];

/**
 * IGI d'Andorra — cinc tipus: 0, 1, 2,5, 4,5 (general) i 9,5 (financer).
 * El transport de passatgers i la cura de la propietat no van al mateix tipus:
 * res no queda fixat al codi: la gestoria valida cada línia.
 */
export const IGI_RATES = [0, 1, 2.5, 4.5, 9.5] as const;

export type InvoiceLine = { concept: string; qty: number; price: number; igi: number };

export type Invoice = {
  id: string;
  number: string;
  client: string;
  nrt: string;
  propertyName: string;
  date: string;
  dueDate: string;
  status: "draft" | "issued" | "paid" | "overdue";
  lines: InvoiceLine[];
};

export const ADMIN_INVOICES: Invoice[] = [
  {
    id: "f1",
    number: "2026/0184",
    client: "Client exemple E",
    nrt: "A-000000-X",
    propertyName: "Casa Ordino",
    date: "2026-09-01",
    dueDate: "2026-09-15",
    status: "issued",
    lines: [
      { concept: "Quota Premium — setembre", qty: 1, price: 740, igi: 4.5 },
      { concept: "Trasllat aeroport Tolosa (anada i tornada)", qty: 2, price: 310, igi: 0 },
    ],
  },
  {
    id: "f2",
    number: "2026/0183",
    client: "Client exemple D",
    nrt: "A-000001-X",
    propertyName: "Xalet Canillo",
    date: "2026-09-01",
    dueDate: "2026-09-15",
    status: "paid",
    lines: [
      { concept: "Quota Signature — setembre", qty: 1, price: 1480, igi: 4.5 },
      { concept: "Coordinació d'obra menor", qty: 4, price: 65, igi: 4.5 },
      { concept: "Xofer a disposició (8 h)", qty: 1, price: 480, igi: 0 },
    ],
  },
  {
    id: "f3",
    number: "2026/0182",
    client: "Client exemple B",
    nrt: "A-000002-X",
    propertyName: "Atic La Massana",
    date: "2026-08-01",
    dueDate: "2026-08-15",
    status: "overdue",
    lines: [{ concept: "Quota Essential — agost", qty: 1, price: 390, igi: 4.5 }],
  },
  {
    id: "f4",
    number: "ESB-2026/0185",
    client: "Client exemple A",
    nrt: "—",
    propertyName: "Pendent d'alta",
    date: "2026-09-02",
    dueDate: "2026-09-16",
    status: "draft",
    lines: [{ concept: "Visita de valoració", qty: 1, price: 0, igi: 4.5 }],
  },
];

export function invoiceTotals(invoice: Invoice) {
  const base = invoice.lines.reduce((sum, l) => sum + l.qty * l.price, 0);
  const igi = invoice.lines.reduce((sum, l) => sum + (l.qty * l.price * l.igi) / 100, 0);
  return { base, igi, total: base + igi };
}

export type Expense = {
  id: string;
  date: string;
  supplier: string;
  concept: string;
  amount: number;
  igi: number;
  category: string;
  propertyName: string;
  status: "pending" | "accounted";
};

export const ADMIN_EXPENSES: Expense[] = [
  { id: "e1", date: "2026-09-01", supplier: "Proveïdor exemple 1", concept: "Material de fontaneria", amount: 84.5, igi: 4.5, category: "Manteniment", propertyName: "Casa Ordino", status: "accounted" },
  { id: "e2", date: "2026-08-29", supplier: "Proveïdor exemple 2", concept: "Combustible flota", amount: 132.0, igi: 4.5, category: "Mobilitat", propertyName: "—", status: "accounted" },
  { id: "e3", date: "2026-09-02", supplier: "Proveïdor exemple 3", concept: "Poda i retirada de branques", amount: 260.0, igi: 4.5, category: "Exterior", propertyName: "Xalet Canillo", status: "pending" },
];

export type Campaign = {
  id: string;
  name: string;
  segment: string;
  sent: number;
  openRate: number;
  clickRate: number;
  date: string;
  status: "sent" | "draft" | "scheduled";
};

export const ADMIN_CAMPAIGNS: Campaign[] = [
  { id: "c1", name: "Preparació d'hivern — obertura de casa", segment: "Propietaris actius", sent: 84, openRate: 61, clickRate: 18, date: "2026-08-28", status: "sent" },
  { id: "c2", name: "Home Stay Safe — segona residència", segment: "Leads web sense contractar", sent: 212, openRate: 43, clickRate: 11, date: "2026-08-14", status: "sent" },
  { id: "c3", name: "Xofer i trasllats — temporada d'esqui", segment: "Tots els contactes", sent: 0, openRate: 0, clickRate: 0, date: "2026-10-01", status: "scheduled" },
];

export const ADMIN_TEAM = [
  { name: "Jaume Roca", role: "Propietari", scope: "Tot" },
  { name: "Tècnic exemple 1", role: "Tècnic de camp", scope: "Visites i informes" },
  { name: "Tècnic exemple 2", role: "Tècnic de camp", scope: "Visites i informes" },
  { name: "Gestoria exemple", role: "Gestor extern", scope: "Nomes facturacio i despeses" },
];

export function money(value: number): string {
  return new Intl.NumberFormat("ca-AD", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(value);
}

export function shortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("ca-AD", { day: "2-digit", month: "short" }).format(d);
}

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: "Nova",
  contacted: "Contactada",
  visit: "Visita",
  proposal: "Proposta",
  won: "Guanyada",
  lost: "Perduda",
};

export const LEAD_SOURCE_LABEL: Record<LeadSource, string> = {
  web: "Web",
  phone: "Telèfon",
  referral: "Referència",
  agency: "Agència",
};
