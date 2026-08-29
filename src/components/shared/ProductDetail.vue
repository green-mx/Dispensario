<template>
  <v-card v-if="product" class="detail-card" elevation="0">
    <v-row>
      <v-col cols="12" md="5" class="d-flex flex-column align-center justify-start pt-4">
        
        <!-- Contenedor relativo para el overlay del stock -->
        <div class="image-wrapper mb-4">
          <v-img :src="product.imageUrl" width="280" height="200" class="detail-image" :class="{ 'img-grayscale': product.stock === 0 }" contain>
            <template #error>
              <div class="img-error-fallback d-flex align-center justify-center">
                <v-icon size="48" color="grey-darken-1">mdi-image-off</v-icon>
              </div>
            </template>
          </v-img>

          <!-- Overlay de AGOTADO -->
          <div v-if="product.stock === 0" class="agotado-overlay d-flex align-center justify-center">
            <span class="agotado-text">AGOTADO</span>
          </div>
        </div>

        <div class="greensometro">
          <span class="greensometro-label">Greensometro</span>
          <q-rating v-model="rating" size="1.8em" :max="3" color="green-13" class="mt-1">
            <template #tip-1><q-tooltip>No está mal</q-tooltip></template>
            <template #tip-2><q-tooltip>Bueno</q-tooltip></template>
            <template #tip-3><q-tooltip>¡Excelente!</q-tooltip></template>
          </q-rating>
        </div>
      </v-col>

      <!-- Info -->
      <v-col cols="12" md="7">
        <div class="detail-header">
          <v-chip v-if="product.type" :color="typeColor(product.type)" variant="tonal" size="small" class="mb-2">
            {{ product.type }}
          </v-chip>
          <v-chip v-if="product.subcategory" variant="outlined" size="small" class="mb-2 ml-1">
            {{ product.subcategory }}
          </v-chip>
        </div>

        <v-card-title class="detail-name pl-0">{{ product.name }}</v-card-title>
        <v-card-subtitle v-if="selectedPresentacion" class="pl-0 price-label">
          {{ formatPriceMXN(selectedPresentacion.precio) }}
          <span v-if="selectedPresentacion.peso" class="price-weight"> · {{ selectedPresentacion.peso }}</span>
        </v-card-subtitle>

        <div v-if="presentaciones.length > 0" class="detail-specs mt-3">
          <!-- Deshabilitado si no hay stock -->
          <v-select
            v-if="presentaciones.length > 1"
            v-model="selectedPeso"
            :items="presentaciones.map((p) => p.peso)"
            label="Peso / Presentación"
            variant="outlined"
            density="compact"
            class="mb-3"
            :disabled="product.stock === 0"
          />

          <div class="price-grid">
            <!-- Deshabilitado visualmente si no hay stock -->
            <div
              v-for="p in presentaciones"
              :key="p.peso"
              class="price-row"
              :class="{ 'price-row-active': p.peso === selectedPeso, 'pointer-events-none opacity-50': product.stock === 0 }"
              @click="product.stock > 0 ? selectedPeso = p.peso : null"
            >
              <span class="price-qty">{{ p.peso }}</span>
              <span class="price-val">{{ formatPriceMXN(p.precio) }}</span>
            </div>
          </div>
        </div>

        <v-divider class="my-4 border-opacity-25" />

        <div class="purchase-block">
          <!-- Deshabilitado si no hay stock -->
          <v-text-field 
            v-model="quantity" 
            label="Cantidad" 
            type="number" 
            min="1" 
            density="compact" 
            variant="outlined"
            style="max-width: 120px;"
            :disabled="product.stock === 0"
          />
          <div class="total-row">
            <span>Total</span>
            <span class="total-amount">{{ totalDisplay }}</span>
          </div>
          
          <!-- Botón condicionado al stock -->
          <v-btn 
            :color="product.stock === 0 ? 'grey-darken-2' : 'green-darken-3'" 
            class="mt-3 buy-btn" 
            :disabled="product.stock === 0"
            @click="buyProduct">
            <FontAwesomeIcon icon="fa-brands fa-whatsapp" class="mr-2" /> 
            {{ product.stock === 0 ? 'Agotado' : 'Comprar' }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>

  <div v-else class="empty-state">
    <v-icon size="60" color="grey-darken-2">mdi-cannabis</v-icon>
    <p class="mt-2 text-grey">Selecciona un producto para ver los detalles</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { usePurchaseForm } from '@/composables/usePurchaseForm';
import { calculateTotal, formatPriceMXN } from '@/utils/price';
import { typeColor } from '@/utils/productType';

const props = defineProps({ product: Object });
const rating = ref(2);
const quantity = ref(1);
const selectedPeso = ref(null);

const { openPurchaseForm } = usePurchaseForm();

const presentaciones = computed(() => props.product?.presentaciones ?? []);

watch(
  () => props.product,
  (product) => {
    selectedPeso.value = product?.presentaciones?.[0]?.peso ?? null;
    quantity.value = 1;
  },
  { immediate: true }
);

const selectedPresentacion = computed(
  () =>
    presentaciones.value.find((p) => p.peso === selectedPeso.value) ??
    presentaciones.value[0] ??
    null
);

const total = computed(() =>
  calculateTotal(selectedPresentacion.value?.precio ?? props.product?.price, quantity.value)
);
const totalDisplay = computed(() => formatPriceMXN(total.value) ?? 'Se confirma por WhatsApp');

const buyProduct = () => {
  openPurchaseForm(props.product, quantity.value, selectedPeso.value);
};
</script>

<style scoped>
.detail-card {
  padding: 16px;
  background: transparent;
}

:deep(.q-rating) {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  justify-content: center !important;
}

/* --- WRAPPER Y CLASES DE STOCK --- */
.image-wrapper {
  position: relative;
  width: 280px; /* Mismo ancho que tu foto */
  border-radius: 16px;
}
.img-grayscale {
  filter: grayscale(100%);
  opacity: 0.6;
}
.agotado-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  z-index: 2;
}
.agotado-text {
  color: #ff5252;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 2px;
  border: 4px solid #ff5252;
  padding: 5px 25px;
  transform: rotate(-15deg);
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 4px 15px rgba(255, 82, 82, 0.3);
}
/* --------------------------------- */

