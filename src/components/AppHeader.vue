<script>
import axios from "axios";

export default {
    data(){
        return {
            restaurants: [],
            searchQuery: ""
        };
    },
    computed: {
        // Filtro dinamico in base alla query di ricerca
        filteredRestaurant() {
        // Se la ricerca è vuota, non mostrare nulla
        if (this.searchQuery.trim() === "") {
            return [];
        }
        return this.restaurants.filter(restaurant =>
            restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }
    },
    mounted() {
        // Recupera i dati dal backend al momento del montaggio del componente
        this.fetchData();
    },
    methods: {
        // Funzione per ottenere i dati dal backend
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

        onSearch() {
            // Potresti voler fare qualcosa quando l'utente digita
            console.log("Ricerca attiva:", this.searchQuery);
        }
    }
  
};
</script>

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
            

            <!--Searchbar-->
            <div class="col-6">
                <form class="d-flex" role="search">
                    <input v-model="searchQuery" @input="onSearch" class="form-control me-2" type="text" placeholder="Search" aria-label="Search">
                    <button @click="searchRestaurant" class="btn btn-outline-success" type="submit">Search</button>
                </form>

                <!-- Lista degli items con condizione di visibilità -->
                <div class="results" v-if="filteredRestaurant.length > 0">
                    <ul>
                        <li v-for="restaurant in filteredRestaurant" :key="restaurant.id">{{ restaurant.name }}</li>
                    </ul>
                </div>

                <!-- Messaggio di no results -->
                <div v-else-if="searchQuery">
                    <p>Nessun risultato trovato.</p>
                </div>
                
            </div>
           
        </div>
    </div>
</nav>
</template>

<style scoped>
.navbar {
  background-color: #E9F8F5;
  color: #011632;
  padding: 10px;
  text-align: center;
}

.search-input {
  padding: 8px;
  font-size: 16px;
  width: 250px;
  border-radius: 5px;
}

.results {
  margin-top: 20px;
  padding: 0 20px;
}

.results ul {
  list-style-type: none;
  padding: 0;
}

.results li {
  margin: 5px 0;
}

p {
  text-align: center;
  color: red;
}
</style>