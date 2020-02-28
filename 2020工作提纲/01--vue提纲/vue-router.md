## vue-router
> vue-router指的是在vue中的路由管理系统,，也就是SPA单页应用(只有一个index.html页面，所有内容都是index.html 里面的组件)

#### vue-router核心配置文件 router/index.js

```
    import Vue from 'vue'   //引入Vue
    import Router from "vue-router"//引入vue-router
    import home  from "../component/Home";
    import detail  from "../component/Detail.vue";
    import list  from "../component/list.vue";
    
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
                component:home,
                //嵌套子路由组件
                children:[
                    path:'/list',
                    name:'list',
                    component:list
                ]
            }
        ]
    })

```
//组件 app.vue
```
    <template>
      <div>
            <router-link to="/">主页</router-link>
            <router-link to="/home">技能详情</router-link>
            <router-link to="/home/list">技能列表</router-link>
            <router-link :to="{name:"list",params:{username:'wokiy'}}">技能列表:to传参写法</router-link>
            <router-link to="/backHome">s返回首页</router-link>
            <router-link to="/goparams/178/goparams">goparams</router-link>
            
            
        </div>
    </template>

```

#### vue-router配置子路由
> http://localhost:8080/#/home/list 在home组件嵌套子组件

//组件 home.vue 
```
    <template>
        <h2>{{msg}}</h2>
        //home组件下的子路由组件写法
        <router-view></router-view>
    </template>
    <script>
        export default {
            data () {
                return {
                    msg:'home component!!'
                }
            }
        }
    </script>
```

#### Vue-Router的路由传参
1. to 传参

###### to 传参 
> <router-link :to="{name:xxx,params:{key:value}}">valueString</router-link>

* name : 路由配置中的name:value 
* params: 传递参数对象，在对象里可包含多个值

// list。vue组件
```
    //to 方式获取路由传递过来的参数
    <template>
        <div>
            {{$route.params.username}}
        </div>
    </template>

```


2. vue-router 利用url传递参数
> 配置/router/index.js

````
    routes[
     {
            path:'/',
        name:'home',
        component:home
     },{
         path:'/params/:sourceID/:sourceTitle',
         component:Param
     }
    ]
````

//Param.vue组件
````
    <template>
        <div>
            {{$route.params.sourceID}} / {{$route.params.sourceTitle}}
        </div>
    </template>
````

## vue-router重定向 -redirect
> 配置路由文件
````
    routes:[
        {
            path:'/',
            name:"home",
            component:home
        },
        {
            path:'/param/:sourceID(\\d)/:sourceTitle',
            component: Params
        },{
           path:'/backHome',
           redirect:'/' 
        }

    ]
````

redirect: 重定向传参
```
        routes:[
        {
            path:'/',
            name:"home",
            component:home
        },
        {
            path:'/param/:sourceID(\\d)/:sourceTitle',
            component: Params
        },{
           path:'/backHome',
           redirect:'/' 
        },
        {   
            //重定向到Params组件
            path: '/gohome/:sourceID(\\d)/sourceTitle',
            redirect:'/params/:source(\\d)/sourceTitle'
        }
    ]
```

### 设置mode 404页面处理
> 路由配置文件中，属性mode有两个值可以选，
1. history： 没有#
2. hash： 带有#

```
    
```
















### Vue-router 的两种模式主要依赖什么实现的

* hash 主要依赖location.hash来改动URL，达到不刷新跳转的效果。每次hash改变都会触发hashchange事件(来响应路由的变化，例如页面的更换)
* history主要利用了html5的history API来实现，用pushState and replaceState来操作浏览器记录栈



