import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'

import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'

import './assets/less/index.less'

Vue.prototype.$axios = axios // 配置所有组件用$axios
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1' // 配置 $axios发送请求的基准值
axios.interceptors.request.use(config => {
  // 配置 每次请求都携带token
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
