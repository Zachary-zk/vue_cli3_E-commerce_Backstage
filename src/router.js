import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: Login, name: 'login' },
    { path: '/home', component: Home, name: 'home' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
    return
  }
  const token = localStorage.getItem('token')
  if (!token) {
    next('/')
  } else {
    next()
  }
})

export default router
