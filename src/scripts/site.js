const contentEl = document.getElementById('site-content');
const content = JSON.parse(contentEl.textContent);
const { shared } = content;

const SECTION_IDS = shared.navOrder;

const state = {
  lang: 'es',
  navOpen: false,
};

function clearChildren(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function setNavLabels() {
  const t = content[state.lang];
  document.querySelectorAll('[data-nav-link], [data-mobile-nav-link]').forEach((link) => {
    const section = link.getAttribute('data-section');
    link.textContent = t.nav[section];
  });
}

function setHero() {
  const t = content[state.lang];
  document.getElementById('hero-desc').textContent = t.hero.desc;
}

function renderMenu() {
  const t = content[state.lang];
  document.getElementById('menu-eyebrow').textContent = t.menu.eyebrow;
  document.getElementById('menu-title').textContent = t.menu.title;

  const container = document.getElementById('menu-categories');
  clearChildren(container);

  t.menu.categories.forEach((cat) => {
    const catEl = document.createElement('div');
    catEl.className = 'menu-category';

    const head = document.createElement('div');
    head.className = 'cat-head';

    const name = document.createElement('div');
    name.className = 'cat-name';
    name.style.color = cat.color;
    name.textContent = cat.name;

    const rule = document.createElement('div');
    rule.className = 'cat-rule';
    rule.style.background = `linear-gradient(90deg, ${cat.color}55, transparent)`;

    head.append(name, rule);

    const grid = document.createElement('div');
    grid.className = 'menu-item-grid';

    cat.items.forEach((it) => {
      const card = document.createElement('div');
      card.className = 'card';

      const img = document.createElement('img');
      img.src = it.image;
      img.alt = it.name;
      img.loading = 'lazy';

      const itemName = document.createElement('div');
      itemName.className = 'card-name';
      itemName.textContent = it.name;

      const desc = document.createElement('div');
      desc.className = 'card-desc';
      desc.textContent = it.desc;

      card.append(img, itemName, desc);
      grid.append(card);
    });

    catEl.append(head, grid);
    container.append(catEl);
  });
}

function renderPromos() {
  const t = content[state.lang];
  document.getElementById('promos-eyebrow').textContent = t.promos.eyebrow;
  document.getElementById('promos-title').textContent = t.promos.title;
  document.getElementById('promos-disclaimer').textContent = t.promos.disclaimer;

  const container = document.getElementById('promos-items');
  clearChildren(container);

  t.promos.items.forEach((promo) => {
    const card = document.createElement('div');
    card.className = 'promo-card';
    card.style.border = `1px solid ${promo.color}40`;
    card.style.boxShadow = `0 0 24px ${promo.color}22`;

    const title = document.createElement('div');
    title.className = 'promo-title';
    title.style.color = promo.color;
    title.style.textShadow = `0 0 10px ${promo.color}88`;
    title.textContent = promo.title;

    const desc = document.createElement('div');
    desc.className = 'promo-desc';
    desc.textContent = promo.desc;

    card.append(title, desc);
    container.append(card);
  });
}

function renderParties() {
  const t = content[state.lang];
  document.getElementById('fiestas-eyebrow').textContent = t.fiestas.eyebrow;
  document.getElementById('fiestas-title').textContent = t.fiestas.title;

  const container = document.getElementById('fiestas-items');
  clearChildren(container);

  t.fiestas.items.forEach((party) => {
    const card = document.createElement('div');
    card.className = 'party-card';
    card.style.border = `1px solid ${party.color}40`;

    const bar = document.createElement('div');
    bar.className = 'party-bar';
    bar.style.background = party.color;
    bar.style.boxShadow = `0 0 14px ${party.color}`;

    const body = document.createElement('div');
    body.className = 'party-card-body';

    const title = document.createElement('div');
    title.className = 'party-title';
    title.style.color = party.color;
    title.textContent = party.title;

    const desc = document.createElement('div');
    desc.className = 'party-desc';
    desc.textContent = party.desc;

    body.append(title, desc);
    card.append(bar, body);
    container.append(card);
  });
}

function renderTestimonials() {
  const t = content[state.lang];
  document.getElementById('opiniones-eyebrow').textContent = t.opiniones.eyebrow;
  document.getElementById('opiniones-title').textContent = t.opiniones.title;

  const container = document.getElementById('opiniones-items');
  clearChildren(container);

  t.opiniones.items.forEach((tst) => {
    const card = document.createElement('div');
    card.className = 'testi-card';

    const stars = document.createElement('div');
    stars.className = 'testi-stars';
    stars.textContent = tst.stars;

    const quote = document.createElement('div');
    quote.className = 'testi-quote';
    quote.textContent = `"${tst.quote}"`;

    const name = document.createElement('div');
    name.className = 'testi-name';
    name.textContent = tst.name;

    card.append(stars, quote, name);
    container.append(card);
  });
}

function renderFooter() {
  const t = content[state.lang];
  document.getElementById('footer-line').textContent = t.footer.line;
  document.getElementById('footer-credit-label').textContent = t.footer.credit;
}

function updateLangButtons() {
  document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === state.lang);
  });
}

function renderAll() {
  setNavLabels();
  setHero();
  renderMenu();
  renderPromos();
  renderParties();
  renderTestimonials();
  renderFooter();
  updateLangButtons();
  updateUnderline();
}

function setLang(lang) {
  if (!content[lang] || state.lang === lang) return;
  state.lang = lang;
  renderAll();
}

// --- Mobile menu ---
const hamburger = document.getElementById('hamburger');
const mobileMenuPanel = document.getElementById('mobile-menu-panel');
const hamburgerTop = document.getElementById('hamburger-top');
const hamburgerMid = document.getElementById('hamburger-mid');
const hamburgerBot = document.getElementById('hamburger-bot');

function setNavOpen(open) {
  state.navOpen = open;
  mobileMenuPanel.classList.toggle('open', open);
  hamburgerTop.classList.toggle('open', open);
  hamburgerMid.classList.toggle('open', open);
  hamburgerBot.classList.toggle('open', open);
}

hamburger.addEventListener('click', () => setNavOpen(!state.navOpen));

document.querySelectorAll('[data-mobile-nav-link]').forEach((link) => {
  link.addEventListener('click', () => setNavOpen(false));
});

// --- Language switching ---
document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
  btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
});

// --- Scroll spy + underline ---
const navLinksEl = document.getElementById('nav-links');
const underlineEl = document.getElementById('nav-underline');
let activeSection = null;

function updateUnderline() {
  const link = activeSection
    ? navLinksEl.querySelector(`[data-nav-link][data-section="${activeSection}"]`)
    : null;

  if (!navLinksEl || !link) {
    underlineEl.style.opacity = '0';
    return;
  }

  const containerRect = navLinksEl.getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  const color = shared.navColors[activeSection] || '#ff2ec4';

  underlineEl.style.left = `${linkRect.left - containerRect.left}px`;
  underlineEl.style.width = `${linkRect.width}px`;
  underlineEl.style.opacity = '1';
  underlineEl.style.background = color;
  underlineEl.style.boxShadow = `0 0 8px ${color}`;
}

function updateActiveSection() {
  let active = null;
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 140) active = id;
  }
  activeSection = active;
  updateUnderline();
}

window.addEventListener('scroll', updateActiveSection, { passive: true });
window.addEventListener('resize', updateActiveSection);

// Initial render (also refreshes text with any client-side corrections) and layout pass
renderAll();
setTimeout(updateActiveSection, 50);
