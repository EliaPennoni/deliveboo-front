<template>
  <div class="payment-container">
    <h1 class="payment-title">Pagamento</h1>
    <div v-if="isLoading" class="loading-message">
      Caricamento del modulo di pagamento...
    </div>

    <form class="payment-form" v-else @submit.prevent="submitPayment">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input
          type="text"
          id="name"
          v-model="name"
          required
          class="form-control"
          placeholder="Inserisci il tuo nome"
          autocomplete="name"
        />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="form-control"
          placeholder="Inserisci la tua email"
          autocomplete="email"
        />
      </div>
      <div class="form-group">
        <label for="telephone">Telefono:</label>
        <input
          type="tel"
          id="telephone"
          v-model="telephone"
          required
          class="form-control"
          placeholder="Inserisci il tuo numero di telefono"
          autocomplete="tel"
        />
      </div>
      <div class="total-summary">
        <p>
          Totale: <strong>€{{ total }}</strong>
        </p>
      </div>
      <div id="dropin-container" class="dropin-container"></div>
      <button type="submit" class="btn btn-primary" :disabled="isProcessing">
        {{ isProcessing ? "Elaborazione..." : "Paga" }}
      </button>
    </form>
  </div>
</template>

<script>
import dropin from "braintree-web-drop-in";
import axios from "axios";

export default {
  props: ["total", "cart"],
  data() {
    return {
      clientToken: "",
      instance: null,
      name: "",
      email: "",
      telephone: "",
      isLoading: true,
      isProcessing: false,
    };
  },
  mounted() {
    console.log("Component mounted, fetching token...");
    this.fetchClientToken();
  },
  methods: {
    async fetchClientToken() {
      try {
        const response = await axios.get("/api/get-client-token", {
          params: { nocache: Date.now() },
        });

        console.log(response);

        if (response.data && response.data.clientToken) {
          this.clientToken = response.data.clientToken;
          console.log("Client Token ricevuto:", this.clientToken);
          this.setupBraintree();
        } else {
          console.error("Errore: Nessun client token restituito dall'API.");
        }
      } catch (error) {
        console.error("Errore nel recupero del client token:", error);
        alert(
          "Si è verificato un errore durante il recupero del client token."
        );
      } finally {
        this.isLoading = false;
      }
    },

    setupBraintree() {
      if (!this.clientToken) {
        console.error("Errore: Client token non disponibile.");
        alert("Impossibile configurare il pagamento senza un client token.");
        return;
      }

      dropin.create(
        {
          authorization: this.clientToken,
          container: "#dropin-container",
        },
        (err, instance) => {
          if (err) {
            console.error("Errore nella creazione del modulo Drop-in:", err);
            alert("Errore nella creazione del modulo di pagamento.");
            return;
          }
          this.instance = instance;
          console.log("Modulo Drop-in creato con successo.");
        }
      );
    },

    submitPayment() {
      if (!this.name || !this.email || !this.telephone) {
        alert("Per favore, compila tutti i campi richiesti.");
        return;
      }

      if (!this.instance) {
        alert("Il modulo di pagamento non è pronto. Riprova.");
        return;
      }

      this.isProcessing = true;

      this.instance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error("Errore nella richiesta del metodo di pagamento:", err);
          this.isProcessing = false;
          return;
        }

        axios
          .post("/api/process-payment", {
            nonce: payload.nonce,
            amount: this.total,
            name: this.name,
            email: this.email,
            telephone: this.telephone,
            cart: this.cart,
          })
          .then((response) => {
            if (response.data.success) {
              alert("Pagamento completato con successo!");
              this.$router.push({ name: "confirmation" });
            } else {
              alert("Errore nel pagamento: " + response.data.message);
            }
          })
          .catch((error) => {
            console.error(
              "Errore durante l'elaborazione del pagamento:",
              error
            );
            alert("Si è verificato un errore durante il pagamento.");
          })
          .finally(() => {
            this.isProcessing = false;
          });
      });
    },
  },
};
</script>

<style scoped>
.payment-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.payment-title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.loading-message {
  text-align: center;
  font-size: 18px;
  color: #555;
  margin-top: 20px;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-control {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.total-summary {
  text-align: right;
  font-size: 18px;
  margin-bottom: 15px;
}

.dropin-container {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
