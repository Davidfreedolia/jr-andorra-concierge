/**
 * Equip operatiu: qui cobreix quina area de quin client, que es diuen entre
 * ells i que els reclama atencio. Dades d'exemple amb la forma que tindran
 * les taules de Supabase: staff, client_assignments, client_notes i alerts,
 * totes amb workspace_id i RLS des de la primera linia.
 */

export type AreaKey =
  | "relationship"
  | "home"
  | "arrival"
  | "concierge"
  | "mobility"
  | "billing";

export type ServiceArea = {
  key: AreaKey;
  label: string;
  detail: string;
};

/** Les arees son del client, no de l'organigrama: son el que el client rep. */
export const SERVICE_AREAS: ServiceArea[] = [
  {
    key: "relationship",
    label: "Relació",
    detail: "L'interlocutor. Recull el que el client demana i respon del conjunt.",
  },
  {
    key: "home",
    label: "La casa",
    detail: "Visites, manteniment, incidències i Home Report.",
  },
  {
    key: "arrival",
    label: "Arribades i estades",
    detail: "Preparar la casa, rebre, acompanyar l'estada i tancar-la.",
  },
  {
    key: "concierge",
    label: "Conciergerie",
    detail: "Reserves, agenda, proveïdors i encàrrecs.",
  },
  {
    key: "mobility",
    label: "Mobilitat",
    detail: "Trasllats, xofer i vehicles.",
  },
  {
    key: "billing",
    label: "Administració",
    detail: "Contracte, factures, mandat i cobraments.",
  },
];

export const AREA_LABEL: Record<AreaKey, string> = Object.fromEntries(
  SERVICE_AREAS.map((area) => [area.key, area.label]),
) as Record<AreaKey, string>;

export type StaffMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
  /** Arees que aquesta persona pot cobrir. L'assignacio real es per client. */
  areas: AreaKey[];
  active: boolean;
};

export const STAFF: StaffMember[] = [
  {
    id: "jaume-roca",
    name: "Jaume Roca",
    initials: "JR",
    role: "Direcció",
    email: "jaume@example.com",
    phone: "+376 000 101",
    areas: ["relationship", "home", "arrival", "concierge", "mobility", "billing"],
    active: true,
  },
  {
    id: "isabel-reno",
    name: "Isabel Renó",
    initials: "IR",
    role: "Comercial i desenvolupament",
    email: "comercial@example.com",
    phone: "+376 000 102",
    areas: ["relationship", "concierge"],
    active: true,
  },
  {
    id: "sandra-roca",
    name: "Sandra Roca",
    initials: "SR",
    role: "Finances i administració",
    email: "administracio@example.com",
    phone: "+376 000 103",
    areas: ["billing"],
    active: true,
  },
  {
    id: "isabel-casanovas",
    name: "Isabel Casanovas",
    initials: "IC",
    role: "Coordinació d'experiència",
    email: "experiencia@example.com",
    phone: "+376 000 104",
    areas: ["arrival", "concierge"],
    active: true,
  },
  {
    id: "tecnic-1",
    name: "Tècnic exemple 1",
    initials: "T1",
    role: "Tècnic de camp",
    email: "camp1@example.com",
    phone: "+376 000 111",
    areas: ["home"],
    active: true,
  },
  {
    id: "tecnic-2",
    name: "Tècnic exemple 2",
    initials: "T2",
    role: "Tècnic de camp",
    email: "camp2@example.com",
    phone: "+376 000 112",
    areas: ["home", "arrival"],
    active: true,
  },
  {
    id: "xofer-1",
    name: "Xofer exemple",
    initials: "XE",
    role: "Mobilitat",
    email: "mobilitat@example.com",
    phone: "+376 000 121",
    areas: ["mobility"],
    active: true,
  },
];

export function staffById(id: string): StaffMember | undefined {
  return STAFF.find((member) => member.id === id);
}

export type Assignment = {
  id: string;
  clientId: string;
  memberId: string;
  area: AreaKey;
  /** Referent de l'area: el nom que veu el client i qui respon si hi ha dubte. */
  lead: boolean;
  since: string;
};

