<script>
export default {
  props: {
    cart: Array,
    cartVisible: Boolean,
    total: Number,
  },
  methods: {
    toggleCart() {
      this.$emit("toggleCart");
    },
    increaseQuantity(index) {
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
      this.$emit("updateCart", [...this.cart]); // Sincronizza con il genitore
      localStorage.setItem("cart", JSON.stringify(this.cart)); // Persisti il carrello
    },
    goToPayment() {
      // Naviga alla pagina di pagamento passando il totale come query param
      this.$router.push({ name: "payment", query: { total: this.total } });
    },
  },
};
</script>

<template>
  <div v-if="cartVisible" class="cart-overlay">
    <div class="cart-content">
      <button @click="toggleCart" class="button-exit-cart mb-4">
        <i class="fa-solid fa-circle-xmark"></i>
      </button>
      <h3>Carrello</h3>
      <ul>
        <li v-for="(item, index) in cart" :key="item.id">
          <span>{{ item.name }} - €{{ item.price }}</span>
          <div>
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
      <p v-if="cart.length">Totale: €{{ total }}</p>
      <p v-else>Il carrello è vuoto</p>
      <div>
        <!-- Carrello -->
        <button @click="goToPayment">Paga</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 600px;
  height: 100%;
}

.cart-content {
  background-image: url(/public/images/background-pattern.png);
  padding: 20px;
  overflow-y: auto;
}

.button-exit-cart {
  background-color: #2f2f2f00;
  padding: 10px;
  border-radius: 5px;
}

.fa-circle-xmark {
  color: #2f2f2f;
  font-size: 25px;
}
</style>
