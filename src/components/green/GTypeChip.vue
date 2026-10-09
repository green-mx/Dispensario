<template>
  <span class="g-chip" :style="style">{{ label || type }}</span>
</template>

<script setup>
import { computed } from 'vue';
import { typeHex } from '@/utils/productType';

const props = defineProps({ type: String, label: String, color: String });
const style = computed(() => {
  const c = props.color || typeHex(props.type);
  return { color: c, backgroundColor: `${c}33`, borderColor: `${c}77` };
});
</script>
