<template>
  <div class="category-previews">
    <div v-for="cat in categories" :key="cat.route" class="cat-block mb-8">
      <router-link :to="cat.route" class="cat-title-link">
        {{ cat.label }}
      </router-link>

      <el-carousel
        v-if="cat.products.length"
        :interval="3000"
        type="card"
        indicator-position="none"
        :autoplay="true"
        class="cat-carousel"
      >
        <el-carousel-item
          v-for="product in cat.products"
          :key="product.id"
          class="!bg-transparent"
        >
          <div class="flex flex-col items-center justify-center h-full w-full">
            <img
              :src="product.imageUrl"
              :alt="product.name"
              class="w-full h-full object-contain drop-shadow-xl"
            />
            <div class="text-center text-gray-400 text-xs mt-1">
              {{ product.name }}
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
      <p v-else class="cat-empty">Sin productos disponibles por ahora.</p>

      <el-divider border-style="dotted" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchProductosPorCategoria } from '@/composables/useSupabaseProducts';

const categories = ref([
  { label: 'Top Shelf', route: '/top-shelf', products: [] },
  { label: 'Pre-Rolados & Carts', route: '/otros', products: [] },
]);

onMounted(async () => {
  try {
    const [topShelf, otros] = await Promise.all([
      fetchProductosPorCategoria('top-shelf'),
      fetchProductosPorCategoria('otros'),
    ]);
    categories.value[0].products = topShelf.slice(0, 8);
    categories.value[1].products = otros;
  } catch (e) {
    console.error('Error cargando previews:', e);
  }
});
</script>

<style scoped>
.cat-title-link {
  display: block;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  color: #4caf50;
  text-decoration: none;
  margin-bottom: 8px;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}
.cat-title-link:hover {
  color: #81c784;
}


.cat-carousel :deep(.el-carousel__item) {
  background: transparent !important;
}

.cat-carousel :deep(.el-carousel__mask) {
  background: transparent !important;
}

.cat-carousel {
  background: transparent;
}

.cat-empty {
  text-align: center;
  color: #666;
  font-size: 0.85rem;
  padding: 24px 0;
}
</style>
