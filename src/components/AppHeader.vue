<script>
import Cart from "./Cart.vue";

export default {
    props: ["cart", "total", "cartVisible"],
    components: {
        Cart,
    },
    data() {
        return {};
    },
    computed: {
        // total() {
        //   return this.cart.reduce(
        //     (acc, item) => acc + item.price * item.quantity,
        //     0
        //   );
        // },

        cartCount() {
            return this.cart.reduce((acc, item) => acc + item.quantity, 0);
        }
    },
    methods: {
        toggleCart() {
        this.$emit("toggleCart");
        },
        // updateCart(newCart) {
        //   this.cart = newCart;
        //   localStorage.setItem("cart", JSON.stringify(this.cart)); // Persisti il carrello
        // },
        // addToCart(dish) {
        //   const existingItem = this.cart.find((item) => item.id === dish.id);
        //   if (existingItem) {
        //     existingItem.quantity++; // Incrementa il contatore se il piatto è già nel carrello
        //   } else {
        //     this.cart.push({ ...dish, quantity: 1 }); // Aggiungi il piatto al carrello
        //   }
        //   this.updateCart([...this.cart]); // Sincronizza il carrello
        // },
    },
};
</script>

<template>
    <nav class="navbar navbar-expand-lg shadow sticky-top">
        <div class="container">
            <a href="/" class="col-6">
                <img
                class="logo-deliveboo"
                src="/images/Logo-deliveBoo.svg"
                alt="deliveBoo-logo"
                />
            </a>
            <div class="d-flex justify-content-end">
                <a href="http://127.0.0.1:8000/" class="btn btn-dark text-white">
                    Accedi o Registrati
                </a>
                <button @click="toggleCart" class="btn btn-light text-dark ml-3 position-relative">
                    Carrello
                    <span
                    v-if="cartCount > 0"
                    class="badge badge-danger position-absolute top-0 start-100 translate-middle border border-light rounded-circle"
                    >
                        {{ cartCount }}
                    </span>
                </button>
            </div>
        </div>
        <Cart
        :cart="cart"
        :cartVisible="cartVisible"
        :total="total"
        @toggleCart="$emit('toggleCart')"
        />
    </nav>
</template>

<style>
.badge {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 0.8rem;
}

/* Logo */
.logo-deliveboo {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

.navbar {
  background-color: white;
}

/* Overlay del carrello */
.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
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

.cart-content button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
}

/* Flexbox per l'header */
.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar .d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar .d-flex .col-6 {
  flex: 1;
}

.navbar .btn {
  margin-left: 15px;
}
</style>
