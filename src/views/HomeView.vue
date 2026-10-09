<template>
  <div>
    <!-- HERO: solo la imagen de mayoreo -->
    <section class="g-hero-sec">
      <div class="g-blobs"><div class="g-blob g-b1"></div><div class="g-blob g-b2"></div></div>
      <div class="g-wrap" style="position:relative">
        <div class="g-hero" ref="heroEl">
          <img :src="heroImg" width="1600" height="595" alt="Mayoreo y menudeo. Envíos a toda la República Mexicana. Entregas personales en varios estados" />
        </div>
        <div class="g-cta">
          <RouterLink to="/weed" class="g-btn g-grad">Ver catálogo</RouterLink>
          <RouterLink to="/mayoristas" class="g-btn g-out">Menú Mayoristas</RouterLink>
        </div>
      </div>
    </section>

    <!-- PROMOCIONES (arriba de todo; se oculta sola si no hay ninguna) -->
    <section v-if="activeOffers.length" id="ofertas" class="g-wrap g-sec" style="padding-top:56px">
      <div class="g-promo-box" v-reveal>
        <div class="g-wmbig"></div>
        <p class="g-eyebrow" style="position:relative">Promociones</p>
        <h2 class="g-h2" style="position:relative;margin-bottom:24px">Ofertas activas</h2>
        <div class="g-grid-promo" style="position:relative">
          <GProductCard v-for="o in activeOffers" :key="o.id" :product="o" big />
        </div>
      </div>
    </section>

    <div class="g-ticker" aria-hidden="true">
      <div class="g-mq">
        <template v-for="n in 2" :key="n">
          <span v-for="t in ticker" :key="n + t">{{ t }}</span>
        </template>
      </div>
    </div>

    <!-- CATEGORÍAS -->
    <section class="g-wrap g-sec">
      <div v-reveal style="margin-bottom:32px">
        <p class="g-eyebrow">Explora</p>
        <h2 class="g-h2">Nuestro <span class="g-gt">catálogo</span></h2>
      </div>
      <div class="g-grid-cat">
        <RouterLink v-for="c in tiles" :key="c.slug" :to="c.path" class="g-pcard" v-tilt v-reveal>
          <img v-if="coverOf(c)" class="g-ph" :src="coverOf(c)" :alt="c.title" loading="lazy" />
          <div v-else class="g-ph" :style="cropStyle(c.crop)"></div>
          <div class="g-shade"></div>
          <span class="g-wm"></span>
          <span v-if="isSoon(c)" class="g-chip g-tile-badge" style="color:#b6ff00;background:#000a;border-color:#b6ff0066">Próximamente</span>
          <span v-else-if="c.isNew" class="g-chip g-tile-badge g-grad" style="border-color:transparent">Nuevo</span>
          <div class="g-info" style="padding:clamp(12px,2vw,20px)">
            <b class="g-name g-disp" style="font-size:clamp(.8rem,1.8vw,1.1rem)">{{ c.title }}</b>
            <span class="g-subl" style="color:#b6ff00">{{ c.desc }}</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- DESTACADOS (como antes: weed + otros, sin top shelf) -->
    <section v-if="featured.length" class="g-wrap g-sec">
      <div v-reveal style="margin-bottom:24px">
        <p class="g-eyebrow">Selección</p>
        <h2 class="g-h2">Productos <span class="g-gt">destacados</span></h2>
      </div>
      <GFilterChips v-if="subs.length > 2" :options="subs" v-model="filter" />
      <div class="g-grid-prod">
        <GProductCard v-for="p in shown" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- BLOQUE DE MARCA con el emblema -->
    <section class="g-wrap g-sec">
      <div class="g-brand-box" v-reveal>
        <div class="g-emblem" v-tilt>
          <img :src="emblemImg" width="1149" height="1368" alt="Abastecedora Green · 10 años de buen trip" loading="lazy" />
        </div>
        <div>
          <p class="g-eyebrow" style="color:#b6ff00">10 años de buen trip</p>
          <h2 class="g-h2">Cannabis Experts · <span class="g-gt">No Bad Trips</span></h2>
          <p class="g-sub" style="color:#cfdccf;margin-top:16px">Atención por WhatsApp todos los días, envíos a toda la República y entregas personales en varios estados.</p>
          <div class="g-facts">
            <span class="g-chip">Garantía de 24 horas</span>
            <span class="g-chip">Envíos a todo México</span>
            <span class="g-chip">Entregas personales</span>
          </div>
          <RouterLink to="/about" class="g-btn g-grad">Conoce nuestras garantías</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import gsap from 'gsap';
import GProductCard from '@/components/green/GProductCard.vue';
import GFilterChips from '@/components/green/GFilterChips.vue';
import heroImg from '@/assets/brand/hero-mayoreo.jpg';
import emblemImg from '@/assets/brand/emblema.jpg';
import { CATEGORIES } from '@/utils/categories';
import { cropStyle } from '@/utils/brandCrops';
import { useOffers } from '@/composables/useOffers';
import { useCategoryCovers } from '@/composables/useCategoryCovers';
import { fetchProductosPorCategoria } from '@/composables/useSupabaseProducts';

const { activeOffers } = useOffers();
const { covers, loaded } = useCategoryCovers();
const tiles = CATEGORIES.filter((c) => !c.hideTile);
const ticker = ['ENVÍOS A TODA LA REPÚBLICA', '✦', 'MAYOREO Y MENUDEO', '✦', 'ENTREGAS PERSONALES EN VARIOS ESTADOS', '✦', '10 AÑOS DE BUEN TRIP', '✦'];

const coverOf = (c) => covers.value[c.categoria]?.cover || null;
const isSoon = (c) => c.soon || (loaded.value && !covers.value[c.categoria]?.count);

const heroEl = ref(null);
const featured = ref([]);
const filter = ref('Todos');
const subs = computed(() => ['Todos', ...new Set(featured.value.map((p) => p.subcategory).filter(Boolean))]);
const shown = computed(() => (filter.value === 'Todos' ? featured.value : featured.value.filter((p) => p.subcategory === filter.value)));

onMounted(async () => {
  try { gsap.from(heroEl.value, { opacity: 0, scale: 0.96, y: 30, duration: 1.1, ease: 'power3.out', clearProps: 'all' }); } catch (e) { /* sin animación */ }
  try {
    // Sin Top Shelf en destacados (igual que antes)
    const [weed, otros, carts, preRolls] = await Promise.all([
      fetchProductosPorCategoria('weed'),
      fetchProductosPorCategoria('otros'),
      fetchProductosPorCategoria('carts'),
      fetchProductosPorCategoria('pre-rolls'),
    ]);
    const seen = new Set();
    featured.value = [...weed, ...preRolls, ...carts, ...otros].filter((p) => !seen.has(p.id) && seen.add(p.id)).slice(0, 8);
  } catch (e) {
    console.error('Error cargando destacados desde Supabase:', e);
  }
});
</script>
