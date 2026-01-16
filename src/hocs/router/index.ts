import {
  createRouter,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/Cart.vue")
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/Products.vue")
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
