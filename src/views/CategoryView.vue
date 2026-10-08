<template>
  <section class="g-wrap g-page-head">
    <RouterLink to="/" class="g-back">← Inicio</RouterLink>
    <h1 class="g-title"><span class="g-gt">{{ cfg.title }}</span></h1>
    <p class="g-sub" style="margin-bottom:32px">{{ cfg.desc }}</p>

    <GComingSoon v-if="isEmpty" :sub="cfg.soon ? 'Muy pronto verás aquí lo más nuevo del menú.' : 'Muy pronto verás aquí los productos.'" />

    <template v-else>
      <GFilterChips v-if="subs.length > 2" :options="subs" v-model="filter" />
      <div v-if="loading" class="g-grid-prod"><div v-for="n in 8" :key="n" class="g-skel"></div></div>
      <p v-else-if="error" style="color:#f87171">No pudimos cargar los productos. Intenta de nuevo en un momento.</p>
      <div v-else class="g-grid-prod">
        <GProductCard v-for="p in shown" :key="p.id" :product="p" />
      </div>
    </template>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import GProductCard from '@/components/green/GProductCard.vue';
import GFilterChips from '@/components/green/GFilterChips.vue';
import GComingSoon from '@/components/green/GComingSoon.vue';
import { CATEGORIES, isEdible } from '@/utils/categories';
import { fetchProductosPorCategoria } from '@/composables/useSupabaseProducts';

const props = defineProps({ slug: { type: String, required: true } });
const cfg = CATEGORIES.find((c) => c.slug === props.slug) || CATEGORIES[0];

const products = ref([]);
const loading = ref(!cfg.soon);
const error = ref(false);
const filter = ref('Todos');

const subs = computed(() => ['Todos', ...new Set(products.value.map((p) => p.subcategory).filter(Boolean))]);
const shown = computed(() => (filter.value === 'Todos' ? products.value : products.value.filter((p) => p.subcategory === filter.value)));
const isEmpty = computed(() => cfg.soon || (!loading.value && !error.value && products.value.length === 0));

onMounted(async () => {
  if (cfg.soon) return;
  try {
    let list = await fetchProductosPorCategoria(cfg.categoria);
    if (cfg.slug === 'edibles') {
      // Las gomitas que hoy viven en "otros" también salen aquí
      const otros = await fetchProductosPorCategoria('otros');
      const ids = new Set(list.map((p) => p.id));
      list = [...list, ...otros.filter((p) => isEdible(p) && !ids.has(p.id))];
    }
    products.value = list;
  } catch (e) {
    console.error('Error cargando productos:', e);
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>
