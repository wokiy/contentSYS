<template>
    <div class="wrapper">
        <swiper :options="swiperOption" class="swiper-container" >
        <!-- slides -->
        <swiper-slide class="swiper-item" v-for='item of swiperList' :key='item.id'>
            <img class='swiper-img' :src='item.imgUrl' alt="去哪儿门票" />
        </swiper-slide>
        <!-- Optional controls ,显示小点-->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>

export default {
    name:'HomeSwiper',
    //es6的写法，相当于data:function(){return{swiperOption:{}}}
    data(){
        return{
            swiperOption:{
                // 参数选项,显示小点
                pagination:'.swiper-pagination',
                //循环
                loop:true,
                //每张播放时长3秒，自动播放
                autoplay:2000,
                //滑动速度
                speed:1000,
                // delay:1000
            },
            //三张轮播，使用变量循环
            swiperList:[
                {
                    id:'001',
                    imgUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2836251252,2114655683&fm=26&gp=0.jpg"
                },
                {
                    id:'002',
                    imgUrl:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3626904883,771466290&fm=26&gp=0.jpg"
                },
                {
                    id:'003',
                    imgUrl:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4255881298,331354941&fm=26&gp=0.jpg"
                }
            ]
        }
    },  
}
</script>
<style lang='stylus' scoped>
// >>>穿透作用，因为swiper-pagination-bullet-active类在组件内部定义的，想要wrapper也能作用到，可以用>>>
    .wrapper >>>.swiper-pagination-bullet-active
        background #fff !important
    .wrapper
        overflow:hidden
        width 100%
        height:0
        padding-bottom:26.6666667%
        background :#ccc
        .swiper-item
            width:100%
            .swiper-img
                width:100%
</style>
