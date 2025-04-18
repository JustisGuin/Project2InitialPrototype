import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory, } from 'vue-router'



import Login from './components/Login.vue'
import AdminPortal from './components/AdminPortal.vue'


const routes = [
  { path: '/', name: 'home' ,component: Login },
  { path: '/dashboard', name:'adminSide',component: AdminPortal },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
