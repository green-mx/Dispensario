import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CategoryView from '@/views/CategoryView.vue';
import MayoristasView from '@/views/MayoristasView.vue';
import AboutView from '@/views/AboutView.vue';
import { CATEGORIES } from '@/utils/categories';

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
  scrollBehavior: (to, from, saved) => {
    if (saved) return saved;
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' };
    return { top: 0 };
  },
});

router.afterEach((to) => {
  document.title = to.meta.title || 'Green Abastecedora';
});

export default router;
