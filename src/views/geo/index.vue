<template>
    <div class='layout-container'>
      <top-component></top-component>
      {{ addressInfo }}
      <mt-button size="large" type='primary' @click='getPos'>获取设备位置信息</mt-button>
      <mt-button size="large" type='primary' @click='watchPos'>监听设备位置信息</mt-button>
      <mt-button size="large" type='primary' @click='clearWatch'>停止监听</mt-button>
      <mt-button size="large" type='primary' @click='getGeocode'>获取定位信息</mt-button>
    </div> 
</template>

<script>
import { MessageBox } from 'mint-ui';

export default {
  data() {
    return {
      watchId: null,
      addressInfo: ''
    }
  },
  methods: {
  geoInf(position) {
    var str = "";
    str += "地址："+position.addresses+"\n";//获取地址信息
    str += "坐标类型："+position.coordsType+"\n";
    var timeflag = position.timestamp;//获取到地理位置信息的时间戳；一个毫秒数；
    str += "时间戳："+timeflag+"\n";
    var codns = position.coords;//获取地理坐标信息；
    var lat = codns.latitude;//获取到当前位置的纬度；
    str += "纬度："+lat+"\n";
    var longt = codns.longitude;//获取到当前位置的经度
    str += "经度："+longt+"\n";
    var alt = codns.altitude;//获取到当前位置的海拔信息；
    str += "海拔："+alt+"\n";
    var accu = codns.accuracy;//地理坐标信息精确度信息；
    str += "精确度："+accu+"\n";
    var altAcc = codns.altitudeAccuracy;//获取海拔信息的精确度；
    str += "海拔精确度："+altAcc+"\n";
    var head = codns.heading;//获取设备的移动方向；
    str += "移动方向："+head+"\n";
    var sped = codns.speed;//获取设备的移动速度；
    str += "移动速度："+sped;
    console.log(JSON.stringify(position));
    this.addressInfo = str
},
getPos() {
	console.log( "获取位置信息:" );
	plus.geolocation.getCurrentPosition( this.geoInf, ( e ) => {
		MessageBox.alert( "获取位置信息失败："+e.message );
	}, {geocode:false} );
},
watchPos() {
	if ( this.watchId ) {
		return;
	}
	this.watchId = plus.geolocation.watchPosition( ( p ) => {
		console.log( "监听位置变化信息:" );
		this.geoInf( p );
	}, function ( e ) {
		MessageBox.alert( "监听位置变化信息失败："+e.message );
	}, {geocode:false} );
},
clearWatch() {
	if ( this.watchId ) {
		console.log( "停止监听位置变化信息" );
		plus.geolocation.clearWatch( watchId );
		this.watchId = null;
	}
},
getGeocode(){
	console.log( "获取定位位置信息:" );
	plus.geolocation.getCurrentPosition( this.geoInf,  (e) => {
		MessageBox.alert( "获取定位位置信息失败："+e.message );
	},{geocode:true,provider:'amap'});
}
  }
}
</script>

<style lang='scss' scoped>
.layout-container /deep/ .mint-button {
  margin: 10px 0;
}
</style>
