import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
// import Vue from 'vue'
// import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'



loadFonts()

createApp(App)
    .use(router)
    .use(store)
    .use(vuetify)
    // .use(Vue)
    // .use(Vuetify)
    .use(bootstrap)
    .mount('#app')
