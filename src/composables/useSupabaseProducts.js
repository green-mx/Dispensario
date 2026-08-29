import { supabase } from '@/supabase.js';
import { formatPriceMXN } from '@/utils/price';

/**
 * Trae los productos de una categoría (weed | otros | frascos | hongos |
 * top-shelf) desde Supabase y los cruza con TODAS sus presentaciones
 * (peso + precio + stock) desde la tabla "presentaciones", con la misma
 * lógica que antes solo vivía duplicada dentro de HomeView.vue.
 *
 * Un producto puede tener varias presentaciones (ej. "1/2 oz" a $300,
 * "1 oz" a $500, "1 kg" a $7000), así que ya no nos quedamos solo con
 * la primera que encontremos: devolvemos el arreglo completo ordenado
 * de menor a mayor precio, más un "precio principal" (el más barato)
 * listo para mostrarse en las cards junto con su peso.
 *
 * Devuelve el arreglo ya mapeado al shape que usan ProductCard,
 * ProductCarousel, ProductDetail y PurchaseFormModal (id, name, type,
 * imageUrl, price, peso, presentaciones, subcategory).
 */
export async function fetchProductosPorCategoria(categoria) {
  const { data: productosData, error: prodError } = await supabase
    .from('productos')
    .select('*')
    .eq('categoria', categoria);

  if (prodError) throw prodError;

  const { data: presData, error: presError } = await supabase
    .from('presentaciones')
    .select('*')
    .order('precio', { ascending: true });

  if (presError) throw presError;

  return productosData.map((item) => {
    const presentaciones = presData
      .filter((p) => p.producto_id === item.id)
      .map((p) => ({
        peso: p.peso,
        precio: p.precio,
        stock: p.stock,
      }));

    // La presentación "principal" (más barata) es la que se muestra de
    // entrada en la card, junto con su peso.
    const principal = presentaciones[0] ?? null;

    return {
      id: item.id,
      name: item.nombre,
      type: item.tipo,
      imageUrl: item.image_url,
      price: principal ? formatPriceMXN(principal.precio) : null,
      peso: principal ? principal.peso : null,
      presentaciones,
      subcategory: item.descripcion,
      isFeatured: true,
    };
  });
}
