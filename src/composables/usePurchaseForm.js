import { reactive } from 'vue';

const state = reactive({
  isOpen: false,
  product: null,
  prefillQuantity: 1,
  prefillPeso: null,
});

export function usePurchaseForm() {
  const openPurchaseForm = (product, quantity = 1, peso = null) => {
    state.product = product;
    state.prefillQuantity = quantity > 0 ? quantity : 1;
    state.prefillPeso = peso;
    state.isOpen = true;
  };

  const closePurchaseForm = () => {
    state.isOpen = false;
  };

  return { state, openPurchaseForm, closePurchaseForm };
}
