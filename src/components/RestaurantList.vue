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
    <h3 class="text-center">Filtra per Categoria</h3>
    <div class="category-filter-container">
      <div
        v-for="category in categories"
        :key="category.id"
        class="form-check category-item"
      >
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
    </div>

    <!-- Lista Ristoranti -->
    <!-- <div v-if="restaurants.length > 0">
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
    </div> -->
  </div>
  <!-- </template>


<template>
  <section> -->
  <div
    class="background-pattern container my-5 shadow p-5 mb-5 bg-body-tertiary text-center"
  >
    <h1 class="my-title">Ristoranti</h1>
    <p class="ibm-plex-mono-regular-subtitle mb-4">
      Guarda tra la selezione dei nostri ristoranti e ordina da quello che fa
      più al caso tuo!
    </p>
    <div class="row">
      <div class="col-4" v-for="restaurant in restaurants" :key="restaurant.id">
        <div class="card shadow mb-5">
          <div class="p-0">
            <img :src="restaurant.image" :alt="restaurant.name" />
          </div>
          <div class="card-body text-center p-3">
            <div>
              <h2 class="ibm-plex-mono-bold mb-1">
                {{ restaurant.name }}
              </h2>
              <p class="ibm-plex-mono-regular mb-4">
                {{ restaurant.address }}
              </p>
              <button
                @click="goToDetails(restaurant.id)"
                class="button-menu ibm-plex-mono-regular"
              >
                Visualizza Piatti
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </section> -->
</template>
 <style scoped>
.category-filter-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

h3 {
  margin-bottom: 20px;
}
.container {
  border-radius: 30px;
}
.background-pattern {
  background-image: url(/images/background-pattern.png);
  background-size: contain;
}
.restaurant {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
}
img {
  width: 100%;
  height: 200px;
  background-size: cover;
  border-radius: 20px 20px 0 0;
}
.button-menu {
  background-color: #2f2f2f;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 10px;
}
.button-menu:hover {
  background-color: #fac200;
  border: #2f2f2f solid 1px;
}
.ibm-plex-mono-regular {
  font-family: "IBM Plex Mono", monospace;
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
}
.ibm-plex-mono-regular-subtitle {
  font-family: "IBM Plex Mono", monospace;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
}
.card {
  border-radius: 20px;
  border: solid 1px #2f2f2f;
}
.ibm-plex-mono-bold {
  font-family: "IBM Plex Mono", monospace;
  font-weight: 700;
  font-style: normal;
  color: #2f2f2f;
  font-size: 30px;
}
</style>