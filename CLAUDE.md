# CLAUDE.md

Guía de contexto para Claude Code (u otro asistente) al trabajar en este repositorio.

> **Regla de oro:** cada vez que se haga un cambio en el proyecto (estructura de ficheros, componentes, textos, build, despliegue, etc.) hay que **actualizar este archivo** para que siga siendo un reflejo fiel del estado real del proyecto. Un `CLAUDE.md` desactualizado es peor que no tenerlo.

## Qué es este proyecto

Sitio web de una sola página (landing) para **Maniáticos Drink**, un resto-bar. Construido con **Astro** (sitio estático, sin framework de JS adicional) y desplegado en **GitHub Pages**.

El diseño se importó originalmente desde un proyecto de Claude Design (`claude.ai/design`) y se reimplementó a mano en Astro, dividiendo la página en **un componente por sección** y moviendo **todos los textos** a un único JSON editable.

## Stack

- **Astro** (`output: 'static'`) — sin React/Vue/Svelte, todo con `.astro` + JS vanilla.
- **CSS plano** (`src/styles/global.css`), sin Tailwind ni preprocesadores.
- Fuentes de Google Fonts: `Bebas Neue`, `Poppins`, `Pacifico`.
- JS de cliente vanilla (`src/scripts/site.js`) para: menú móvil, selector de idioma (ES/EN/DE) y el subrayado animado del nav activo al hacer scroll.
- Despliegue vía **GitHub Actions** (`.github/workflows/deploy.yml`) a **GitHub Pages**.

## Árbol de ficheros

```
maniaticos-drink/
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI: build + deploy a GitHub Pages en cada push a main
├── public/
│   ├── .nojekyll                 # evita que GitHub Pages procese la carpeta _astro/ con Jekyll
│   └── assets/
│       ├── logo-maniaticos-glass-only.png     # logo del hero (solo la copa)
│       └── logo-maniaticos-transparent.png    # logo del nav (isotipo completo)
├── src/
│   ├── components/                # una sección de la página = un componente .astro
│   │   ├── Nav.astro              # barra de navegación, menú móvil, selector de idioma
│   │   ├── Hero.astro             # sección de portada (logo grande + descripción + redes)
│   │   ├── Menu.astro             # sección #menu — categorías y platos/tragos
│   │   ├── Promos.astro           # sección #promos — tarjetas de promociones
│   │   ├── Parties.astro          # sección #fiestas — fiestas temáticas
│   │   ├── Testimonials.astro     # sección #opiniones — reseñas de clientes
│   │   └── Footer.astro           # pie de página con redes sociales
│   ├── data/
│   │   └── content.json           # ⭐ TODOS los textos del sitio (ES/EN/DE) — ver abajo
│   ├── layouts/
│   │   └── Layout.astro           # <html>/<head>, fuentes, CSS global, inyecta content.json al cliente
│   ├── pages/
│   │   └── index.astro            # une Layout + todos los componentes de sección en orden
│   ├── scripts/
│   │   └── site.js                # interactividad de cliente (ver más abajo)
│   ├── styles/
│   │   └── global.css             # estilos globales + breakpoints responsive (móvil / ≥768px)
│   └── env.d.ts                    # tipos de Astro (autogenerado, no tocar a mano)
├── astro.config.mjs                # site/base para GitHub Pages, output: 'static'
├── package.json                    # scripts: dev, build, build:ghpages, preview
├── package-lock.json
├── tsconfig.json
├── README.md
└── CLAUDE.md                       # este archivo
```

## `src/data/content.json` — el único sitio donde se editan textos

Esta es la pieza más importante para cualquiera que quiera cambiar copy sin tocar código. Estructura:

```jsonc
{
  "shared": {
    // datos NO traducibles: orden de secciones del nav, colores por sección, links de redes sociales
    "navOrder": ["menu", "promos", "fiestas", "opiniones"],
    "navColors": { "menu": "#ff2ec4", "promos": "#3ec6ff", "fiestas": "#4dff6a", "opiniones": "#ffe14d" },
    "socialLinks": { "facebook": "...", "instagram": "..." }
  },
  "es": { /* todos los textos en español */ },
  "en": { /* todos los textos en inglés */ },
  "de": { /* todos los textos en alemán */ }
}
```

Dentro de cada idioma (`es`/`en`/`de`) hay una clave por sección: `nav`, `hero`, `menu` (con `categories` → `items`), `promos` (con `items`), `fiestas` (con `items`), `opiniones` (con `items`) y `footer`. Cada ítem de categoría de menú incluye su propia `image` (URL externa).

**Para cambiar un texto:** editar el string correspondiente en el idioma que corresponda dentro de `content.json`. No hace falta tocar ningún `.astro` ni el JS.

