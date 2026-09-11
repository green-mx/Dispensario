import { ref, computed } from 'vue';

export function useOffers() {
  const offers = ref([
    {
      id: 'promo-outdoor-100gr',
      name: '100 Gr',
      subcategory: 'outdoor',
      type: 'Oferta',
      price: 1400,
      peso: '100 gr',
      imageUrl: 'https://phpveodubvpozbwtrwac.supabase.co/storage/v1/object/public/productos-img/outdoor/durban-p.jpeg',
      active: true,
      stock: 100
    },
    {
      id: 'promo-indoor-100gr',
      name: '100 Gr',
      subcategory: 'indoor',
      type: 'Oferta',
      price: 1700, 
      peso: '100 gr',
      imageUrl: 'https://phpveodubvpozbwtrwac.supabase.co/storage/v1/object/public/productos-img/indoor/bubble-g.jpeg',
      active: true,
      stock: 100
    }
  ]);
  const loading = ref(false);

  const activeOffers = computed(() => offers.value.filter((offer) => offer.active !== false));

  return { offers, activeOffers, loading };
}