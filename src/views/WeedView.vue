<template>
  <v-container fluid>
    <!-- Header imagen -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card>
          <v-img src="/assets/weed-banner.jpg" height="220px" contain class="header-img">
            <div class="header-overlay d-flex align-center justify-center">
              <h1 class="header-title">WEED</h1>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <!-- Explorador: filtros + carrusel + detalle agrupados como una sola
         unidad (antes los filtros quedaban sueltos y el carrusel/detalle
         se sentía como otro bloque aparte sin relación visual clara) -->
    <v-card class="explorer-card pa-4 mb-6" elevation="2">
      <div class="d-flex flex-wrap gap-2 justify-center mb-4">
        <v-btn v-for="sub in subcategories" :key="sub" :variant="activeFilter === sub ? 'flat' : 'outlined'"
          :color="activeFilter === sub ? 'green-darken-2' : 'grey'" size="small" @click="activeFilter = sub"
          class="filter-btn">{{ sub }}</v-btn>
      </div>

      <v-divider class="mb-4 border-opacity-25" />

      <v-row>
        <!-- Carrusel: más angosto, es un "vistazo rápido" -->
        <v-col cols="12" md="5">
          <span class="explorer-label">Vistazo rápido</span>
          <ProductCarousel :products="filteredProducts" @product-selected="showDetail" />
        </v-col>

        <!-- Detalle: más ancho, es donde realmente se decide la compra -->
        <v-col cols="12" md="7">
          <span class="explorer-label">Detalle del producto</span>
          <ProductDetail :product="selectedProduct" :key="selectedProduct?.id" />
        </v-col>
      </v-row>
    </v-card>

    <!-- Catálogo completo: sección aparte, con conteo, distinta en
         propósito al "vistazo rápido" de arriba -->
    <v-row>
      <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <ProductCard :product="product" @select="showDetail" />
      </v-col>
    </v-row>
  </v-container>
  <AppFooter />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ProductCarousel from '@/components/shared/ProductCarousel.vue';
import ProductDetail from '@/components/shared/ProductDetail.vue';
import ProductCard from '@/components/shared/ProductCard.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import { fetchProductosPorCategoria } from '@/composables/useSupabaseProducts';

const products = ref([]);
const selectedProduct = ref(null);
const activeFilter = ref('Todos');

const subcategories = computed(() => {
  const subs = [...new Set(products.value.map(p => p.subcategory))];
  return ['Todos', ...subs];
});

const filteredProducts = computed(() => {
  if (activeFilter.value === 'Todos') return products.value;
  return products.value.filter(p => p.subcategory === activeFilter.value);
});

onMounted(async () => {
  try {
    products.value = await fetchProductosPorCategoria('weed');
  } catch (e) {
    console.error('Error cargando productos:', e);
  }
});


const showDetail = (product) => {
  selectedProduct.value = product;
};
</script>

<style scoped>
.header-img {
  border-radius: 10px;
  background: #FFFFFF;
}

.header-overlay {
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.header-title {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.2em;
  font-family: 'Poppins', sans-serif;
}

.filter-btn {
  border-radius: 20px;
  margin: 4px;
}

.explorer-card {
  border-radius: 14px;
  background: #161616;
}

.explorer-label {
  display: block;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #888;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.section-label {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #4caf50;
  letter-spacing: 0.1em;
}
</style>
