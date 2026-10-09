const WHATSAPP_PHONE = '+524643446131';

import { calculateTotal, formatPriceMXN, parsePriceToNumber } from '@/utils/price';

function formatDeliveryLine(order) {
  if (order.deliveryMethod === 'delivery') {
    const address = order.address?.trim() || 'por confirmar';
    return `Entrega a domicilio (dirección: ${address})`;
  }
  return 'Recoger en punto medio';
}


export function buildOrderMessage(order) {
  
  const unitPrice = parsePriceToNumber(order.presentationPrice);
  const priceDisplay = unitPrice !== null ? formatPriceMXN(unitPrice) : order.presentationPrice;

  const lines = ['Hola, quiero hacer un pedido:', '', `Producto: ${order.productName}`];

  if (order.presentationLabel) {
    lines.push(`Presentación: ${order.presentationLabel} - ${priceDisplay}`);
  } else {
    lines.push(`Precio: ${priceDisplay}`);
  }

  lines.push(`Cantidad: ${order.quantity}`);


  const total = calculateTotal(order.presentationPrice, order.quantity);
  if (total !== null) {
    lines.push(`Total: ${formatPriceMXN(total)}`);
  }

  lines.push(
    `Nombre: ${order.customerName}`,
    `Entrega: ${formatDeliveryLine(order)}`,
    `Pago: ${order.paymentMethod}`,
    `Notas: ${order.notes?.trim() ? order.notes.trim() : 'Ninguna'}`,
    '',
    '¿Tienen disponibilidad?'
  );

  return lines.join('\n');
}


export function sendWhatsAppOrder(order) {
  const message = buildOrderMessage(order);
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
}

// Pedido a mayoreo: producto + la escala que eligió el cliente (si eligió una)
export function buildMayoreoMessage({ productName, tier }) {
  const lines = ['Hola, me interesa comprar a mayoreo:', '', `Producto: ${productName}`];
  if (tier) {
    const price = formatPriceMXN(tier.price);
    lines.push(`Escala: ${tier.label} - ${price}${tier.suffix ? ` ${tier.suffix}` : ''}`);
  }
  lines.push('', '¿Tienen disponibilidad y me pueden dar más información?');
  return lines.join('\n');
}

export function sendWhatsAppMayoreo(data) {
  const message = buildMayoreoMessage(data);
  window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
}

export { WHATSAPP_PHONE };
