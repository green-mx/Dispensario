const TYPE_COLORS = {
  Outdoor: 'brown',
  Indoor: 'teal',
  Hydro: 'blue',
  Exotic: 'deep-purple',
  Frasco: 'red',
  Cart: 'cyan',
  'Pre-Roll': 'orange',
  Hongos: 'pink',
  LCD: 'yellow',
  Perez: 'white',
  Oferta: 'red', 'Outdoor': 'Green', 'Indoor': 'Pink'
};

export function typeColor(type) {
  return TYPE_COLORS[type] || 'grey';
}


// Mismos colores por tipo pero en HEX, para los chips del nuevo diseño
// (Outdoor e Indoor respetan el color final que ya tenían: verde y rosa).
export const TYPE_HEX = {
  Outdoor: '#4caf50',
  Indoor: '#ec4899',
  Hydro: '#3b82f6',
  Exotic: '#8b5cf6',
  Frasco: '#ef4444',
  Cart: '#06b6d4',
  'Pre-Roll': '#f97316',
  Hongos: '#f472b6',
  LCD: '#eab308',
  Perez: '#e5e7eb',
  Oferta: '#ef4444',
  Edible: '#f59e0b',
};

export function typeHex(type) {
  if (!type) return '#9ca3af';
  const key = String(type).trim();
  const cap = key.charAt(0).toUpperCase() + key.slice(1);
  return TYPE_HEX[key] || TYPE_HEX[cap] || '#9ca3af';
}

export const isKnownType = (type) => typeHex(type) !== '#9ca3af';
