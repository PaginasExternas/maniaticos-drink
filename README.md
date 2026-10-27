<div align="center">

# 🍹 Maniáticos Drink

**Resto-bar · Cócteles, cervezas y noches temáticas**

Landing page estática construida con [Astro](https://astro.build), un componente por sección y todos los textos en un único JSON multi-idioma (ES / EN / DE).

[![Astro](https://img.shields.io/badge/Astro-4-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?style=for-the-badge&logo=github)](https://paginasexternas.github.io/maniaticos-drink)
[![Idiomas](https://img.shields.io/badge/Idiomas-ES%20%7C%20EN%20%7C%20DE-3EC6FF?style=for-the-badge)](#-idiomas)
[![Licencia](https://img.shields.io/badge/Licencia-privado-7c6b98?style=for-the-badge)](#)

</div>

---

## ✨ Qué incluye

| | |
|---|---|
| 🍸 **Menú** | Cócteles, cervezas y piqueos, agrupados por categoría con foto, nombre y descripción |
| 🎉 **Promociones** | Tarjetas de ofertas destacadas (ej. *5 cócteles por 4*, *Happy Hour*) |
| 🪩 **Fiestas temáticas** | Noches especiales del mes (neón UV, retro 2000s, etc.) |
| ⭐ **Opiniones** | Reseñas de clientes con puntuación |
| 🌐 **3 idiomas** | Español, inglés y alemán, con selector animado en el nav |
| 📱 **100% responsive** | Menú hamburguesa en móvil, layout adaptado en desktop |

## 🧱 Stack

- **[Astro](https://astro.build)** — sitio estático (`output: 'static'`), sin React/Vue.
- **CSS plano** — sin Tailwind ni preprocesadores, con breakpoints a mano.
- **JS vanilla** — interactividad del cliente (idioma, menú móvil, scroll spy) sin frameworks.
- **Google Fonts** — `Bebas Neue`, `Poppins`, `Pacifico`.
- **GitHub Actions** → **GitHub Pages** para el despliegue automático.

## 📂 Estructura

```
maniaticos-drink/
├── .github/workflows/deploy.yml   # CI/CD → GitHub Pages en cada push a main
├── public/assets/                 # logos
├── src/
│   ├── components/                # 1 componente .astro por sección
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── Menu.astro
│   │   ├── Promos.astro
│   │   ├── Parties.astro
│   │   ├── Testimonials.astro
│   │   └── Footer.astro
│   ├── data/content.json          # ⭐ todos los textos del sitio, en 3 idiomas
│   ├── layouts/Layout.astro
│   ├── pages/index.astro
│   ├── scripts/site.js            # idioma, menú móvil, subrayado del nav
│   └── styles/global.css
└── astro.config.mjs
```

📖 Ver [`CLAUDE.md`](./CLAUDE.md) para la explicación detallada de cada pieza y las convenciones del proyecto.

## ✍️ Editar los textos

Todo el copy del sitio vive en **[`src/data/content.json`](./src/data/content.json)** — no hace falta tocar ningún componente:

```jsonc
{
  "shared": { /* colores por sección, redes sociales — no traducible */ },
  "es": { /* nav, hero, menú, promos, fiestas, opiniones, footer */ },
  "en": { /* mismo esquema en inglés */ },
  "de": { /* mismo esquema en alemán */ }
}
```

- **Cambiar un texto** → editar el string en el idioma correspondiente.
- **Añadir un ítem** (cóctel, promo, reseña...) → añadir el objeto al array en **los tres idiomas**, respetando la forma de los objetos vecinos. El resto se actualiza solo.

## 🚀 Desarrollo

```bash
npm install       # instalar dependencias
npm run dev       # servidor local con recarga en caliente
npm run build     # build de producción → dist/
npm run preview   # previsualizar el build de producción
```

## 🌍 Despliegue

Cada push a `main` dispara `.github/workflows/deploy.yml`, que instala dependencias, corre `npm run build:ghpages` y publica `dist/` en GitHub Pages:

**➡️ https://paginasexternas.github.io/maniaticos-drink/**

## 🌐 Idiomas

El selector ES / EN / DE en el nav (desktop y móvil) cambia todos los textos de la página en el cliente, sin recargar, leyendo el mismo `content.json`. El HTML estático se genera en español para SEO y para navegadores sin JS.
