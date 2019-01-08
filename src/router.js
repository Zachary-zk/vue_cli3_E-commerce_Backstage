import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'

import User from './components/user/User.vue'
import Roles from './components/roles/Roles.vue'
import Rights from './components/rights/Rights.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: Login, name: 'login' },
    { path: '/about', component: About },
    {
      path: '/home',
      component: Home,
      name: 'home',
      children: [
        {
          path: 'users', component: User, name: 'user'
        },
        {
          path: 'roles', component: Roles, name: 'roles'
        },
        {
          path: 'rights', component: Rights, name: 'rights'
        }
      ]
    }
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
