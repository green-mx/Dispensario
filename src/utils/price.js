// Utilidad compartida para trabajar con los precios del catálogo, que
// vienen como texto ("$700", "$1,500", "$700 / oz", "Consultar precio")
// en vez de números. Antes no existía nada de esto: el formulario de
// compra pedía cantidad pero nunca calculaba el total del pedido.

/**
 * Extrae el valor numérico de un precio en texto. Devuelve null si el
 * precio no es numérico (ej. "Consultar precio"), para que quien lo usa
 * pueda mostrar un total solo cuando realmente se puede calcular.
 */
export function parsePriceToNumber(priceStr) {
  if (!priceStr) return null;
  const cleaned = String(priceStr).replace(/,/g, '');
  const match = cleaned.match(/[\d.]+/);
  if (!match) return null;
  const num = parseFloat(match[0]);
  return Number.isNaN(num) ? null : num;
}

/**
 * Formatea un número como precio en pesos, con el mismo estilo ya usado
 * en el catálogo (separador de miles con coma, símbolo $).
 */
export function formatPriceMXN(amount) {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return null;
  return `$${amount.toLocaleString('es-MX', { maximumFractionDigits: 2 })}`;
}

/**
 * Calcula el total (precio unitario × cantidad) a partir de un precio en
 * texto. Devuelve null cuando el precio no es numérico, para poder
 * ocultar el total en vez de mostrar "$NaN".
 */
export function calculateTotal(priceStr, quantity) {
  const unit = parsePriceToNumber(priceStr);
  if (unit === null || !quantity || quantity <= 0) return null;
  return unit * quantity;
}
