<template>
    <div class="container">
        智慧深汕地理信息系统
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,i) in pictures" :key="i">
                    <img :src="item.advertiseImages" alt="智慧图片">                        
                </div>    
            </div>    
        </div>   
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    data(){
        return{
            pictures:[
                {advertiseImages:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1578470052&di=399096f8150a5fb74e38871d943b4c16&src=http://wx1.sinaimg.cn/large/00678MACly1fvemwkyp9rj30dc07igt7.jpg'},
                {advertiseImages:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1578470052&di=399096f8150a5fb74e38871d943b4c16&src=http://wx1.sinaimg.cn/large/00678MACly1fvemwkyp9rj30dc07igt7.jpg'},
                {advertiseImages:''}
            ]
        }
    },
    mounted() {
        var mySwiper = new Swiper(".swiper-container", {
            direction: "horizontal",
	    	loop: false,
	    	slidesPerView: "auto",
	    	centeredSlides: true,
	    	spaceBetween: 20,
	    	observer: true,
	    	observeParents: true
		});

    }
}
</script>

<style scoped lang="stylus">
.swiper-container
    margin-top crem(40)
    width crem(750)
    height crem(850)
    margin-bottom crem(53)
    overflow visible!important
.swiper-container .swiper-wrapper .swiper-slide
    width crem(620)
    border-radius crem(20)
.swiper-container .swiper-wrapper .swiper-slide img
    width 100%
    height 100%
    border-radius crem(20)
.swiper-container .swiper-wrapper .swiper-slide-prev
    margin-top crem(18)
    height crem(810)!important
.swiper-container .swiper-wrapper .swiper-slide-prev img
    height crem(810)!important
.swiper-container .swiper-wrapper .swiper-slide-next
    margin-top crem(18)
    height crem(810)!important
.swiper-container .swiper-wrapper .swiper-slide-next img
    height: crem(810)!important
.swiper-container .swiper-wrapper .swiper-slide-active
    width: crem(620)
.swiper-pagination
    bottom: crem(-30)!important
// crem 为项目配置rem的全局计算方法

</style>