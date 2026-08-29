const WHATSAPP_PHONE = '+524643446131';

import { calculateTotal, formatPriceMXN, parsePriceToNumber } from '@/utils/price';

function formatDeliveryLine(order) {
  if (order.deliveryMethod === 'delivery') {
    const address = order.address?.trim() || 'por confirmar';
    return `Entrega a domicilio (dirección: ${address})`;
  }
  return 'Recoger en tienda';
}


export function buildOrderMessage(order) {
  // presentationPrice ahora llega como número (precio de la
  // presentación elegida en Supabase), así que lo formateamos aquí
  // ($1,300 en vez de 1300) en vez de asumir que ya viene formateado.
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

export { WHATSAPP_PHONE };
