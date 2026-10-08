// Categorías del sitio. `categoria` es el valor de la columna "categoria"
// en Supabase. Las que no tienen datos todavía se muestran como "Próximamente"
// y se llenan solas en cuanto existan productos con esa categoría.
export const CATEGORIES = [
  { slug: 'weed', path: '/weed', categoria: 'weed', title: 'Weed', desc: 'Flores', crop: 'weed' },
  { slug: 'top-shelf', path: '/top-shelf', categoria: 'top-shelf', title: 'Top Shelf', desc: 'Selección premium', crop: 'top' },
  { slug: 'otros', path: '/otros', categoria: 'otros', title: 'Pre-Rolados y Carts', desc: 'Listos para usar', crop: 'pre' },
  { slug: 'frascos', path: '/frascos', categoria: 'frascos', title: 'Frascos', desc: 'Presentación frasco', crop: 'top' },
  { slug: 'hongos', path: '/hongos', categoria: 'hongos', title: 'Hongos', desc: 'Línea hongos', crop: 'hon' },
  { slug: 'edibles', path: '/edibles', categoria: 'edibles', title: 'Edibles', desc: 'Gomitas y más', crop: 'edi', isNew: true },
  { slug: 'accesorios', path: '/accesorios', categoria: 'accesorios', title: 'Accesorios', desc: 'Grinders y más', crop: 'acc' },
  { slug: 'smoke-shop', path: '/smoke-shop', categoria: 'smoke-shop', title: 'Smoke Shop', desc: 'Todo para fumar', crop: 'smo' },
  { slug: 'nuevas-llegadas', path: '/nuevas-llegadas', categoria: null, title: 'Nuevas llegadas', desc: 'Lo último del menú', crop: 'top', soon: true, hideTile: true },
];

// Las gomitas y otros comestibles que hoy viven en "otros" también se
// muestran dentro de Edibles.
export const EDIBLE_RE = /gomit|edible|comestible/i;
export const isEdible = (p) => EDIBLE_RE.test([p.name, p.type, p.subcategory, p.nombre, p.tipo, p.descripcion].filter(Boolean).join(' '));
