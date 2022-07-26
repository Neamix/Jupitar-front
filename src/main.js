import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import '@/assets/base.css';
import '@/assets/index.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { dom } from "@fortawesome/fontawesome-svg-core";
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import VueApexCharts from "vue3-apexcharts";
import 'flowbite';
import '@ocrv/vue-tailwind-pagination/styles'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


dom.watch();

library.add(far,fas,fab);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('v-select', vSelect);

app.use(createPinia());
app.use(VueApexCharts);
app.use(router);
app.use(VueSweetalert2);

app.mount("#app");
