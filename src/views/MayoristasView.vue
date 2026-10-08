<template>
  <section class="g-wrap g-page-head">
    <RouterLink to="/" class="g-back">← Volver a la tienda</RouterLink>

    <div class="g-mayor-head" v-reveal>
      <div class="g-wmbig"></div>
      <span class="g-chip g-grad" style="border-color:transparent;position:relative">MAYOREO</span>
      <h1 class="g-title" style="position:relative;margin-top:16px;font-size:clamp(2rem,7vw,3.8rem)">Menú Mayoristas</h1>
      <p style="position:relative;color:#e2eee2;max-width:560px;margin:16px 0 0">
        Catálogo exclusivo por mayoreo, con presentación, precio y mínimo de compra.
        Solo consulta: aquí no se pide nada por WhatsApp.
      </p>
      <div class="g-route" style="position:relative"><i></i><s></s><i></i></div>
      <p style="position:relative;color:#cfdccf;font-size:.9rem;margin:12px 0 0">
        Envíos a toda la República Mexicana · Entregas personales en varios estados
      </p>
    </div>

    <div style="margin-top:32px">
      <GComingSoon text="Estamos armando el catálogo de mayoreo." sub="Aquí aparecerán las fichas con imagen, presentación, precio y mínimo." />
    </div>
  </section>
</template>

<script setup>
import GComingSoon from '@/components/green/GComingSoon.vue';
</script>
