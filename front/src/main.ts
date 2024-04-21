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
import mitt from 'mitt';
import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App);
const emitter = mitt();
app.config.globalProperties.emitter = emitter;

// VueDatePicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import "vue-search-select/dist/VueSearchSelect.css"

//Router
import router from './router/index';


const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).use(router).use(VueGoogleMaps, {
  load: {
      key: 'AIzaSyCs48gRBEFRP_R8_bQ_Q4BvmvWxq5vUzew',
      libraries: "places"
      // language: 'de',
  },
}).component('VueDatePicker', VueDatePicker).mount('#app')
