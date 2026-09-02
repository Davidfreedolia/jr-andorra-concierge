# JR Andorra Concierge

PROYECTO: JR Hospitality & Customer Experience — Andorra.

Oficina privada de home care, conciergerie y movilidad para propietarios de

segunda residencia y clientes premium. Web de lanzamiento + área privada de

cliente. Público exclusivo: discreción, confianza, cero estridencias.

EN ESTE PRIMER MENSAJE NO CREES CONTENIDO DE PÁGINAS. Monta solo la base:

stack, sistema de diseño, idiomas, layout y rutas vacías. Las páginas llegan

en los mensajes siguientes.

STACK

React + Vite + TypeScript + Tailwind + shadcn/ui. react-router-dom.

react-i18next. Supabase solo para formularios más adelante.

Sin CMS: los textos viven en los JSON de traducción.

MOBILE FIRST — es el orden de trabajo, no un adjetivo

Diseña y escribe el CSS desde 375px hacia arriba. TODAS las media queries son

min-width; ninguna max-width. Áreas táctiles de 44px mínimo. Inputs con

font-size 16px para que iOS no haga zoom al enfocarlos. Un campo por fila en

móvil. Comprueba cada pantalla a 375px antes de darla por hecha.

IDIOMAS — CINCO desde el inicio

/es (por defecto), /ca, /fr, /en, /de. NINGÚN texto escrito dentro de un

componente: todo pasa por i18n, incluidos botones, placeholders, mensajes de

error y textos de accesibilidad. Crea las cinco carpetas de traducción con

las mismas claves; las que falten hacen fallback a ES. Selector de idioma

discreto en la cabecera. Sugiere idioma por navegador pero NUNCA redirijas

automáticamente. hreflang de los cinco + x-default.

EL ALEMÁN ES EL QUE ROMPE EL DISEÑO: ocupa un 25-35% más que el español y no

parte palabras. Ningún botón ni etiqueta con ancho fijo; todo debe poder pasar

a dos líneas sin romperse ni truncarse. hyphens:auto con el atributo lang

correcto. En alemán, el letter-spacing de las etiquetas baja de .22em a .14em.

Revisa SIEMPRE el layout en alemán a 375px: si cabe el alemán, cabe todo.

SISTEMA DE DISEÑO — como variables CSS y en el theme de Tailwind

  --jr-black       #0B0B0C

  --jr-night       #101A2E

  --jr-night-deep  #070E1A

  --jr-gold        #C6A15B

  --jr-gold-deep   #9C7B3C

  --jr-bone        #F4F2EE

  --jr-white       #FFFFFF

TIPOGRAFÍA en dos variables, usadas SIEMPRE a través de ellas:

  --font-display: 'Cormorant Garamond', Georgia, serif;

  --font-body:    'Jost', 'Helvetica Neue', sans-serif;

Son provisionales: se sustituirán por la tipografía de marca del cliente, y

el cambio debe ser una sola línea.

Titulares en display 300/400, nunca negrita, interlineado 1,05-1,15.

Texto en body 300/400, 16-17px, interlineado 1,65, máximo 62 caracteres.

Etiquetas en body 500, mayúsculas, 11px, letter-spacing .22em, en oro.

Fondo oscuro por defecto; secciones alternas en --jr-bone.

Botones: borde de 1px en oro, texto en mayúsculas espaciadas, fondo

transparente; en hover se rellenan de oro con texto negro. Radio máximo 2px.

Separadores: línea de 1px en oro al 25%.

Aire vertical entre secciones: 80px en móvil, 140px en escritorio.

NO HAGAS NUNCA: sombras marcadas, tarjetas tipo SaaS, esquinas muy

redondeadas, degradados de color, iconos de relleno, emojis, badges de

colores, contadores animados, estética inmobiliaria o de mantenimiento.

Si dudas entre añadir algo o dejar espacio en blanco, deja el espacio.

ESTRUCTURA A CREAR AHORA (páginas vacías con solo el título)

/                       Home

/home-stay-safe         Home Stay Safe

/conciergerie-mobility  Conciergerie & Mobility

/about                  Sobre JR

/contact                Contacto

Layout común: cabecera con logo (usa un marcador de posición SVG llamado

LogoJR, que sustituiremos por el archivo real), navegación, selector de

idioma; pie con navegación, aviso legal, privacidad y cookies.

REGLAS QUE NO PUEDES SALTARTE

1. Sin lógica de negocio en el front: nada de cálculos de precio ni reglas.

2. NO crees ni modifiques tablas en Supabase. El esquema lo definimos fuera.

3. Solo la clave pública de Supabase. La de servicio jamás en el navegador.

4. Ningún color ni tamaño escrito dentro de un componente: solo variables.

5. Dependencias: React, router, i18next, Supabase. Ninguna más.

6. Un componente por archivo. Ninguna página de más de 200 líneas.

7. Accesibilidad: contraste AA sobre fondo oscuro, foco visible en oro,

   navegación por teclado, alt real en todas las imágenes.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0c1721b3-00da-403a-abc5-040c96ac61ef).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
