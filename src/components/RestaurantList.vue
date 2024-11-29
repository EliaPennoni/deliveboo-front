<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [], // Lista delle categorie
      selectedCategories: [], // Categorie selezionate
      restaurants: [], // Lista ristoranti filtrati
    };
  },
  methods: {
    async fetchAllRestaurants() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/restaurants"
        );
        this.restaurants = response.data; // Salva tutti i ristoranti
      } catch (error) {
        console.error("Errore nel recupero dei ristoranti:", error);
      }
    },
    // Carica le categorie al montaggio del componente
    async fetchCategories() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        );
        this.categories = response.data;
      } catch (error) {
        console.error("Errore nel caricamento delle categorie:", error);
      }
    },

    async filterRestaurants() {
      if (this.selectedCategories.length === 0) {
        // Se nessuna categoria è selezionata, mostra tutti i ristoranti
        this.fetchAllRestaurants();
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/restaurants/filter",
          {
            params: { category_id: this.selectedCategories },
          }
        );
        this.restaurants = response.data;
      } catch (error) {
        console.error("Errore nel filtraggio dei ristoranti:", error);
      }
    },
    goToDetails(restaurantId) {
      this.$router.push({
        name: "restaurantDetails",
        params: { id: restaurantId },
      });
    },
  },

  mounted() {
    // Recupera le categorie
    this.fetchCategories();
    // Recupera tutti i ristoranti inizialmente
    this.fetchAllRestaurants();
  },
};
</script>

<template>
  <div>
    <!-- Filtro per categoria -->
    <h3>Filtra per Categoria</h3>
    <div v-for="category in categories" :key="category.id" class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        :value="category.id"
        v-model="selectedCategories"
        @change="filterRestaurants"
      />
      <label class="form-check-label">
        {{ category.name }}
      </label>
    </div>

    <!-- Lista Ristoranti -->
    <div v-if="restaurants.length > 0">
      <div v-for="restaurant in restaurants" :key="restaurant.id">
        <h3>{{ restaurant.name }}</h3>
        <p>{{ restaurant.address }}</p>
        <button @click="goToDetails(restaurant.id)" class="btn btn-primary">
          Visualizza Piatti
        </button>
      </div>
    </div>
    <div v-else>
      <p>Nessun ristorante trovato per questa categoria.</p>
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
