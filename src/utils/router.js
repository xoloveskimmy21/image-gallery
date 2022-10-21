// create vue router
import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../pages/Auth.vue'
import Home from '../pages/Home.vue'

// create vue router routes
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/auth', component: Auth },
    ]
})

export default router