import { createRouter, createWebHistory } from "vue-router";
import BeforeGuard from "./guards/BeforeGuard";
import MainViewVue from "../views/Pages/MainView.vue";
import AuthViewVue from "../views/Auth/AuthView.vue";
import teamRoutes from './TeamManagment.js';
import AuthManagment from './AuthManagment';
import NotFoundViewVue from '../views/Pages/NotFoundView.vue';

let mainRoutes = [];
let authRoutes = AuthManagment;

mainRoutes = mainRoutes.concat(teamRoutes);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "AuthView",
      component: AuthViewVue,
      children: authRoutes
    },
    {
      path:"/",
      name:"main",
      component: MainViewVue,
      children: mainRoutes
    },
    { path: '/:pathMatch(.*)*', component: NotFoundViewVue }
  ],
});
BeforeGuard(router);
export default router;
