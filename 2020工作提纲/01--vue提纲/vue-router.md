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
    routes:[
        {
            path:'*',
            component:Error
        }
    ]
```
//Error.vue 404页面
```
    <template>
        <div class="ErrorPage">
            <h2>{{msg}}</h2>
            <h2>页面不存在！！！！</h2>
        </div>
    </template>
    <script>
        export default {
            data() {
                return {
                    msg:"ERROR 404"
                }
            }
        }
    </script>
    <style scope lang="less">

    </style>
```


### 有哪几种导航守卫
* 全局守卫
* 路由独享守卫
* 路由组件内的守卫

###### 全局守卫 (三个全局)
1. router.beforeEach 全局前置守卫 进入路有前
2. router.beforeResolve 全局解析守卫 在 beforeEnter 调用之后调用
3. router.afterEach 全局后置钩子 进入路由之后

使用方法： 
```
    //main.js
    import router from './router'; // 引入路由
     router.beforeEach((to, from, next) => { 
      next();
    });
    router.beforeResolve((to, from, next) => {
      next();
    });
    router.afterEach((to, from) => {
      console.log('afterEach 全局后置钩子');
    });

```

###### 路由独享守卫 
不想全局配置守卫的话，可以某些路由单独配置守卫

```
    const router = new VueRouter({
        routes:[
            {
                path:'/wokiy',
                component: Wokiy,
                beforeEnter:(to,from,next) =>{
                    //调用顺序在全局守卫后面，不会被全局守卫覆盖
                }
            }
        ]
    })
```

###### 路由组件内的守卫

1. beforeRouteEnter 进入路由前, 在路由独享守卫后调用 不能获取组件实例 this，组件实例还没被创建

2. beforeRouteUpdate (2.2) 路由复用同一个组件时, 在当前路由改变，但是该组件被复用时调用 可以访问组件实例 this

3. beforeRouteLeave 离开当前路由时, 导航离开该组件的对应路由时调用，可以访问组件实例 this









### vue-router的编程式导航

```
    <div>
        <button @click="goGo">前进</button>
        <button @click="goBack">后退</button>
        <button @click="goHome">返回首页</button>
    </div>

    //......
    methods:{
        goGo(){
            this.$router.go(1);
        },
        goBack(){
            this.$router.go(-1)
        },
        goHome() {
            this.$router.push({path:'/'});
        }
    }


```


====================================================================


## 细节知识

### Vue-router 的两种模式主要依赖什么实现的

* hash 主要依赖location.hash来改动URL，达到不刷新跳转的效果。每次hash改变都会触发hashchange事件(来响应路由的变化，例如页面的更换)
* history主要利用了html5的history API来实现，用pushState and replaceState来操作浏览器记录栈



### this.$router和this.$route
* this.$router: router实例。
* this.$route: 当前激活的路由信息对象，这个属性是只读的，里面的属性是（不可变）的，不过你可以watch（监测变化）属性变化。

> 当vue实例通过 $router 、$routes属性访问路对象和路由信息对象时，实际访问的是根vue实例的_router、_route属性.


### 怎么定义动态路由
> 一个'路劲参数'使用冒号 ':' 标记。 当匹配到一个路由时，参数值会被设置到 this.$router.params. 可以在每个组件内使用，我们可以更新User的模板，输出当前用户ID；

```
    const User = {
        template: '<div>User {{this.$route.params.id}}</div>'
    }

    const router = new VueRouter({
        routes:[
            //动态路由路径参数 以冒号开头
            {path:'/user/:id',component: User}
        ]
    })
```

### 嵌套路由怎么实现

> 在user 路由下添加，children 属性，并且配置上子级跌幅 path 和 component

```
    const router = new VueRouter({
    routes: [
        { path: '/user/:id', component: User,
        children: [
            {
            // 当 /user/:id/profile 匹配成功，
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: 'profile',
            component: UserProfile
            },
            {
            // 当 /user/:id/posts 匹配成功
            // UserPosts 会被渲染在 User 的 <router-view> 中
            path: 'posts',
            component: UserPosts
            }
        ]
        }
    ]
    })

    //在 User 组件内，添加 router-view 组件，以备子路由组件的填充


    const User = {
    template: `
        <div class="user">
        <h2>User {{ $route.params.id }}</h2>
        <router-view></router-view>
        </div>
    `
    }

```



