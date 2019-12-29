// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
// import Mock from './mock/index'
import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:8081/rfid'
//axios.defaults.baseURL = 'https://simple-tps.caoyu.online/tps'
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.$http = axios
Vue.prototype.$ajax = axios
Vue.prototype.$axios = axios

/* eslint-disable */
import locale from 'element-ui/lib/locale/lang/en'


Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



