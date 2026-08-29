<template>
  <v-dialog v-model="state.isOpen" max-width="520" scrollable>
    <v-card v-if="state.product" class="purchase-card">
      <v-card-title class="purchase-title">Completa tu pedido</v-card-title>

      <v-card-text>
        <v-form ref="formRef">
          <!-- Bloque 1: qué se está comprando -->
          <div class="form-section">
            <span class="form-section-label">Producto</span>
            <p class="purchase-product-name">{{ state.product.name }}</p>

            <v-select
              v-if="presentationOptions.length > 1"
              v-model="form.presentationIndex"
              :items="presentationOptions"
              item-title="label"
              item-value="index"
              label="Presentación"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            />

            <v-text-field
              v-model.number="form.quantity"
              label="Cantidad"
              type="number"
              min="1"
              :rules="[rules.required, rules.positiveNumber]"
              variant="outlined"
              density="comfortable"
              class="mb-1"
            />

            <div class="total-row">
              <span>Total</span>
              <span class="total-amount">{{ totalDisplay }}</span>
            </div>
          </div>

          <v-divider class="my-4 border-opacity-25" />

          <!-- Bloque 2: datos del pedido -->
          <div class="form-section">
            <span class="form-section-label">Tus datos</span>

            <v-text-field
              v-model="form.customerName"
              label="Tu nombre"
              :rules="[rules.required]"
              variant="outlined"
              density="comfortable"
              class="mb-2 mt-3"
            />

            <v-radio-group
              v-model="form.deliveryMethod"
              label="Entrega"
              :rules="[rules.required]"
              density="comfortable"
            >
              <v-radio label="Recoger en punto medio" value="pickup" />
              <v-radio label="Entrega a domicilio ($80)" value="delivery" />
            </v-radio-group>

            <v-text-field
              v-if="form.deliveryMethod === 'delivery'"
              v-model="form.address"
              label="Dirección / zona de entrega"
              :rules="[rules.required]"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            />

            <v-select
              v-model="form.paymentMethod"
              :items="paymentMethods"
              label="Método de pago"
              :rules="[rules.required]"
              variant="outlined"
              density="comfortable"
              class="mb-2"
            />

            <v-textarea
              v-model="form.notes"
              label="Notas adicionales (opcional)"
              variant="outlined"
              density="comfortable"
              rows="2"
              class="mb-1"
            />
          </div>

          <p class="hours-hint">Horario de atención: 11:00 AM – 8:00 PM · Solo por WhatsApp</p>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end pb-4 pr-4">
        <v-btn variant="text" @click="closePurchaseForm">Cancelar</v-btn>
        <v-btn color="green-darken-3" variant="flat" @click="handleSubmit">
          <FontAwesomeIcon icon="fa-brands fa-whatsapp" class="mr-2" /> Enviar pedido
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { reactive, computed, watch, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { usePurchaseForm } from '@/composables/usePurchaseForm';
import { sendWhatsAppOrder } from '@/composables/useWhatsAppOrder';
import { calculateTotal, formatPriceMXN } from '@/utils/price';

const { state, closePurchaseForm } = usePurchaseForm();

const formRef = ref(null);

const paymentMethods = ['SPEI', 'Efectivo', 'OXXO'];

const form = reactive({
  presentationIndex: 0,
  quantity: 1,
  customerName: '',
  deliveryMethod: null,
  address: '',
  paymentMethod: null,
  notes: '',
});

const rules = {
  required: (v) => (v !== null && v !== undefined && String(v).trim() !== '') || 'Este campo es obligatorio',
  positiveNumber: (v) => Number(v) > 0 || 'Debe ser mayor a 0',
};


// Presentaciones reales del producto (peso + precio), tal como vienen
// de la tabla "presentaciones" en Supabase vía useSupabaseProducts.js.
// Si por alguna razón el producto no trajera ninguna, caemos al precio
// plano que traiga (compatibilidad hacia atrás).
const presentationOptions = computed(() => {
  const presentaciones = state.product?.presentaciones ?? [];
  if (presentaciones.length > 0) {
    return presentaciones.map((p, index) => ({ index, label: p.peso, price: p.precio }));
  }
  return [{ index: 0, label: null, price: state.product?.price }];
});

const hasTieredPricing = computed(() => presentationOptions.value.some((o) => o.label));

const selectedPresentation = computed(
  () => presentationOptions.value.find((o) => o.index === form.presentationIndex) || presentationOptions.value[0]
);


const total = computed(() =>
  calculateTotal(selectedPresentation.value?.price ?? state.product?.price, form.quantity)
);
const totalDisplay = computed(() => {
  const formatted = formatPriceMXN(total.value);
  return formatted ?? 'Se confirma por WhatsApp';
});

watch(
  () => state.isOpen,
  (isOpen) => {
    if (!isOpen) return;
    const options = presentationOptions.value;
    const matchByPeso = state.prefillPeso
      ? options.find((o) => o.label === state.prefillPeso)
      : null;
    form.presentationIndex = matchByPeso?.index ?? options[0]?.index ?? 0;
    form.quantity = state.prefillQuantity || 1;
    form.customerName = '';
    form.deliveryMethod = null;
    form.address = '';
    form.paymentMethod = null;
    form.notes = '';
    formRef.value?.resetValidation?.();
  }
);

const handleSubmit = async () => {
  const result = await formRef.value?.validate();
  if (!result?.valid) return;

  sendWhatsAppOrder({
    productName: state.product.name,
    presentationLabel: hasTieredPricing.value ? selectedPresentation.value?.label : null,
    presentationPrice: selectedPresentation.value?.price ?? state.product.price,
    quantity: form.quantity,
    customerName: form.customerName,
    deliveryMethod: form.deliveryMethod,
    address: form.address,
    paymentMethod: form.paymentMethod,
    notes: form.notes,
  });

  closePurchaseForm();
};
</script>

<style scoped>

.purchase-card {
  background: #1a1a1a;
  border-radius: 16px;
}
.purchase-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #eee;
}
.form-section-label {
  display: block;
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #4caf50;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.purchase-product-name {
  color: #eee;
  font-weight: 600;
  font-size: 1.05rem;
  margin: 0 0 10px;
}
.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111;
  border-radius: 8px;
  padding: 10px 14px;
  color: #bbb;
  font-size: 0.9rem;
}
.total-amount {
  color: #4caf50;
  font-weight: 700;
  font-size: 1.1rem;
}
.hours-hint {
  font-size: 0.75rem;
  color: #888;
  margin-top: 12px;
}
</style>
