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
    <div class="container my-5 shadow p-3 mb-5 bg-body-tertiary rounded text-center">
        <h1 class="text-body-tertiary mb-4">
            Ristoranti
        </h1>
        <div class="row">
            <div class="col-4" v-for="restaurant in restaurants" :key="restaurant.id">
                <div class="card bg-secondary-subtle shadow p-3 mb-5 bg-body-tertiary rounded">
                    <div class="card-body text-center">
                        <div>
                            <h2 class="text-body-tertiary mb-4">
                                {{ restaurant.name }}
                            </h2>
                            <p class="text-body-tertiary mb-4">
                                {{ restaurant.address }}
                            </p>
                            <button @click="goToDetails(restaurant.id)" class="btn btn-primary">
                                Visualizza Piatti
                            </button>
                        </div>
                    </div>
                </div>
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
