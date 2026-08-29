<template>
  <div v-if="activeOffers.length" class="promotions-section">
    <v-row class="my-4">
      <v-col cols="12" class="text-center">
        <span class="section-title">Promociones</span>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col v-for="offer in activeOffers" :key="offer.id" cols="12" sm="6" md="4">

        <v-card class="promo-card" elevation="2" hover>
          <!-- Altura ajustada a 300px -->
          <v-img :src="offer.imageUrl" height="300px" cover class="promo-img">
            <template #error>
              <div class="promo-img-fallback d-flex align-center justify-center">
                <v-icon size="48" color="grey-darken-1">mdi-image-off</v-icon>
              </div>
            </template>
          </v-img>

          <v-chip v-if="offer.type" class="type-chip ma-2" :color="typeColor(offer.type)" size="small"
            variant="tonal">{{
              offer.type }}</v-chip>

          <v-card-title class="promo-name text-center">{{ offer.name }}</v-card-title>
          <v-card-subtitle class="text-center text-caption" :class="`text-${typeColor(offer.type)}`">
            {{ offer.subcategory }}
          </v-card-subtitle>

          <!-- Precio y peso -->
          <v-card-text v-if="offer.price" class="text-center price-tag">
            ${{ offer.price }} <span class="price-weight"> · {{ offer.peso }}</span>
          </v-card-text>

          <v-card-actions class="d-flex justify-center pb-3">
            <v-btn variant="flat" color="green-darken-3" size="small" @click.stop="buyOffer(offer)">
              <FontAwesomeIcon icon="fa-brands fa-whatsapp" class="mr-1" /> Comprar
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
    <v-divider class="my-6 border-opacity-25" />
  </div>
</template>

<script setup>
import { useOffers } from '@/composables/useOffers';
import { usePurchaseForm } from '@/composables/usePurchaseForm';
import { typeColor } from '@/utils/productType';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const { activeOffers } = useOffers();
const { openPurchaseForm } = usePurchaseForm();

const buyOffer = (offer) => {
  openPurchaseForm(offer);
};
</script>

<style scoped>
.section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: #4caf50;
  letter-spacing: 0.1em;
}

.promo-card {
  border-radius: 14px;
  background: #1a1a1a;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.promo-card:hover {
  transform: translateY(-4px);
}

.promo-img {
  border-radius: 14px 14px 0 0;
  background: #111;
}

.promo-img-fallback {
  height: 100%;
  background: #111;
}

.promo-name {
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
}
</style>