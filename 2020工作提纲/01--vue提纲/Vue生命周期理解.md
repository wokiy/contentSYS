## Vue生命周期理解 (8个：beforeCreate Created beforeMount mounted beforeUpdate updated beforedestroy destroyed)
> Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。通俗说就是 Vue 实例从创建到销毁的过程，就是生命周期。

1. beforeCreate (创建前) new Vue 完成实例初始化，初始化非响应式变量| 数据观测 (data observer) 和 event/watcher 事件配置之前被调用|data computed watch methods上的方法和数据均不能访问

2. created :在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。可访问data computed watch methods上的方法和数据。然而，挂载阶段还没开始，$el 属性目前尚不可用。可以对data数据进行操作，可进行一些请求，请求不易过多，避免白屏时间太长。若在此阶段进行的 DOM 操作一定要放在 Vue.nextTick() 的回调函数中

3. berofeMount 在挂载开始之前被调用：相关的 render 函数首次被调用/有了el,编译了template|/outerHTML能找到对应的template,并编译成render函数

4. mounted 实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了。 如果根实例挂载到了一个文档内的元素上，当mounted被调用时vm.$el也在文档内。注意 mounted 不会保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用 vm.$nextTick： 可在这发起后端请求，拿回数据，配合路由钩子做一些事情；可以对DOM进行操作。

5. beforeUpdate 数据更新之前，可在更新前访问现有的DOM，如手动移除添加的事件监听。

6. updated 完成虚拟DOM的重新渲染和打补丁；组件DOM 已完成更新；可执行依赖的dom 操作注意：不要在此函数中操作数据，会陷入死循环的。

7. activated  //function  被keep-alive 缓存的组件激活时调用  || 在使用vue-router时有时需要使用<keep-alive></keep-alive>来缓存组件状态，这个时候created钩子就不会被重复调用了，如果我们的子组件需要在每次加载的时候进行某些操作，可以使用activated钩子触发

8. deactivated 被 keep-alive 缓存的组件停用时调用 /移除时候使用

9. beforeDestroy 实例销毁之前调用。在这一步，实例仍然完全可用。 在执行app.$destroy()之前,可以做一些删提示，可用于删除定时器，解绑全局事件 销毁插件对象

10. destroyed 当前组件已被删除，销毁监听事件 组件 事件 子实例也被销毁这时组件已经没有了，你无法操作里面的任何东西了。


#### 父子组件的生命周期

1. 仅当子组件完成挂载后，父组件才会挂载
2. 当子组件完成挂载后，父组件会主动执行一次beforeUpdate/updated钩子函数（仅首次）
3. 销毁父组件时，先将子组件销毁才会销毁父组件

##### 渲染优先级
> render函数 > template选项 > outerHTML





## 什么是vue的生命周期 
> Vue实例从创建到销毁的过程，就是生命周期。也就是从开始创建、初始化数据、编译模板、挂载DOM-渲染、更新-渲染、卸载等一系列过程=== vue生命周期。

## vue生命周期作用：
> (当然是开发按业务需求在不同vue生命周期中操作vue) Vue所有功能实现都是围绕着生命周期进行，生命周期的不同阶段的钩子函数可以实现组件的数据管理和DOM渲染两大重要功能。生命周期中多个事件钩子、控制着vue实例过程的逻辑形成。

## 第一次页面加载会触发哪几个钩子？
1. beforeCreate
2. created
3. beforeMount
4. mounted

## 简述每个周期具体适合哪些场景？

#### beforeCreate
1. 创建前，此阶段初始化之后，this指向创建实例，但是此时的观察事件机制都未形成，不能获取DOM节点 / data computed methods 上的方法和数据均不可访问 / 【可以在此处加个load事件】

2. created 创建后，此时实例已经创建，完成数据初始化依赖导入，可以访问data computed methods watch上的数据和方法。\ 可以在这个事件钩子发起异步求情(但是请求过多会出现白屏) \ 结束load事件 实现函数自执行。此时未挂载DOM，若此阶段进行DOM操作，一定要放在Vue.nextTick()的回调函数中。
 
#### beforeMount 
> 挂载前，虽然得不到具体的DOM元素. 但vue挂载的根节点已经创建，下面vue对DOM的操作将围绕这个根元素继续进行

_beforeMount这个阶段是过渡性的，一般一个项目只能用到一两次。_

#### mounted 
> 挂载 完成创建vm.$el和双向数据绑定
1. 完成挂载DOM和渲染，可在mounted钩子函数中对挂载的DOM进行操作。可在着发起后端请求，那会数据配合钩子函数做操作。

#### beforeUpdate 
> 数据更新前， 数据驱动DOM 

1. 可在更新前访问现有的DOM，如手动移出添加的事件监听器。

#### updated 

> 数据更新后，完成虚拟DOM的重新渲染和打补丁，组件DOM已完成更新，可执行依赖的DOM操作。



#### DOM渲染在哪一个周期完成 

> DOM渲染在mounted中就已经完成了。

```
    beforecreated：$el 和 data 并未初始化

    created:完成了 data 数据的初始化， $el 没有

    beforeMount：完成了 $el 和 data 初始化

    mounted ：完成挂载

    //用法
    beforecreate : 举个栗子：可以在这加个loading事件
    created ：在这结束loading，还做一些初始化，实现函数自执行
    mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
    beforeDestroy： 你确认删除XX吗？
    destroyed ：当前组件已被删除，清空相关内容

```