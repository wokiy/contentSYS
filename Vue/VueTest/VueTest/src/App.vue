<template>
  <div id="app">
    <h1>智慧深汕地理信息系统-vue</h1>
    <router-view/>
    <!-- <v-chart class="my-chart" :options="bar"></v-chart> -->
  </div>
</template>

<script>

import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/bar";
export default {
  name: 'App',
  data(){
    return{
      bar: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  },
  components:{
    "v-chart":ECharts
  },
  methods:{

  }
  
}
</script>

<style lang="stylus"> 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; 
}
</style>
