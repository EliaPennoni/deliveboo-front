<template>
  <div v-if="cartVisible" class="cart-overlay">
    <div class="cart-content">
      <!-- Header con pulsanti -->
      <div class="cart-header d-flex justify-content-between align-items-center">
        <button @click="toggleCart" class="button-exit-cart">
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
        <h3>Carrello</h3>
        <button @click="clearCart" class="btn btn-warning">
          Svuota Carrello
        </button>
      </div>

      <div class="my-2">
        <ul>
          <li v-for="(item, index) in cart" :key="item.id">
            {{ item.name }} - €{{ item.price }} x {{ item.quantity }}
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

      <div>
        <p>Totale: €{{ total }}</p>
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
  props: ["cart", "cartVisible", "total"],
  methods: {
    toggleCart() {
      this.$emit("toggleCart"); // Chiude il carrello
    },
    clearCart() {
      this.cart.splice(0, this.cart.length); // Svuota il carrello
      this.syncCart();
    },
    increaseQuantity(index) {
      this.cart[index].quantity++;
      this.syncCart();
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      } else {
        this.cart.splice(index, 1); // Rimuove l'elemento se la quantità è 0
      }
      this.syncCart();
    },
    syncCart() {
      this.$emit("updateCart", [...this.cart]); // Aggiorna il carrello nel componente genitore
      localStorage.setItem("cart", JSON.stringify(this.cart)); // Salva nel localStorage
    },
    goToPayment() {
      if (this.cart.length > 0) {
        this.$router.push({
          name: "paymentPage",
          query: { total: this.total }, // Passa il totale come query param
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
  background: white;
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
  color:red;
  cursor: pointer;
}

.button-exit-cart:hover {
  color: #0056b3;
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

.btn-warning {
  background-color: #ffc107;
  color: black;
  border: none;
  cursor: pointer;
}

.btn-warning:hover {
  background-color: #e0a800;
}

@media (max-width: 768px) {
  .cart-overlay {
    width: 100%;
  }
}
</style>
