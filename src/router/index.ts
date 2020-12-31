import store from '@/store'
import Vue from 'vue'
import VueRouter, { NavigationGuard, Route, RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/remote/add',
    name: 'remote/add',
    component: () => import(/* webpackChunkName: "remote" */ '../views/remote/Add.vue')
  },
  {
    path: '/remote/:remoteId',
    component: () => import(/* webpackChunkName: "remote" */ '../views/remote/Main.vue'),
    children: [
      {
        path: "",
        name: "remote/view",
        component: () => import(/* webpackChunkName: "remote" */ '../views/remote/Index.vue'),
        props: route => ({ remote: store.getters.selectedRemote })
      },
      {
        path: "theaters/add",
        name: "remote/theater/add",
        component: () => import(/* webpackChunkName: "theater" */ '../views/remote/theater/Add.vue'),
        props: route => ({ remote: store.getters.selectedRemote })
      },
      {
        path: 'theater/:theaterId',
        component: () => import(/* webpackChunkName: "theater" */ '../views/remote/theater/Main.vue'),
        children: [
          {
            path: "",
            name: "remote/theater/view",
            component: () => import(/* webpackChunkName: "theater" */ '../views/remote/theater/Index.vue')
          },
          {
            path: "edit",
            name: "remote/theater/edit",
            component: () => import(/* webpackChunkName: "theater" */ '../views/remote/theater/Edit.vue')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
