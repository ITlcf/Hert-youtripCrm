// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Vue.config.productionTip = falseimport Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import echarts from 'echarts'

import {Loading,Message} from 'element-ui'
Vue.use(ElementUI);
Vue.prototype.axios = axios  /*给Vue的原型对象拓展axios*/
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/*配置拦截器interceptors:会拦截所有的请求，在请求或响应被 then 或 catch 处理前拦截它们。*/
var loadinginstace;
axios.interceptors.request.use(config=>{
  /*在发送请求前做什么*/
  loadinginstace = Loading.service({fullscreen:true}) /*Loading可以以服务的方式调用*/
  return config  /*如果不return  config，服务器接收不到请求*/
},error => {
  // 对请求错误做些什么
  Message.error({
    message:'请求失败'
  })
  return Promise.reject(error);
})
axios.interceptors.response.use(response=>{
  /*对响应数据做点什么*/
  /*如果不return response，服务器接收到请求后，resp.send（data）回来，但是没有得到响应，依然拿不到数据*/
  loadinginstace.close()
  return response
},error => {
  // 对响应错误做点什么
  Message.error({
    message:'加载超时'
  })
  loadinginstace.close()
  return Promise.reject(error);
})
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next()
//   } else {
//     if (!store.state.user && (to.path === '/youTripHome' || to.path === '/')) {
//       next({ path: '/login' })
//     } else {
//       next()
//     }
//     if (!store.state.user && (from.path === '/login') && (to.path === '/youTripHome')) {
//       next({ path: '/login' })
//     }
//   }
// })
new Vue({
  el: '#app',
  router,
  echarts,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
