## vue-router 面试点

### Vue-router 的两种模式主要依赖什么实现的

* hash 主要依赖location.hash来改动URL，达到不刷新跳转的效果。每次hash改变都会触发hashchange事件(来响应路由的变化，例如页面的更换)
* history主要利用了html5的history API来实现，用pushState and replaceState来操作浏览器记录栈



