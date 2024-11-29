<template>
  <div>
    <!-- Caricamento dei dettagli del ristorante -->
    <div v-if="restaurant">
      <h1>{{ restaurant.name }}</h1>
      <h2>Piatti</h2>

      <!-- Lista dei piatti -->
      <div v-for="dish in restaurant.dishes" :key="dish.id" class="dish">
        <h3>{{ dish.name }}</h3>
        <p>{{ dish.description }}</p>
        <p>Prezzo: €{{ dish.price }}</p>
        <img :src="dish.image" :alt="dish.name" />
        <button @click="addToCart(dish)">Aggiungi al Carrello</button>
      </div>
    </div>

    <div v-else>
      <p>Caricamento in corso...</p>
    </div>

    <!-- Messaggio di errore se i dati non sono caricati -->
    <div v-if="error" class="error-message">
      <p>Errore nel caricamento del ristorante. Riprova più tardi.</p>
    </div>

    <!-- Messaggio di errore se il cliente tenta di aggiungere piatti da un altro ristorante -->
    <div v-if="addError" class="error-message">
      <p>Non puoi aggiungere piatti da un altro ristorante al carrello!</p>
    </div>

    <!-- Carrello -->
    <button @click="toggleCart" class="cart-toggle-btn">Carrello</button>

    <div v-if="cartVisible" class="cart-overlay">
      <div class="cart-content">
        <h3>Il tuo Carrello</h3>

        <ul>
          <li v-for="(item, index) in cart" :key="index">
            <span
              >{{ item.name }} - {{ item.quantity }} x €{{ item.price }}</span
            >
            <button @click="removeItem(index)">Rimuovi</button>
          </li>
        </ul>

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

<script>
import axios from "axios";

export default {
  props: ["id"], // ID del ristorante
  data() {
    return {
      restaurant: null, // Dettagli del ristorante
      cart: JSON.parse(localStorage.getItem("cart")) || [], // Carrello dal localStorage
      cartVisible: false, // Stato di visibilità del carrello
      error: false, // Gestione errori
      addError: false, // Gestione dell'errore quando si tenta di aggiungere piatti da un altro ristorante
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
  created() {
    if (!this.id) {
      console.error("Errore: ID ristorante non definito!");
      this.error = true;
      return;
    }

    // Recupera i dettagli del ristorante
    axios
      .get(`http://127.0.0.1:8000/api/restaurants/${this.id}`)
      .then((response) => {
        if (
          response.data &&
          response.data.name &&
          Array.isArray(response.data.dishes)
        ) {
          this.restaurant = response.data;
        } else {
          throw new Error("Dati del ristorante non validi.");
        }
      })
      .catch((error) => {
        console.error("Errore nel caricamento del ristorante:", error);
        this.error = true;
      });
  },
  methods: {
    toggleCart() {
      this.cartVisible = !this.cartVisible; // Apre/chiude il carrello
    },
    addToCart(dish) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const currentRestaurantId = this.restaurant.id;

      // Se il carrello è vuoto, aggiungi il piatto
      if (cart.length === 0) {
        cart.push({
          dishId: dish.id,
          name: dish.name,
          price: dish.price,
          quantity: 1,
          restaurantId: currentRestaurantId, // Aggiungi l'ID del ristorante al carrello
        });
        this.updateCart(cart); // Usa il nuovo metodo per aggiornare
        console.log(`${dish.name} è stato aggiunto al carrello`);
      } else {
        // Se il carrello contiene già un piatto, controlla se è dello stesso ristorante
        const cartRestaurantId = cart[0].restaurantId;
        if (cartRestaurantId !== currentRestaurantId) {
          // Mostra un messaggio di errore se il ristorante è diverso
          this.addError = true;
          setTimeout(() => {
            this.addError = false; // Nascondi il messaggio dopo 3 secondi
          }, 3000);
        } else {
          // Aggiungi il piatto al carrello se lo stesso ristorante
          let item = cart.find((item) => item.dishId === dish.id);
          if (item) {
            item.quantity++;
          } else {
            cart.push({
              dishId: dish.id,
              name: dish.name,
              price: dish.price,
              quantity: 1,
              restaurantId: currentRestaurantId, // Aggiungi l'ID del ristorante
            });
          }
          this.updateCart(cart); // Usa il nuovo metodo per aggiornare
          console.log(`${dish.name} è stato aggiunto al carrello`);
        }
      }
    },
    removeItem(index) {
      this.cart.splice(index, 1); // Rimuovi il piatto dal carrello
      this.updateCart(this.cart); // Usa il nuovo metodo per aggiornare
    },
    checkout() {
      console.log("Procedi al checkout con questi articoli:", this.cart);
    },
    updateCart(cart) {
      // Aggiorna il carrello in localStorage e forza il re-render
      localStorage.setItem("cart", JSON.stringify(cart));
      this.cart = JSON.parse(localStorage.getItem("cart")) || []; // Rileggi il carrello per aggiornare la UI
    },
  },
};
</script>

<style scoped>
.dish {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
}

button {
  background-color: #ff6600;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

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

.error-message {
  color: red;
  margin-top: 20px;
}
</style>
