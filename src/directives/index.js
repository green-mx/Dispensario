import VanillaTilt from 'vanilla-tilt';
import { vSmoke } from '@/composables/useSmoke';

let revealIO;
const getIO = () =>
  revealIO ||
  (revealIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('g-in'); revealIO.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  ));

const vReveal = {
  mounted(el) { el.classList.add('g-reveal'); getIO().observe(el); },
  unmounted(el) { revealIO && revealIO.unobserve(el); },
};

// Tilt 3D solo en dispositivos con mouse
const vTilt = {
  mounted(el, b) {
    if (!matchMedia('(hover: hover)').matches) return;
    VanillaTilt.init(el, { max: 7, speed: 500, glare: true, 'max-glare': 0.18, ...(b.value || {}) });
  },
  unmounted(el) { el.vanillaTilt && el.vanillaTilt.destroy(); },
};

export function registerDirectives(app) {
  app.directive('reveal', vReveal);
  app.directive('smoke', vSmoke);
  app.directive('tilt', vTilt);
}
