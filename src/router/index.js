import { createRouter, createWebHistory } from "vue-router";
import AppMain from "../components/AppMain.vue";
import RestaurantDetails from "../components/RestaurantDetails.vue"; // Dettagli ristorante
import PaymentPage from "../components/PaymentPage.vue"; // Pagina pagamento

const routes = [
  {
    path: "/",
    name: "home",
    component: AppMain,
  },
  {
    path: "/restaurants/:id",
    name: "restaurantDetails",
    component: RestaurantDetails,
    props: true,
  },
  {
    path: "/payment",
    name: "payment",
    component: PaymentPage, // Pagina di pagamento
    props: (route) => ({ total: route.query.total }), // Passa il totale come prop
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
