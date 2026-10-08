<template>
  <article class="g-pcard" :class="{ 'g-sq': big }" v-smoke="big ? 0.2 : 0.07" v-reveal>
    <img v-if="product.imageUrl && !imgError" class="g-ph" :class="{ 'g-gray': out }" :src="product.imageUrl" :alt="product.name" loading="lazy" @error="imgError = true" />
    <div v-else class="g-ph" :class="{ 'g-gray': out }" :style="fallback"></div>
    <span class="g-wm"></span>
    <div class="g-shade"></div>

    <div class="g-tags">
      <GTypeChip v-if="product.type" :type="product.type" />
      <GTypeChip v-if="isOffer && product.subcategory" :type="product.subcategory" :label="cap(product.subcategory)" />
    </div>

    <div v-if="out" class="g-agotado"><span>AGOTADO</span></div>

    <div class="g-info">
      <b class="g-name">{{ product.name }}</b>
      <span class="g-subl" :style="{ color: subColor }">{{ subLabel }}</span>
      <span class="g-price"><small v-if="hasMany">Desde</small>{{ priceText }}</span>
      <button type="button" class="g-buy" :class="out ? '' : 'g-grad'" :disabled="out" @click="buy">
        {{ out ? 'No disponible' : 'Comprar' }}
      </button>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue';
import GTypeChip from './GTypeChip.vue';
import { usePurchaseForm } from '@/composables/usePurchaseForm';
import { formatPriceMXN, parsePriceToNumber } from '@/utils/price';
import { typeHex, isKnownType } from '@/utils/productType';
import { cropByHash } from '@/utils/brandCrops';

const props = defineProps({ product: { type: Object, required: true }, big: Boolean });
const { openPurchaseForm } = usePurchaseForm();
const imgError = ref(false);

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const isOffer = computed(() => props.product.type === 'Oferta');
const pres = computed(() => props.product.presentaciones ?? []);
const hasMany = computed(() => pres.value.length > 1);
const out = computed(
  () => props.product.stock === 0 || (pres.value.length > 0 && pres.value.every((p) => p.stock === 0))
);
const priceText = computed(() => formatPriceMXN(parsePriceToNumber(props.product.price)) ?? 'Consultar');
const subLabel = computed(() => (isOffer.value ? props.product.peso : cap(props.product.subcategory)) || '');
const subColor = computed(() => (!isOffer.value && isKnownType(props.product.subcategory) ? typeHex(props.product.subcategory) : '#b6ff00'));
const fallback = computed(() => cropByHash(props.product.id));

const buy = () => openPurchaseForm(props.product);
</script>