export const ASSIGNMENTS: Assignment[] = [
  { id: "as1", clientId: "cl1", memberId: "jaume-roca", area: "relationship", lead: true, since: "2026-08-14" },
  { id: "as2", clientId: "cl1", memberId: "tecnic-2", area: "home", lead: true, since: "2026-08-14" },
  { id: "as3", clientId: "cl1", memberId: "isabel-casanovas", area: "arrival", lead: true, since: "2026-08-14" },
  { id: "as4", clientId: "cl1", memberId: "isabel-casanovas", area: "concierge", lead: true, since: "2026-08-20" },
  { id: "as5", clientId: "cl1", memberId: "sandra-roca", area: "billing", lead: true, since: "2026-08-14" },

  { id: "as6", clientId: "cl2", memberId: "isabel-reno", area: "relationship", lead: true, since: "2025-12-19" },
  { id: "as7", clientId: "cl2", memberId: "tecnic-1", area: "home", lead: true, since: "2025-12-19" },
  { id: "as8", clientId: "cl2", memberId: "tecnic-2", area: "home", lead: false, since: "2026-06-01" },
  { id: "as9", clientId: "cl2", memberId: "isabel-casanovas", area: "arrival", lead: true, since: "2025-12-19" },
  { id: "as10", clientId: "cl2", memberId: "isabel-reno", area: "concierge", lead: true, since: "2026-02-10" },
  { id: "as11", clientId: "cl2", memberId: "xofer-1", area: "mobility", lead: true, since: "2026-01-08" },
  { id: "as12", clientId: "cl2", memberId: "sandra-roca", area: "billing", lead: true, since: "2025-12-19" },

  { id: "as13", clientId: "cl3", memberId: "jaume-roca", area: "relationship", lead: true, since: "2026-05-02" },
  { id: "as14", clientId: "cl3", memberId: "tecnic-1", area: "home", lead: true, since: "2026-05-02" },
  { id: "as15", clientId: "cl3", memberId: "sandra-roca", area: "billing", lead: true, since: "2026-05-02" },

  { id: "as16", clientId: "cl4", memberId: "isabel-reno", area: "relationship", lead: true, since: "2026-07-30" },
];

export function assignmentsForClient(clientId: string): Assignment[] {
  return ASSIGNMENTS.filter((assignment) => assignment.clientId === clientId);
}

export function assignmentsForMember(memberId: string): Assignment[] {
  return ASSIGNMENTS.filter((assignment) => assignment.memberId === memberId);
}

/**
 * Arees del client que no te cobertes. Es la pregunta que val la pena fer-li
 * a la pantalla: no qui hi ha, sino qui falta.
 */
export function coverageGaps(clientId: string): ServiceArea[] {
  const covered = new Set(assignmentsForClient(clientId).map((assignment) => assignment.area));
  return SERVICE_AREAS.filter((area) => !covered.has(area.key));
}

export type NoteChannel = "internal" | "client";

export type ClientNote = {
  id: string;
  clientId: string;
  authorId: string;
  at: string;
  channel: NoteChannel;
  area?: AreaKey;
  body: string;
  /** Persones avisades. En produccio, aixo dispara la notificacio. */
  mentions: string[];
};

export const CLIENT_NOTES: ClientNote[] = [
  {
    id: "nt1",
    clientId: "cl1",
    authorId: "tecnic-2",
    at: "2026-09-01T18:20",
    channel: "internal",
    area: "home",
    body: "Visita feta. Humitat al soterrani, cantonada nord. Fotos a l'informe. Proposo deshumidificador abans de l'hivern.",
    mentions: ["jaume-roca"],
  },
  {
    id: "nt2",
    clientId: "cl1",
    authorId: "jaume-roca",
    at: "2026-09-02T09:05",
    channel: "internal",
    area: "home",
    body: "D'acord. Demana pressupost a dos proveïdors i ho passem al client amb l'informe de setembre, no abans.",
    mentions: ["tecnic-2", "isabel-casanovas"],
  },
  {
    id: "nt3",
    clientId: "cl1",
    authorId: "isabel-casanovas",
    at: "2026-09-02T11:40",
    channel: "client",
    area: "arrival",
    body: "Confirmada l'arribada del 15 al 22. Casa a punt el 14 al vespre, cotxe a l'aeroport a les 17.30.",
    mentions: [],
  },
  {
    id: "nt4",
    clientId: "cl2",
    authorId: "isabel-reno",
    at: "2026-08-30T16:10",
    channel: "internal",
    area: "relationship",
    body: "El family office vol una sola factura trimestral en comptes de mensual. Ho miro amb la Sandra abans de dir res.",
    mentions: ["sandra-roca"],
  },
  {
    id: "nt5",
    clientId: "cl2",
    authorId: "sandra-roca",
    at: "2026-08-31T08:55",
    channel: "internal",
    area: "billing",
    body: "Es pot fer, però canvia el mandat i la sèrie. Ho preparo per al proper trimestre, no a mitja facturació.",
    mentions: ["isabel-reno"],
  },
  {
    id: "nt6",
    clientId: "cl3",
    authorId: "tecnic-1",
    at: "2026-08-28T19:30",
    channel: "internal",
    area: "home",
    body: "Consergeria de l'edifici canvia d'empresa l'1 d'octubre. Caldrà tornar a acreditar-nos.",
    mentions: ["jaume-roca"],
  },
];

export function notesForClient(clientId: string): ClientNote[] {
  return CLIENT_NOTES.filter((note) => note.clientId === clientId).sort((first, second) =>
    second.at.localeCompare(first.at),
  );
}

