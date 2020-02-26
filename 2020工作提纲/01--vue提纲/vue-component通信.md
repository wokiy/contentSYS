## vue-component 组件通信记录点 1

### 父到子 (props)

> 子组件再props中创建一个属性，用以接受父组件传递过来的值。父组件中注册子组件。再子组模板标签中添加props中创建的属性->把需要传递给子组件的赋值给该属性。

1. 父组件
```
    //father ：在引入的子组件 v-bind动态绑定指令 :wokiyProp动态绑定属性
      <template>
        <div class="wokiy-father">
            <child1 :wokiyProp="toChild"></child1>    
        </div>
     </template0>  
     <script>
        import child1 from "xxxxx";
        export default{
            data(){
                return{
                    toChild:'father to son message!!!! 小金鱼'    
                }
            },
            //父组件中注册子组件
            components:{
                child1
            }
        }
    
```

2. 子组件

```
    //child
    <template>
        <div class="wokiy">
            展示父组件传递的数据: {{wokiyProps}}
        </div>
     </template0>      
    <script>
        export default{
            data(){
                return {
                    brother: ''
                }
            },
            //属性接受
            props:{
                wokiyPorps:{
                    type: String 
                    default:'hello wokiy demo'
                }
            }
        }
     
```

###  子组件->父组件传递数据
> 子组件向父组件传递数据：需要自定义事件 | 子组件中需要以某种方式例如：点击事件的方法来触发一个自定义事件 | 将需要传递的值作为$emit的第二个参数，将该值作为实参传递给自定义事件的方法 | 在父组件中注册子组件并在子组件中绑定自定义事件的监听

```
    //父组件
    <template>
        <div class="wokiy-wrap">
            <child2 :wokiyProp1 @myEvent(myEvent)></child2>
            <p>{{getFromSon}}</p>
        </div>
    </template>

    <script>
        import child2 from "xxxx";
        export default{
            data(){
                return{
                    wokiyProp:"to my son 小金鱼",
                    getFromSon:''
                }
            },
            //注册子组件
            components:{
                child2
            },
            methods:{
                myEvent(obj){
                    //obj形参接受子组件中自定义的事件的$emit('myEvent','实际参数')
                    this.getFromSon = obj.message;
                }
            }
        }
    </script>
```

```
    //子组件 : 在子组件中添加自定义事件，在methods{//添加事件编写 $emit('父组件事件名',传递的参数)}
    <template>
        <div class="wokiy">
            展示父组件传递的数据: {{wokiyProps1}}

            <div>
                <button @click="doSomething">给父组件传递信息</button>
            </div>
        </div>
     </template>      
    <script>
        export default{
            data(){
                return {
                    brother: ''
                }
            },
            //属性接受
            props:{
                wokiyPorps1:{
                    type: String 
                    default:'hello wokiy demo'
                }
            },
            methods:{
                doSomething(){
                    this.$emit('myEvent',{message: 'son(小金鱼) to wokiy'})
                }
            }
        }

```
 

### 非父子组件的传递数据

> 新建一个eventBus.js, 实例化vue,这个实例就承担起组件之间的通信桥梁===[中央事件总线] | 给每个子组件绑定一个方法(触发时候发布 evenyBus),在子组件做一个订阅的监控-触发在created里的方法执行。

_组建的通信都有一个共同点:中间介质_
1. 子->父 中间介质是自定义事件
2. 父->子 中间介质是props中的属性
3. 非父组件的介质是 中央事件总线

//eventBus.js
```
    import Vue from "vue"
    exporet default new Vue();

```


```
    //child3
    <template>
        <div class="child3>
            <button  @click="toBrother">to child4 for some  message</button>
        </div>
    </template>
    <script>
        import $bus from "xxxxxx/eventBus"
        export default {
            data(){
                return{
                }
            },
            //事件发布数据变化
            methods:{
                toBrother(){
                    $bus.$emit('myEvent','hello my brother');
                }
            }
            
        }
    </script>

```

```
    //child4
    <template>
        <div class="child4">
            <h4>{{brotherMessage}}</h4>
        </div>
    </template>
    <script>
        import $bus from 'xxxx/eventBus'
        export default {
            data() {
                return {
                    brotherMessage:''
                }
            },
            //在created中些订阅监听事件数据变化
            created(){
                $bus.$on('myEvent',(brotherMessage)=>{
                    this.brothMessage = brotherMessage;
                })
            }
        }
    </script>
```

# ----------------------------------------------------------------

# vue中几种通信方式
> VUE贯彻数据驱动视图更新的前端渐进式框架，在vue中组件的数据通信直接影响数据驱动的效果。组件有父子、子父、兄弟、隔代、非直系亲属、、、、、

1. 父子组件的通信
2. 非父子组件之间的数据通信

### props / $emit 方式
> 父组件通过props向子组件传递数据，而子组件可以通过$emit事件作为介质向父组件传递数据通信

###### 父组件向子组件 
> 父组件向子组件传递一个数组数据[] 

```
    /*父组件*/
    <template>
        <div class="section">
            <com-article :article="articleList"></com-article>
        </div>
    </template>
    <script>
        import comArticle from 'xxxxx/article.vue'
        export default {
            data() {
                return {
                    articleList:['数据部','系统部','总师室']
                }
            }
        }
    </script>

    //===========================================================
    //子组件
    
    <template>
        <div>
            <span v-for="(item,index) in articleList" :key="index">{{item}}</span>
        </div>    
    <template>
    <script>
        export default {
            data() {
                retrun {
                    
                }
            },
            props:['articles']
        }
    </script>

```
> Props 只可以从上一级组件传递给下一级组件即【父子组件】/ 组件的单向数据流、props是只读，不可被修改【修改警告和失效】

##### 子组件向父组件 ($emit)

> $emit的理解是 $emit绑定一个自定义事件 this.$emit('muEvent',"arg"); 参数arg会以事件实参的方式传递给父子组件。父组件通过v-on/@监听绑定的组件事件并接受参数，

```
    /*父组件*/
    <template>
        <div class="section">
            <com-article :article="articleList" @onEmitIndex="onEmitIndex">

            </com-article>

            <h3>{{}}</h3>

        </div>
    </template>
    <script>
        import comArticle from 'xxxxx/article.vue'
        export default {
            data() {
                return {
                    articleList:['数据部','系统部','总师室'],
                    emitIndex:-1
                }
            },
            methods:{
                onEmitIndex(index) {
                    this.emitIndex = index;
                }
            }
        }
    </script>

    //===========================================================
    //子组件
    
    <template>
        <div>
            <span v-for="(item,index) in articleList" :key="index" @click="emitIndex(index)">{{item}}</span>
            
        </div>    
    <template>
    <script>
        export default {
            data() {
                retrun {
                    
                }
            },
            props:['articles'],
            methods:{
                emitIndex(index){
                    this.$emit('onEmitIndex',index);
                }
            }
        }
    </script>
```

##### 事件总线 eventBus
> 在 vue中可以使用eventBus组为组件之间沟通的桥梁。就像所有组件所共有相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都是可以通过这个介质通知其他组件。

_eventBus当项目较大，就容易造成难以维护的灾难_

1. 初始化 event-bus.js
```
    //创建一个事件总线
    import Vue from 'vue';
    export const EventBus = new Vue();
```

2. 发送事件
> 两个兄弟组件 addNum.vue 和 showNum.vue 

```
    <template>
        <div>
            
        </div>
    </template>

    <script>

    </script>    

```
