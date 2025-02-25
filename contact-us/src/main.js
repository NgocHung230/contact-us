import "@mdi/font/css/materialdesignicons.css";
import { createApp } from "vue";
// import "./style.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import { createVuetify } from "vuetify";
import * as component from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  component,
  directives,
});
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount("#app");
