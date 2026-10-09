<template>
  <section class="g-wrap g-page-head">
    <RouterLink to="/" class="g-back">← Volver a la tienda</RouterLink>

    <div class="g-mayor-head" v-reveal>
      <div class="g-wmbig"></div>
      <span class="g-chip g-grad" style="border-color:transparent;position:relative">MAYOREO</span>
      <h1 class="g-title" style="position:relative;margin-top:16px;font-size:clamp(2rem,7vw,3.8rem)">Menú Mayoristas</h1>
      <p style="position:relative;color:#e2eee2;max-width:560px;margin:16px 0 0">
        Catálogo por mayoreo, con precio por escala de compra.
        Elige la escala que te interesa y pídela directo por WhatsApp.
      </p>
      <div class="g-route" style="position:relative"><i></i><s></s><i></i></div>
      <p style="position:relative;color:#cfdccf;font-size:.9rem;margin:12px 0 0">
        Envíos a toda la República Mexicana · Entregas personales en varios estados
      </p>
    </div>

    <div style="margin-top:28px">
      <GFilterChips v-if="types.length > 2" :options="types" v-model="filter" />
    </div>

    <div v-if="loading" class="g-mlist"><div v-for="n in 3" :key="n" class="g-skel" style="height:320px;border-radius:24px"></div></div>
    <p v-else-if="error" style="color:#f87171">No pudimos cargar el menú de mayoreo. Intenta de nuevo en un momento.</p>
    <GComingSoon v-else-if="!products.length" sub="Muy pronto verás aquí el menú de mayoreo." />
    <div v-else class="g-mlist">
      <MayoreoCard v-for="p in shown" :key="p.id" :product="p" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import MayoreoCard from '@/components/green/MayoreoCard.vue';
import GFilterChips from '@/components/green/GFilterChips.vue';
import GComingSoon from '@/components/green/GComingSoon.vue';
import { useMayoreo } from '@/composables/useMayoreo';

const { products, loading, error } = useMayoreo();
const filter = ref('Todos');
const types = computed(() => ['Todos', ...new Set(products.value.map((p) => p.type).filter(Boolean))]);
const shown = computed(() => (filter.value === 'Todos' ? products.value : products.value.filter((p) => p.type === filter.value)));
</script>
