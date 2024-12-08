<template>
  <div v-if="cartVisible" class="cart-overlay">
    <div class="cart-content">
      <!-- Header con pulsanti -->
      <div
        class="cart-header d-flex justify-content-between align-items-center"
      >
        <button @click="toggleCart" class="button-exit-cart">
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
        <h3>Carrello</h3>
        <button
          @click="clearCart"
          class="btn btn-warning"
          :disabled="!cart.length"
        >
          Svuota Carrello
        </button>
      </div>

      <!-- Lista Ordini -->
      <div class="my-2">
        <ul>
          <li v-for="(item, index) in cart" :key="item.id" class="cart-item">
            {{ item.name }} - €{{ (item.price * item.quantity).toFixed(2) }}
            <div class="d-flex gap-2 mt-2">
              <button @click="decreaseQuantity(index)" class="btn btn-danger">
                -
              </button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(index)" class="btn btn-success">
                +
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Totale e pulsante di pagamento -->
      <div>
        <p v-if="cart.length" class="total">
          <strong>Totale: €{{ formattedTotal }}</strong>
        </p>
        <p v-else class="text-body">
          <strong>Il carrello è vuoto</strong>
        </p>
        <button
          @click="goToPayment"
          :disabled="!cart.length"
          class="pay-button"
        >
          Paga
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Array,
      default: () => [],
    },
    cartVisible: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      errorMessage: "", // Messaggio di errore
    };
  },
  computed: {
    formattedTotal() {
      return this.total.toFixed(2); // Arrotonda a due decimali
    },
  },
  methods: {
    toggleCart() {
      this.$emit("toggleCart");
    },
    clearCart() {
      if (window.confirm("Sei sicuro di voler svuotare il carrello?")) {
        this.cart.splice(0, this.cart.length); // Svuota il carrello
        this.syncCart();
      }
    },
    increaseQuantity(index) {
      const firstRestaurantId = this.cart[0]?.restaurant_id;
      if (
        firstRestaurantId &&
        this.cart[index].restaurant_id !== firstRestaurantId
      ) {
        this.errorMessage = "Non puoi aggiungere piatti da ristoranti diversi.";
        return;
      }

      this.cart[index].quantity++;
      this.syncCart();
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      } else {
        this.cart.splice(index, 1); // Rimuove il piatto se la quantità è zero
      }
      this.syncCart();
    },
    syncCart() {
      this.$emit("updateCart", [...this.cart]); // Aggiorna nel componente genitore
      localStorage.setItem("cart", JSON.stringify(this.cart)); // Persistenza nel localStorage
      this.errorMessage = ""; // Resetta il messaggio di errore
    },
    goToPayment() {
      if (this.cart.length > 0) {
        this.$router.push({
          name: "paymentPage",
          query: { total: this.formattedTotal }, // Passa il totale come query param
        });
      } else {
        alert("Il carrello è vuoto!");
      }
    },
  },
};
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: #f8f9fa;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  z-index: 1050;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.cart-content {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.cart-header {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.button-exit-cart {
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  color: red;
  cursor: pointer;
}

.pay-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 20px;
}

.pay-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.cart-item {
  margin-bottom: 20px;
}

.total {
  font-size: 18px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .cart-overlay {
    width: 100%;
  }
}
</style>
