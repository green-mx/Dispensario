<template>
  <main>
    <v-container>
      <!-- Hero banner -->
      <HeroCarousel class="mb-6" />

      <!-- Promociones activas (se oculta sola si no hay ninguna) -->
      <PromotionsSection />

      <v-divider class="my-6 border-opacity-25" />

      <!-- Sección destacados (PURA WEED Y OTROS, CERO TOP SHELF) -->
      <v-row class="my-4">
        <v-col cols="12" class="text-center">
          <span class="section-title">✦ Productos Destacados ✦</span>
        </v-col>
        <v-col v-for="product in featuredProducts" :key="product.id" cols="12" sm="6" md="4">
          <ProductCard :product="product" />
        </v-col>
      </v-row>

      <v-divider class="my-6 border-opacity-25" />

      <CategoryPreview />
    </v-container>

    <AppFooter />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeroCarousel from '@/components/layout/HeroCarousel.vue';
import CategoryPreview from '@/components/layout/CategoryPreview.vue';
import PromotionsSection from '@/components/layout/PromotionsSection.vue';
import ProductCard from '@/components/shared/ProductCard.vue';
import AppFooter from '@/components/layout/AppFooter.vue';

import { fetchProductosPorCategoria } from '@/composables/useSupabaseProducts';

const featuredProducts = ref([]);

onMounted(async () => {
  try {
    // Mandamos alv el top-shelf de aquí para que no salga en las tarjetas.
    // Jalamos la categoría 'weed' (o las que quieras destacar) y 'otros'.
    const [weed, otros] = await Promise.all([
      fetchProductosPorCategoria('weed'),
      fetchProductosPorCategoria('otros'),
    ]);

    // Llenamos las 6 tarjetas de arriba sin contaminarlas con Top Shelf
    featuredProducts.value = [...weed, ...otros].slice(0, 6);
  } catch (e) {
    console.error('Error cargando destacados desde Supabase:', e);
  }
});
</script>

<style scoped>
.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(to right, #9f9f9f 0, #fff 10%, #868686 20%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s infinite linear;
  letter-spacing: 0.1em;
}

@keyframes shine {
  0% {
    background-position: 0;
  }

  60% {
    background-position: 200px;
  }

  100% {
    background-position: 300px;
  }
}
</style>