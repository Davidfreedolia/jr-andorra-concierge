# JR Hospitality & Customer Experience — web + administrador

Projecte de FREEDOLIA per a JR Hospitality (Andorra). Property care, conciergerie
i mobilitat per a propietaris de segona residència i clients premium.

## Origen del codi

La primera versió visual del lloc públic es va generar a Lovable. **Un cop aprovat
el disseny, Lovable no torna a tocar el codi.** Tot el desenvolupament posterior es
fa aquí. Si es barregen, cada canvi de Lovable esborra el nostre.

## Stack

React + Vite + TypeScript + Tailwind + shadcn/ui · TanStack Start (SSR) ·
react-i18next · Supabase (pendent) · Stripe (pendent) · Vercel.

## Sistema de disseny

Variables CSS a `src/styles.css`, mai valors escrits dins dels components.
Paleta `--jr-black` · `--jr-night` · `--jr-night-deep` · `--jr-gold` ·
`--jr-gold-deep` · `--jr-bone` · `--jr-white`.
Tipografia en dues variables, `--font-display` i `--font-body`, provisionals fins
que arribi la de marca del client.
Radi màxim 2px. Separadors amb `--jr-hairline`. Zona tàctil 44px. Mesura 62ch.

PROHIBIT: ombres marcades, targetes tipus SaaS, cantonades molt arrodonides,
degradats, icones de farciment, insígnies de colors, comptadors animats.

## Regles del projecte

1. **Mobile first literal.** CSS des de 375px. Media queries només `min-width`.
2. **Cinc idiomes des del dia 1**: ca, es (per defecte), fr, en, de. Cap cadena
   dins d'un component; tot per i18n, inclosos botons, placeholders i errors.
3. **L'alemany és el que trenca el disseny**: ocupa un 25-35% més i no parteix
   paraules. Cap amplada fixa. Es revisa sempre en alemany a 375px.
4. **Cap preu públic a la web.** Tot acaba en sol·licitud de valoració o reserva.
5. **`workspace_id` a totes les taules amb RLS, des de la primera.** Afegir
   multi-espai després no és una millora, és una reescriptura.
6. Un component per fitxer. Cap fitxer de més de 200 línies.
7. Cap lògica de negoci al front: preus i regles es decideixen al servidor.
8. Només la clau pública de Supabase al navegador. La de servei, mai.

## Estructura

Lloc públic: `/$lang` · `/home-stay-safe` · `/conciergerie-mobility` · `/about` ·
`/contact`. Espai del client sota `/area`: acceso · index · informes ·
informes/$id · llegada · peticiones · propiedad · facturacion · personas · invitado.

Rols de client: titular · familiar · gestor · convidat (amb caducitat per dates).
Rols interns: direcció · operacions · camp · proveïdor · gestoria.

## Cicle operatiu

`HOME → ARRIVAL → STAY → DEPARTURE`, precedit d'una fase zero d'entrada:
sol·licitud → valoració → proposta → signatura → mandat SEPA → alta de propietat.

## Facturació

Andorra. IGI amb cinc tipus vigents (0 / 1 / 2,5 / 4,5 general / 9,5 financer).
**Cap tipus escrit al codi**: taula d'impostos configurable per línia de servei amb
data de vigència. El transport de viatgers i el property care probablement no
comparteixen tipus. Les regles les valida la gestoria del client.

Sèries separades per línia, numeració correlativa sense forats, rectificatives com
a document propi, tancament de període bloquejat, factura en els cinc idiomes.

## Actius

Els actius són fitxers reals del repositori, no punters al CDN de Lovable.
El vídeo del hero viu a `public/media/`. Material d'arxiu al llançament.
El logo es fa servir tal com és, sense redibuixar ni recompondre.

## Estat

L'espai del client funciona amb dades d'exemple a `src/mocks/area.ts`.
La connexió a Supabase és la següent fase.
