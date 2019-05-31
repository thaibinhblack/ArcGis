import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/Index.vue'
import Login from '@/components/Login.vue'
import Admin from '@/components/admin/Index.vue'
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/admin',
        name:'Admin',
        component: Admin
    }
]

export default new VueRouter({
    routes: routes,
    mode: 'history'
});
