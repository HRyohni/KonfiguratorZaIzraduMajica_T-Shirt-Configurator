// src/main.js

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Ako si odabrao Vue Router

// Vuetify
import 'vuetify/styles' // Importiraj Vuetify stilove
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Preporučeno: Material Design Icons

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Postavi MDI kao zadani set ikona
  },
})

const app = createApp(App)

app.use(router) // Ako si odabrao Vue Router

app.use(vuetify) // Dodaj Vuetify plugin

app.mount('#app')