**Para agregar un ítem** (un cóctel más, una promo más, una reseña más, etc.): añadir un objeto nuevo al array correspondiente **en los tres idiomas** (`es`, `en`, `de`), manteniendo la misma forma que los objetos vecinos. El JS de cliente (`renderMenu`, `renderPromos`, `renderParties`, `renderTestimonials` en `site.js`) reconstruye el DOM a partir de estos arrays al cambiar de idioma, así que no requiere cambios de código mientras se respete la forma del objeto.

## Cómo funciona el renderizado e idiomas

1. **SSR/build time (Astro):** cada componente de sección importa `content.json` y renderiza el contenido en **español** por defecto (`content.es`), para que el HTML estático tenga texto real (SEO, no-JS).
2. **Cliente (`src/scripts/site.js`):** al cargar la página, el script lee el mismo JSON (embebido en `Layout.astro` dentro de `<script id="site-content" type="application/json">`) y:
   - Re-renderiza todas las secciones dinámicas (nav, hero, menú, promos, fiestas, testimonios, footer) al hacer clic en un botón de idioma (banderas ES/EN/DE, versión desktop y móvil).
   - Controla el menú hamburguesa en móvil (abre/cierra el panel `#mobile-menu-panel`).
   - Calcula qué sección está activa al hacer scroll y mueve/colorea el subrayado (`#nav-underline`) bajo el link correspondiente del nav de escritorio.

Los elementos que el JS actualiza están marcados con `id`s estables (`#hero-desc`, `#menu-eyebrow`, `#menu-categories`, `#promos-items`, `#fiestas-items`, `#opiniones-items`, `#footer-line`, etc.) y atributos `data-*` (`data-section`, `data-lang`, `data-nav-link`, `data-mobile-nav-link`, `data-lang-btn`). Si se renombra o elimina alguno de estos `id`/`data-*` en un componente `.astro`, hay que actualizar `site.js` en paralelo (y viceversa).

## Despliegue (GitHub Pages)

- Repo remoto: `PaginasExternas/maniaticos-drink` → sitio publicado en `https://paginasexternas.github.io/maniaticos-drink/`.
- `astro.config.mjs` define `site` y `base: '/maniaticos-drink/'` (con slash final, imprescindible para que `import.meta.env.BASE_URL` genere rutas correctas a `public/assets/*`).
- `.github/workflows/deploy.yml` corre en cada push a `main`: `npm ci` + `npm run build:ghpages` (alias de `astro build`) y publica la carpeta `dist/` con `JamesIves/github-pages-deploy-action`.
- `public/.nojekyll` es necesario porque Astro genera una carpeta `_astro/` (con guion bajo) que Jekyll ignoraría por defecto en GitHub Pages.
- Si el repo o el usuario/organización de GitHub cambia, hay que actualizar `site`/`base` en `astro.config.mjs` **y** este documento.

## Convenciones a mantener

- **Un componente por sección**, no se debe volver a fusionar todo en `index.astro`.
- **Cero texto hardcodeado** en los `.astro`: cualquier copy visible para el usuario vive en `content.json`.
- Los colores de acento por sección (`navColors` en `shared`) son la fuente de verdad para: color del link del nav, color del subrayado activo, y colores de acento de las tarjetas de esa sección. Si se cambia un color de marca, cambiarlo ahí.
- No añadir un framework de UI (React/Vue/etc.) salvo que se decida explícitamente — el sitio es intencionalmente vanilla para mantenerlo simple y liviano.

## Pendientes conocidos

- **Logos rotos (`public/assets/logo-maniaticos-glass-only.png` y `logo-maniaticos-transparent.png`).** Se importaron desde el proyecto de Claude Design vía la herramienta `DesignSync` (MCP `claude_design`), pero esa herramienta tiene un **límite duro de 256 KB por archivo** en `get_file` y sin parámetro de rango/offset — los PNG originales pesan más, así que la descarga se corta a mitad del stream de datos de la imagen (chunk `IDAT` incompleto, sin `IEND`) y el archivo queda corrupto. No hay forma de evitarlo reintentando desde el chat.
  **Para arreglarlo:** exportar/descargar los logos originales desde `claude.ai/design` (proyecto "Diseño web bar en Astro", archivo `Maniaticos Drink.dc.html`) y reemplazar esos dos ficheros en `public/assets/` por los originales completos.

## Recordatorio final

**Cada cambio relevante en el proyecto (nuevos componentes, cambios de estructura, nuevas dependencias, cambios en el flujo de idiomas/JSON, cambios de despliegue) debe reflejarse actualizando este `CLAUDE.md`.**
