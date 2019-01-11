import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import Home from './views/Home.vue'
// import About from './views/About.vue'

// import User from './components/user/User.vue'
// import Roles from './components/roles/Roles.vue'
// import Rights from './components/rights/Rights.vue'
// import Categories from './components/categories/Categories.vue'
// import Goods from './components/goods/Goods.vue'
// import GoodsAdd from './components/goods-add/Goods-add.vue'
const User = () => import('./components/user/User.vue')
const Roles = () => import('./components/roles/Roles.vue')
const Rights = () => import('./components/rights/Rights.vue')
const Categories = () => import('./components/categories/Categories.vue')
const Goods = () => import(/* webpackChunkName: "group-foo" */ './components/goods/Goods.vue')
const GoodsAdd = () => import(/* webpackChunkName: "group-foo" */ './components/goods-add/Goods-add.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: Login, name: 'login' },
    // { path: '/about', component: About },
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
        },
        {
          path: 'categories', component: Categories, name: 'categories'
        },
        {
          path: 'goods', component: Goods
        },
        {
          path: 'goods-add', component: GoodsAdd
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
