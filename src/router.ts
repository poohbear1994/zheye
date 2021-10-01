/*
 * @Author: your name
 * @Date: 2021-09-26 13:54:26
 * @LastEditTime: 2021-10-01 15:34:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zheye/src/router.ts
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import store from './store'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: {
        requiredLogin: true
      }
    }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  if (!store.state.user.isLogin && to.meta.requiredLogin) {
    next({
      name: 'login'
    })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    console.log('已经登陆，重定向到首页')
    next('/')
  } else {
    next()
  }
})

export default router
