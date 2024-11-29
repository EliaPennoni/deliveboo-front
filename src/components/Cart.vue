<script>
export default {
  data() {
    return {
      cartVisible: false, // Stato di visibilità del carrello
      cart: JSON.parse(localStorage.getItem("cart")) || [], // Carrello dal localStorage
    };
  },
  computed: {
    total() {
      return this.cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    toggleCart() {
      this.cartVisible = !this.cartVisible; // Toggle per aprire/chiudere il carrello
    },
    addToCart(dish) {
      let item = this.cart.find((item) => item.dishId === dish.id);
      if (item) {
        item.quantity++;
      } else {
        this.cart.push({
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          quantity: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(this.cart)); // Aggiorna il carrello nel localStorage
    },
    removeItem(index) {
      this.cart.splice(index, 1); // Rimuove il piatto dal carrello
      localStorage.setItem("cart", JSON.stringify(this.cart)); // Aggiorna il carrello nel localStorage
    },
    checkout() {
      // Gestisci il processo di checkout (ad esempio invia al backend)
      console.log("Checkout:", this.cart);
    },
  },
};
</script>

<template>
  <div>
    <!-- Pulsante per aprire/chiudere il carrello -->
    <button @click="toggleCart" class="cart-toggle-btn">Carrello</button>

    <!-- Carrello a scomparsa -->
    <div v-if="cartVisible" class="cart-overlay">
      <div class="cart-content">
        <h3>Il tuo carrello</h3>

        <!-- Lista dei piatti nel carrello -->
        <ul>
          <li v-for="(item, index) in cart" :key="index">
            <span
              >{{ item.name }} - {{ item.quantity }} x €{{ item.price }}</span
            >
            <button @click="removeItem(index)">Rimuovi</button>
          </li>
        </ul>

        <!-- Totale del carrello -->
        <div v-if="cart.length > 0">
          <p>
            <strong>Totale: €{{ total }}</strong>
          </p>
          <button @click="checkout">Checkout</button>
        </div>
        <div v-else>
          <p>Il carrello è vuoto.</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  
  <style scoped>
.cart-toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ff6600;
  color: white;
  padding: 10px 15px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
}

.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
}

.cart-content {
  background-color: white;
  width: 80%;
  padding: 20px;
  overflow-y: auto;
}

.cart-content h3 {
  margin-top: 0;
}

.cart-content ul {
  list-style: none;
  padding: 0;
}

.cart-content ul li {
  margin-bottom: 10px;
}

.cart-content button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
}
</style>
  