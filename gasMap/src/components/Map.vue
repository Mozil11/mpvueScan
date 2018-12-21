<template>
    <div class="map">
        <div id="container"></div>
    </div>
</template>
<script>
import remoteLoad from './../util/remoteLoad.js'
export default {
    data(){
        return{
            AMapUI:null,
            AMap:null,
            getLng:0,
            getLat:0,
            map:null
        }
    },

  
    async created(){
        // 已载入高德地图API，则直接初始化地图
        if (window.AMap && window.AMapUI) {
            this.initMap()
        // 未载入高德地图API，则先载入API再初始化
        } else {
            await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=931b600e273192d0e475d3491c018880`)
            await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
            this.initMap()
        }        
    },
    methods:{
        initMap(){
        // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
        let AMapUI = this.AMapUI = window.AMapUI
        let AMap = this.AMap = window.AMap
        var map, geolocation;
        //加载地图，调用浏览器定位服务
        map = new AMap.Map('container', {
            resizeEnable: true,
             zoom: 13
        });
        this.map = map
        map.plugin('AMap.Geolocation', ()=> {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', this.onComplete);//返回定位信息
            // AMap.event.addListener(geolocation, 'error', this.onError);      //返回定位出错信息
             console.log(this.getLng)
           
        });
          
          
        },
     //解析定位结果
        onComplete(data) {
            var str=['定位成功'];
            var map, geolocation;
            this.getLng = data.position.getLng()
             console.log(this.getLng)
            this.getLat = data.position.getLat()
             this.getLngAndLat(this.map,this.AMap)
            str.push('经度：' + data.position.getLng());
            str.push('纬度：' + data.position.getLat());
            if(data.accuracy){
                str.push('精度：' + data.accuracy + ' 米');
            }//如为IP精确定位结果则没有精度信息
           
        },
        getLngAndLat(m,A){
            let AMap = A
            let map = m
            var markers = [{
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png',
                position: [this.getLng, this.getLat]
            }, {
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b2.png',
                position: [116.368904, 39.913423]
            }, {
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
                position: [116.305467, 39.807761]
            }];
            // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
            markers.forEach((marker)=> {
               
                new AMap.Marker({
                    map: map,
                    icon: marker.icon,
                    position: [marker.position[0], marker.position[1]],
                    offset: new AMap.Pixel(-12, -36)
                });
            });
        }
    },
    
}
</script>
<style scoped>
.map{
    width: 100%;
    height: 500px;
}
#container{
    height: 100%;
}
</style>

