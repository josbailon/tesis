import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

const app = createApp(App)

// Estado global
app.use(createPinia())

// Enrutamiento
app.use(router)

app.mount('#app')