.detail-image {
  width: 280px;
  height: 280px;
  border-radius: 16px;
  background: #0c0c0c; 
  border: 1px solid rgba(76, 175, 80, 0.15);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4); 
  transition: filter 0.3s ease;
}

.img-error-fallback {
  height: 100%;
  width: 100%;
  background: transparent;
}

.greensometro {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #141414;
  padding: 10px 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.greensometro-label {
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.detail-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #eee;
}

.price-label {
  color: #4caf50;
  font-size: 1rem;
  font-weight: 600;
}

.price-weight {
  color: #9e9e9e;
  font-size: 0.85rem;
  font-weight: 500;
}

.spec-desc {
  font-size: 0.9rem;
  color: #bbb;
  line-height: 1.6;
}

.price-grid {
  background: #1a1a1a;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s ease;
}

.price-row:hover {
  background: rgba(76, 175, 80, 0.08);
}

.price-row-active {
  background: rgba(76, 175, 80, 0.18);
  outline: 1px solid rgba(76, 175, 80, 0.4);
}

.price-qty {
  color: #888;
}

.price-val {
  color: #4caf50;
  font-weight: 600;
}

.purchase-block {
  border-radius: 10px;
  padding: 14px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111;
  border-radius: 8px;
  padding: 10px 14px;
  color: #bbb;
  font-size: 0.9rem;
  margin-top: 8px;
}

.total-amount {
  color: #4caf50;
  font-weight: 700;
  font-size: 1.1rem;
}

.buy-btn {
  width: 100%;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: #666;
}

/* Clases de utilidad para bloqueo manual */
.pointer-events-none { pointer-events: none; }
.opacity-50 { opacity: 0.5; }
</style>