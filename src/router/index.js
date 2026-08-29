import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import WeedView from '@/views/WeedView.vue';
import TopShelfView from '@/views/TopShelfView.vue';
import OtrosView from '@/views/OtrosView.vue';
import FrascosView from '@/views/FrascosView.vue';
import HongosView from '@/views/HongosView.vue';
import AboutView from '@/views/AboutView.vue';

const routes = [
  { path: '/', component: HomeView, meta: { title: 'Green Abastecedora' } },
  { path: '/weed', component: WeedView, meta: { title: 'Weed · Green' } },
  { path: '/top-shelf', component: TopShelfView, meta: { title: 'Top Shelf · Green' } },
  { path: '/otros', component: OtrosView, meta: { title: 'Pre-Rolados & Carts · Green' } },
  { path: '/frascos', component: FrascosView, meta: { title: 'Frascos · Green' } },
  { path: '/hongos', component: HongosView, meta: { title: 'Hongos · Green' } },
  // Aliases para las rutas viejas por si hubiera links externos
  { path: '/pre-rolados', redirect: '/otros' },
  { path: '/carts', redirect: '/otros' },
  { path: '/about', component: AboutView, meta: { title: 'Nosotros · Green' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.afterEach((to) => {
  document.title = to.meta.title || 'Green Abastecedora';
});

export default router;