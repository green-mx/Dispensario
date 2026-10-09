<template>
  <header class="g-header">
    <div class="g-wrap">
      <nav class="g-nav g-glass" aria-label="Principal">
        <RouterLink to="/" class="g-brand">
          <span class="g-brand-logo"></span>
          <b class="g-disp">GREEN</b>
        </RouterLink>

        <div class="g-links">
          <RouterLink to="/">Inicio</RouterLink>
          <div class="g-dd">
            <button type="button" aria-haspopup="true">Catálogo ▾</button>
            <div class="g-mega">
              <div class="g-mega-in g-glass">
                <RouterLink v-for="c in CATEGORIES" :key="c.slug" :to="c.path">
                  <span class="g-th" :style="thumb(c)"></span>
                  <span>
                    <b>{{ c.title }}</b>
                    <small>{{ isSoon(c) ? 'Próximamente' : c.desc }}</small>
                  </span>
                </RouterLink>
              </div>
            </div>
          </div>
          <RouterLink to="/edibles">Edibles</RouterLink>
          <RouterLink to="/nuevas-llegadas">Nuevas llegadas</RouterLink>
          <RouterLink :to="{ path: '/', hash: '#ofertas' }" active-class="" exact-active-class="">Ofertas</RouterLink>
          <RouterLink to="/about">Nosotros</RouterLink>
        </div>

        <RouterLink to="/mayoristas" class="g-btn g-grad g-sm g-mayor">Mayoristas</RouterLink>
        <button type="button" class="g-burger" aria-label="Abrir menú" @click="setOpen(true)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#39ff14" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </nav>
    </div>
  </header>

  <Teleport to="body">
    <div v-if="open" class="g-drawer" data-lenis-prevent>
      <button type="button" class="g-x" aria-label="Cerrar menú" @click="setOpen(false)">×</button>
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink :to="{ path: '/', hash: '#ofertas' }">Ofertas</RouterLink>
      <RouterLink v-for="c in CATEGORIES" :key="c.slug" :to="c.path">{{ c.title }}</RouterLink>
      <RouterLink to="/about">Nosotros</RouterLink>
      <RouterLink to="/mayoristas" style="color:#39ff14">Menú Mayoristas</RouterLink>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { CATEGORIES } from '@/utils/categories';
import { cropStyle } from '@/utils/brandCrops';
import { useCategoryCovers } from '@/composables/useCategoryCovers';

const route = useRoute();
const open = ref(false);
const { covers, loaded } = useCategoryCovers();

const setOpen = (v) => {
  open.value = v;
  document.body.style.overflow = v ? 'hidden' : '';
};
watch(() => route.fullPath, () => setOpen(false));

const isSoon = (c) => c.soon || (loaded.value && !covers.value[c.categoria]?.count);
const thumb = (c) => {
  const cover = covers.value[c.categoria]?.cover;
  return cover ? { backgroundImage: `url(${cover})` } : cropStyle(c.crop);
};
</script>
