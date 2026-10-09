<template>
  <canvas id="g-smoke" ref="canvas" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { startSmoke, stopSmoke } from '@/composables/useSmoke';

const canvas = ref(null);
onMounted(() => startSmoke(canvas.value));
onBeforeUnmount(stopSmoke);
</script>
