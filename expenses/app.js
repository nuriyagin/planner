'use strict';
/* Учёт расходов — прототип. Данные хранятся в localStorage; позже переедут в Supabase. */

/* ================= утилиты ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 10);
const round2 = n => Math.round(n * 100) / 100;
const parseNum = v => { const n = parseFloat(String(v ?? '').replace(/\s/g, '').replace(',', '.')); return isFinite(n) ? n : 0; };
const numIn = (n, d = 2) => (n || n === 0) && n !== '' ? String(+(+n).toFixed(d)).replace('.', ',') : '';
const sum = (arr, f = x => x) => arr.reduce((a, x) => a + f(x), 0);

const eur = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'EUR' });
const money = n => eur.format(round2(n));
const moneyBig = n => {
  const s = money(n);
  const m = s.match(/^(.*?)(,\d{2})(\s*€)$/);
  return m ? `${esc(m[1])}<span class="cents">${m[2]}</span>${m[3]}` : esc(s);
};
const short = n => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace('.', ',') + 'k' : String(Math.round(n));

const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toDate = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const mondayOf = d => addDays(d, -((d.getDay() + 6) % 7));
const MONTHS = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
const MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const MONTHS_SH = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const MONTHS_LETTER = ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'];
const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const WD_LONG = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
const wdi = d => (d.getDay() + 6) % 7;
const dayLabel = s => {
  const t = today();
  if (s === iso(t)) return 'Сегодня';
  if (s === iso(addDays(t, -1))) return 'Вчера';
  const d = toDate(s);
  return `${WD_LONG[wdi(d)]}, ${d.getDate()} ${MONTHS_GEN[d.getMonth()]}`;
};
const dateShort = s => { const d = toDate(s); return `${d.getDate()} ${MONTHS_SH[d.getMonth()]}`; };
const plural = (n, a, b, c) => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? a : m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20) ? b : c; };
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

/* ================= иконки ================= */
const ICONS = {
  scan: '<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  basket: '<path d="M3 10h18l-1.6 9.2a1 1 0 0 1-1 .8H5.6a1 1 0 0 1-1-.8z"/><path d="m8 10 3-6M16 10l-3-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  chev: '<path d="m9 18 6-6-6-6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  party: '<path d="M12 3l2.4 5.6L20 9.5l-4.3 3.9L17 19l-5-3-5 3 1.3-5.6L4 9.5l5.6-.9z"/>',
  tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  camera: '<path d="M3 8a2 2 0 0 1 2-2h2l2-3h6l2 3h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  refresh: '<path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5"/>',
  edit: '<path d="M4 20h4L20 8l-4-4L4 16z"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  alert: '<path d="M12 9v4M12 17h.01"/><circle cx="12" cy="12" r="9"/>',
  arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
};
const ic = (n, extra = '') => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true" ${extra}>${ICONS[n] || ''}</svg>`;

/* ================= данные ================= */
const BASE_CATS = [
  ['veg', 'Овощи и фрукты', '🥕', '#6E9A4F'],
  ['meat', 'Мясо и птица', '🥩', '#9E2A2B'],
  ['fish', 'Рыба и морепродукты', '🐟', '#4E8A99'],
  ['dairy', 'Молочное и яйца', '🥛', '#B9A160'],
  ['bread', 'Хлеб и выпечка', '🥖', '#C98B3A'],
  ['grocery', 'Бакалея', '🍝', '#8C6A3E'],
  ['cheese', 'Сыры и хамон', '🧀', '#E09F3E'],
  ['ready', 'Готовая еда', '🍱', '#B5653C'],
  ['drinks', 'Напитки', '🧃', '#5E9C8F'],
  ['alco', 'Алкоголь', '🍷', '#6E2B3F'],
  ['sweets', 'Сладости и снеки', '🍫', '#A0522D'],
  ['frozen', 'Заморозка', '🧊', '#6F95A8'],
  ['chem', 'Бытовая химия', '🧴', '#335C67'],
  ['hygiene', 'Гигиена', '🪥', '#7D8C8F'],
  ['dispos', 'Одноразовая посуда', '🥤', '#C4A35A'],
  ['decor', 'Декор для мероприятий', '🎈', '#C0504D'],
  ['other', 'Прочее', '📦', '#8A8F8C'],
].map(([id, name, emoji, color], i) => ({ id, name, emoji, color, base: true, hidden: false, order: i }));

const UNITS = ['шт', 'кг', 'г', 'л', 'уп'];
const KEY = 'expenses-v1';
let S;

function mulberry32(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

function seed() {
  const rnd = mulberry32(11);
  const r = (a, b) => a + rnd() * (b - a);
  const pick = a => a[Math.floor(rnd() * a.length)];
  const T = today();
  // [название, категория, ед., цена от, до, кол-во от, до]
  const C = {
    tomato: ['Помидоры', 'veg', 'кг', 1.9, 3.2, 0.6, 2], cucumber: ['Огурцы', 'veg', 'кг', 1.4, 2.4, 0.4, 1.2],
    potato: ['Картофель', 'veg', 'кг', 0.9, 1.4, 1, 3], onion: ['Лук', 'veg', 'кг', 1, 1.6, 0.5, 1.5],
    avocado: ['Авокадо', 'veg', 'шт', 0.8, 1.3, 2, 4], orange: ['Апельсины', 'veg', 'кг', 1.2, 1.9, 1, 3],
    banana: ['Бананы', 'veg', 'кг', 1.3, 1.9, 0.8, 1.6], straw: ['Клубника', 'veg', 'уп', 2.5, 3.5, 1, 2],
    pepper: ['Перец сладкий', 'veg', 'кг', 2.4, 3.6, 0.4, 1], lemon: ['Лимоны', 'veg', 'кг', 1.6, 2.4, 0.3, 1],
    chicken: ['Куриная грудка', 'meat', 'кг', 6.5, 8.2, 0.5, 1.2], pork: ['Свиная вырезка', 'meat', 'кг', 7, 9.5, 0.5, 1],
    mince: ['Фарш говяжий', 'meat', 'кг', 8, 10.5, 0.4, 1],
    salmon: ['Лосось', 'fish', 'кг', 14, 18, 0.3, 0.7], shrimp: ['Креветки', 'fish', 'кг', 9, 13, 0.3, 0.8],
    milk: ['Молоко 1 л', 'dairy', 'шт', 0.9, 1.1, 2, 6], yogurt: ['Йогурт натуральный', 'dairy', 'уп', 1.3, 1.9, 1, 2],
    eggs: ['Яйца 12 шт', 'dairy', 'уп', 2.2, 2.9, 1, 1],
    baguette: ['Багет', 'bread', 'шт', 0.5, 0.9, 1, 2], bread: ['Хлеб цельнозерновой', 'bread', 'шт', 1.4, 2.2, 1, 1],
    pasta: ['Макароны', 'grocery', 'уп', 0.9, 1.6, 1, 3], rice: ['Рис', 'grocery', 'уп', 1.1, 1.8, 1, 2],
    oil: ['Оливковое масло 1 л', 'grocery', 'шт', 7.5, 9.9, 1, 1],
    manchego: ['Сыр манчего', 'cheese', 'кг', 14, 19, 0.25, 0.6], jamon: ['Хамон серрано', 'cheese', 'кг', 18, 28, 0.15, 0.4],
    water: ['Вода 6×1,5 л', 'drinks', 'уп', 1.6, 2.4, 1, 2], juice: ['Сок апельсиновый', 'drinks', 'шт', 1.6, 2.6, 1, 2],
    wine: ['Вино Rioja', 'alco', 'шт', 5.5, 11, 1, 2], beer: ['Пиво 6×0,33', 'alco', 'уп', 3.5, 5.2, 1, 2],
    cava: ['Кава брют', 'alco', 'шт', 4.5, 8, 1, 2],
    choco: ['Шоколад', 'sweets', 'шт', 1.2, 2.5, 1, 3], chips: ['Чипсы', 'sweets', 'уп', 1.1, 1.9, 1, 2],
    icecream: ['Мороженое', 'frozen', 'уп', 2.5, 4, 1, 1], dish: ['Средство для посуды', 'chem', 'шт', 1.5, 2.6, 1, 1],
    towels: ['Бумажные полотенца', 'chem', 'уп', 1.8, 2.8, 1, 1], paste: ['Зубная паста', 'hygiene', 'шт', 1.8, 3.2, 1, 1],
    cups: ['Одноразовые стаканы', 'dispos', 'уп', 2, 3.5, 2, 5], napkins: ['Салфетки', 'dispos', 'уп', 1.2, 2.2, 2, 4],
    plates: ['Тарелки бумажные', 'dispos', 'уп', 2.5, 4, 2, 4], balloons: ['Воздушные шары', 'decor', 'уп', 4, 7, 1, 3],
    candles: ['Свечи', 'decor', 'уп', 3, 6, 1, 3], ice: ['Лёд', 'frozen', 'уп', 1.2, 2, 3, 6],
  };
  const mk = (key, purpose = 'home', qMul = 1) => {
    const [name, cat, unit, pa, pb, qa, qb] = C[key];
    const price = round2(r(pa, pb));
    let qty = r(qa, qb) * qMul;
    qty = unit === 'кг' ? Math.round(qty * 100) / 100 : Math.max(1, Math.round(qty));
    return { id: uid(), name, orig: '', qty, unit, price, sum: round2(price * qty), cat, purpose };
  };
  const events = [
    { id: 'e1', name: 'День рождения Марии', date: iso(addDays(T, -20)), guests: 25, budget: 600, client: 'Мария' },
    { id: 'e2', name: 'Корпоратив Nova', date: iso(addDays(T, 6)), guests: 40, budget: 1200, client: 'Nova Studio' },
    { id: 'e3', name: 'Свадьба Лопес', date: iso(addDays(T, 21)), guests: 80, budget: 3000, client: 'Семья Лопес' },
  ];
  const purchases = [];
  const add = (d, vendor, source, items) => purchases.push({ id: uid(), date: iso(d), vendor, source, items, created: +d + purchases.length });
  const superKeys = ['milk', 'yogurt', 'eggs', 'baguette', 'bread', 'pasta', 'rice', 'chicken', 'pork', 'mince', 'water', 'juice', 'beer', 'choco', 'chips', 'icecream', 'dish', 'towels', 'paste', 'banana', 'wine', 'oil'];
  const markets = [
    ['Рынок · овощи Хосе', ['tomato', 'cucumber', 'potato', 'onion', 'avocado', 'orange', 'straw', 'pepper', 'lemon', 'banana']],
    ['Рынок · сыры и хамон', ['manchego', 'jamon']],
    ['Рынок · рыба', ['salmon', 'shrimp']],
  ];
  for (let k = -75; k <= 0; k++) {
    const d = addDays(T, k);
    if (wdi(d) === 5) {
      markets.forEach(([v, keys], mi) => {
        if (mi > 0 && rnd() < 0.45) return;
        const n = mi === 0 ? 6 + Math.floor(rnd() * 5) : keys.length;
        const ks = [...keys].sort(() => rnd() - 0.5).slice(0, n);
        add(d, v, 'batch', ks.map(x => mk(x)));
      });
    } else if (rnd() < 0.42) {
      const n = 3 + Math.floor(rnd() * 5);
      const ks = [...superKeys].sort(() => rnd() - 0.5).slice(0, n);
      add(d, pick(['Mercadona', 'Mercadona', 'Lidl', 'Carrefour']), rnd() < 0.6 ? 'receipt' : 'manual', ks.map(x => mk(x)));
    }
  }
  // закупки под мероприятия
  const e1 = toDate(events[0].date);
  add(addDays(e1, -2), 'Makro', 'receipt', [mk('wine', 'e1', 9), mk('cava', 'e1', 5), mk('beer', 'e1', 3), mk('cups', 'e1'), mk('napkins', 'e1'), mk('plates', 'e1'), mk('balloons', 'e1'), mk('ice', 'e1')]);
  add(addDays(e1, -1), 'Рынок · сыры и хамон', 'batch', [mk('manchego', 'e1', 4), mk('jamon', 'e1', 4)]);
  add(addDays(e1, -1), 'Рынок · овощи Хосе', 'batch', [mk('tomato', 'e1', 2), mk('avocado', 'e1', 3), mk('lemon', 'e1', 2), mk('straw', 'e1', 2), mk('potato'), mk('onion')]);
  add(addDays(T, -2), 'Makro', 'receipt', [mk('wine', 'e2', 12), mk('cava', 'e2', 8), mk('cups', 'e2', 2), mk('plates', 'e2', 2), mk('napkins', 'e2', 2)]);
  add(addDays(T, -1), 'Mercadona', 'receipt', [mk('milk'), mk('baguette'), mk('chicken'), mk('chips', 'e2', 6), mk('juice', 'e2', 5), mk('water', 'e2', 4)]);
  add(addDays(T, -5), 'Party Fiesta', 'manual', [mk('balloons', 'e3', 3), mk('candles', 'e3', 4)]);
  const products = {};
  purchases.forEach(p => p.items.forEach(i => { products[i.name.toLowerCase()] = { name: i.name, cat: i.cat, unit: i.unit }; }));
  return { v: 1, categories: BASE_CATS.map(c => ({ ...c })), events, purchases, products };
}

function load() { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 1) return s; } catch (e) { } return null; }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
S = load() || seed(); save();

