## vue-router
> vue-router指的是在vue中的路由管理系统,，也就是SPA单页应用(只有一个index.html页面，所有内容都是index.html 里面的组件)

##### vue-router核心配置文件 router/index.js

```
    import Vue from 'vue'   //引入Vue
    import Router from "vue-router"//引入vue-router
    import home  from "../component/Home";
    import detail  from "../component/Detail.vue";
    
    Vue.use(Router);

    //实例化导出
    export default new Router({
        routes:[
            {
                path:'/',
                name:'home',
                component:home
            }, 
            {
                path:'/home',
                name:'home',
                component:home
            }
        ]
    })

```
//组件
```
    //app.vue
    ....
        <div>
            <router-link to="/">主页</router-link>
            <router-link to="/home">技能详情</router-link>
        </div>
    ....
```







### Vue-router 的两种模式主要依赖什么实现的

* hash 主要依赖location.hash来改动URL，达到不刷新跳转的效果。每次hash改变都会触发hashchange事件(来响应路由的变化，例如页面的更换)
* history主要利用了html5的history API来实现，用pushState and replaceState来操作浏览器记录栈



