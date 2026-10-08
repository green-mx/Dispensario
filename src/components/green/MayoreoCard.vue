<template>
  <article :id="product.slug" class="g-mcard" v-reveal v-smoke="0.04">
    <div class="g-mgal" :data-n="Math.max(imgs.length, 1)">
      <template v-if="imgs.length">
        <div v-for="(u, i) in imgs" :key="u" class="g-mimg">
          <img :src="u" :alt="`${product.title} ${i + 1}`" loading="lazy" @error="bad[u] = true" />
        </div>
      </template>
      <div v-else class="g-mimg g-mempty">
        <span class="g-mwm"></span>
        <span class="g-mtxt">Fotos próximamente</span>
      </div>
    </div>

    <div class="g-mbody">
      <div class="g-mtags">
        <GTypeChip :type="product.chip.type" :label="product.chip.label" :color="product.chip.color" />
        <span class="g-chip g-unit">Por {{ product.unit }}</span>
      </div>
      <h3 class="g-mtitle">{{ product.title }}</h3>
      <p v-if="product.subtitle" class="g-msub">{{ product.subtitle }}</p>

      <ul class="g-tiers">
        <li v-for="(t, i) in product.tiers" :key="t.label" class="g-tier">
          <span class="g-tlabel">{{ t.label }}</span>
          <span class="g-tright">
            <span v-if="i === bestIdx" class="g-chip g-best">Mejor precio</span>
            <b class="g-tprice">{{ formatPriceMXN(t.price) }}</b>
            <small v-if="t.suffix">{{ t.suffix }}</small>
          </span>
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup>
import { computed, reactive } from 'vue';
import GTypeChip from './GTypeChip.vue';
import { formatPriceMXN } from '@/utils/price';

const props = defineProps({ product: { type: Object, required: true } });
const bad = reactive({});

// Hasta 3 fotos; si alguna URL no carga, se descarta sola
const imgs = computed(() => (props.product.images || []).filter((u) => u && !bad[u]).slice(0, 3));

// "Mejor precio" solo cuando la escala es por unidad (x kilo, x libra, x pieza)
const bestIdx = computed(() => {
  const t = props.product.tiers;
  return t.length > 1 && t.every((x) => x.suffix.startsWith('x ')) ? t.length - 1 : -1;
});
</script>
