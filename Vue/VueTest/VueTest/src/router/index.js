import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Svg from "../components/svg";
import swiper from "../views/swiperDemo";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/svg',
      component:Svg
    },
    {
      path:'/toSwiper',
      component:swiper
    }
  ]
})
