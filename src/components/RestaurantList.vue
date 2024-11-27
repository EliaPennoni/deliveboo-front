<script>
import axios from "axios";

export default {
  data() {
    return {
      restaurants: [],
      loading: true,
    };
  },
  created() {
    axios
      .get("/api/restaurants")
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
    <div v-if="loading">Caricamento...</div>
    <div v-else>
      <div
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="restaurant"
      >
        <h2>{{ restaurant.name }}</h2>
        <p>{{ restaurant.address }}</p>
        <h3>Piatti</h3>
        <ul>
          <li v-for="dish in restaurant.dishes" :key="dish.id">
            {{ dish.name }} - €{{ dish.price }}
          </li>
        </ul>
      </div>
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
