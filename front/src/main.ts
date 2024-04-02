import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App)

// VueDatePicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


//Router
import router from './router/index';


const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).use(router).component('VueDatePicker', VueDatePicker).mount('#app')
