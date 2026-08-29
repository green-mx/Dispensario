<template>
  <v-container fluid>
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card>
          <v-img src="/assets/otros-banner.jpg" height="200px" cover>
            <template #error>
              <div class="banner-img-fallback"></div>
            </template>
            <div class="header-overlay d-flex align-center justify-center">
              <h1 class="header-title">PRE-ROLADOS · CARTS</h1>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <!-- Explorador: filtros + carrusel + detalle agrupados como una sola
         unidad, mismo patrón que WeedView -->
    <v-card class="explorer-card pa-4 mb-6" elevation="2">
      <div class="d-flex flex-wrap justify-center gap-2 mb-4">
        <v-btn
          v-for="cat in categoryFilters"
          :key="cat.value"
          :variant="activeFilter === cat.value ? 'flat' : 'outlined'"
          :color="activeFilter === cat.value ? 'green-darken-2' : 'grey'"
          size="small"
          @click="activeFilter = cat.value"
          class="filter-btn"
        >{{ cat.label }}</v-btn>
      </div>

      <v-divider class="mb-4 border-opacity-25" />

      <v-row>
        <v-col cols="12" md="5">
          <span class="explorer-label">Vistazo rápido</span>
          <ProductCarousel :products="filteredProducts" @product-selected="showDetail" />
        </v-col>
        <v-col cols="12" md="7">
          <span class="explorer-label">Detalle del producto</span>
          <ProductDetail :product="selectedProduct" :key="selectedProduct?.id" />
        </v-col>
      </v-row>
    </v-card>

    <v-row>
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12" sm="6" md="4"
      >
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
const activeFilter = ref('todos');

const categoryFilters = [
  { label: 'Todos', value: 'todos' },
  { label: 'Pre-Rolados', value: 'pre-rolados' },
  { label: 'Carts', value: 'carts' },
];

const filteredProducts = computed(() => {
  if (activeFilter.value === 'todos') return products.value;
  return products.value.filter(p => p.subcategory === activeFilter.value);
});

onMounted(async () => {
  try {
    products.value = await fetchProductosPorCategoria('otros');
  } catch (e) {
    console.error('Error cargando productos:', e);
  }
});

const showDetail = (product) => {
  selectedProduct.value = product;
};
</script>

<style scoped>
.header-overlay {
  height: 100%;
  background: rgba(0,0,0,0.55);
}
.banner-img-fallback {
  height: 100%;
  background: #1a1a1a;
}
.header-title {
  font-size: clamp(1.1rem, 3vw, 2.2rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.15em;
  font-family: 'Poppins', sans-serif;
  text-align: center;
}
.filter-btn { border-radius: 20px; margin: 4px; }
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
