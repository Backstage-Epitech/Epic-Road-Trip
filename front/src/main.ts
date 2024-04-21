import './assets/css/main.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createApp } from 'vue'
import { config } from './config';
import App from './App.vue'

const app = createApp(App);

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

// Mitt
import mitt from 'mitt';
const emitter = mitt();
app.config.globalProperties.emitter = emitter;

// Google
import VueGoogleMaps from '@fawmi/vue-google-maps'
import vue3GoogleLogin from 'vue3-google-login'
const googleMapsApiKey: string = config.GOOGLE_MAPS_API_KEY;


// VueDatePicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// Search-select
import "vue-search-select/dist/VueSearchSelect.css"

//Router
import router from './router/index';

createApp(App).use(vuetify).use(router).use(VueGoogleMaps, {
  load: {
    key: googleMapsApiKey,
    libraries: "places"
  },
}).use(vue3GoogleLogin, {
  clientId: config.GOOGLE_AUTH_CLIENT_ID
}).component('VueDatePicker', VueDatePicker).mount('#app')
