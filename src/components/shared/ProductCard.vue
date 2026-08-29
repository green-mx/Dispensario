<template>
  <v-card class="product-card" :elevation="hovered ? 8 : 2"
    @mouseenter="hovered = true" @mouseleave="hovered = false"
    @click="product.stock > 0 ? $emit('select', product) : null">
    
    <!-- Contenedor relativo para poder encimar el letrero de agotado -->
    <div style="position: relative;">
      <v-img :src="product.imageUrl" height="300px" fill class="product-img" :class="{ 'img-grayscale': product.stock === 0 }">
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

    <v-chip
      v-if="product.type"
      class="type-chip ma-2"
      :color="typeColor(product.type)"
      size="small"
      variant="tonal"
    >{{ product.type }}</v-chip>

    <v-card-title class="product-name text-center">{{ product.name }}</v-card-title>
    <v-card-subtitle class="text-center text-caption" :class="`text-${typeColor(product.type)}`">
      {{ product.subcategory }}
    </v-card-subtitle>
    
    <v-card-text v-if="product.price" class="text-center price-tag">
      <span v-if="product.presentaciones?.length > 1">Desde </span>{{ product.price }}
      <span v-if="product.peso" class="price-weight"> · {{ product.peso }}</span>
    </v-card-text>

    <!-- Botón condicionado al stock -->
    <v-card-actions class="d-flex justify-center pb-3">
      <v-btn 
        variant="flat" 
        :color="product.stock === 0 ? 'grey-darken-2' : 'green-darken-3'" 
        size="small" 
        :disabled="product.stock === 0"
        @click.stop="buyProduct">
        <FontAwesomeIcon icon="fa-brands fa-whatsapp" class="mr-1" /> 
        {{ product.stock === 0 ? 'Agotado' : 'Comprar' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { usePurchaseForm } from '@/composables/usePurchaseForm';
import { typeColor } from '@/utils/productType';

const props = defineProps({ product: Object });
defineEmits(['select']);
const hovered = ref(false);

const { openPurchaseForm } = usePurchaseForm();

const buyProduct = () => {
  openPurchaseForm(props.product);
};
</script>

<style scoped>
.product-card {
  border-radius: 14px;
  background: #1a1a1a;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}
.product-card:hover {
  transform: translateY(-4px);
}
.product-img {
  border-radius: 14px 14px 0 0;
  background: #111;
  transition: filter 0.3s ease;
}
.img-error-fallback {
  height: 100%;
  background: #111;
}

/* --- CLASES NUEVAS PARA EL STOCK --- */
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
  border-radius: 14px 14px 0 0;
  z-index: 2;
}
.agotado-text {
  color: #ff5252;
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 2px;
  border: 3px solid #ff5252;
  padding: 5px 20px;
  transform: rotate(-15deg);
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 4px 15px rgba(255, 82, 82, 0.3);
}
/* ----------------------------------- */

.product-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #eee;
  line-height: 1.3;
  white-space: normal;
}
.price-tag {
  color: #4caf50;
  font-weight: 600;
  font-size: 0.9rem;
}
.price-weight {
  color: #9e9e9e;
  font-weight: 500;
  font-size: 0.8rem;
}
.type-chip {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 3; /* Para que quede arriba del overlay oscuro */
}
</style>