<template>
    <div v-if="cartVisible" class="cart-overlay">
        <div class="cart-content container-fluid">
            <button @click="toggleCart" class="button-exit-cart mb-4">
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <div class="d-flex my-2">
                <h3 class="text-body">Carrello</h3>
                <!-- <div>
                    <button @click="clearCart" class="btn btn-warning mb-2">Svuota Carrello</button>
                </div> -->
                <button 
                    @click="clearCart" 
                    class="btn btn-warning mb-2"
                    :disabled="!cart.length"
                >
                    Svuota Carrello
                </button>
            </div>

            <!-- Mostra il messaggio di errore se presente -->
            <p v-if="errorMessage" class="error-message m-3">{{ errorMessage }}</p>

            <ul class="my-3">
                <li v-for="(item, index) in cart" :key="item.id">
                    <span class="text-body">
                        {{ item.name }} - € {{ item.price }}
                    </span>

                    <div class="mb-4 d-flex justify-content-start gap-3">
                        <button @click="decreaseQuantity(index)" class="btn btn-danger">
                            -
                        </button>
                        <span class="text-secondary">
                            {{ item.quantity }}
                        </span>
                        <button @click="increaseQuantity(index)" class="btn btn-success m-0">
                            +
                        </button>
                    </div>
                </li>
            </ul>

            <p v-if="cart.length" class="text-body fs-5">
                <b>
                    Totale: € {{ total }}
                </b>
            </p>

            <p v-else class="text-body">
                <b>
                    Il carrello è vuoto
                </b>
            </p>

            <div>
                <button
                @click="goToPayment"
                :disabled="!cart.length"
                class="pay-button"
                >
                Paga
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    cart: Array,
    cartVisible: Boolean,
    total: Number,
  },
  data() {
    return {
      errorMessage: "", // Variabile per il messaggio di errore
    };
  },
  methods: {
    toggleCart() {
      this.$emit("toggleCart");
    },

    increaseQuantity(index) {
      // Controlla se il piatto che si sta cercando di aggiungere proviene dallo stesso ristorante
      const firstRestaurantId = this.cart[0]?.restaurant_id;
      if (
        firstRestaurantId &&
        this.cart[index].restaurant_id !== firstRestaurantId
      ) {
        this.errorMessage = "Non puoi aggiungere piatti da ristoranti diversi.";
        return;
      }

      this.cart[index].quantity++;
      this.syncCart();
    },

    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      } else {
        this.cart.splice(index, 1); // Rimuove il piatto se la quantità è zero
      }
      this.syncCart();
    },

    clearCart() {
        if (window.confirm("Sei sicuro di voler svuotare il carrello?")) {
            // Svuota il carrello e sincronizza con il genitore
            this.cart.length = 0; // Rimuove tutti gli elementi
            this.syncCart();
        }
    },

    syncCart() {
      // Sincronizza il carrello con il componente genitore e persiste nel localStorage
      this.$emit("updateCart", [...this.cart]); // Sincronizza con il genitore
      localStorage.setItem("cart", JSON.stringify(this.cart)); // Persisti il carrello nel localStorage
      this.errorMessage = ""; // Resetta l'errore quando si sincronizza il carrello
    },

    goToPayment() {
      // Naviga alla pagina di pagamento passando il totale come query param
      this.$router.push({ name: "payment", query: { total: this.total } });
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
  margin-bottom: 10px;
}

.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 600px;
  height: 100%;
  background-color: rgba(
    0,
    0,
    0,
    0.7
  ); /* Aggiunta di uno sfondo semi-trasparente */
}

.cart-content {
  background-image: url(/public/images/background-pattern.png);
  padding: 20px;
  overflow-y: auto;
  color: white; /* Aggiunto per migliorare la leggibilità */
}

.button-exit-cart {
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
  color: white; /* Modificato per visibilità */
}

.fa-circle-xmark {
  color: white; /* Modificato per visibilità */
  font-size: 25px;
}

.pay-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 20px;
}

.pay-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.cart-content h3 {
  color: white; /* Aggiunto per migliorare la visibilità del titolo */
}

.cart-content ul {
  list-style-type: none;
  padding: 0;
}

.cart-content li {
  margin-bottom: 10px;
  color: white; /* Aggiunto per migliorare la visibilità del testo */
}

.cart-content button {
  color: white;
  background-color: #007bff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
}

.cart-content button:hover {
  background-color: #0056b3;
}
</style>
