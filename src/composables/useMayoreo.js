import { ref } from 'vue';
import { MAYOREO } from '@/data/mayoreo';

// Hoy el catálogo sale de src/data/mayoreo.js. Cuando exista la tabla en
// Supabase, solo hay que cambiar el contenido de esta función (con la misma
// forma de producto) y la página no necesita tocarse.
export function useMayoreo() {
  const products = ref(MAYOREO);
  const loading = ref(false);
  return { products, loading };
}
