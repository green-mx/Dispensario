import { ref, computed } from 'vue';

export function useOffers() {
  // 1. Armamos las promociones directamente aquí en caliente (adiós al offers.json).
  // Mantenemos la estructura de tus productos para que tu ProductCard las lea sin problemas.
  const offers = ref([
    {
      id: 'promo-outdoor-3oz',
      name: 'Combo 3 oz Outdoor',
      subcategory: 'outdoor',
      type: 'Oferta',
      price: 1200,
      peso: '3 oz',
      // Cámbiale esta ruta por el link de la foto de Supabase o tu carpeta public que quieras mostrar
      imageUrl: 'https://nlxjohlvufszgbldlzuz.supabase.co/storage/v1/object/public/productos-img/outdoor/WhatsApp%20Image%202026-08-26%20at%202.35.21%20PM%20(1).jpeg', 
      active: true,
      stock: 100 // Le clavamos stock para que no brinque el letrero de "AGOTADO"
    },
    {
      id: 'promo-indoor-3oz',
      name: 'Combo 3 oz Indoor',
      subcategory: 'indoor',
      type: 'Oferta',
      price: 1200, // Checa bien este precio wey jajaja
      peso: '3 oz',
      imageUrl: 'https://nlxjohlvufszgbldlzuz.supabase.co/storage/v1/object/public/productos-img/indoor/WhatsApp%20Image%202026-08-26%20at%202.35.21%20PM.jpeg',
      active: true,
      stock: 100
    }
  ]);

  // 2. Al estar en duro en el código, la carga es instantánea.
  const loading = ref(false);

  // 3. Exponemos solo las promociones que estén activas
  const activeOffers = computed(() => offers.value.filter((offer) => offer.active !== false));

  return { offers, activeOffers, loading };
}