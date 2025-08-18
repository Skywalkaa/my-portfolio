import './assets/main.css'
import './assets/variables.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useDarkMode } from './composables/useDarkMode'

const app = createApp(App)
app.use(router)

// Initialize dark mode
const { initializeDarkMode } = useDarkMode()
initializeDarkMode()

app.mount('#app')
