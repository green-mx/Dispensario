// Categorías del sitio. `categoria` es el valor de la columna "categoria"
// en Supabase. Las que no tienen datos todavía se muestran como "Próximamente"
// y se llenan solas en cuanto existan productos con esa categoría.
//
// `fromOtros` (opcional): mientras algunos productos sigan guardados con
// categoria = 'otros', esta función detecta cuáles pertenecen a esta categoría
// (por nombre / tipo / descripción) para que ya salgan donde deben. Cuando
// cambies su categoria en Supabase a la correcta, salen por la vía normal y
// esta función simplemente deja de hacer falta (no estorba).
//
// OJO: "mayoreo" NO está aquí a propósito: tiene su propia página
// (/mayoristas) y sus productos nunca se mezclan con el menudeo.
export const MAYOREO_CATEGORIA = 'mayoreo';

const text = (p) => [p.name, p.type, p.subcategory, p.nombre, p.tipo, p.descripcion].filter(Boolean).join(' ');

export const EDIBLE_RE = /gomit|edible|comestible/i;
export const CART_RE = /cart|cartucho|vape/i;
export const PREROLL_RE = /pre-?rol/i;

export const isEdible = (p) => EDIBLE_RE.test(text(p));
export const isCart = (p) => CART_RE.test(text(p));
export const isPreRoll = (p) => PREROLL_RE.test(text(p));

export const CATEGORIES = [
  { slug: 'weed', path: '/weed', categoria: 'weed', title: 'Weed', desc: 'Flores', crop: 'weed' },
  { slug: 'top-shelf', path: '/top-shelf', categoria: 'top-shelf', title: 'Top Shelf', desc: 'Selección premium', crop: 'top' },
  { slug: 'pre-rolls', path: '/pre-rolls', categoria: 'pre-rolls', title: 'Pre-Rolls', desc: 'Listos para fumar', crop: 'pre', fromOtros: isPreRoll },
  { slug: 'carts', path: '/carts', categoria: 'carts', title: 'Carts', desc: 'Cartuchos y vapes', crop: 'smo', fromOtros: isCart },
  { slug: 'edibles', path: '/edibles', categoria: 'edibles', title: 'Edibles', desc: 'Gomitas y más', crop: 'edi', isNew: true, fromOtros: isEdible },
  { slug: 'frascos', path: '/frascos', categoria: 'frascos', title: 'Frascos', desc: 'Presentación frasco', crop: 'top' },
  { slug: 'hongos', path: '/hongos', categoria: 'hongos', title: 'Hongos', desc: 'Línea hongos', crop: 'hon' },
  { slug: 'otros', path: '/otros', categoria: 'otros', title: 'Otros', desc: 'Más productos', crop: 'pre', onlyLeftovers: true },
  { slug: 'accesorios', path: '/accesorios', categoria: 'accesorios', title: 'Accesorios', desc: 'Grinders y más', crop: 'acc' },
  { slug: 'smoke-shop', path: '/smoke-shop', categoria: 'smoke-shop', title: 'Smoke Shop', desc: 'Todo para fumar', crop: 'smo' },
  { slug: 'nuevas-llegadas', path: '/nuevas-llegadas', categoria: null, title: 'Nuevas llegadas', desc: 'Lo último del menú', crop: 'top', soon: true, hideTile: true },
];

// ¿Este producto que vive en 'otros' pertenece a alguna otra categoría?
export const belongsElsewhere = (p) => CATEGORIES.some((c) => c.fromOtros && c.fromOtros(p));
