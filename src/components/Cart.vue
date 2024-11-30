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
  },
};
</script>

<template>
  <div v-if="cartVisible" class="cart-overlay">
    <div class="cart-content">
      <button @click="toggleCart" class="btn btn-secondary">Chiudi</button>
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
    </div>
  </div>
</template>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.cart-content {
  background-color: white;
  padding: 20px;
  overflow-y: auto;
}
</style>
