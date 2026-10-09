// Recortes del emblema de marca para usar como imagen de respaldo en cards
// y categorías que todavía no tienen foto real (Supabase).
import emblem from '@/assets/brand/emblema.jpg';

const W = 1149;
const H = 1368;
// [x, y, ancho] como fracción del emblema; el alto sale de la proporción 4:5
const CROPS = {
  weed: [0.72, 0.14, 0.2],
  top: [0.37, 0, 0.2],
  pre: [0.12, 0.1, 0.22],
  hon: [0.56, 0.77, 0.26],
  edi: [0.2, 0.76, 0.26],
  acc: [0.04, 0.38, 0.16],
  smo: [0.62, 0.06, 0.2],
};
export const CROP_KEYS = Object.keys(CROPS);

export function cropStyle(key) {
  const [fx, fy, fw] = CROPS[key] || CROPS.weed;
  const cw = fw * W;
  const ch = cw * 1.25;
  return {
    backgroundImage: `url(${emblem})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${(W / cw) * 100}%`,
    backgroundPosition: `${((fx * W) / (W - cw)) * 100}% ${((fy * H) / (H - ch)) * 100}%`,
  };
}

// Respaldo estable por producto (siempre la misma imagen para el mismo id)
export function cropByHash(id) {
  let h = 0;
  for (const c of String(id ?? '')) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return cropStyle(CROP_KEYS[h % CROP_KEYS.length]);
}
