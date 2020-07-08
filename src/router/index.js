import Vue from 'vue'
import VueRouter from 'vue-router'
import TvPlay from '../views/tvplay/TvPlay'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'TvPlay',
        component: TvPlay
    },
    {
        path: '/music',
        name: 'Music',
        component: () => import('../views/music/Music')
    },
    {
        path: '/talk',
        name: 'About',
        component: () => import('../views/talk/Talk')
    },
    {
        path: '/book',
        name: 'Book',
        component: () => import('../views/book/Book')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
