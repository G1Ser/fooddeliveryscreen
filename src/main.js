import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Vcharts from 'vue-echarts'
import * as echarts from 'echarts';
const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.component('v-chart',Vcharts)
app.mount('#app')