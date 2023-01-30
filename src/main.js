import * as Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import VueCookies from "vue-cookies";

import "./assets/main.css";

const app = Vue.createApp(App);

app.use(VueAxios, axios);
app.use(VueCookies, {
  expires: "1d",
  sameSite: "lax",
});

app.mount("#app");
