<template>
  <div class="parent">
      <div class="idea" id="idea" style="width:600px;height:400px;"></div>
      <div class="idea">
        <div class="linkTo">
          <router-link to="/svg">vue中如何使用SVG</router-link>
        </div>
      </div>
      <div class="idea">
        <div class="icon">
            <p>我就是阿里小图标</p>
            <i class="iconfont">&#xe633;</i>
        </div>
      </div>
      <div class="idea">
        <h1>antv f2 可视化</h1>
        <canvas id="myChart" width="230" height="180"></canvas>
      </div>
      <div class="idea">
          <p>vue项目中使用swiper实现无缝轮播图</p>
          <router-link to="/toSwiper">swiper实现</router-link>
      </div>
      <div class="idea">
        <h3>Vue中axios的封装</h3>
        <router-link to="toAxios">封装axios并获取公共api数据</router-link>
      </div>
  </div>
</template>

<script>
const F2 = require('@antv/f2/lib/index');
import './svg-draw';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello echarts'
    }
  },
  methods:{
    //f2
    dataChart() {
      const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

      const chart = new F2.Chart({
        id: 'myChart',
        pixelRatio: window.devicePixelRatio, // 指定分辨率
      });
      // load the data
      chart.source(data);
      // draw a column chart
      chart
        .interval()
        .position('genre*sold')
        .color('genre');
      chart.render();
    },
    //echarts 绘画方法
    drawChart() {
      //基于DOM(设置好宽高的元素) 初始化echarts 实例
      let myChart = this.$echarts.init(document.getElementById("idea"));
      //制定突变的配置项和数据
      let option ={
        //标题
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
      //显示图标
      myChart.setOption(option);
      }
    },
    mounted(){
      this.drawChart();
      this.dataChart();
    }
    
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .parent 
    display:flex
    flex-wrap:wrap
    justify-content center
    a
      text-decoration none
      color blue
    .idea
      flex:0 1 300px
      background #f8f8f8
      min-height 300px
      box-sizing:border-box
      border:1px solid seagreen
      padding :20px
      margin 20px

      .linkTo
        a
          text-decoration none
          color blue
          

</style>
