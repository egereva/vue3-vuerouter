import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login'
import Forget from '@/views/Forget'
import Dashboard from '@/views/Dashboard'
//import Mail from '@/views/Mail'
import AppEmailBody from '@/components/AppEmailBody'
import NotFound from '@/views/NotFound'

const Mail = () => import(
    /* webpackChunkName: "mail" */ // меняем название чанка
    /* webpackMode: "lazy" */
    '@/views/Mail') // динамический импорт страниц

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Login,
            alias: '/'
        },
        {
            path: '/forget',
            component: Forget,
            meta: {
                cantEnter: true
            }
        },
        {
            path: '/dashboard',
            component: Dashboard,
            name: 'home',
            beforeEnter() {
                console.log('BeforeEnter')
            }
        },
        {
            path: '/mail',
            component: Mail,
            name: 'email',
            children: [
                {
                    path: ':mailId?',
                    component: AppEmailBody,
                    props: true
                }
            ]
        },
        {
            path: '/:notFound(.*)',
            component: NotFound
        }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
    console.log('BeforeEach')
    if (to.meta.cantEnter) {
        next({name: 'home'})
    } else {
        next()
    }
})

router.afterEach((to, from) => {

})

export default router
