## vue-component 组件通信记录点

## 父到子 (props)

> 子组件再props中创建一个属性，用以接受父组件传递过来的值。父组件中注册子组件。再子组模板标签中添加props中创建的属性->把需要传递给子组件的赋值给该属性。

1. 父组件
```
    //father

      <template>
        <div class="wokiy-father">

        </div>
     </template0>  

     <script>
        import child1 from "xxxxx";
        export default{
            data(){
                return{

                }
            },

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



