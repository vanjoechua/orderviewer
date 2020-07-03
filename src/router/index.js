import Vue from 'vue'
import Router from 'vue-router'
import ViewerLayout from '../views/orderviewer/ViewerLayout'

const Orders = () => import('../views/orderviewer/orders/Orders')

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: ViewerLayout,
            redirect: '/orders',
            children: [
                {
                    component: Orders,
                    path: '/orders',
                },
            ],
        },
    ],
})
