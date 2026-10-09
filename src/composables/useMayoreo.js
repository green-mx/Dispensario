import { ref, onMounted } from 'vue';
import { fetchProductosPorCategoria } from '@/composables/useSupabaseProducts';
import { MAYOREO_CATEGORIA } from '@/utils/categories';

// Los productos de mayoreo son filas normales de la tabla "productos" con
// categoria = 'mayoreo'. Sus escalas (cantidad y precio) salen de la tabla
// "presentaciones": peso = "5 kilos", precio = 2700, etc.
// No se modifica nada en la base de datos: solo se lee.

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// Cantidad numérica de una escala ("5 kilos" → 5, "1/2 libra" → 0.5, "millar" → 1000)
function qtyOf(peso) {
  const s = String(peso ?? '').toLowerCase().replace(/,/g, '');
  if (/medi[oa]/.test(s)) return 0.5;
  const f = s.match(/(\d+)\s*\/\s*(\d+)/);
  if (f && Number(f[2])) return Number(f[1]) / Number(f[2]);
  const m = s.match(/\d+(?:\.\d+)?/);
  if (m) return parseFloat(m[0]);
  if (/millar/.test(s)) return 1000;
  return null;
}

// Unidad de la escala ("kilo", "libra", "pieza", "oz", "gota")
function unitOf(peso) {
  const s = String(peso ?? '').toLowerCase();
  if (/kilo|\bkgs?\b/.test(s)) return 'kilo';
  if (/libra|\blbs?\b/.test(s)) return 'libra';
  if (/\bpz|pieza|millar/.test(s)) return 'pieza';
  if (/\boz\b|onza/.test(s)) return 'oz';
  if (/gota/.test(s)) return 'gota';
  return null;
}

function buildTiers(presentaciones) {
  const list = presentaciones.map((p) => ({
    label: p.peso,
    price: Number(p.precio),
    stock: p.stock,
    qty: qtyOf(p.peso),
    unit: unitOf(p.peso),
  }));
  // Orden: de menor a mayor cantidad. Si alguna escala no trae número,
  // se ordena por precio de mayor a menor (más cantidad = mejor precio).
  const known = list.every((t) => t.qty !== null);
  if (known) list.sort((a, b) => a.qty - b.qty);
  else list.sort((a, b) => b.price - a.price);

  // ¿Los precios son POR UNIDAD (x kilo, x pieza…) o TOTALES de cada escala?
  // Por unidad: al subir la cantidad el precio baja o se queda igual.
  // Si el precio sube con la cantidad (ej. 100 pz $2,500 → 500 pz $10,000),
  // son totales y no se le pone "x unidad" para no confundir.
  const perUnit = known && (list.length === 1
    ? list[0].qty === 1
    : list.every((t, i) => i === 0 || t.price <= list[i - 1].price));

  return list.map((t) => ({
    label: t.label,
    price: t.price,
    stock: t.stock,
    suffix: perUnit && t.unit ? `x ${t.unit}` : '',
  }));
}

export function toMayoreoProduct(p) {
  const tiers = buildTiers(p.presentaciones ?? []);
  const unit = (p.presentaciones ?? []).map((x) => unitOf(x.peso)).find(Boolean) || '';
  const sub = p.subcategory && String(p.subcategory).toLowerCase() !== String(p.type ?? '').toLowerCase() ? cap(p.subcategory) : '';
  return {
    id: `m-${p.id}`,
    slug: `m-${p.id}`,
    title: p.name,
    subtitle: sub,
    unit,
    chip: { label: p.type || 'Mayoreo', type: p.type },
    type: p.type,
    tiers,
    images: p.imageUrl ? [p.imageUrl] : [],
  };
}

export function useMayoreo() {
  const products = ref([]);
  const loading = ref(true);
  const error = ref(false);

  onMounted(async () => {
    try {
      const list = await fetchProductosPorCategoria(MAYOREO_CATEGORIA);
      products.value = list.map(toMayoreoProduct).filter((p) => p.tiers.length);
    } catch (e) {
      console.error('Error cargando mayoreo:', e);
      error.value = true;
    } finally {
      loading.value = false;
    }
  });

  return { products, loading, error };
}
