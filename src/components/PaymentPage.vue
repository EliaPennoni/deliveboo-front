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
      <h3>Dati Utente</h3>
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
      <h3>Metodo di Pagamento</h3>
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
      clientToken: "sandbox_hc6dnztj_6b8mcbdphgfhzbv8",
      instance: null,
      name: "",
      email: "",
      telephone: "",
      cart: JSON.parse(localStorage.getItem("cart")) || [],
    };
  },
  computed: {
    total() {
      return this.cart
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);
    },
  },
  mounted() {
    this.initializeBraintree();
  },
  methods: {
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
          nonce,
          amount: this.total,
          name: this.name,
          email: this.email,
          telephone: this.telephone,
          cart: this.cart,
        });

        if (response.data.success) {
          console.log("Pagamento completato con successo");
          this.$router.push({
            name: "orderConfirmation",
            query: { transactionId: response.data.transactionId },
          });
        } else {
          console.error("Errore durante il pagamento:", response.data.message);
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
  gap: 20px;
  margin: 20px;
}

.order-summary,
.user-info,
.payment-method {
  flex: 1;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.order-summary h3,
.user-info h3,
.payment-method h3 {
  margin-bottom: 15px;
  font-size: 1.5em;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.pay-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pay-button:hover {
  background-color: #218838;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

p strong {
  font-size: 1.2em;
}
</style>