export type AlertLevel = "info" | "warn" | "urgent";

export type Alert = {
  id: string;
  level: AlertLevel;
  title: string;
  detail: string;
  at: string;
  clientId?: string;
  propertyId?: string;
  area?: AreaKey;
  /** Qui l'ha de resoldre. Un avis sense responsable no es un avis. */
  ownerId?: string;
  due?: string;
  done: boolean;
};

export const ALERTS: Alert[] = [
  {
    id: "al1",
    level: "urgent",
    title: "Incidència oberta sense pressupost",
    detail: "Humitat al soterrani de Casa Ordino des de l'1 de setembre. Cap pressupost demanat.",
    at: "2026-09-03T08:00",
    clientId: "cl1",
    propertyId: "p1",
    area: "home",
    ownerId: "tecnic-2",
    due: "2026-09-06",
    done: false,
  },
  {
    id: "al2",
    level: "urgent",
    title: "Factura vençuda",
    detail: "F2026-0114 va vèncer fa 9 dies. Segon avís enviat, sense resposta.",
    at: "2026-09-02T07:30",
    clientId: "cl2",
    area: "billing",
    ownerId: "sandra-roca",
    due: "2026-09-05",
    done: false,
  },
  {
    id: "al3",
    level: "warn",
    title: "Arribada en menys de 15 dies",
    detail: "Casa Ordino, del 15 al 22. Falta confirmar el proveïdor de neteja i la compra d'entrada.",
    at: "2026-09-02T10:00",
    clientId: "cl1",
    propertyId: "p1",
    area: "arrival",
    ownerId: "isabel-casanovas",
    due: "2026-09-10",
    done: false,
  },
  {
    id: "al4",
    level: "warn",
    title: "Àrea sense cobrir",
    detail: "El client no té ningú assignat a Conciergerie ni a Mobilitat. Si truca, no hi ha nom.",
    at: "2026-09-01T09:00",
    clientId: "cl3",
    area: "relationship",
    ownerId: "jaume-roca",
    done: false,
  },
  {
    id: "al5",
    level: "warn",
    title: "Acreditació a renovar",
    detail: "L'edifici de l'Àtic La Massana canvia de consergeria l'1 d'octubre.",
    at: "2026-08-28T19:35",
    clientId: "cl3",
    propertyId: "p2",
    area: "home",
    ownerId: "tecnic-1",
    due: "2026-09-25",
    done: false,
  },
  {
    id: "al6",
    level: "info",
    title: "Client nou sense equip",
    detail: "Alta feta el 30 de juliol. Només té interlocutor comercial: cap àrea operativa assignada.",
    at: "2026-08-31T09:00",
    clientId: "cl4",
    ownerId: "isabel-reno",
    done: false,
  },
  {
    id: "al7",
    level: "info",
    title: "Mandat SEPA per renovar",
    detail: "El mandat del client compleix 36 mesos el desembre.",
    at: "2026-08-20T09:00",
    clientId: "cl2",
    area: "billing",
    ownerId: "sandra-roca",
    due: "2026-12-01",
    done: false,
  },
  {
    id: "al8",
    level: "info",
    title: "Home Report d'agost enviat",
    detail: "Enviat el 2 de setembre, obert pel client el mateix dia.",
    at: "2026-09-02T12:00",
    clientId: "cl1",
    propertyId: "p1",
    area: "home",
    ownerId: "jaume-roca",
    done: true,
  },
];

export const ALERT_LEVEL_LABEL: Record<AlertLevel, string> = {
  urgent: "Urgent",
  warn: "Atenció",
  info: "Avís",
};

export function openAlerts(): Alert[] {
  return ALERTS.filter((alert) => !alert.done).sort((first, second) => {
    const order: Record<AlertLevel, number> = { urgent: 0, warn: 1, info: 2 };
    if (order[first.level] !== order[second.level]) return order[first.level] - order[second.level];
    return first.at.localeCompare(second.at);
  });
}

export function alertsForClient(clientId: string): Alert[] {
  return openAlerts().filter((alert) => alert.clientId === clientId);
}

export function alertsForMember(memberId: string): Alert[] {
  return openAlerts().filter((alert) => alert.ownerId === memberId);
}

/** Amb hora si la cadena en porta; nomes el dia si es una data solta. */
export function dateTime(iso: string): string {
  const dateOnly = iso.length <= 10;
  const value = new Date(dateOnly ? `${iso}T00:00` : iso);
  if (Number.isNaN(value.getTime())) return iso;
  return new Intl.DateTimeFormat("ca-AD", {
    day: "2-digit",
    month: "short",
    ...(dateOnly ? {} : { hour: "2-digit", minute: "2-digit" }),
  }).format(value);
}