const catById = id => S.categories.find(c => c.id === id) || S.categories.find(c => c.id === 'other') || BASE_CATS.at(-1);
const evById = id => S.events.find(e => e.id === id);
const visibleCats = () => S.categories.filter(c => !c.hidden).sort((a, b) => a.order - b.order);
const allItems = () => S.purchases.flatMap(p => p.items.map(i => ({ ...i, date: p.date, pid: p.id, vendor: p.vendor })));
const inRange = (items, from, to) => items.filter(i => i.date >= from && i.date <= to);
const isEv = i => i.purpose && i.purpose !== 'home';
const matchPurpose = (i, p) => p === 'all' || (p === 'home' ? !isEv(i) : p === 'events' ? isEv(i) : i.purpose === p);
const purposeLabel = p => p === 'home' || !p ? 'Дом' : (evById(p)?.name || 'Мероприятие');
const ptag = p => p === 'home' || !p ? `<span class="ptag home">Дом</span>` : `<span class="ptag ev">${esc(purposeLabel(p))}</span>`;
const sortedEvents = () => [...S.events].sort((a, b) => a.date.localeCompare(b.date));
const upcomingFirst = () => { const t = iso(today()); const ev = sortedEvents(); return [...ev.filter(e => e.date >= t), ...ev.filter(e => e.date < t).reverse()]; };

const AV_COLORS = [['var(--slate)', 'var(--vanilla)'], ['var(--yellow)', 'var(--ink)'], ['var(--red)', 'var(--vanilla)'], ['var(--vanilla)', 'var(--slate-deep)'], ['var(--slate-deep)', 'var(--yellow)']];
const avatar = (name, source) => {
  let h = 0; for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const [bg, fg] = AV_COLORS[h % AV_COLORS.length];
  const clean = name.replace(/^Рынок\s·\s/, '');
  const ini = clean.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const inner = source === 'batch' && /^Рынок/.test(name) ? ic('basket') : esc(ini || '•');
  return `<span class="av" style="background:${bg};color:${fg}">${inner}</span>`;
};
const catIc = c => `<span class="cat-ic" style="background:${c.color}22">${c.emoji}</span>`;

/* ================= роутер ================= */
const app = $('#app');
let ED = null;   // состояние редактора позиций
let SG = null;   // состояние формы одной позиции
const ST = { period: 'month', offset: 0, purpose: 'all', sel: null };
const HI = { q: '', purpose: 'all' };

