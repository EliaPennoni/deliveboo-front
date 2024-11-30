<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      restaurant: null,
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      addError: false,
    };
  },
  methods: {
    fetchRestaurantDetails() {
      axios
        .get(`http://127.0.0.1:8000/api/restaurants/${this.id}`)
        .then(({ data }) => {
          this.restaurant = data;
        })
        .catch((error) => console.error("Errore:", error));
    },
    addToCart(dish) {
      const restaurantId = this.restaurant.id;

      if (this.cart.length > 0 && this.cart[0].restaurantId !== restaurantId) {
        this.addError = true;
        setTimeout(() => (this.addError = false), 3000);
        alert("Non puoi aggiungere piatti da un altro ristorante."); // Aggiunto un alert visibile
        return;
      }

      const existingItem = this.cart.find((item) => item.dishId === dish.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...dish, quantity: 1, restaurantId });
      }

      this.syncCart();
    },
    syncCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
      this.$emit("updateCart", [...this.cart]);
    },
  },
  mounted() {
    this.fetchRestaurantDetails();
  },
};
</script>


<template>
  <div class="container my-5 text-center">
    <div v-if="restaurant">
      <h1>{{ restaurant.name }}</h1>
      <div class="row">
        <div
          class="col-12 col-sm-6 col-md-4"
          v-for="dish in restaurant.dishes"
          :key="dish.id"
        >
          <div class="card shadow mb-4 h-100">
            <img class="card-img-top" :src="dish.image" :alt="dish.name" />
            <div class="card-body d-flex flex-column">
              <h3 class="ibm-plex-mono-bold mb-2">{{ dish.name }}</h3>
              <p class="ibm-plex-mono-regular">{{ dish.description }}</p>
              <p class="ibm-plex-mono-regular">Prezzo: €{{ dish.price }}</p>
              <button class="btn btn-primary mt-3" @click="addToCart(dish)">
                Aggiungi al carrello
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Caricamento in corso...</p>
    </div>

    <!-- Messaggio di errore -->
    <div v-if="addError" class="alert alert-danger mt-4">
      Non puoi aggiungere piatti di un altro ristorante al carrello.
    </div>
  </div>
</template>

<style scoped>
.container {
  border-radius: 30px;
}
.card {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
}
.ibm-plex-mono-regular {
  font-size: 15px;
}
.ibm-plex-mono-bold {
  font-size: 20px;
}
</style>
