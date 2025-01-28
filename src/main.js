import './assets/main.css'
// import 'vue-hi-code/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import { VueHiCode } from "vue-hi-code";

const app = createApp(App);
app.component('VueHiCode', VueHiCode);
app.mount('#app');

