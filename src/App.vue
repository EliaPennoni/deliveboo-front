<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
export default {
  data() {
    return { 
      // count: 0
    }
  },
  components: {
    AppHeader,
    AppMain
  },
  methods: {
    // incrementCount() {
    //   this.count++;
    // }
  }
}
</script>

<template>
  <div>
    
    <AppHeader />
    
    <AppMain />

  </div>
</template>

<style>
  /* Import all of Bootstrap's CSS */
  /* @import "bootstrap/scss/bootstrap"; */
</style>