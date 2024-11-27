<script>
import axios from "axios";

export default {
  data() {
    return {
      restaurants: [], // Lista ristoranti
      loading: true, // Stato di caricamento
    };
  },
  methods: {
    goToDetails(id) {
      if (!id) {
        console.error("Errore: ID non valido!");
        return;
      }
      console.log(`Naviga al ristorante con ID: ${id}`); // Debug
      this.$router.push({ name: "restaurantDetails", params: { id } });
    },
  },

  created() {
    // Chiamata API per ottenere i ristoranti
    axios
      .get("http://127.0.0.1:8000/api/restaurants")
      .then((response) => {
        this.restaurants = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.error("Errore nel caricamento dei ristoranti:", error);
        this.loading = false;
      });
  },
};
</script>

<template>
  <div>
    <h1>Ristoranti</h1>
    <div
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      class="restaurant"
    >
      <h2>{{ restaurant.name }}</h2>
      <p>{{ restaurant.address }}</p>
      <button @click="goToDetails(restaurant.id)">Visualizza Piatti</button>
    </div>
  </div>
</template>

<style>
.restaurant {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
}
</style>
