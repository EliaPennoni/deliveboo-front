<script>
import axios from "axios";

export default {
  props: ["id"], // Aggiungi props per ricevere l'id dalla rotta
  data() {
    return {
      restaurant: null, // Informazioni sul ristorante
    };
  },
  created() {
    console.log("ID ricevuto nella rotta:", this.id); // Debug per verificare l'ID

    if (!this.id) {
      console.error("Errore: ID non definito!");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/restaurants/${this.id}`)
      .then((response) => {
        console.log("Risposta API:", response.data); // Debug della risposta API
        this.restaurant = response.data;
      })
      .catch((error) => {
        console.error(
          "Errore nel caricamento dei dettagli del ristorante:",
          error
        );
      });
  },
};
</script>

<template>
  <div v-if="restaurant">
    <h1>{{ restaurant.name }}</h1>
    <h2>Piatti</h2>
    <div v-for="dish in restaurant.dishes" :key="dish.id" class="dish">
      <h3>{{ dish.name }}</h3>
      <p>{{ dish.description }}</p>
      <p>Prezzo: €{{ dish.price }}</p>
      <img :src="dish.image" :alt="dish.name" />
    </div>
  </div>
  <div v-else>
    <p>Caricamento in corso...</p>
  </div>
</template>
  
  <style>
.dish {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
}
</style>
  