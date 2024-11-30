<script>
// import components
import RestaurantList from "./RestaurantList.vue";

export default {
  name: "AppMain",
  components: {
    RestaurantList,
  },
};
</script>

<template>
  <!--Header con jumbotron-->
  <section class="jumbotron">
    <div class="title-jumbotron">
      <h1>Benvenuti su deliveBoo!</h1>
    </div>
  </section>

  <RestaurantList />
</template>


<style>
.jumbotron {
  height: 900px;
  background-image: url(/images/jumbotron-deliveboo.png);
  background-size: contain;
}
.title-jumbotron > h1 {
  font-size: 70px;
  text-transform: uppercase;
  font-family: "neplus", serif;
  text-align: center;
  color: #2f2f2f;
  padding-top: 100px;
}
</style>