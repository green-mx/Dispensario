// ─────────────────────────────────────────────────────────────────────────────
// Catálogo a mayoreo (fuente: CATALOGOMAYOREO-edited.pdf)
//
// Forma de cada producto (es la misma que tendría una tabla en Supabase):
//   id, slug      → identificador y ancla de la página (#slug)
//   title, subtitle
//   unit          → 'kilo' | 'libra' | 'pieza'
//   chip          → { label, type?, color? }  (type usa los colores de tipo de siempre)
//   tiers         → escalas de precio: { label, price, suffix }
//   images        → URLs de las fotos (hasta 3). VACÍO = muestra "Fotos próximamente".
//                   Para activarlas: pega aquí las URLs del bucket de Supabase, ej.
//                   images: ['https://…/productos-img/mayoreo/regular-1.jpg', …]
//
// OJO – valores del PDF que conviene confirmar (están capturados tal cual se
// interpretaron; si algo está mal, se corrige aquí o en Supabase):
//   • Green House, 10 kilos: el PDF dice "$,5100"  → se tomó $5,100
//   • Green House, 25 y 50 kilos: ambos $4,900     → tal cual
//   • Indoor, 1 kilo: el PDF dice "$8,00"          → se tomó $8,000
//   • Hydro, 2 libras o más: $62,000               → se muestra sin "x libra"
//     (parece el total por 2 libras, no el precio por libra)
// ─────────────────────────────────────────────────────────────────────────────
const porKilo = 'x kilo';
const porLibra = 'x libra';
const porPieza = 'x pieza';

export const MAYOREO = [
  {
    id: 'm-regular', slug: 'regular', title: 'Kilos de Regular', unit: 'kilo',
    chip: { label: 'Regular', color: '#a3a3a3' },
    tiers: [
      { label: '1 kilo', price: 3500, suffix: porKilo },
      { label: '5 kilos', price: 2700, suffix: porKilo },
      { label: '10 kilos', price: 2500, suffix: porKilo },
      { label: '25 kilos', price: 2400, suffix: porKilo },
      { label: '50 kilos', price: 2300, suffix: porKilo },
    ],
    images: [],
  },
  {
    id: 'm-green-house', slug: 'green-house', title: 'Kilos Green House', subtitle: 'Selectos', unit: 'kilo',
    chip: { label: 'Green House', color: '#22c55e' },
    tiers: [
      { label: '1 kilo', price: 5500, suffix: porKilo },
      { label: '5 kilos', price: 5300, suffix: porKilo },
      { label: '10 kilos', price: 5100, suffix: porKilo },
      { label: '25 kilos', price: 4900, suffix: porKilo },
      { label: '50 kilos', price: 4900, suffix: porKilo },
    ],
    images: [],
  },
  {
    id: 'm-indoor', slug: 'indoor', title: 'Kilos Indoor', subtitle: 'Selectos', unit: 'kilo',
    chip: { label: 'Indoor', type: 'Indoor' },
    tiers: [
      { label: '1 kilo', price: 8000, suffix: porKilo },
      { label: '5 kilos', price: 7800, suffix: porKilo },
      { label: '10 kilos', price: 7600, suffix: porKilo },
      { label: '25 kilos', price: 7600, suffix: porKilo },
      { label: '50 kilos', price: 7400, suffix: porKilo },
    ],
    images: [],
  },
  {
    id: 'm-indoor-premium', slug: 'indoor-premium', title: 'Kilos Indoor Premium', unit: 'kilo',
    chip: { label: 'Indoor Premium', type: 'Indoor' },
    tiers: [
      { label: '1 kilo', price: 10000, suffix: porKilo },
      { label: '5 kilos', price: 8000, suffix: porKilo },
      { label: '10 kilos', price: 6500, suffix: porKilo },
      { label: '20 kilos o más', price: 5800, suffix: porKilo },
    ],
    images: [],
  },
  {
    id: 'm-top-shelf', slug: 'top-shelf', title: 'Libras de Top Shelf', unit: 'libra',
    chip: { label: 'Top Shelf', color: '#f59e0b' },
    tiers: [
      { label: '1 libra', price: 10000, suffix: porLibra },
      { label: '5 libras', price: 8000, suffix: porLibra },
      { label: '10 libras o más', price: 6800, suffix: porLibra },
    ],
    images: [],
  },
  {
    id: 'm-hydro', slug: 'hydro', title: 'Flor Hydropónica', subtitle: 'Hydro', unit: 'libra',
    chip: { label: 'Hydro', type: 'Hydro' },
    tiers: [
      { label: '1 libra', price: 35000, suffix: 'la libra' },
      { label: 'Media libra', price: 18000, suffix: '' },
      { label: '2 libras o más', price: 62000, suffix: '' },
    ],
    images: [],
  },
  {
    id: 'm-moonrock', slug: 'moonrock', title: 'Libras de Moonrock Premium', unit: 'libra',
    chip: { label: 'Moonrock', color: '#facc15' },
    tiers: [{ label: '1 libra', price: 15000, suffix: 'la libra' }],
    images: [],
  },
  {
    id: 'm-carts-2g', slug: 'carts-2g', title: 'Carts de 2G', unit: 'pieza',
    chip: { label: 'Cart', type: 'Cart' },
    tiers: [
      { label: '1 pz', price: 600, suffix: porPieza },
      { label: '10 pz', price: 450, suffix: porPieza },
      { label: '25 pz', price: 380, suffix: porPieza },
      { label: '50 pz', price: 320, suffix: porPieza },
      { label: '100 pz', price: 300, suffix: porPieza },
      { label: '500 pz', price: 220, suffix: porPieza },
    ],
    images: [],
  },
];
