import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/store.js";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'vis/dist/vis-timeline-graph2d.min.css';
import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$apiClient = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 15000
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

