import LoginViewVue from "../views/Auth/LoginView.vue";
import ForgetViewVue from "../views/Auth/ForgetView.vue";
import ResetViewVue from "../views/Auth/ResetView.vue";

let AuthManagment = [
    {
        path: "/login",
        name: "login",
        component: LoginViewVue,
      },
      {
        path: "/forget",
        name: "forget",
        component: ForgetViewVue,
      },
      {
        path: "/reset",
        name: "reset",
        component: ResetViewVue,
      },
];

export default AuthManagment;