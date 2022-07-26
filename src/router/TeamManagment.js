import CollegesViewVue from "../views/Pages/CollegesView.vue";
import HomeViewVue from "../views/Pages/HomeView.vue";
import MonitoringViewVue from "../views/Pages/MonitoringView.vue";
import ProfileViewVue from "../views/Pages/ProfileView.vue";

let teamRoutes = [
    {
        path: "/",
        name: "home",
        component: HomeViewVue,
        meta: {requiredAuth: true}
    },
    {
        path: "/monitoring",
        name: "monitoring",
        component: MonitoringViewVue,
        meta: {requiredAuth: true}
    },
    {
        path: "/colleges",
        name: "colleges",
        component: CollegesViewVue,
        meta: {requiredAuth: true}
    },
    {
        path: "/profile/:id",
        name: "profile",
        component: ProfileViewVue,
        meta: {requiredAuth: true,checkProfile: true}
    },
];

export default teamRoutes;