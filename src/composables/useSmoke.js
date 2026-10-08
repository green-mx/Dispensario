// Humo realista sobre canvas. Cada elemento con v-smoke="ritmo" emite humo
// desde su borde superior mientras está en pantalla; con el mouse encima sale
// mucho más. Las partículas usan sprites generados con ruido fractal
// (no es un blur genérico) y viven en coordenadas de página, así que se
// quedan "pegadas" al contenido al hacer scroll.
const em = new Map();
const vis = new Set();
let hov = null;
let sprites = [];
let parts = [];
let cv, cx, CW, CH, dpr, MAXP, mob, io, running = false;

function resize() {
  CW = innerWidth; CH = innerHeight;
  cv.width = CW * dpr; cv.height = CH * dpr;
  cx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function makeSprite(seed) {
  const S = 150;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  const im = g.createImageData(S, S);
  const d = im.data;
  const h = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453; return s - Math.floor(s); };
  const vn = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    return h(xi, yi) * (1 - u) * (1 - v) + h(xi + 1, yi) * u * (1 - v) + h(xi, yi + 1) * (1 - u) * v + h(xi + 1, yi + 1) * u * v;
  };
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      let n = 0, a = 0.5, f = 3;
      for (let o = 0; o < 4; o++) { n += a * vn((x / S) * f, (y / S) * f); a *= 0.5; f *= 2; }
      const dx = (x / S - 0.5) * 2, dy = (y / S - 0.5) * 2;
      const fall = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy));
      const al = Math.min(1, Math.max(0, (n - 0.26) * 2.4) * Math.pow(fall, 1.2));
      const i = (y * S + x) * 4;
      d[i] = 205; d[i + 1] = 245; d[i + 2] = 205; d[i + 3] = al * 255;
    }
  }
  g.putImageData(im, 0, 0);
  return c;
}

function puff(x, y, k = 1) {
  if (parts.length >= MAXP || !sprites.length) return;
  parts.push({
    x, y, vx: (Math.random() - 0.5) * 0.5, vy: -(0.45 + Math.random() * 0.8) * k,
    s: 70 + Math.random() * 60, g: 0.5 + Math.random() * 0.6, l: 0, m: 210 + Math.random() * 150,
    r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.008,
    sp: sprites[(Math.random() * sprites.length) | 0], am: 0.5 + Math.random() * 0.25, ph: Math.random() * 6.28,
  });
}

function frame() {
  if (!running) return;
  requestAnimationFrame(frame);
  if (document.hidden) return;
  cx.clearRect(0, 0, CW, CH);
  const sy = scrollY;
  for (const [el, rate] of em) {
    if (!vis.has(el)) continue;
    const isHover = el === hov;
    if (Math.random() < rate * (isHover ? 4 : 1) * (mob ? 0.8 : 1)) {
      const r = el.getBoundingClientRect();
      puff(r.left + r.width * (0.12 + Math.random() * 0.76), sy + r.top + 6, isHover ? 1.4 : 1);
    }
  }
  for (let i = parts.length; i--;) {
    const p = parts[i];
    p.l++;
    const t = p.l / p.m;
    if (t >= 1) { parts.splice(i, 1); continue; }
    p.x += p.vx + Math.sin(p.l * 0.017 + p.ph) * 0.35;
    p.y += p.vy * (1 - t * 0.5);
    p.s += p.g;
    cx.globalAlpha = p.am * Math.min(1, t / 0.1) * Math.pow(1 - t, 1.3);
    cx.save();
    cx.translate(p.x, p.y - sy);
    cx.rotate(p.r + p.l * p.vr);
    cx.drawImage(p.sp, -p.s / 2, -p.s / 2, p.s, p.s);
    cx.restore();
  }
  cx.globalAlpha = 1;
}

export function startSmoke(canvas) {
  if (running || !canvas) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  cv = canvas; cx = cv.getContext('2d');
  mob = matchMedia('(max-width: 820px)').matches;
  MAXP = mob ? 110 : 230;
  dpr = Math.min(devicePixelRatio || 1, 2);
  resize();
  addEventListener('resize', resize);
  io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? vis.add(e.target) : vis.delete(e.target))), { threshold: 0.15 });
  em.forEach((_, el) => io.observe(el));
  setTimeout(() => { sprites = [1, 2, 3, 4, 5].map(makeSprite); running = true; requestAnimationFrame(frame); }, 60);
}

export function stopSmoke() {
  running = false;
  removeEventListener('resize', resize);
  io && io.disconnect();
  parts = [];
}

export const vSmoke = {
  mounted(el, b) {
    em.set(el, b.value ?? 0.07);
    el.__smokeEnter = () => { hov = el; };
    el.__smokeLeave = () => { if (hov === el) hov = null; };
    el.addEventListener('mouseenter', el.__smokeEnter);
    el.addEventListener('mouseleave', el.__smokeLeave);
    io && io.observe(el);
  },
  updated(el, b) { em.set(el, b.value ?? 0.07); },
  unmounted(el) {
    em.delete(el); vis.delete(el);
    if (hov === el) hov = null;
    el.removeEventListener('mouseenter', el.__smokeEnter);
    el.removeEventListener('mouseleave', el.__smokeLeave);
    io && io.unobserve(el);
  },
};
