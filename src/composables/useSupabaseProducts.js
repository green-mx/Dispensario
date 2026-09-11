import { supabase } from '@/supabase.js';
import { formatPriceMXN } from '@/utils/price';


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
