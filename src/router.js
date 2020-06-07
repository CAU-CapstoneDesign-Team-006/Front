import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'Board',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        },
        {
          path: '/infocommunication',
          name: 'infoCommunication',
          component: () => import(/* webpackChunkName: "demo" */ './views/infoCommunication.vue')
        },
        {
          path: '/communication',
          name: 'Communication',
          component: () => import(/* webpackChunkName: "demo" */ './views/Communication.vue')
        },
        {
          path: '/communication/write',
          name: 'write',
          component: () => import(/* webpackChunkName: "demo" */ './views/write.vue')
        },
        {
          path: '/infocommunication/write',
          name: 'infowrite',
          component: () => import(/* webpackChunkName: "demo" */ './views/infowrite.vue')
        },
        {
          path: '/communication/read',
          name: 'read',
          component: () => import(/* webpackChunkName: "demo" */ './views/read.vue')
        },
        {
          path: '/infocommunication/read',
          name: 'inforead',
          component: () => import(/* webpackChunkName: "demo" */ './views/inforead.vue')
        },
        {
          path: '/communication/update',
          name: 'update',
          component: () => import(/* webpackChunkName: "demo" */ './views/update.vue')
        },
        {
          path: '/communication/infoupdate',
          name: 'infoupdate',
          component: () => import(/* webpackChunkName: "demo" */ './views/infoupdate.vue')
        },
        {
          path: '/hotBoard',
          name: 'hotBoard',
          component: () => import(/* webpackChunkName: "demo" */ './views/hotBoard.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        },
        {
          path : '/selectType',
          name : 'selectType',
          component: () => import(/* webpackChunckName: "demo" */ './views/selectType.vue')
        },
        {
          path : '/storeinsert',
          name : 'storeinsert',
          component: () => import(/* webpackChunckName: "demo" */ './views/storeinsert.vue')
        }
      ]
    }
  ]
})
