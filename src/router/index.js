import { createRouter, createWebHistory } from "vue-router";
import RestaurantList from "../components/RestaurantList.vue"; // Lista ristoranti
import RestaurantDetails from "../components/RestaurantDetails.vue"; // Dettagli ristorante

const routes = [
  {
    path: "/", // Home
    name: "home",
    component: RestaurantList, // Mostra la lista dei ristoranti
  },
  {
    path: "/restaurants/:id", // Rotta per il dettaglio di un ristorante
    name: "restaurantDetails",
    component: RestaurantDetails, // Mostra i dettagli del ristorante
    props: true, // Passa automaticamente i parametri come props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
