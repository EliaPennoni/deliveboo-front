<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <div class="collapse navbar-collapse row d-flex justify-content-between">
        <div class="col-6">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Menù</a>
            </li>
          </ul>
        </div>

        <!-- Pulsante per la registrazione come ristoratore -->
        <a href="http://127.0.0.1:8000/" class="btn btn-primary">
          Accedi o Registrati
        </a>

        <!-- Pulsante Carrello -->
        <button @click="toggleCart" class="btn btn-outline-primary">
          Carrello
        </button>
      </div>
    </div>
  </nav>

  <!-- Carrello a scomparsa -->
  <div v-if="cartVisible" class="cart-overlay">
    <div class="cart-content">
      <h3>Il tuo Carrello</h3>
      <ul>
        <li v-for="(item, index) in cart" :key="index">
          <span
            >{{ item.name }} - Quantità: {{ item.quantity }} - €{{
              item.price * item.quantity
            }}</span
          >
          <button @click="removeItem(index)">Rimuovi</button>
        </li>
      </ul>
      <p v-if="cart.length > 0">
        <strong>Totale: €{{ total }}</strong>
      </p>
      <button v-if="cart.length > 0" @click="proceedToCheckout">
        Checkout
      </button>
      <button v-else>Carrello vuoto</button>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      cartVisible: false, // Stato del carrello
      cart: JSON.parse(localStorage.getItem("cart")) || [], // Carrello salvato in localStorage
      restaurants: [], // Lista dei ristoranti
      searchQuery: "", // Query per la ricerca
    };
  },
  computed: {
    total() {
      return this.cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    filteredRestaurant() {
      if (this.searchQuery.trim() === "") {
        return this.restaurants;
      }
      return this.restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("http://127.0.0.1:8000/api/restaurants")
        .then((response) => {
          this.restaurants = response.data;
        })
        .catch((error) => {
          console.error("Errore nel recupero dei dati:", error);
        });
    },
    toggleCart() {
      this.cartVisible = !this.cartVisible; // Apre/chiude il carrello
    },
    removeItem(index) {
      this.cart.splice(index, 1); // Rimuove il piatto dal carrello
      localStorage.setItem("cart", JSON.stringify(this.cart)); // Salva il carrello
    },
    proceedToCheckout() {
      this.$router.push("/checkout"); // Naviga alla pagina di checkout
    },
  },
};
</script>
  
  <style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
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

.cart-content button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
}
</style>
  