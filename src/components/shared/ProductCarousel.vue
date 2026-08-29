<template>
  <div class="q-pa-md carousel-wrapper">
    <q-carousel
      v-if="products.length"
      animated
      v-model="slide"
      swipeable
      infinite
      :autoplay="isPaused ? false : autoplay"
      control-color="green-13"
      transition-prev="fade"
      transition-next="fade"
      thumbnails
      height="420px"
      background="transparent"
      @mouseenter="isPaused = true"
      @mouseleave="isPaused = false"
    >
      <q-carousel-slide
        v-for="product in products"
        :key="product.id"
        :name="product.id"
        :img-src="product.imageUrl"
        @click="$emit('product-selected', product)"
      />
    </q-carousel>

    <div v-else class="carousel-empty-state">
      <v-icon size="48" color="grey-darken-2">mdi-cannabis</v-icon>
      <p class="mt-2 text-grey">No hay productos en esta categoría por ahora.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ products: { type: Array, default: () => [] } });
const emit = defineEmits(['product-selected']);

const slide = ref(props.products?.[0]?.id ?? null);
const autoplay = ref(true);
const isPaused = ref(false);


watch(
  slide,
  (newId) => {
    const product = props.products.find((p) => p.id === newId);
    if (product) emit('product-selected', product);
  },
  { immediate: true }
);


watch(
  () => props.products,
  (newProducts) => {
    if (!newProducts || newProducts.length === 0) {
      slide.value = null;
      return;
    }
    const stillValid = newProducts.some((p) => p.id === slide.value);
    if (!stillValid) {
      slide.value = newProducts[0].id;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.carousel-wrapper {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.q-carousel__slide) {
  background-size: contain !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-color: #1a1a1a !important;
}
:deep(.q-panel) {
  background: transparent !important;
}
/* Firefox */
:deep(.q-carousel__navigation--thumbnails) {
  scrollbar-width: thin;
  scrollbar-color: #9b010186 #1a1a1a;
}

/* Chrome, Edge, Opera */
:deep(.q-carousel__navigation--bottom::-webkit-scrollbar) {
  height: 8px;
}

:deep(.q-carousel__navigation--bottom::-webkit-scrollbar-track) {
  background: #222;
  border-radius: 20px;
}

:deep(.q-carousel__navigation--bottom::-webkit-scrollbar-thumb) {
  background: #00ff66;
  border-radius: 20px;
}

:deep(.q-carousel__navigation--bottom::-webkit-scrollbar-thumb:hover) {
  background: #00cc55;
}

.carousel-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: #666;
}
</style>
