import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CategoryView from '@/views/CategoryView.vue';
import MayoristasView from '@/views/MayoristasView.vue';
import AboutView from '@/views/AboutView.vue';
import { CATEGORIES } from '@/utils/categories';

function waitForElement(selector, timeout = 2000) {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = () => {
      let el = null;
      try { el = document.querySelector(selector); } catch (e) { return resolve(false); }
      if (el) return resolve(true);
      if (performance.now() - start > timeout) return resolve(false);
      requestAnimationFrame(tick);
    };
    tick();
  });
}

const categoryRoutes = CATEGORIES.map((c) => ({
  path: c.path,
  component: CategoryView,
  props: { slug: c.slug },
  meta: { title: `${c.title} · Green` },
}));

const routes = [
  { path: '/', component: HomeView, meta: { title: 'Green Abastecedora' } },
  ...categoryRoutes,
  { path: '/mayoristas', component: MayoristasView, meta: { title: 'Menú Mayoristas · Green' } },
  // Aliases para las rutas viejas por si hubiera links externos
  { path: '/pre-rolados', redirect: '/otros' },
  { path: '/carts', redirect: '/otros' },
  { path: '/about', component: AboutView, meta: { title: 'Nosotros · Green' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Con la transición entre páginas, la vista nueva se monta un instante
  // después de navegar: esperamos a que exista el ancla antes de hacer scroll.
  // Si no aparece (por ejemplo #ofertas sin promociones activas), vamos arriba.
  scrollBehavior: async (to, from, saved) => {
    if (saved) return saved;
    if (to.hash) {
      const found = await waitForElement(to.hash);
      return found ? { el: to.hash, top: 96, behavior: 'smooth' } : { top: 0 };
    }
    return { top: 0 };
  },
});

router.afterEach((to) => {
  document.title = to.meta.title || 'Green Abastecedora';
});

export default router;
