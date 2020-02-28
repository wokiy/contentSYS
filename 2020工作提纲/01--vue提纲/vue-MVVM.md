# 对于MVVM的理解？
> MVVM拆开来即为Model-View-ViewModel view代表视图层、模板、负责将数据模型转为UI展示，model代表 模型、数据可以在model层中定义数据修改和操作的业务逻辑。viewmodel层连接model和view.

> 在mvvm的架构下，view 和model没有直接联系，通过viewmodel层进行交互， viewmodel层通过双向数据绑定将 view和model连接起来，使得view 和 model 层同步完全自动的。因此开发者只需要关注业务逻辑 无需动手操作dom，复杂的数据维护状态交付给mvvm统一管理

//MVVM架构在vue.js中的实践
````
    // View视图层

     <template>
        <div class="View">
            <input v-model="title"/>
            <button @click="add">submit</buttom>
            
            <ul>
                <li v-for="(item,index) in modeList" :key="index">{{item}}</li>
            </ul>
        </div>
    </template>

    <script>
        export default{

            //  Model 层

            data(){
                return {
                    title: '',
                    modelList:[]
                }
            },

            // ViewModel层

            methods:{
                add(){
                    this.modelList.push(this.title);
                    this.title = '';
                }
            }
        }
    </script> 

````

### MVVM的原理
> Vue ：数据劫持.对数据(model)进行劫持，当数据变动时，数据会发初劫持时的方法，对view进行更新。 viewModel双向数据绑定 响应式

1. 解析模板
2. 解析数据
3. 绑定模板与数据


> Vue数据劫持，采用Object.defineProperty的getter \setter。结合观察者模式来实现数据绑定。js对象传递给vue实例作为它data中的属性时，vue会遍历它的属性，用 Object.defineProperty 将赋予他们set get ，在vue内部让vue追踪依赖，当属性被访问和修改时，通知变化。


```
    new MVVM()  1A->Observer(劫持监听所有属性) -> (通知变化)Dep消息订阅器统一调配 -> (假设mode数据变化) Dep必须通知订阅者 Watch -> 执行Watch中 update方法 (更新视图)

    new MVVM() 1B-> Compile（编译模板:编译 v-model v-bind {{message}}等元素模板）->初始化view视图层。(并且被Watch添加订阅)| -> （模板数据改变）->watch调用update方法 更新model数据和视图。

```
1. Observer：数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用Object.defineProperty的getter和Setter来实现的

2. Compile：模板编译：它的作用对每个元素节点的指令和文本节点进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。

3. Watcher：订阅者，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数

4. Dep：消息订阅器，内部定义了一个数组，用来收集订阅者（Watcher），数据变动触发notify函数，再调用订阅者的update方法。


> 分析上图：当执行new Vue()时，Vue就进入了初始化阶段，一方面Vue会遍历data选项中的属性，并用Object.defineProperty将它们转换为getter/setter，实现数据变化监听功能；另一方面，Vue的模板编译Compile对元素节点的指令和文本节点进行扫描和解析，初始化视图，Object.defineProperty在get钩子中addSub订阅Watcher并添加到消息订阅器（Dep）中，初始化完成。
当数据发生变化时，Observer中的setter方法被触发，setter会立即调用Dep.notify()，Dep开始遍历所有的订阅者，并调用订阅者的update方法，订阅者收到通知后对视图进行相应的更新。



### Proxy 相比于 defineProperty 的优势
> Object.defineProperty() 的问题主要有三个
1. 不能监听数组变化
2. 必须遍历对象的全部属性
3. 必须深层次遍历嵌套对象

> Proxy在ES2015规范加入
1. 针对对象：针对整个对象，而不是对象的某个属性，所以不需要对key进行遍历。解决了Object.definePropety()必须遍历对象的所有属性

2. 支持数组：Proxy不需要对数组的方法进行重载

3. Proxy的第二个参数有13种拦截方法

4. Proxy作为新标准受到浏览器厂商重点关注和性能优化。

