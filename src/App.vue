<script>
import AppHeader from "./components/AppHeader.vue";
import AppMain from "./components/AppMain.vue";
import AppFooter from "./components/AppFooter.vue";
export default {
  data() {
    return {
      // count: 0
    };
  },
  components: {
    AppHeader,
    AppMain,
    AppFooter,
  },
  methods: {
    // incrementCount() {
    //   this.count++;
    // }
  },
};
</script>

<template>
  <div>
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<style>
/* Import all of Bootstrap's CSS */
/* @import "bootstrap/scss/bootstrap"; */
</style>