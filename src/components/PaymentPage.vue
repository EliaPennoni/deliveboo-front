<template>
  <div class="payment-container">
    <!-- Riepilogo Ordini -->
    <div class="order-summary">
      <h3>Riepilogo Ordini</h3>
      <ul>
        <li v-for="(item, index) in cart" :key="index">
          {{ item.name }} - €{{ item.price }} x {{ item.quantity }}
        </li>
      </ul>
      <p>
        <strong>Totale: €{{ total }}</strong>
      </p>
    </div>

    <!-- Sezione Dati Utente -->
    <div class="user-info">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input
          type="text"
          v-model="name"
          id="name"
          required
          placeholder="Inserisci il tuo nome"
        />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          v-model="email"
          id="email"
          required
          placeholder="Inserisci la tua email"
        />
      </div>
      <div class="form-group">
        <label for="telephone">Telefono:</label>
        <input
          type="tel"
          v-model="telephone"
          id="telephone"
          required
          placeholder="Inserisci il tuo numero di telefono"
        />
      </div>
    </div>

    <!-- Sezione per il pagamento -->
    <div class="payment-method">
      <div id="dropin-container"></div>
      <button @click="submitPayment" class="pay-button">Paga</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dropin from "braintree-web-drop-in";

export default {
  data() {
    return {
      clientToken: null, // Per salvare il client token
      instance: null, // Per gestire l'istanza Drop-in
      name: "", // Nome dell'utente
      email: "", // Email dell'utente
      telephone: "", // Telefono dell'utente
      cart: JSON.parse(localStorage.getItem("cart")) || [], // Carrello salvato
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
  mounted() {
    this.fetchClientToken();
  },
  methods: {
    async fetchClientToken() {
      try {
        const response = await axios.get("/api/get-client-token");
        console.log("Client token ricevuto:", response.data.clientToken);
        this.clientToken = response.data.clientToken;
        this.initializeBraintree();
      } catch (error) {
        console.error("Errore nel recuperare il client token:", error);
      }
    },

    initializeBraintree() {
      if (!this.clientToken) {
        console.error("Client token non disponibile!");
        return;
      }

      dropin.create(
        {
          authorization: this.clientToken,
          container: "#dropin-container",
        },
        (err, instance) => {
          if (err) {
            console.error("Errore nel caricare Drop-in:", err);
            return;
          }
          this.instance = instance;
        }
      );
    },

    async submitPayment() {
      try {
        const { nonce } = await this.instance.requestPaymentMethod();
        const response = await axios.post("/api/process-payment", {
          nonce: nonce,
          amount: this.total, // Usa il totale calcolato
          name: this.name,
          email: this.email,
          telephone: this.telephone,
          cart: this.cart, // Aggiungi il carrello alla richiesta
        });

        if (response.data.success) {
          console.log("Pagamento completato con successo");

          // Redirige all'OrderConfirmation.vue con il transactionId
          this.$router.push({
            name: "orderConfirmation",
            query: { transactionId: response.data.transactionId },
          });
        } else {
          console.error(
            "Errore durante il pagamento:",
            error.response ? error.response.data : error
          );
          alert("C'è stato un errore nel completamento del pagamento.");
        }
      } catch (error) {
        console.error(
          "Errore durante il pagamento:",
          error.response ? error.response.data : error
        );
        alert("C'è stato un errore nel completamento del pagamento.");
      }
    },
  },
};
</script>

<style scoped>
.payment-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;
}

.order-summary {
  flex: 0 0 30%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.order-summary h3 {
  margin-bottom: 15px;
}

.order-summary ul {
  list-style-type: none;
  padding: 0;
}

.order-summary li {
  margin-bottom: 10px;
}

.order-summary p {
  font-weight: bold;
}

.user-info {
  flex: 1;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.payment-method {
  flex: 1;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 14px;
}

input:focus {
  border-color: #007bff;
}

button {
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

button:hover {
  background-color: #0056b3;
}

.pay-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

#dropin-container {
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
}
</style>
