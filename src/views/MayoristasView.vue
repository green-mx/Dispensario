<template>
  <section class="g-wrap g-page-head">
    <RouterLink to="/" class="g-back">← Volver a la tienda</RouterLink>

    <div class="g-mayor-head" v-reveal>
      <div class="g-wmbig"></div>
      <span class="g-chip g-grad" style="border-color:transparent;position:relative">MAYOREO</span>
      <h1 class="g-title" style="position:relative;margin-top:16px;font-size:clamp(2rem,7vw,3.8rem)">Menú Mayoristas</h1>
      <p style="position:relative;color:#e2eee2;max-width:560px;margin:16px 0 0">
        Catálogo exclusivo por mayoreo, con precio por escala de compra.
        Solo consulta: aquí no se pide nada por WhatsApp.
      </p>
      <div class="g-route" style="position:relative"><i></i><s></s><i></i></div>
      <p style="position:relative;color:#cfdccf;font-size:.9rem;margin:12px 0 0">
        Envíos a toda la República Mexicana · Entregas personales en varios estados
      </p>
    </div>

    <div class="g-filters" style="margin-top:28px">
      <button v-for="p in products" :key="p.id" type="button" class="g-chipb" @click="go(p.slug)">{{ p.title }}</button>
    </div>

    <div class="g-mlist">
      <MayoreoCard v-for="p in products" :key="p.id" :product="p" />
    </div>
  </section>
</template>

<script setup>
import MayoreoCard from '@/components/green/MayoreoCard.vue';
import { useMayoreo } from '@/composables/useMayoreo';

const { products } = useMayoreo();
const go = (slug) => document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
</script>
