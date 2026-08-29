import { reactive } from 'vue';

// Estado a nivel de módulo (singleton): solo debe existir un formulario
// de compra abierto a la vez en toda la app, sin importar desde qué
// card o detalle se dispare. Cualquier componente puede llamar a
// openPurchaseForm(product) y el modal montado una sola vez en App.vue
// reacciona a este estado compartido (evita prop-drilling y evita
// montar un modal por cada card del catálogo).
const state = reactive({
  isOpen: false,
  product: null,
  prefillQuantity: 1,
  prefillPeso: null,
});

export function usePurchaseForm() {
  // "peso" es opcional: si viene de ProductDetail (donde ya se eligió
  // una presentación), el formulario abre con ese peso preseleccionado
  // en vez de siempre defaultear al más barato.
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
