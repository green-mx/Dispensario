<template>
  <div id="app">
    <div class="g-bar" ref="bar"></div>
    <SmokeLayer />
    <AppNavbar />
    <main class="g-main">
      <RouterView v-slot="{ Component, route }">
        <Transition name="g-page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
    <PurchaseFormModal />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterView } from 'vue-router';
import Lenis from 'lenis';
import AppNavbar from '@/components/layout/AppNavbar.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import SmokeLayer from '@/components/green/SmokeLayer.vue';
import PurchaseFormModal from '@/components/shared/PurchaseFormModal.vue';

const bar = ref(null);
let lenis;
let rafId;

onMounted(() => {
  const setBar = (p) => { if (bar.value) bar.value.style.transform = `scaleX(${p})`; };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setBar(max > 0 ? scrollY / max : 0);
    }, { passive: true });
    return;
  }
  // Scroll suave. Los elementos con data-lenis-prevent (modal, menú móvil)
  // conservan su scroll nativo.
  lenis = new Lenis({ lerp: 0.1 });
  const raf = (t) => { lenis.raf(t); rafId = requestAnimationFrame(raf); };
  rafId = requestAnimationFrame(raf);
  lenis.on('scroll', ({ scroll, limit }) => setBar(limit ? scroll / limit : 0));
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
  lenis && lenis.destroy();
});
</script>

<style>
* { box-sizing: border-box; }
#app { min-height: 100vh; display: flex; flex-direction: column; }
.g-main { flex: 1; min-width: 0; }
</style>
