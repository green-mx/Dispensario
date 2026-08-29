<template>
  <v-container fluid>
    <!-- Header imagen: mismo patrón que FrascosView/TopShelfView (con fallback si la
         imagen del banner todavía no existe en /public/assets) -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card>
          <v-img src="/assets/hongos-banner.jpg" height="220px" contain class="header-img">
            <template #error>
              <div class="banner-img-fallback"></div>
            </template>
            <div class="header-overlay d-flex align-center justify-center">
              <h1 class="header-title">HONGOS</h1>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <!-- Explorador: filtros + carrusel + detalle, mismo patrón que
         WeedView/FrascosView/OtrosView. Los filtros salen solos de las
         subcategorías que traigan los productos (si solo hay una, queda
         nomás "Todos"). -->
    <v-card class="explorer-card pa-4 mb-6" elevation="2">
      <div v-if="subcategories.length > 2" class="d-flex flex-wrap gap-2 justify-center mb-4">
        <v-btn v-for="sub in subcategories" :key="sub" :variant="activeFilter === sub ? 'flat' : 'outlined'"
          :color="activeFilter === sub ? 'green-darken-2' : 'grey'" size="small" @click="activeFilter = sub"
          class="filter-btn">{{ sub }}</v-btn>
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
    // Importante: este valor debe coincidir EXACTAMENTE con el valor
    // guardado en la columna "categoria" de la tabla "productos" en
    // Supabase (por ejemplo: 'hongos', todo en minúsculas).
    products.value = await fetchProductosPorCategoria('hongos');
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

.banner-img-fallback {
  height: 100%;
  background: #1a1a1a;
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
