<template>
  <span class="g-chip" :style="style">{{ label || type }}</span>
</template>

<script setup>
import { computed } from 'vue';
import { typeHex } from '@/utils/productType';

const props = defineProps({ type: String, label: String });
const style = computed(() => {
  const c = typeHex(props.type);
  return { color: c, background: `${c}2e`, borderColor: `${c}77` };
});
</script>
