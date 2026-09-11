export function parsePriceToNumber(priceStr) {
  if (!priceStr) return null;
  const cleaned = String(priceStr).replace(/,/g, '');
  const match = cleaned.match(/[\d.]+/);
  if (!match) return null;
  const num = parseFloat(match[0]);
  return Number.isNaN(num) ? null : num;
}


export function formatPriceMXN(amount) {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return null;
  return `$${amount.toLocaleString('es-MX', { maximumFractionDigits: 2 })}`;
}


export function calculateTotal(priceStr, quantity) {
  const unit = parsePriceToNumber(priceStr);
  if (unit === null || !quantity || quantity <= 0) return null;
  return unit * quantity;
}
