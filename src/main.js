import './assets/main.css'
import '../dist/vue-hi-code.css'

import { createApp } from 'vue'
import App from './App.vue'
import { VueHiCode } from "vue-hi-code";

const app = createApp(App);
app.component('VueHiCode', VueHiCode);
app.mount('#app');

