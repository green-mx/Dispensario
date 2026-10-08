<template>
  <div class="g-soon" v-smoke="0.16">
    <div class="g-bgwm"></div>
    <div>
      <span class="g-chip" style="color:#b6ff00;background:#b6ff0022;border-color:#b6ff0066">EN CONSTRUCCIÓN</span>
      <h2><span class="g-gt">Próximamente</span></h2>
      <p>{{ text }}</p>
      <p v-if="sub" class="g-s">{{ sub }}</p>
      <RouterLink to="/" class="g-btn g-grad">Volver al inicio</RouterLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: { type: String, default: 'Estamos preparando esta sección.' },
  sub: { type: String, default: 'Muy pronto verás aquí los productos.' },
});
</script>
