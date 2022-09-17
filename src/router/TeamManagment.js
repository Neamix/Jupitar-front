import CollegesViewVue from "../views/Pages/CollegesView.vue";
import HomeViewVue from "../views/Pages/HomeView.vue";
import MonitoringViewVue from "../views/Pages/MonitoringView.vue";
import ProfileViewVue from "../views/Pages/ProfileView.vue";
import RoleViewVue from "../views/Pages/RolesView.vue";
import RequestViewVue from "../views/Pages/RequestView.vue";
import StatusViewVue from "../views/Pages/StatusesView.vue";
import AttendingViewVue from "../views/Pages/AttendingView.vue";

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
    {
        path: "/roles",
        name: "roles",
        component: RoleViewVue,
        meta: {requiredAuth: true}
    },
    {
        path: "/requests",
        name: "requests",
        component: RequestViewVue,
        meta: {requiredAuth: true}
    },
    {
        path: "/status",
        name: "status",
        component: StatusViewVue,
        meta: {requiredAuth: true}
    },
    {
        path: "/attending",
        name: "attending",
        component: AttendingViewVue,
        meta: {requiredAuth: true}
    },
];

export default teamRoutes;