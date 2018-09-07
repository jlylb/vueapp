<template>
  <div class='guide'>
    <mt-tab-container class="page-tab" v-model="active" swipeable>

      <mt-tab-container-item id="tab1" class='tab-item tab-item-first'>

					<div class="item-logo" style="background-color: #D74B28">
						<a href="#">
						盛世奈特
						</a>
						<div class="animate guide-show">
							<h2 class="animated bounceInDown">智能物联网</h2>
							<li class="animated bounceInLeft">大数据</li>
							<li class="animated bounceInRight">实时监控</li>
						</div>
					</div>
         
      </mt-tab-container-item>

      <mt-tab-container-item id="tab2" class='tab-item tab-item-second'>
         <!-- <img :src='guide3'> -->
         		<div class="item-logo" style="background-color: #02C1ED;">
						<a href="#">
						盛世奈特
						</a>
					<div id="tips-2" class="animate guide-show">
							<h2 class="animated bounceInDown">原生UI</h2>
							<li class="animated bounceInLeft">以iOS原生UI为基础</li>
							<li class="animated bounceInRight">补充Android特有样式</li>
					</div>
					
					</div>
      </mt-tab-container-item>

      <mt-tab-container-item id="tab3" class='tab-item tab-item-third'>
         <!-- <img :src='guide4'> -->
         	<div class="item-logo" style="background-color: #67C962;">
						<a href="#">
						盛世奈特
						</a>
					<div id="tips-2" class="animate guide-show">
							<h2 class="animated bounceInDown">流畅体验</h2>
							<li class="animated bounceInLeft">下拉刷新、转场动画</li>
							<li class="animated bounceInRight">整个世界都流畅了</li>
					</div>	
					</div>
      </mt-tab-container-item>

     <mt-tab-container-item id="tab4" class='tab-item tab-item-third'>
         <!-- <img :src='guide4'> -->
         	<div class="item-logo" style="background-color: #FCD208;">
						<a href="#">
						盛世奈特
						</a>
						<div class="animate">
							<mt-button id='close' type='danger'>立即体验</mt-button>
						</div>	
					</div>

      </mt-tab-container-item>

    </mt-tab-container>
    

  </div>
</template>

<script>
import guide2 from '@/assets/guide2.jpg';
import guide3 from '@/assets/guide3.jpg';
import guide4 from '@/assets/guide4.jpg';
export default {
  data() {
    return {
      active: 'tab1',
      guide2,
      guide3,
      guide4
    };
  },
  created() {
    this.$store.dispatch('app/giveGuide', true);
  }
}
</script>

<style lang='scss' scoped>
.guide,
.tab-item,
.page-tab {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
}

.guide /deep/ .mint-tab-container-wrap {
  height: 100%;
}

#close {
  position: absolute;
  width: 160px;
  left: 50%;
  margin-left: -80px;
  bottom: 15%;
  padding: 10px;
  color: #fff;
  border-color: #fff;
}
.item-logo {
  width: 100%;
  height: 100%;
  position: relative;
}
.item-logo a {
  width: 200px;
  height: 200px;
  display: block;
  border: 1px solid #ffffff;
  border-color: rgba(255, 255, 255, 0.5);
  text-align: center;
  line-height: 200px;
  border-radius: 50%;
  font-size: 40px;
  color: #fff;
  position: absolute;
  top: 15%;
  left: 50%;
  margin-left: -100px;
  text-decoration: none;
}
.animate {
  position: absolute;
  left: 0;
  bottom: 15%;
  width: 100%;
  color: #fff;
  display: -moz-box;
}
.animate h2 {
  text-align: center;
  margin-bottom: 20px;
}
.animate li {
  width: 50%;
  height: 30px;
  line-height: 30px;
  list-style: none;
  font-size: 16px;
  text-align: right;
}
.animate li:nth-child(3) {
  text-align: left;
  float: right;
}
.animated {
  -webkit-animation-duration: 1s;
  -webkit-animation-play-state: paused;
  -webkit-animation-fill-mode: both;
}
.guide-show .bounceInDown {
  -webkit-animation-name: bounceInDown;
  -webkit-animation-play-state: running;
  -webkit-animation-delay: 1s;
  display: block;
}
.guide-show .bounceInLeft {
  -webkit-animation-name: bounceInLeft;
  display: block;
  -webkit-animation-play-state: running;
}
.guide-show .bounceInRight {
  -webkit-animation-name: bounceInRight;
  display: block;
  -webkit-animation-play-state: running;
  -webkit-animation-delay: 0.5s;
}
@-webkit-keyframes bounceInDown {
  0%,
  60%,
  75%,
  90%,
  100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }
  75% {
    -webkit-transform: translate3d(0, -5px, 0);
    transform: translate3d(0, -5px, 0);
  }
  90% {
    -webkit-transform: translate3d(0, 3px, 0);
    transform: translate3d(0, 3px, 0);
  }
  100% {
    -webkit-transform: none;
    transform: none;
  }
}
@-webkit-keyframes bounceInLeft {
  0%,
  60%,
  75%,
  90%,
  100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(-3000px, 0, 0);
    transform: translate3d(-3000px, 0, 0);
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(25px, 0, 0);
    transform: translate3d(25px, 0, 0);
  }
  75% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }
  100% {
    -webkit-transform: none;
    transform: none;
  }
}
@-webkit-keyframes bounceInRight {
  0%,
  60%,
  75%,
  90%,
  100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    -webkit-transform: translate3d(3000px, 0, 0);
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    -webkit-transform: translate3d(-25px, 0, 0);
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
  90% {
    -webkit-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0);
  }
  100% {
    -webkit-transform: none;
    transform: none;
  }
}
</style>
