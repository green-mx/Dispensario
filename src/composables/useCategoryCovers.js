import { ref } from 'vue';
import { supabase } from '@/supabase.js';
import { isEdible } from '@/utils/categories';

// Una sola consulta liviana para saber cuántos productos tiene cada categoría
// y qué imagen usar como portada (home y menú). Se cachea a nivel módulo.
const covers = ref({});
const loaded = ref(false);
let started = false;

function load() {
  started = true;
  supabase
    .from('productos')
    .select('categoria,image_url,nombre,tipo,descripcion')
    .then(({ data, error }) => {
      if (error) throw error;
      const map = {};
      const add = (key, row) => {
        if (!map[key]) map[key] = { cover: null, count: 0 };
        map[key].count += 1;
        if (!map[key].cover && row.image_url) map[key].cover = row.image_url;
      };
      for (const row of data || []) {
        add(row.categoria, row);
        if (row.categoria === 'otros' && isEdible(row)) add('edibles', row);
      }
      covers.value = map;
      // Solo marcamos "cargado" si la consulta salió bien; si falla no
      // mostramos "Próximamente" por error.
      loaded.value = true;
    })
    .catch((e) => console.error('Error cargando portadas de categorías:', e));
}

export function useCategoryCovers() {
  if (!started) load();
  return { covers, loaded };
}
