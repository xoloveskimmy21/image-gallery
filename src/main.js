import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './utils/store.js'
import router from './utils/router.js'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