const routes = [
  [/^#\/(home)?$/, viewHome, 'home'],
  [/^#\/stats$/, viewStats, 'stats'],
  [/^#\/history$/, viewHistory, 'history'],
  [/^#\/more$/, viewMore, 'more'],
  [/^#\/events$/, viewEvents, 'more'],
  [/^#\/event\/(\w+)$/, viewEvent, 'more'],
  [/^#\/categories$/, viewCategories, 'more'],
  [/^#\/add\/single$/, viewSingle, null],
  [/^#\/add\/batch$/, () => viewEditor('batch'), null],
  [/^#\/add\/receipt$/, viewReceipt, null],
  [/^#\/edit\/(\w+)$/, id => viewEditor('edit', id), null],
];
let lastRoute = '';
function render() {
  const h = location.hash || '#/home';
  for (const [re, fn, tab] of routes) {
    const m = h.match(re);
    if (!m) continue;
    if (h !== lastRoute) { if (!/^#\/(add|edit)/.test(h)) { ED = null; SG = null; } }
    document.body.classList.toggle('no-nav', tab === null);
    $$('#nav [data-tab]').forEach(a => a.classList.toggle('on', a.dataset.tab === tab));
    app.innerHTML = fn(...m.slice(1).filter(x => x !== undefined && x !== 'home'));
    fitAmount();
    if (h !== lastRoute) window.scrollTo(0, 0);
    lastRoute = h;
    return;
  }
  location.hash = '#/home';
}
window.addEventListener('hashchange', () => { closeSheet(); render(); });
const go = h => { location.hash = h; };

/* ================= общие куски ================= */
const topbar = (title, { back: b = '#/home', right = '<span class="spacer"></span>' } = {}) =>
  `<header class="topbar"><button class="round" data-act="back" data-to="${b}" aria-label="Назад">${ic('back')}</button><h1>${esc(title)}</h1>${right}</header>`;

function purchaseRow(p, purpose = 'all', q = '') {
  const items = p.items.filter(i => matchPurpose(i, purpose) && (!q || (i.name + ' ' + (i.orig || '')).toLowerCase().includes(q)));
  if (!items.length) return '';
  const total = sum(items, i => i.sum);
  const cats = [...new Set(items.map(i => catById(i.cat).name))];
  const sub = `${items.length} ${plural(items.length, 'позиция', 'позиции', 'позиций')} · ${cats.slice(0, 2).join(', ')}${cats.length > 2 ? ' +' + (cats.length - 2) : ''}`;
  const purposes = [...new Set(items.map(i => i.purpose || 'home'))];
  const tags = purposes.length > 1 ? `<span class="ptag home">Дом</span><span class="ptag ev">+ мероприятие</span>` : ptag(purposes[0]);
  return `<button class="tx" data-act="purchase" data-id="${p.id}">
    ${avatar(p.vendor || 'Покупка', p.source)}
    <span class="mid"><div class="t">${esc(p.vendor || 'Без продавца')}</div><div class="s">${esc(sub)}</div></span>
    <span class="amt num">−${esc(money(total))}<div class="ptags">${tags}</div></span>
  </button>`;
}

function feed(purchases, purpose = 'all', q = '') {
  const byDay = {};
  purchases.forEach(p => { (byDay[p.date] ||= []).push(p); });
  const days = Object.keys(byDay).sort().reverse();
  let html = '';
  for (const d of days) {
    const rows = byDay[d].sort((a, b) => (b.created || 0) - (a.created || 0)).map(p => purchaseRow(p, purpose, q)).filter(Boolean);
    if (!rows.length) continue;
    html += `<div class="day-label"><span>${esc(dayLabel(d))}</span></div>` + rows.join('');
  }
  return html || `<div class="empty">Ничего не найдено</div>`;
}

/* ================= Главная ================= */
function viewHome() {
  const T = today(), t = iso(T);
  const all = allItems();
  const mFrom = iso(new Date(T.getFullYear(), T.getMonth(), 1));
  const month = inRange(all, mFrom, t);
  const pmStart = new Date(T.getFullYear(), T.getMonth() - 1, 1);
  const pmEndDay = Math.min(T.getDate(), new Date(T.getFullYear(), T.getMonth(), 0).getDate());
  const prev = inRange(all, iso(pmStart), iso(new Date(pmStart.getFullYear(), pmStart.getMonth(), pmEndDay)));
  const mSum = sum(month, i => i.sum), pSum = sum(prev, i => i.sum);
  const home = sum(month.filter(i => !isEv(i)), i => i.sum), evs = mSum - home;
  const diff = pSum ? Math.round((mSum - pSum) / pSum * 100) : 0;
  const diffTxt = !pSum ? 'Первый месяц учёта' : diff === 0 ? `Как в ${MONTHS[pmStart.getMonth()].replace(/ь$/, 'е').replace(/й$/, 'е').replace(/т$/, 'те')}` : `${diff > 0 ? '↑' : '↓'} на ${Math.abs(diff)}% ${diff > 0 ? 'больше' : 'меньше'}, чем за те же дни ${MONTHS_GEN[pmStart.getMonth()]}`;

  // неделя
  const mon = mondayOf(T);
  const week = [...Array(7)].map((_, k) => { const d = iso(addDays(mon, k)); const it = all.filter(i => i.date === d); return { label: WD[k], home: sum(it.filter(i => !isEv(i)), i => i.sum), ev: sum(it.filter(isEv), i => i.sum), future: d > t, today: d === t }; });
  const wSum = sum(week, w => w.home + w.ev);

  const recent = [...S.purchases].sort((a, b) => b.date.localeCompare(a.date) || (b.created || 0) - (a.created || 0)).slice(0, 6);
  const nextEv = sortedEvents().find(e => e.date >= t);
  const evSpent = nextEv ? sum(all.filter(i => i.purpose === nextEv.id), i => i.sum) : 0;
  const hours = new Date().getHours();
  const greet = hours < 5 ? 'Доброй ночи' : hours < 12 ? 'Доброе утро' : hours < 18 ? 'Добрый день' : 'Добрый вечер';

  return `
  <header class="topbar">
    <div class="hello"><small>${esc(cap(WD_LONG[wdi(T)]))}, ${T.getDate()} ${MONTHS_GEN[T.getMonth()]}</small><b>${greet}</b></div>
    <a class="round" href="#/events" aria-label="Мероприятия">${ic('calendar')}${nextEv ? `<span class="dot">${S.events.filter(e => e.date >= t).length}</span>` : ''}</a>
  </header>

  <section class="hero">
    <div class="label">Потрачено в ${esc(MONTHS[T.getMonth()].replace(/ь$/, 'е').replace(/й$/, 'е').replace(/т$/, 'те'))}</div>
    <div class="big num">${moneyBig(mSum)}</div>
    <span class="pill vanilla">${esc(diffTxt)}</span>
  </section>

  <div class="quick">
    <a class="qa primary" href="#/add/receipt"><span class="ic">${ic('scan')}</span>Чек</a>
    <a class="qa" href="#/add/single"><span class="ic">${ic('pen')}</span>Позиция</a>
    <a class="qa" href="#/add/batch"><span class="ic">${ic('basket')}</span>Рынок</a>
  </div>

  <div class="tiles">
    <a class="tile home" href="#/stats" data-act="stats-preset" data-v="home"><span class="t-ic">${ic('home')}</span><span><small>Для дома</small><b class="num">${esc(money(home))}</b></span></a>
    <a class="tile ev" href="#/stats" data-act="stats-preset" data-v="events"><span class="t-ic">${ic('party')}</span><span><small>Мероприятия</small><b class="num">${esc(money(evs))}</b></span></a>
  </div>

  <div class="sec"><h2>Эта неделя</h2><span class="muted num">${esc(money(wSum))}</span></div>
  <div class="card chart">${weekBars(week)}
    <div class="legend"><span><i style="background:var(--home)"></i>Дом</span><span><i style="background:var(--event)"></i>Мероприятия</span></div>
  </div>

  ${nextEv ? `<div class="sec"><h2>Ближайшее мероприятие</h2><a href="#/events">Все ›</a></div>${eventCard(nextEv, evSpent)}` : ''}

  <div class="sec"><h2>Последние покупки</h2><a href="#/history">Все ›</a></div>
  ${recent.length ? feed(recent) : `<div class="empty">Пока пусто. Нажмите «+», чтобы добавить первую покупку.</div>`}
  `;
}

function weekBars(week) {
  const W = 340, H = 150, pb = 24, pt = 18;
  const max = Math.max(1, ...week.map(w => w.home + w.ev));
  const cw = W / 7, bw = 26;
  let s = '';
  week.forEach((w, k) => {
    const x = k * cw + (cw - bw) / 2;
    const tot = w.home + w.ev;
    const hh = (w.home / max) * (H - pb - pt), eh = (w.ev / max) * (H - pb - pt);
    const base = H - pb;
    if (!tot) s += `<rect x="${x}" y="${base - 4}" width="${bw}" height="4" rx="2" fill="var(--surface)"/>`;
    if (w.home) s += `<rect x="${x}" y="${base - hh}" width="${bw}" height="${hh}" rx="7" fill="var(--home)"/>`;
    if (w.ev) s += `<rect x="${x}" y="${base - hh - eh - (w.home ? 3 : 0)}" width="${bw}" height="${eh}" rx="7" fill="var(--event)"/>`;
    if (tot) s += `<text x="${x + bw / 2}" y="${base - hh - eh - (w.home && w.ev ? 3 : 0) - 6}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--muted)">${short(tot)}</text>`;
    s += `<text x="${x + bw / 2}" y="${H - 6}" text-anchor="middle" font-size="12" font-weight="${w.today ? 800 : 500}" fill="${w.today ? 'var(--ink)' : 'var(--muted)'}">${w.label}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Расходы по дням недели">${s}</svg>`;
}

function eventCard(e, spent) {
  const d = toDate(e.date), past = e.date < iso(today());
  const pct = e.budget ? Math.min(100, spent / e.budget * 100) : 0;
  const over = e.budget && spent > e.budget;
  return `<a class="ev-card" href="#/event/${e.id}">
    <div class="ev-top">
      <span class="datebox ${past ? 'past' : ''}"><b>${d.getDate()}</b><small>${MONTHS_SH[d.getMonth()]}</small></span>
      <span class="mid"><div class="t">${esc(e.name)}</div><div class="s">${e.guests ? `${e.guests} ${plural(e.guests, 'гость', 'гостя', 'гостей')}` : ''}${e.client ? ` · ${esc(e.client)}` : ''}</div></span>
      ${ic('chev')}
    </div>
    ${e.budget ? `<div class="meter red ${over ? 'over' : ''}"><i style="width:${pct}%"></i></div>` : ''}
    <div class="ev-meta"><span>Потрачено <b class="num">${esc(money(spent))}</b></span>${e.budget ? `<span class="num">${over ? 'перерасход ' + esc(money(spent - e.budget)) : 'бюджет ' + esc(money(e.budget))}</span>` : ''}</div>
  </a>`;
}

/* ================= Статистика ================= */
function rangeFor(period, offset) {
  const T = today();
  if (period === 'week') {
    const s = addDays(mondayOf(T), offset * 7), e = addDays(s, 6);
    const buckets = [...Array(7)].map((_, k) => { const d = addDays(s, k); return { from: iso(d), to: iso(d), label: WD[k], full: `${WD_LONG[k]}, ${d.getDate()} ${MONTHS_GEN[d.getMonth()]}`, show: true }; });
    return { from: iso(s), to: iso(e), buckets, title: `${s.getDate()} ${MONTHS_SH[s.getMonth()]} – ${e.getDate()} ${MONTHS_SH[e.getMonth()]}`, unit: 'день' };
  }
  if (period === 'month') {
    const s = new Date(T.getFullYear(), T.getMonth() + offset, 1);
    const n = new Date(s.getFullYear(), s.getMonth() + 1, 0).getDate();
    const buckets = [...Array(n)].map((_, k) => { const d = new Date(s.getFullYear(), s.getMonth(), k + 1); return { from: iso(d), to: iso(d), label: String(k + 1), full: `${WD_LONG[wdi(d)]}, ${k + 1} ${MONTHS_GEN[s.getMonth()]}`, show: [1, 5, 10, 15, 20, 25, n].includes(k + 1) }; });
    return { from: iso(s), to: iso(new Date(s.getFullYear(), s.getMonth(), n)), buckets, title: `${MONTHS[s.getMonth()]} ${s.getFullYear()}`, unit: 'день', monthStart: s };
  }
  const y = T.getFullYear() + offset;
  const buckets = [...Array(12)].map((_, m) => ({ from: `${y}-${pad(m + 1)}-01`, to: iso(new Date(y, m + 1, 0)), label: MONTHS_LETTER[m], full: `${cap(MONTHS[m])} ${y}`, show: true }));
  return { from: `${y}-01-01`, to: `${y}-12-31`, buckets, title: String(y), unit: 'месяц' };
}

function niceMax(v) { if (v <= 0) return 10; const p = 10 ** Math.floor(Math.log10(v)); const n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p; }

function barChart(b, sel) {
  const W = 340, H = 190, pl = 34, pb = 22, pt = 8;
  const max = niceMax(Math.max(...b.map(x => x.home + x.ev)));
  const ch = H - pb - pt;
  const cw = (W - pl) / b.length, bw = Math.max(4, Math.min(22, cw * 0.62));
  let s = '';
  [0, 0.5, 1].forEach(f => {
    const y = pt + ch * (1 - f);
    s += `<line x1="${pl}" x2="${W}" y1="${y}" y2="${y}" stroke="var(--line)" stroke-dasharray="${f ? '3 4' : '0'}"/>`;
    s += `<text x="${pl - 6}" y="${y + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${short(max * f)}</text>`;
  });
  const rx = Math.min(6, bw / 2.4);
  b.forEach((x, k) => {
    const cx = pl + k * cw + cw / 2, bx = cx - bw / 2, base = pt + ch;
    const hh = x.home / max * ch, eh = x.ev / max * ch;
    const dim = sel !== null && sel !== k ? ' opacity=".3"' : '';
    if (x.home) s += `<rect x="${bx}" y="${base - hh}" width="${bw}" height="${hh}" rx="${rx}" fill="var(--home)"${dim}/>`;
    if (x.ev) s += `<rect x="${bx}" y="${base - hh - eh - (x.home ? 2 : 0)}" width="${bw}" height="${eh}" rx="${rx}" fill="var(--event)"${dim}/>`;
    if (x.show) s += `<text x="${cx}" y="${H - 5}" text-anchor="middle" font-size="11" font-weight="${sel === k ? 800 : 500}" fill="${sel === k ? 'var(--ink)' : 'var(--muted)'}">${x.label}</text>`;
    s += `<rect x="${pl + k * cw}" y="0" width="${cw}" height="${H}" fill="transparent" data-act="stats-bar" data-i="${k}" style="cursor:pointer"><title>${esc(x.full)}: ${esc(money(x.home + x.ev))}</title></rect>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="График расходов">${s}</svg>`;
}

function calendarHeat(rg, buckets, sel) {
  const s = rg.monthStart, lead = wdi(s), t = iso(today());
  const max = Math.max(1, ...buckets.map(b => b.home + b.ev));
  let html = WD.map(w => `<div class="h">${w}</div>`).join('') + '<div></div>'.repeat(lead);
  buckets.forEach((b, k) => {
    const v = b.home + b.ev, a = v ? 0.18 + 0.82 * (v / max) : 0;
    const style = v ? `background:rgba(224,159,62,${a.toFixed(2)})` : '';
    html += `<button class="${b.from === t ? 'today' : ''} ${sel === k ? 'sel' : ''} ${b.from > t ? 'future' : ''}" style="${style}" data-act="stats-bar" data-i="${k}" aria-label="${esc(b.full)}: ${esc(money(v))}">${k + 1}</button>`;
  });
  return `<div class="cal">${html}</div><div class="scale">меньше <i style="background:var(--surface)"></i><i style="background:rgba(224,159,62,.35)"></i><i style="background:rgba(224,159,62,.65)"></i><i style="background:rgba(224,159,62,1)"></i> больше</div>`;
}

function catBreakdown(items, { limit = 99 } = {}) {
  const total = sum(items, i => i.sum) || 1;
  const by = {};
  items.forEach(i => { by[i.cat] = (by[i.cat] || 0) + i.sum; });
  const rows = Object.entries(by).sort((a, b) => b[1] - a[1]).slice(0, limit);
  if (!rows.length) return `<div class="empty">Нет покупок за этот период</div>`;
  return rows.map(([id, v]) => {
    const c = catById(id);
    return `<div class="cat-row">${catIc(c)}<div><div class="nm">${esc(c.name)} <span class="num">${Math.round(v / total * 100)}%</span></div><div class="meter"><i style="width:${v / rows[0][1] * 100}%;background:${c.color}"></i></div></div><div class="sum num">${esc(money(v))}</div></div>`;
  }).join('');
}

function viewStats() {
  const rg = rangeFor(ST.period, ST.offset);
  const prg = rangeFor(ST.period, ST.offset - 1);
  const all = allItems().filter(i => matchPurpose(i, ST.purpose));
  const items = inRange(all, rg.from, rg.to);
  const prevSum = sum(inRange(all, prg.from, prg.to), i => i.sum);
  const total = sum(items, i => i.sum);
  const buckets = rg.buckets.map(b => { const it = items.filter(i => i.date >= b.from && i.date <= b.to); return { ...b, home: sum(it.filter(i => !isEv(i)), i => i.sum), ev: sum(it.filter(isEv), i => i.sum) }; });
  if (ST.sel !== null && ST.sel >= buckets.length) ST.sel = null;
  const diff = prevSum ? Math.round((total - prevSum) / prevSum * 100) : null;
  const t = iso(today());
  const elapsed = buckets.filter(b => b.from <= t).length || 1;
  const days = buckets.filter(b => b.home + b.ev > 0).length;
  const selB = ST.sel !== null ? buckets[ST.sel] : null;
  const head = selB
    ? `<span>${esc(cap(selB.full))}</span><b class="num">${esc(money(selB.home + selB.ev))}</b>`
    : `<span class="muted">В среднем за ${rg.unit}</span><b class="num">${esc(money(total / elapsed))}</b>`;
  const homeSum = sum(items.filter(i => !isEv(i)), i => i.sum), evSum = total - homeSum;

  // топ продуктов
  const prod = {};
  items.forEach(i => { const k = i.name.toLowerCase(); (prod[k] ||= { name: i.name, cat: i.cat, sum: 0, qty: 0, unit: i.unit, n: 0 }); prod[k].sum += i.sum; prod[k].qty += i.qty || 0; prod[k].n++; });
  const top = Object.values(prod).sort((a, b) => b.sum - a.sum).slice(0, 6);

  const selItems = selB ? items.filter(i => i.date >= selB.from && i.date <= selB.to) : null;

  return `
  <header class="topbar"><span class="spacer"></span><h1>Статистика</h1><span class="spacer"></span></header>
  <div class="seg" role="tablist">
    ${[['week', 'Неделя'], ['month', 'Месяц'], ['year', 'Год']].map(([v, l]) => `<button class="${ST.period === v ? 'on' : ''}" data-act="stats-period" data-v="${v}">${l}</button>`).join('')}
  </div>
  <div class="period">
    <button class="round" data-act="stats-shift" data-v="-1" aria-label="Предыдущий период">${ic('back')}</button>
    <b>${esc(rg.title)}</b>
    <button class="round" data-act="stats-shift" data-v="1" aria-label="Следующий период" ${ST.offset >= 0 ? 'disabled' : ''}>${ic('chev')}</button>
  </div>
  <div class="chips" style="margin-bottom:12px">
    ${[['all', 'Всё'], ['home', 'Дом'], ['events', 'Мероприятия']].map(([v, l]) => `<button class="chip ${ST.purpose === v ? 'on' : ''}" data-act="stats-purpose" data-v="${v}">${l}</button>`).join('')}
  </div>

  <div class="card">
    <div class="total-line"><div><div class="muted" style="font-size:14px">Потрачено</div><div class="big num">${moneyBig(total)}</div></div>
      ${diff !== null ? `<span class="delta ${diff > 0 ? 'up' : diff < 0 ? 'down' : ''}">${diff > 0 ? '↑' : diff < 0 ? '↓' : ''} ${Math.abs(diff)}% к прошлому периоду</span>` : ''}</div>
    <div class="muted" style="font-size:13px;margin:-2px 0 14px">${days} ${plural(days, 'день', 'дня', 'дней')} с покупками</div>
    <div class="chart-head">${head}</div>
    <div class="chart">${barChart(buckets, ST.sel)}</div>
    <div class="legend"><span><i style="background:var(--home)"></i>Дом</span><span><i style="background:var(--event)"></i>Мероприятия</span></div>
  </div>

  ${selItems ? `<div class="sec"><h2>${esc(cap(selB.full))}</h2><button data-act="stats-bar" data-i="${ST.sel}">Сбросить</button></div>
    <div class="card items-list">${selItems.length ? selItems.map(itemLine).join('') : '<div class="empty">В этот день покупок не было</div>'}</div>` : ''}

  ${ST.period === 'month' ? `<div class="sec"><h2>Календарь покупок</h2></div><div class="card">${calendarHeat(rg, buckets, ST.sel)}</div>` : ''}

  ${ST.purpose === 'all' ? `<div class="tiles">
    <button class="tile home" data-act="stats-purpose" data-v="home"><span class="t-ic">${ic('home')}</span><span><small>Дом · ${total ? Math.round(homeSum / total * 100) : 0}%</small><b class="num">${esc(money(homeSum))}</b></span></button>
    <button class="tile ev" data-act="stats-purpose" data-v="events"><span class="t-ic">${ic('party')}</span><span><small>Мероприятия · ${total ? Math.round(evSum / total * 100) : 0}%</small><b class="num">${esc(money(evSum))}</b></span></button>
  </div>` : ''}

  <div class="sec"><h2>По категориям</h2><a href="#/categories">Настроить ›</a></div>
  <div class="card">${catBreakdown(items)}</div>

  <div class="sec"><h2>Топ продуктов</h2></div>
  <div class="card top-list">${top.length ? top.map(p => `<div class="tx"><span class="av">${catById(p.cat).emoji}</span><span class="mid"><div class="t">${esc(p.name)}</div><div class="s">${p.n} ${plural(p.n, 'покупка', 'покупки', 'покупок')} · ${numIn(p.qty, p.unit === 'кг' ? 2 : 0)} ${esc(p.unit)}</div></span><span class="amt num">${esc(money(p.sum))}</span></div>`).join('') : '<div class="empty">Нет данных</div>'}</div>
  `;
}

function itemLine(i, showPurpose = true) {
  const c = catById(i.cat);
  return `<div class="it">${catIc(c)}<div class="mid"><b>${esc(i.name)}</b><small class="num">${numIn(i.qty, 3)} ${esc(i.unit)}${i.qty && i.qty !== 1 ? ' × ' + esc(money(i.sum / i.qty)) : ''}${i.vendor ? ' · ' + esc(i.vendor) : ''}</small></div><div class="r num">${esc(money(i.sum))}${showPurpose ? `<div>${ptag(i.purpose)}</div>` : ''}</div></div>`;
}

/* ================= История ================= */
function viewHistory() {
  return `
  <header class="topbar"><span class="spacer"></span><h1>История покупок</h1><span class="spacer"></span></header>
  <label class="search">${ic('search')}<input type="search" placeholder="Поиск по продуктам" value="${esc(HI.q)}" data-f="hist-q" aria-label="Поиск"></label>
  <div class="chips">
    ${[['all', 'Всё'], ['home', 'Дом'], ['events', 'Мероприятия']].map(([v, l]) => `<button class="chip ${HI.purpose === v ? 'on' : ''}" data-act="hist-purpose" data-v="${v}">${l}</button>`).join('')}
    ${upcomingFirst().map(e => `<button class="chip ${HI.purpose === e.id ? 'on' : ''}" data-act="hist-purpose" data-v="${e.id}">${esc(e.name)}</button>`).join('')}
  </div>
  <div id="hist-list">${histList()}</div>`;
}
const fitAmount = () => { const x = $('#sg-sum'); if (x) x.style.width = Math.max(1, x.value.length) * 0.62 + 0.3 + 'em'; };
const histList = () => feed(S.purchases, HI.purpose, HI.q.trim().toLowerCase());

/* ================= Деталь покупки (шторка) ================= */
function openPurchase(id) {
  const p = S.purchases.find(x => x.id === id);
  if (!p) return;
  const src = { receipt: 'по чеку', batch: 'списком', manual: 'вручную' }[p.source] || '';
  openSheet(`
    <div class="sheet-h"><div style="display:flex;gap:12px;align-items:center">${avatar(p.vendor || 'Покупка', p.source)}<div><h2>${esc(p.vendor || 'Покупка')}</h2><div class="muted" style="font-size:13px">${esc(cap(dayLabel(p.date)))} · ${src}</div></div></div><button class="round" data-act="close" aria-label="Закрыть">${ic('x')}</button></div>
    <div class="card items-list">${p.items.map(itemLine).join('')}
      <div class="sum-line"><span>Итого</span><span class="num">${esc(money(sum(p.items, i => i.sum)))}</span></div>
    </div>
    <div class="btns grid2">
      <button class="btn danger sm" data-act="del-purchase" data-id="${p.id}">${ic('trash')}Удалить</button>
      <a class="btn sm" href="#/edit/${p.id}" data-act="close-go">${ic('edit')}Изменить</a>
    </div>`);
}

/* ================= Добавление ================= */
function openAdd() {
  openSheet(`
    <div class="sheet-h"><h2>Добавить покупку</h2><button class="round" data-act="close" aria-label="Закрыть">${ic('x')}</button></div>
    <a class="add-opt" href="#/add/receipt" data-act="close-go"><span class="ic" style="background:var(--yellow)">${ic('scan')}</span><span><b>Сфотографировать чек</b><small>Распознаем позиции и переведём с испанского</small></span></a>
    <a class="add-opt" href="#/add/single" data-act="close-go"><span class="ic" style="background:var(--vanilla)">${ic('pen')}</span><span><b>Одна позиция</b><small>Быстро записать одну покупку</small></span></a>
    <a class="add-opt" href="#/add/batch" data-act="close-go"><span class="ic" style="background:var(--slate);color:var(--vanilla)">${ic('basket')}</span><span><b>Несколько позиций</b><small>Рынок: один продавец — много продуктов</small></span></a>
  `);
}

function purposeChips(cur, act) {
  const evs = upcomingFirst();
  return `<div class="purpose">
    <button class="chip home ${cur === 'home' ? 'on' : ''}" data-act="${act}" data-v="home">${ic('home', 'style="width:16px;height:16px"')}Дом</button>
    ${evs.map(e => `<button class="chip ev ${cur === e.id ? 'on' : ''}" data-act="${act}" data-v="${e.id}">${esc(e.name)} · ${dateShort(e.date)}</button>`).join('')}
    <button class="chip" data-act="event-new" data-then="${act}">${ic('plus', 'style="width:16px;height:16px"')}Мероприятие</button>
  </div>`;
}
const purposeOptions = cur => `<option value="home" ${cur === 'home' ? 'selected' : ''}>🏠 Дом</option>` + upcomingFirst().map(e => `<option value="${e.id}" ${cur === e.id ? 'selected' : ''}>🎉 ${esc(e.name)}</option>`).join('');
const catOptions = cur => visibleCats().concat(S.categories.filter(c => c.hidden && c.id === cur)).map(c => `<option value="${c.id}" ${c.id === cur ? 'selected' : ''}>${c.emoji} ${esc(c.name)}</option>`).join('');
const productList = () => `<datalist id="dl-products">${Object.values(S.products).sort((a, b) => a.name.localeCompare(b.name, 'ru')).map(p => `<option value="${esc(p.name)}">`).join('')}</datalist>`;
const vendorList = () => `<datalist id="dl-vendors">${[...new Set(S.purchases.map(p => p.vendor).filter(Boolean))].sort().map(v => `<option value="${esc(v)}">`).join('')}</datalist>`;

/* ---------- одна позиция ---------- */
function viewSingle() {
  SG ||= { sum: '', name: '', qty: 1, unit: 'шт', cat: 'other', purpose: 'home', date: iso(today()), vendor: '', catTouched: false };
  return `
  ${topbar('Новая позиция')}
  <div class="amount-card">
    <label for="sg-sum">Сумма</label>
    <div class="amount-in"><input id="sg-sum" inputmode="decimal" placeholder="0" value="${esc(SG.sum)}" data-f="sg-sum" autocomplete="off"><span>€</span></div>
    <div class="presets">${[1, 5, 10, 20].map(v => `<button data-act="sg-preset" data-v="${v}">+${v} €</button>`).join('')}</div>
  </div>
  <label class="field"><span>Что купили</span><input class="in" list="dl-products" placeholder="Например, помидоры" value="${esc(SG.name)}" data-f="sg-name" autocomplete="off"></label>
  <div class="grid2">
    <label class="field"><span>Количество</span><input class="in" inputmode="decimal" value="${esc(numIn(SG.qty, 3))}" data-f="sg-qty"></label>
    <label class="field"><span>Единица</span><select class="in" data-f="sg-unit">${UNITS.map(u => `<option ${u === SG.unit ? 'selected' : ''}>${u}</option>`).join('')}</select></label>
  </div>
  <div class="field"><span>Категория</span><div class="chips wrap" id="sg-cats">${visibleCats().map(c => `<button class="chip ${SG.cat === c.id ? 'on' : ''}" data-act="sg-cat" data-v="${c.id}">${c.emoji} ${esc(c.name)}</button>`).join('')}</div></div>
  <div class="field"><span>Для чего</span>${purposeChips(SG.purpose, 'sg-purpose')}</div>
  <div class="grid2">
    <label class="field"><span>Дата</span><input class="in" type="date" value="${SG.date}" data-f="sg-date"></label>
    <label class="field"><span>Где</span><input class="in" list="dl-vendors" placeholder="Магазин / продавец" value="${esc(SG.vendor)}" data-f="sg-vendor"></label>
  </div>
  ${productList()}${vendorList()}
  <div class="savebar"><div class="tot"><small>Итого</small><b class="num" id="sg-total">${esc(money(parseNum(SG.sum)))}</b></div><button class="btn" data-act="sg-save">${ic('check')}Сохранить</button></div>`;
}

function saveSingle() {
  const total = parseNum(SG.sum);
  if (!SG.name.trim()) return toast('Напишите, что купили');
  if (total <= 0) return toast('Укажите сумму');
  const qty = parseNum(SG.qty) || 1;
  const item = { id: uid(), name: SG.name.trim(), orig: '', qty, unit: SG.unit, price: round2(total / qty), sum: round2(total), cat: SG.cat, purpose: SG.purpose };
  S.purchases.push({ id: uid(), date: SG.date || iso(today()), vendor: SG.vendor.trim(), source: 'manual', items: [item], created: Date.now() });
  rememberProduct(item);
  save(); SG = null; toast('Сохранено'); go('#/home');
}

function rememberProduct(i) { S.products[i.name.toLowerCase()] = { name: i.name, cat: i.cat, unit: i.unit }; }

/* ---------- редактор нескольких позиций ---------- */
const blankRow = purpose => ({ id: uid(), name: '', orig: '', qty: 1, unit: 'шт', price: '', sum: '', cat: 'other', purpose: purpose || 'home', catTouched: false });

function viewEditor(mode, id) {
  if (!ED || ED.key !== (mode + (id || ''))) {
    if (mode === 'edit') {
      const p = S.purchases.find(x => x.id === id);
      if (!p) { setTimeout(() => go('#/history')); return ''; }
      const purposes = [...new Set(p.items.map(i => i.purpose))];
      ED = { key: mode + id, mode, pid: p.id, source: p.source, date: p.date, vendor: p.vendor, purposeAll: purposes.length === 1 ? purposes[0] : 'mixed', rows: p.items.map(i => ({ ...i, catTouched: true })), receiptTotal: p.receiptTotal || null, image: null };
    } else {
      ED = { key: mode, mode, source: 'batch', date: iso(today()), vendor: '', purposeAll: 'home', rows: [blankRow(), blankRow(), blankRow()], receiptTotal: null, image: null };
    }
  }
  const isReceipt = ED.source === 'receipt';
  const title = ED.mode === 'edit' ? 'Изменить покупку' : isReceipt ? 'Проверьте чек' : 'Несколько позиций';
  return `
  ${topbar(title, { back: ED.mode === 'edit' ? '#/history' : '#/home' })}
  ${isReceipt && ED.image ? `<div class="receipt-thumb"><img src="${ED.image}" alt="Фото чека"><div class="muted" style="font-size:14px">Позиции распознаны и переведены. Проверьте названия, категории и назначение.</div></div>` : ''}
  <div id="ed-check">${isReceipt && ED.receiptTotal ? checkBanner() : ''}</div>
  <div class="ed-head">
    <div class="grid2">
      <label class="field"><span>Дата</span><input class="in" type="date" value="${ED.date}" data-h="date"></label>
      <label class="field"><span>Продавец</span><input class="in" list="dl-vendors" placeholder="Рынок · овощи" value="${esc(ED.vendor)}" data-h="vendor"></label>
    </div>
    <label class="field"><span>Назначение для всех позиций</span><select class="in" data-h="purposeAll">${ED.purposeAll === 'mixed' ? '<option value="mixed" selected>— разные —</option>' : ''}${purposeOptions(ED.purposeAll)}</select></label>
  </div>
  <div id="ed-rows">${ED.rows.map(rowHtml).join('')}</div>
  <button class="add-row" data-act="ed-add">${ic('plus')}Добавить позицию</button>
  ${productList()}${vendorList()}
  <div class="savebar"><div class="tot"><small id="ed-count">${edCountTxt()}</small><b class="num" id="ed-total">${esc(money(edTotal()))}</b></div><button class="btn" data-act="ed-save">${ic('check')}Сохранить</button></div>`;
}

function rowHtml(r, k) {
  return `<div class="row ${isEv(r) ? 'ev' : ''}" data-row="${k}">
    <div class="l1"><span class="no">${k + 1}</span><input class="in" list="dl-products" placeholder="Название" value="${esc(r.name)}" data-f="name" data-i="${k}" autocomplete="off" style="flex:1"><button class="del" data-act="ed-del" data-i="${k}" aria-label="Удалить позицию">${ic('x')}</button></div>
    ${r.orig ? `<div class="orig">${esc(r.orig)}</div>` : ''}
    <div class="mini-lbl"><span>Кол-во</span><span>Ед.</span><span>Цена за ед.</span><span>Сумма, €</span></div>
    <div class="l2">
      <input class="in num" inputmode="decimal" value="${esc(numIn(r.qty, 3))}" data-f="qty" data-i="${k}" aria-label="Количество">
      <select class="in" data-f="unit" data-i="${k}" aria-label="Единица">${UNITS.map(u => `<option ${u === r.unit ? 'selected' : ''}>${u}</option>`).join('')}</select>
      <input class="in num" inputmode="decimal" placeholder="0,00" value="${esc(numIn(r.price))}" data-f="price" data-i="${k}" aria-label="Цена за единицу">
      <input class="in num" inputmode="decimal" placeholder="0,00" value="${esc(numIn(r.sum))}" data-f="sum" data-i="${k}" aria-label="Сумма" style="font-weight:700">
    </div>
    <div class="l3">
      <select class="in" data-f="cat" data-i="${k}" aria-label="Категория">${catOptions(r.cat)}</select>
      <select class="in" data-f="purpose" data-i="${k}" aria-label="Назначение">${purposeOptions(r.purpose)}</select>
    </div>
  </div>`;
}

const edTotal = () => sum(ED.rows, r => parseNum(r.sum));
const edCountTxt = () => { const n = ED.rows.filter(r => r.name.trim() && parseNum(r.sum) > 0).length; return `${n} ${plural(n, 'позиция', 'позиции', 'позиций')}`; };
function checkBanner() {
  const d = round2(edTotal() - ED.receiptTotal);
  return Math.abs(d) < 0.01
    ? `<div class="check ok">${ic('check')}Сумма позиций совпадает с итогом чека: ${esc(money(ED.receiptTotal))}</div>`
    : `<div class="check warn">${ic('alert')}Не сходится с чеком на ${esc(money(Math.abs(d)))} (в чеке ${esc(money(ED.receiptTotal))})</div>`;
}
function edRefreshTotals() {
  $('#ed-total') && ($('#ed-total').textContent = money(edTotal()));
  $('#ed-count') && ($('#ed-count').textContent = edCountTxt());
  if (ED.source === 'receipt' && ED.receiptTotal && $('#ed-check')) $('#ed-check').innerHTML = checkBanner();
}

function saveEditor() {
  const rows = ED.rows.filter(r => r.name.trim() && parseNum(r.sum) > 0);
  const bad = ED.rows.filter(r => r.name.trim() && !(parseNum(r.sum) > 0));
  if (bad.length) return toast(`Укажите сумму: ${bad[0].name}`);
  if (!rows.length) return toast('Добавьте хотя бы одну позицию');
  const items = rows.map(r => { const qty = parseNum(r.qty) || 1, s = round2(parseNum(r.sum)); return { id: r.id || uid(), name: r.name.trim(), orig: r.orig || '', qty, unit: r.unit, price: round2(s / qty), sum: s, cat: r.cat, purpose: r.purpose || 'home' }; });
  items.forEach(rememberProduct);
  if (ED.mode === 'edit') {
    const p = S.purchases.find(x => x.id === ED.pid);
    Object.assign(p, { date: ED.date, vendor: ED.vendor.trim(), items });
  } else {
    S.purchases.push({ id: uid(), date: ED.date || iso(today()), vendor: ED.vendor.trim(), source: ED.source, items, receiptTotal: ED.receiptTotal, created: Date.now() });
  }
  save(); const wasEdit = ED.mode === 'edit'; ED = null;
  toast(wasEdit ? 'Изменения сохранены' : `Сохранено: ${items.length} ${plural(items.length, 'позиция', 'позиции', 'позиций')}`);
  go(wasEdit ? '#/history' : '#/home');
}

/* ---------- чек ---------- */
let receiptImg = null;
function viewReceipt() {
  return `
  ${topbar('Чек')}
  <label class="drop" for="rc-file">
    ${receiptImg ? `<img src="${receiptImg}" alt="Фото чека">` : `<span class="ic">${ic('camera')}</span><b>Сфотографируйте чек</b><span class="muted">или выберите фото из галереи</span>`}
  </label>
  <input id="rc-file" type="file" accept="image/*" capture="environment" hidden data-f="rc-file">
  <div class="btns">
    ${receiptImg ? `<button class="btn" data-act="rc-parse">${ic('scan')}Распознать</button><label class="btn ghost" for="rc-file">Переснять</label>` : `<label class="btn" for="rc-file">${ic('camera')}Сделать фото</label>`}
    <button class="btn ghost" data-act="rc-parse">Показать пример распознавания</button>
  </div>
  <div class="note"><b>Как это будет работать:</b> фото уходит на сервер, нейросеть читает позиции, переводит названия с испанского и подставляет категории. Перед сохранением вы проверяете список. Сейчас подключён демо-пример, настоящее распознавание добавим вместе с Supabase.</div>`;
}

function demoReceipt() {
  const rows = [
    ['LECHE ENTERA 1L', 'Молоко цельное 1 л', 2, 'шт', 0.95, 'dairy'],
    ['PAN BARRA', 'Багет', 1, 'шт', 0.55, 'bread'],
    ['PECH POLLO', 'Куриная грудка', 0.62, 'кг', 7.6, 'meat'],
    ['TOMATE RAMA', 'Томаты на ветке', 1.05, 'кг', 2.39, 'veg'],
    ['QSO LONCHAS', 'Сыр ломтиками', 1, 'уп', 2.15, 'cheese'],
    ['PAPEL COCINA', 'Бумажные полотенца', 1, 'уп', 1.85, 'chem'],
    ['CERVEZA 6X33', 'Пиво 6×0,33', 1, 'уп', 3.9, 'alco'],
    ['PATATAS FRITAS', 'Чипсы', 2, 'уп', 1.2, 'sweets'],
  ].map(([orig, name, qty, unit, price, cat]) => ({ id: uid(), orig, name, qty, unit, price, sum: round2(qty * price), cat, purpose: 'home', catTouched: true }));
  ED = { key: 'receipt', mode: 'new', source: 'receipt', date: iso(today()), vendor: 'Mercadona', purposeAll: 'home', rows, receiptTotal: round2(sum(rows, r => r.sum)), image: receiptImg };
  history.replaceState(null, '', '#/add/batch');
  ED.key = 'batch';
  lastRoute = '';
  render();
}

/* ================= Ещё ================= */
function viewMore() {
  const t = iso(today());
  const n = S.events.filter(e => e.date >= t).length;
  const custom = S.categories.filter(c => !c.base).length;
  return `
  <header class="topbar"><span class="spacer"></span><h1>Ещё</h1><span class="spacer"></span></header>
  <div class="menu">
    <a href="#/events"><span class="m-ic" style="background:var(--red);color:var(--vanilla)">${ic('party')}</span><span class="m-tx">Мероприятия<small>${n ? `${n} ${plural(n, 'предстоящее', 'предстоящих', 'предстоящих')}` : 'Нет предстоящих'}</small></span>${ic('chev')}</a>
    <a href="#/categories"><span class="m-ic" style="background:var(--yellow)">${ic('tag')}</span><span class="m-tx">Категории<small>${S.categories.length} всего${custom ? `, ${custom} своих` : ''}</small></span>${ic('chev')}</a>
  </div>
  <div class="sec"><h2>Данные</h2></div>
  <div class="menu">
    <button data-act="export"><span class="m-ic" style="background:var(--slate-tint);color:var(--slate-deep)">${ic('download')}</span><span class="m-tx">Скачать данные<small>Файл JSON со всеми покупками</small></span></button>
    <button data-act="reset-demo"><span class="m-ic" style="background:var(--vanilla);color:var(--slate-deep)">${ic('refresh')}</span><span class="m-tx">Загрузить демо-данные<small>Заменит текущие данные примером</small></span></button>
    <button data-act="clear-all" class="danger"><span class="m-ic" style="background:var(--red-tint)">${ic('trash')}</span><span class="m-tx">Удалить все покупки<small>Категории и мероприятия останутся</small></span></button>
  </div>
  <p class="muted" style="font-size:13px;text-align:center;margin-top:20px">Прототип · данные хранятся только в этом браузере</p>`;
}

/* ================= Мероприятия ================= */
function viewEvents() {
  const t = iso(today()), all = allItems();
  const spent = id => sum(all.filter(i => i.purpose === id), i => i.sum);
  const up = sortedEvents().filter(e => e.date >= t), past = sortedEvents().filter(e => e.date < t).reverse();
  return `
  ${topbar('Мероприятия', { back: '#/more', right: `<button class="round" data-act="event-new" aria-label="Новое мероприятие">${ic('plus')}</button>` })}
  ${up.length ? `<div class="sec" style="margin-top:4px"><h2>Предстоящие</h2></div>${up.map(e => eventCard(e, spent(e.id))).join('')}` : ''}
  ${past.length ? `<div class="sec"><h2>Прошедшие</h2></div>${past.map(e => eventCard(e, spent(e.id))).join('')}` : ''}
  ${!S.events.length ? `<div class="empty">Мероприятий пока нет</div>` : ''}
  <div class="btns"><button class="btn" data-act="event-new">${ic('plus')}Новое мероприятие</button></div>`;
}

function viewEvent(id) {
  const e = evById(id);
  if (!e) { setTimeout(() => go('#/events')); return ''; }
  const items = allItems().filter(i => i.purpose === id).sort((a, b) => b.date.localeCompare(a.date));
  const spent = sum(items, i => i.sum);
  const pct = e.budget ? Math.min(100, spent / e.budget * 100) : 0;
  const d = toDate(e.date);
  return `
  ${topbar('Мероприятие', { back: '#/events', right: `<button class="round" data-act="event-edit" data-id="${e.id}" aria-label="Изменить">${ic('edit')}</button>` })}
  <section class="hero red">
    <div class="label">${esc(e.name)} · ${d.getDate()} ${MONTHS_GEN[d.getMonth()]}</div>
    <div class="big num">${moneyBig(spent)}</div>
    <div class="hero-row">
      ${e.guests ? `<span class="pill vanilla">${esc(money(spent / e.guests))} на гостя · ${e.guests} ${plural(e.guests, 'гость', 'гостя', 'гостей')}</span>` : ''}
    </div>
    ${e.budget ? `<div class="meter"><i style="width:${pct}%"></i></div><div class="hero-meta"><span>Бюджет ${esc(money(e.budget))}</span><span>${spent > e.budget ? 'Перерасход ' + esc(money(spent - e.budget)) : 'Осталось ' + esc(money(e.budget - spent))}</span></div>` : ''}
  </section>
  <div class="sec"><h2>По категориям</h2></div>
  <div class="card">${catBreakdown(items)}</div>
  <div class="sec"><h2>Все позиции</h2><span class="muted">${items.length}</span></div>
  <div class="card items-list">${items.length ? items.map(i => itemLine(i, false)).join('') : '<div class="empty">Пока ничего не куплено. При добавлении покупки выберите это мероприятие в поле «Для чего».</div>'}</div>`;
}

function openEventForm(id, then) {
  const e = id ? evById(id) : { name: '', date: iso(addDays(today(), 7)), guests: '', budget: '', client: '' };
  openSheet(`
    <div class="sheet-h"><h2>${id ? 'Изменить мероприятие' : 'Новое мероприятие'}</h2><button class="round" data-act="close" aria-label="Закрыть">${ic('x')}</button></div>
    <form id="ev-form" data-id="${id || ''}" data-then="${then || ''}">
      <label class="field"><span>Название</span><input class="in" name="name" required placeholder="Например, свадьба Лопес" value="${esc(e.name)}"></label>
      <div class="grid2">
        <label class="field"><span>Дата</span><input class="in" type="date" name="date" required value="${e.date}"></label>
        <label class="field"><span>Гостей</span><input class="in" inputmode="numeric" name="guests" placeholder="40" value="${esc(e.guests)}"></label>
      </div>
      <div class="grid2">
        <label class="field"><span>Бюджет, €</span><input class="in" inputmode="decimal" name="budget" placeholder="1000" value="${esc(numIn(e.budget))}"></label>
        <label class="field"><span>Клиент</span><input class="in" name="client" placeholder="Имя или компания" value="${esc(e.client)}"></label>
      </div>
      <div class="btns ${id ? 'grid2' : ''}">
        ${id ? `<button type="button" class="btn danger" data-act="event-del" data-id="${id}">${ic('trash')}Удалить</button>` : ''}
        <button class="btn" type="submit">${ic('check')}Сохранить</button>
      </div>
    </form>`);
  setTimeout(() => $('#ev-form [name=name]')?.focus(), 250);
}

/* ================= Категории ================= */
function viewCategories() {
  const T = today();
  const month = inRange(allItems(), iso(new Date(T.getFullYear(), T.getMonth(), 1)), iso(T));
  const spent = id => sum(month.filter(i => i.cat === id), i => i.sum);
  const cats = [...S.categories].sort((a, b) => a.order - b.order);
  return `
  ${topbar('Категории', { back: '#/more', right: `<button class="round" data-act="cat-new" aria-label="Новая категория">${ic('plus')}</button>` })}
  <p class="muted" style="margin:0 2px 14px;font-size:14px">Траты за ${MONTHS[T.getMonth()]}. Нажмите на категорию, чтобы изменить её или скрыть.</p>
  <div class="cat-grid">
    ${cats.map(c => `<button class="cat-tile ${c.hidden ? 'hidden' : ''}" data-act="cat-edit" data-id="${c.id}">${catIc(c)}${c.base ? '' : '<span class="own">своя</span>'}<span class="nm">${esc(c.name)}</span><span class="sm num">${c.hidden ? 'скрыта' : esc(money(spent(c.id)))}</span></button>`).join('')}
  </div>
  <div class="btns"><button class="btn" data-act="cat-new">${ic('plus')}Новая категория</button></div>`;
}

const EMOJIS = ['🛒', '🥕', '🍎', '🥩', '🐟', '🧀', '🥖', '🍝', '🍷', '🍺', '🧃', '☕', '🍫', '🍰', '🧊', '🧴', '🪥', '🧻', '🥤', '🎈', '🎂', '💐', '🕯️', '🍽️', '🐶', '👶', '💊', '🚗', '🏠', '🎁', '📦', '✨'];
const SWATCHES = ['#E09F3E', '#9E2A2B', '#335C67', '#6E9A4F', '#4E8A99', '#C98B3A', '#6E2B3F', '#B5653C', '#5E9C8F', '#C0504D', '#8C6A3E', '#7D8C8F'];
let CF = null;
function openCatForm(id) {
  const c = id ? S.categories.find(x => x.id === id) : null;
  CF = { id, name: c?.name || '', emoji: c?.emoji || '🛒', color: c?.color || SWATCHES[0] };
  const used = id ? S.purchases.some(p => p.items.some(i => i.cat === id)) : false;
  openSheet(`
    <div class="sheet-h"><h2>${c ? (c.base ? 'Базовая категория' : 'Своя категория') : 'Новая категория'}</h2><button class="round" data-act="close" aria-label="Закрыть">${ic('x')}</button></div>
    <label class="field"><span>Название</span><input class="in" id="cf-name" placeholder="Например, корм для кота" value="${esc(CF.name)}"></label>
    <div class="field"><span>Иконка</span><div class="emoji-grid">${EMOJIS.map(e => `<button class="${e === CF.emoji ? 'on' : ''}" data-act="cf-emoji" data-v="${e}">${e}</button>`).join('')}</div></div>
    <div class="field"><span>Цвет</span><div class="swatches">${SWATCHES.map(s => `<button class="${s === CF.color ? 'on' : ''}" style="background:${s}" data-act="cf-color" data-v="${s}" aria-label="Цвет ${s}"></button>`).join('')}</div></div>
    <div class="btns">
      <button class="btn" data-act="cf-save">${ic('check')}Сохранить</button>
      ${c ? `<button class="btn ghost" data-act="cat-toggle" data-id="${c.id}">${c.hidden ? 'Показать в списках' : 'Скрыть из списков'}</button>` : ''}
      ${c && !c.base ? `<button class="btn danger" data-act="cat-del" data-id="${c.id}">${ic('trash')}Удалить${used ? ' (покупки уйдут в «Прочее»)' : ''}</button>` : ''}
    </div>`);
}

/* ================= шторка, тост ================= */
function openSheet(html) {
  closeSheet();
  const ov = document.createElement('div');
  ov.className = 'ov';
  ov.innerHTML = `<div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div>`;
  ov.addEventListener('click', e => { if (e.target === ov) closeSheet(); });
  document.body.appendChild(ov);
  document.body.style.overflow = 'hidden';
}
function closeSheet() { $$('.ov').forEach(o => o.remove()); document.body.style.overflow = ''; }
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

/* ================= действия ================= */
const A = {
  'open-add': () => openAdd(),
  close: () => closeSheet(),
  'close-go': () => closeSheet(),
  back: el => { const to = el.dataset.to || '#/home'; if (navStack.length > 1) { navStack.pop(); history.back(); } else go(to); },
  purchase: el => openPurchase(el.dataset.id),
  'del-purchase': el => {
    if (!confirm('Удалить эту покупку?')) return;
    S.purchases = S.purchases.filter(p => p.id !== el.dataset.id); save(); closeSheet(); render(); toast('Покупка удалена');
  },
  'stats-preset': el => { ST.purpose = el.dataset.v; ST.period = 'month'; ST.offset = 0; ST.sel = null; },
  'stats-period': el => { ST.period = el.dataset.v; ST.offset = 0; ST.sel = null; render(); },
  'stats-shift': el => { ST.offset = Math.min(0, ST.offset + +el.dataset.v); ST.sel = null; render(); },
  'stats-purpose': el => { ST.purpose = el.dataset.v; ST.sel = null; render(); },
  'stats-bar': el => { const k = +el.dataset.i; ST.sel = ST.sel === k ? null : k; render(); },
  'hist-purpose': el => { HI.purpose = el.dataset.v; render(); },

  'sg-preset': el => { SG.sum = numIn(parseNum(SG.sum) + +el.dataset.v); $('#sg-sum').value = SG.sum; fitAmount(); $('#sg-total').textContent = money(parseNum(SG.sum)); },
  'sg-cat': el => { SG.cat = el.dataset.v; SG.catTouched = true; $$('#sg-cats .chip').forEach(c => c.classList.toggle('on', c === el)); },
  'sg-purpose': el => { SG.purpose = el.dataset.v; $$('.purpose .chip[data-act="sg-purpose"]').forEach(c => c.classList.toggle('on', c === el)); },
  'sg-save': () => saveSingle(),

  'ed-add': () => { ED.rows.push(blankRow(ED.purposeAll === 'mixed' ? 'home' : ED.purposeAll)); const k = ED.rows.length - 1; $('#ed-rows').insertAdjacentHTML('beforeend', rowHtml(ED.rows[k], k)); $(`[data-row="${k}"] [data-f="name"]`).focus(); edRefreshTotals(); },
  'ed-del': el => { ED.rows.splice(+el.dataset.i, 1); if (!ED.rows.length) ED.rows.push(blankRow(ED.purposeAll === 'mixed' ? 'home' : ED.purposeAll)); $('#ed-rows').innerHTML = ED.rows.map(rowHtml).join(''); edRefreshTotals(); },
  'ed-save': () => saveEditor(),

  'rc-parse': () => demoReceipt(),

  'event-new': el => openEventForm(null, el.dataset.then),
  'event-edit': el => openEventForm(el.dataset.id),
  'event-del': el => {
    const id = el.dataset.id;
    const n = S.purchases.reduce((a, p) => a + p.items.filter(i => i.purpose === id).length, 0);
    if (!confirm(n ? `Удалить мероприятие? ${n} ${plural(n, 'позиция будет отнесена', 'позиции будут отнесены', 'позиций будут отнесены')} к «Дому».` : 'Удалить мероприятие?')) return;
    S.purchases.forEach(p => p.items.forEach(i => { if (i.purpose === id) i.purpose = 'home'; }));
    S.events = S.events.filter(e => e.id !== id); save(); closeSheet(); go('#/events'); render(); toast('Мероприятие удалено');
  },

  'cat-new': () => openCatForm(null),
  'cat-edit': el => openCatForm(el.dataset.id),
  'cf-emoji': el => { CF.emoji = el.dataset.v; $$('.emoji-grid button').forEach(b => b.classList.toggle('on', b === el)); },
  'cf-color': el => { CF.color = el.dataset.v; $$('.swatches button').forEach(b => b.classList.toggle('on', b === el)); },
  'cf-save': () => {
    const name = $('#cf-name').value.trim();
    if (!name) return toast('Введите название');
    if (CF.id) Object.assign(S.categories.find(c => c.id === CF.id), { name, emoji: CF.emoji, color: CF.color });
    else S.categories.push({ id: 'c' + uid(), name, emoji: CF.emoji, color: CF.color, base: false, hidden: false, order: S.categories.length });
    save(); closeSheet(); render(); toast('Категория сохранена');
  },
  'cat-toggle': el => { const c = S.categories.find(x => x.id === el.dataset.id); c.hidden = !c.hidden; save(); closeSheet(); render(); },
  'cat-del': el => {
    const id = el.dataset.id;
    if (!confirm('Удалить категорию?')) return;
    S.purchases.forEach(p => p.items.forEach(i => { if (i.cat === id) i.cat = 'other'; }));
    Object.values(S.products).forEach(p => { if (p.cat === id) p.cat = 'other'; });
    S.categories = S.categories.filter(c => c.id !== id); save(); closeSheet(); render(); toast('Категория удалена');
  },

  export: () => {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `expenses-${iso(today())}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  },
  'reset-demo': () => { if (!confirm('Заменить все данные демо-примером?')) return; S = seed(); save(); toast('Демо-данные загружены'); go('#/home'); },
  'clear-all': () => { if (!confirm('Удалить все покупки? Это нельзя отменить.')) return; S.purchases = []; save(); render(); toast('Покупки удалены'); },
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const fn = A[el.dataset.act];
  if (!fn) return;
  if (el.tagName === 'BUTTON' || el.tagName === 'rect' || el.dataset.act === 'back') e.preventDefault();
  fn(el, e);
});

/* ввод в полях */
document.addEventListener('input', e => {
  const el = e.target;
  const f = el.dataset.f, h = el.dataset.h;
  if (f === 'hist-q') { HI.q = el.value; $('#hist-list').innerHTML = histList(); return; }
  if (f && f.startsWith('sg-') && SG) {
    const k = f.slice(3);
    if (k === 'file') return;
    SG[k] = el.value;
    if (k === 'sum') { $('#sg-total').textContent = money(parseNum(el.value)); fitAmount(); }
    if (k === 'name') {
      const p = S.products[el.value.trim().toLowerCase()];
      if (p) {
        if (!SG.catTouched) { SG.cat = p.cat; $$('#sg-cats .chip').forEach(c => c.classList.toggle('on', c.dataset.v === p.cat)); }
        SG.unit = p.unit; const u = $('[data-f="sg-unit"]'); if (u) u.value = p.unit;
      }
    }
    return;
  }
  if (h && ED) {
    if (h === 'purposeAll') return; // обрабатывается в change
    ED[h] = el.value; return;
  }
  if (f && ED && el.dataset.i !== undefined) {
    const k = +el.dataset.i, r = ED.rows[k];
    if (!r) return;
    const rowEl = el.closest('.row');
    const setField = (name, v) => { const x = rowEl.querySelector(`[data-f="${name}"]`); if (x && x !== el) x.value = v; };
    if (f === 'name') {
      r.name = el.value;
      const p = S.products[el.value.trim().toLowerCase()];
      if (p) {
        if (!r.catTouched) { r.cat = p.cat; setField('cat', p.cat); }
        if (r.unit !== p.unit && (r.unit === 'шт' || !r.unitTouched)) { r.unit = p.unit; setField('unit', p.unit); }
      }
    } else if (f === 'qty') {
      r.qty = el.value;
      const q = parseNum(el.value), pr = parseNum(r.price);
      if (pr) { r.sum = round2(q * pr); setField('sum', numIn(r.sum)); }
      else if (parseNum(r.sum) && q) { r.price = round2(parseNum(r.sum) / q); setField('price', numIn(r.price)); }
    } else if (f === 'price') {
      r.price = el.value;
      const q = parseNum(r.qty) || 1;
      r.sum = round2(q * parseNum(el.value)); setField('sum', el.value ? numIn(r.sum) : '');
    } else if (f === 'sum') {
      r.sum = el.value;
      const q = parseNum(r.qty) || 1;
      r.price = el.value ? round2(parseNum(el.value) / q) : ''; setField('price', numIn(r.price));
    }
    edRefreshTotals();
  }
});

document.addEventListener('change', e => {
  const el = e.target;
  const f = el.dataset.f, h = el.dataset.h;
  if (f === 'rc-file' && el.files?.[0]) {
    const reader = new FileReader();
    reader.onload = () => { receiptImg = reader.result; render(); };
    reader.readAsDataURL(el.files[0]);
    return;
  }
  if (f === 'sg-unit' && SG) { SG.unit = el.value; return; }
  if (h === 'purposeAll' && ED) {
    ED.purposeAll = el.value;
    if (el.value !== 'mixed') { ED.rows.forEach(r => { r.purpose = el.value; }); $('#ed-rows').innerHTML = ED.rows.map(rowHtml).join(''); }
    return;
  }
  if (ED && el.dataset.i !== undefined) {
    const r = ED.rows[+el.dataset.i];
    if (!r) return;
    if (f === 'cat') { r.cat = el.value; r.catTouched = true; }
    if (f === 'unit') { r.unit = el.value; r.unitTouched = true; }
    if (f === 'purpose') {
      r.purpose = el.value;
      el.closest('.row').classList.toggle('ev', isEv(r));
      const ps = new Set(ED.rows.map(x => x.purpose));
      const newAll = ps.size === 1 ? [...ps][0] : 'mixed';
      if (newAll !== ED.purposeAll) { ED.purposeAll = newAll; const s = $('[data-h="purposeAll"]'); if (s) s.outerHTML = `<select class="in" data-h="purposeAll">${newAll === 'mixed' ? '<option value="mixed" selected>— разные —</option>' : ''}${purposeOptions(newAll)}</select>`; }
    }
  }
});

document.addEventListener('submit', e => {
  if (e.target.id !== 'ev-form') return;
  e.preventDefault();
  const fd = new FormData(e.target);
  const id = e.target.dataset.id, then = e.target.dataset.then;
  const data = { name: fd.get('name').trim(), date: fd.get('date'), guests: parseInt(fd.get('guests')) || 0, budget: parseNum(fd.get('budget')), client: fd.get('client').trim() };
  if (!data.name) return toast('Введите название');
  let ev;
  if (id) { ev = Object.assign(evById(id), data); }
  else { ev = { id: 'e' + uid(), ...data }; S.events.push(ev); }
  save(); closeSheet();
  if (then === 'sg-purpose' && SG) SG.purpose = ev.id;
  render();
  toast(id ? 'Мероприятие обновлено' : 'Мероприятие создано');
});

/* история переходов внутри приложения — чтобы «назад» не выкидывал из приложения */
const navStack = [];
window.addEventListener('hashchange', () => {
  const h = location.hash;
  if (navStack.at(-2) === h) navStack.pop(); else navStack.push(h);
});
navStack.push(location.hash || '#/home');

render();
