import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import { createHead } from '@vueuse/head'
import './assets/css/main.css'
import App from './App.vue'
import routes from './router'
import ptBR from './i18n/pt-BR.json'
import en from './i18n/en.json'

const i18n = createI18n({
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages: { 'pt-BR': ptBR, en }
})

const app = createApp(App)
app.use(createPinia())
app.use(createRouter({ history: createWebHistory(), routes }))
app.use(i18n)
app.use(createHead())
app.mount('#app')
