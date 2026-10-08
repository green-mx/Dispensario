<template>
  <div class="g-filters">
    <button
      v-for="opt in options"
      :key="opt"
      type="button"
      class="g-chipb"
      :class="{ 'g-on': opt === modelValue }"
      :style="opt !== modelValue && opt !== 'Todos' && isKnownType(opt) ? { color: typeHex(opt) } : null"
      @click="$emit('update:modelValue', opt)"
    >{{ opt }}</button>
  </div>
</template>

<script setup>
import { typeHex, isKnownType } from '@/utils/productType';

defineProps({ options: { type: Array, default: () => [] }, modelValue: String });
defineEmits(['update:modelValue']);
</script>
