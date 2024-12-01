<script>
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
import AppFooter from "./components/AppFooter.vue";
export default {
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart")) || [], // Persistenza carrello
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
  methods: {
    updateCart(newCart) {
      this.cart = newCart;
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    toggleCart() {
      this.$emit("toggleCart");
    },
  },
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <div>
    <AppHeader :cart="cart" :total="total" @toggleCart="toggleCart" />
    <router-view :cart="cart" @updateCart="updateCart" />
    <AppFooter />
  </div>
</template>

<style>
/* Import all of Bootstrap's CSS */
/* @import "bootstrap/scss/bootstrap"; */
</style>