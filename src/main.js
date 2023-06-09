import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
import axios from "axios";
import store from './store'// 引入echarts
import echarts from 'echarts'
// import * as echarts from "echarts"


Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.axios = axios

Vue.use(ElementUI);
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  store:store,
  router:router
}).$mount('#app')
