import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from "echarts";
import Icon from 'vue-svg-icon/Icon.vue'
import "./style.css";
import './assets/test.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import './assets/swiper.min.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.prototype.$echarts = echarts;

//项目的入口文件中注册此插件以方便全局调用
Vue.component('icon',Icon);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
