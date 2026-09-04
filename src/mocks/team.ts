/**
 * EQUIP — DADES PROVISIONALS.
 *
 * La forma d'aquest fitxer es la de la futura taula `team_members`: un registre
 * per persona, amb els textos per idioma i l'ordre de visualitzacio. Quan entri
 * Supabase, aquesta pantalla no canvia; nomes canvia d'on surten les dades.
 *
 * Camps que la taula portara a mes: workspace_id, created_at, updated_at.
 */

import type { Language } from "@/i18n/config";
import portraitFounder from "@/assets/founder.jpg";

export type Localised = Record<Language, string>;

export type TeamMember = {
  id: string;
  /** Ordre a la graella. La base de dades el fara servir per ordenar. */
  position: number;
  name: string;
  /** Inicials per a la fitxa sense fotografia. */
  initials: string;
  role: Localised;
  line: Localised;
  email: string;
  /** null mentre no arribi la fotografia definitiva. */
  photo: string | null;
  published: boolean;
};

export const TEAM: TeamMember[] = [
  {
    id: "jaume-roca",
    position: 1,
    name: "Jaume Roca",
    initials: "JR",
    role: {
      ca: "CEO i fundador",
      es: "CEO y fundador",
      fr: "CEO et fondateur",
      en: "CEO and founder",
      de: "CEO und Gründer",
    },
    line: {
      ca: "Vint anys rebent, acompanyant i resolent. JR neix de la seva manera d'entendre l'hospitalitat.",
      es: "Veinte años recibiendo, acompañando y resolviendo. JR nace de su manera de entender la hospitalidad.",
      fr: "Vingt ans à accueillir, accompagner et résoudre. JR naît de sa façon de comprendre l'hospitalité.",
      en: "Twenty years of welcoming, accompanying and solving. JR grows out of how he understands hospitality.",
      de: "Zwanzig Jahre empfangen, begleiten und lösen. JR entsteht aus seinem Verständnis von Gastlichkeit.",
    },
    email: "jaume@example.com",
    photo: portraitFounder,
    published: true,
  },
  {
    id: "isabel-reno",
    position: 2,
    name: "Isabel Renó",
    initials: "IR",
    role: {
      ca: "Direcció comercial i desenvolupament de negoci",
      es: "Dirección comercial y desarrollo de negocio",
      fr: "Direction commerciale et développement",
      en: "Commercial director and business development",
      de: "Vertriebsleitung und Geschäftsentwicklung",
    },
    line: {
      ca: "La primera conversa amb un propietari nou i la relació que la segueix.",
      es: "La primera conversación con un propietario nuevo y la relación que la sigue.",
      fr: "La première conversation avec un nouveau propriétaire et la relation qui suit.",
      en: "The first conversation with a new owner, and the relationship that follows.",
      de: "Das erste Gespräch mit einem neuen Eigentümer und die Beziehung danach.",
    },
    email: "comercial@example.com",
    photo: null,
    published: true,
  },
  {
    id: "sandra-roca",
    position: 3,
    name: "Sandra Roca",
    initials: "SR",
    role: {
      ca: "Direcció financera i administració",
      es: "Dirección financiera y administración",
      fr: "Direction financière et administration",
      en: "Finance and administration director",
      de: "Finanz- und Verwaltungsleitung",
    },
    line: {
      ca: "Contractes, facturació i el rigor que un servei d'aquest nivell dona per descomptat.",
      es: "Contratos, facturación y el rigor que un servicio de este nivel da por descontado.",
      fr: "Contrats, facturation et la rigueur qu'un service de ce niveau tient pour acquise.",
      en: "Contracts, invoicing and the rigour a service at this level takes for granted.",
      de: "Verträge, Abrechnung und die Sorgfalt, die ein Service dieser Klasse voraussetzt.",
    },
    email: "administracio@example.com",
    photo: null,
    published: true,
  },
  {
    id: "isabel-casanovas",
    position: 4,
    name: "Isabel Casanovas",
    initials: "IC",
    role: {
      ca: "Coordinació d'experiència",
      es: "Coordinación de experiencia",
      fr: "Coordination de l'expérience",
      en: "Experience coordinator",
      de: "Erlebniskoordination",
    },
    line: {
      ca: "Que la casa estigui a punt abans d'arribar-hi, i que l'estada no demani res.",
      es: "Que la casa esté a punto antes de llegar, y que la estancia no pida nada.",
      fr: "Que la maison soit prête avant l'arrivée et que le séjour ne demande rien.",
      en: "The house ready before you arrive, and a stay that asks nothing of you.",
      de: "Das Haus bereit vor der Ankunft, und ein Aufenthalt, der nichts verlangt.",
    },
    email: "experiencia@example.com",
    photo: null,
    published: true,
  },
  {
    id: "david",
    position: 5,
    name: "David",
    initials: "D",
    role: {
      ca: "Disseny i desenvolupament web",
      es: "Diseño y desarrollo web",
      fr: "Design et développement web",
      en: "Web design and development",
      de: "Webdesign und Entwicklung",
    },
    line: {
      ca: "La web, l'espai del client i les eines internes amb què treballa l'equip.",
      es: "La web, el espacio del cliente y las herramientas internas con las que trabaja el equipo.",
      fr: "Le site, l'espace client et les outils internes de l'équipe.",
      en: "The website, the client area and the internal tools the team works with.",
      de: "Die Website, der Kundenbereich und die internen Werkzeuge des Teams.",
    },
    email: "web@example.com",
    photo: null,
    published: true,
  },
];
