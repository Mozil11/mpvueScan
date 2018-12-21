<template>
  <div class="hello">
     <div v-show="src != '' " class="aa" ref="aa">
       <img :src='"http://life.microger.com:8086"+src' alt="" class="ia">
     </div>
     <div id="temp" style="display:none"></div>
     <div id="panel" ref="pan" v-show="daohangshow"></div>
     
     <div class="mune">
      <!-- <router-link :class="isgasact" to="/">
        内部加油站
      </router-link>
      <router-link :class="isenact" to="/energy">
        充电桩
      </router-link> -->
      <div>
        设备类型
        <el-radio-group  v-model="radio" @change="radiochange" class="lf">
          <el-radio label="1" >内部加油站</el-radio>
          <el-radio label="2">充电桩</el-radio>
        </el-radio-group>
        <div class="chong" @click="chongzhi">重置</div>
      </div>
      <div class="weizhi">
        位置信息
        <el-select v-model="value" placeholder="请选择" @change='selectchange' class="select lf" size='small' >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
          <el-select v-model="value1" placeholder="请选择" @change='selectchange1' class="select" size='small'>
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value2" placeholder="请选择" @change='selectchange2' class="select" size='small'>
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="sousuo" @click="gosearch">搜索</div>
      </div>
    </div>
    
      <div class="list">
        
        <div class="pai">
          <div>排列顺序:近--远</div>
        </div>
        <div>
          <div class="" v-for="(item, i) in liebiao"  :key="i" >
            <div class="lie"  :class="{'active':ind === i}" :id="i" @click="gotoplace(i)">
              <div class="na">{{item.deliveryPlaceName}}</div>
              <div class="xiangxidiqu" :class="{'active':ind === i}">{{item.area}}{{item.address}}{{item.sceneType}}</div>
              <div class="sousuo dao" @click="showdaohang" v-show="ind === i">{{daohangtext}}</div>
            </div>
            <el-collapse-transition>
              <div v-show="ind==i">
                <div class="tablelist"  v-if="tablelist >0">
                  <table>
                    <tr>
                        <th>设备名称</th>
                        <th>供应商</th>
                        <th>服务商</th>
                        <th>设备状态</th>
                        
                    </tr>
                    <template  v-for="(v,s) in list" >
                        <tr :key='s' @mouseover="showimg(s)" class="fff">
                            <td>{{v.oilgunName}}</td>
                            <td>{{v.name}}</td>
                            <td>{{v.deliveryPlaceName}}</td>
                            <td>{{status[v.oilStatus]}}</td>
                        </tr>
                    </template>
                    
                  </table>
                </div>
                <div class="nonelist" v-else>
                  <img src="./../../static/car.svg" alt="" class="svg">
                </div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </div>
       <div class="map">
         
        <div id="map"></div>
        <!-- <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center" :zoom=5>
            <el-amap-marker  :key='index' v-for="(marker, index) in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index" :template = "marker.template"></el-amap-marker>
             <el-amap-info-window  :position="currentWindow.position" :content="currentWindow.content" :visible="currentWindow.visible" :events="currentWindow.events"></el-amap-info-window>
        </el-amap> -->
      </div>
  </div>
</template>

<script>
// import Mapuse from './Map.vue'
import {getLngAndLat,getgaslist,nearfall} from './../http/http.js'
import remoteLoad from './../util/remoteLoad.js'
import $ from 'jquery'
let keyword,map;

export default {
  // components:{Mapuse},
  // components: {customMapSearchbox},
  data () {
    const self = this;
    return {
      daohangshow:false,
      daohangtext:'显示导航',
      activeIndex:0,
      province:null,
      city:null,
      district:null,
      isgasact:'ingas act',
      isenact:'pushenergy',
      radio:"1",
      value:'',
      options:[{
          value: '广东省',
          label: '广东省'
        },{
          value: '河南省',
          label: '河南省'
        },{
          value: '内蒙古自治区',
          label: '内蒙古自治区'
        },{
          value: '黑龙江省',
          label: '黑龙江省'
        },],
        value1:'',
      options1:[{
          value: '杭州',
          label: '杭州'
        },],
        value2:'',
      options2:[{
          value: '江干区',
          label: '江干区'
        },],
      distance:0,
      time:0,
      infoWindow:null,
      isshow:false,
      map:null,
      ind:0,
      liebiao:[],
      placeList:[],
      classb:'beijing',
      classj:'jinan',
      classs:'shanghai',
      classh:'hangzhou tabact',
      status:['空闲','加油中','占用中','维修','异常'],
      list:[],
      names:['杭州站','上海站'],
      num:0,
      center: [119.94377, 30.23879],
      resizeEnable: true,
      lng: 0,
      lat: 0,
      markers: [],
      windows: [],
      DistrictSearch:null,
      lists:[],
      src:'',
      tablelist:0,
      aaa:0,
      bbb:0,
      ttt:374
    }
  },

    created(){
     console.log(this.$route)
   if(this.$route.path == '/energy'){
     this.radio = '2'
   }else{
     this.radio = '1'
   }
 
 
   
  },
 mounted() {
       this.init()
    //  nearfall(0,116.379028,39.865042).then(res=>{
    //    console.log(res)
    //  })
    },
     
methods: {
  showdaohang(){
    this.daohangshow = !this.daohangshow
    if(this.daohangshow){

      this.daohangtext ='隐藏导航'
    }else{
      this.daohangtext ='显示导航'
    }
    // event.stopPropagation()
  },
  showimg(a){
    console.log(event)
    this.activeIndex = a;
    this.src = this.list[this.activeIndex].deviceBarcodeUrl
    this.ttt=event.clientY
    $(this.$refs.aa).css({
      'top':this.ttt,
      'left':352
    })
  },
  radiochange(e){
      console.log(e)
      if(e == '1'){
        this.$router.push({
            path: '/',
        })
      }else{
        this.$router.push({
            path: '/energy',
        })
      }
    },
     selectchange(e){
      this.province = e
      this.DistrictSearch.search(e,(status, result)=>{
        console.log(result)
        var options1 = []
        result.districtList[0].districtList.forEach(e=>{
          var city = {
            value: '',
            label: ''
          }
          city.value = e.name;
          city.label = e.name;
          options1.push(city)
        })
        this.options1 = options1
        this.center = result.districtList[0].center
      })
    },
    selectchange1(e){
      console.log(e)
      this.city = e
      this.DistrictSearch.search(e,(status, result)=>{
        console.log(result)
        var options2 = []
         result.districtList[0].districtList.forEach(e=>{
          var district = {
            value: '',
            label: ''
          }
          district.value = e.name;
          district.label = e.name;
          options2.push(district)
        })
        this.options2 = options2
        this.center = result.districtList[0].center
      })
    },
    selectchange2(e){
      console.log(e)
      this.district = e
      this.DistrictSearch.search(e,(status, result)=>{
        console.log(result)
        this.center = result.districtList[0].center
      })
    },
    chongzhi(){
      this.$router.go(0)
    },
    search(){
      AMap.service('AMap.DistrictSearch',()=>{
        this.DistrictSearch = new AMap.DistrictSearch({
          country:'中国',
          province:this.province,
          city:this.city,
          district:this.district
        })
        this.DistrictSearch.search('中国',(status, result)=>{
          console.log(result)
          var options = []

          result.districtList[0].districtList.forEach(e=>{
            var province = {
              value: '',
              label: ''
            }
            province.value = e.name
            province.label = e.name
            options.push(province)
          })
          this.options = options
          this.options1 = []
          this.options2 = []
        })
      })
    },
    gosearch(){

      this.map.setCenter(this.center)
      this.map.setZoom(10)
    },
        //初始化
        init(){

          this.map = new AMap.Map('map', {
              resizeEnable: true,
              zoom: 5,  
          })
          //工具条
           this.map.plugin(['AMap.ToolBar'],  ()=> {
            this.map.addControl(new AMap.ToolBar({
              'position':"RB"
            }))
           
          })
          this.map.plugin(['AMap.Geolocation'],  ()=> {
            let geolocation = new AMap.Geolocation({
              enableHighAccuracy: true, //  是否使用高精度定位，默认:true
              timeout: 1000, //  超过10秒后停止定位，默认：无穷大
              maximumAge: 0, // 定位结果缓存0毫秒，默认：0
              convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
              showButton: true, //  显示定位按钮，默认：true
              buttonPosition: 'LB',  // 定位按钮停靠位置，默认：'LB'，左下角
              buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
              showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
              panToLocation: true,  //  定位成功后将定位到的位置作为地图中心点，默认：true
              zoomToAccuracy: true  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            })
            this.map.addControl(geolocation)
            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', (result) => {
              console.log(result.position)
              this.lng = result.position.lng;
              this.lat = result.position.lat;
              this.map.setCenter(result.position)
              this.getmappaixu(this.lng,this.lat)
            })  //  返回定位信息
            AMap.event.addListener(geolocation, 'error', (result) => {
              console.log(result)
              this.getp()
            })  //  返回定位出错信息
          })


        console.log(this.markers)

          // 将创建的点标记添加到已有的地图实例：
         
          this.search()
          // 移除已创建的 marker
          // this.map.remove(this.markers);
        },
       noshow(){
          this.isshow = false
       },
       //排序
       getmappaixu(lng,lat){
         this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
            nearfall(0,lng,lat).then(res=>{
              console.log(res)
              let windows = []
              let markers = []
              let names = []
              this.center = [res.data.rows[0].longitude,res.data.rows[0].latitude]
              this.liebiao = res.data.rows
              res.data.rows.forEach((element,i )=> {
                let obj =  {
                      
                      position: [],
                      template: '',
                      visible: true,
                      events: {
                        
                      }
                    }
                  let obj1 = {
                    id:'',
                    num:'',
                    name:'',
                    position: [],
                      events: {
                        click: (e) => {
                          console.log(e.target.we.vid)
                            this.num = e.target.we.vid
                            this.getoillist(this.markers[this.num].id)
                            this.switchWindow(e.target.we.vid)
                        }
                      
                      },
                      visible: true,
                      draggable: false,
                      template: '<span>1</span>',
                  }
                obj1.id = element.id
                // this.getlists(element.id)
                obj1.num = i
                obj1.name = element.deliveryPlaceName
                obj1.position.push(element.longitude)
                obj1.position.push(element.latitude)
                obj.position.push(element.longitude)
                obj.position.push(element.latitude)
                obj.content = '<div><h4>'+element.deliveryPlaceName+'</h4></div>'
                names.push(element.deliveryPlaceName)
                var marker = new AMap.Marker(obj1)
                 marker.on('click', this.markerClick);
                marker.emit('click', {target: marker});
                windows.push(obj)
                markers.push(marker)
              });
              
              names.push('北京')
                names.push('济南')
                names.push('上海')
                names.push('杭州')
              this.names = names;
              this.windows = windows;
           
              this.currentWindow = this.windows[3];
              this.markers =markers;
              this.num = this.names.length-1
              // this.init() 
              this.infoWindow.setContent(this.markers[0].F.name);
               this.infoWindow.open(this.map, this.markers[0].getPosition());
                this.map.add(this.markers);
             this.map.setFitView();
             this.getoillist(this.markers[0].F.id)
            })
       },
        //获取点标记
        getp(){
           this.infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
            getLngAndLat(0).then(res=>{
              console.log(res)
              let windows = []
              let markers = []
              let names = []
              this.center = [res.data.rows[0].longitude,res.data.rows[0].latitude]
              this.liebiao = res.data.rows
              res.data.rows.forEach((element,i )=> {
                let obj =  {
                      
                      position: [],
                      template: '',
                      visible: true,
                      events: {
                        
                      }
                    }
                  let obj1 = {
                    id:'',
                    num:'',
                    name:'',
                    position: [],
                      events: {
                        click: (e) => {
                          console.log(e.target.we.vid)
                            this.num = e.target.we.vid
                            this.getoillist(this.markers[this.num].id)
                            this.switchWindow(e.target.we.vid)
                        }
                      
                      },
                      visible: true,
                      draggable: false,
                      template: '<span>1</span>',
                  }
                obj1.id = element.id
                // this.getlists(element.id)
                obj1.num = i
                obj1.name = element.deliveryPlaceName
                obj1.position.push(element.longitude)
                obj1.position.push(element.latitude)
                obj.position.push(element.longitude)
                obj.position.push(element.latitude)
                obj.content = '<div><h4>'+element.deliveryPlaceName+'</h4></div>'
                names.push(element.deliveryPlaceName)
                var marker = new AMap.Marker(obj1)
                 marker.on('click', this.markerClick);
                marker.emit('click', {target: marker});
                windows.push(obj)
                markers.push(marker)
              });
              
              names.push('北京')
                names.push('济南')
                names.push('上海')
                names.push('杭州')
              this.names = names;
              this.windows = windows;
           
              this.currentWindow = this.windows[3];
              this.markers =markers;
              this.num = this.names.length-1
              // this.init() 
              this.infoWindow.setContent(this.markers[0].F.name);
               this.infoWindow.open(this.map, this.markers[0].getPosition());
                this.map.add(this.markers);
             this.map.setFitView();
             this.getoillist(this.markers[0].F.id)
            })
            
        },
        //点标记点击事件
         markerClick(e) {
           console.log(e.target.F.id)
           console.log(e.target.F.name)
            this.infoWindow.setContent(e.target.F.name);
            this.infoWindow.open(this.map, e.target.getPosition());
            
        },
        gotoplace(e){
          this.src = ''
         this.map.clearMap();
              this.isshow = true
             this.ind = e;
             this.aaa = e;
             this.map.setCenter(this.markers[e].getPosition())
             this.infoWindow.setContent(this.markers[e].F.name);
              this.infoWindow.open(this.map, this.markers[e].getPosition());
            this.getoillist(this.markers[e].F.id)
          if(this.lng!=0){
               this.Driving([this.lng, this.lat],this.markers[e].getPosition())
            }else{
              this.Driving([116.379028, 39.865042],this.markers[e].getPosition())
            }
        },
       
      getoillist(a){
        // this.activeIndex = a;
        // console.log(this.activeIndex)
            getgaslist(a).then(res=>{
              console.log(res)
          this.list = res.data.rows
          this.tablelist=res.data.total
        })
      },
    
     
      Driving(start,end){
         var panel = this.$refs.pan; 
         
         panel.innerHTML = ''
        AMap.service(["AMap.Driving"],()=>{
          var driving = new AMap.Driving({
              map:this.map,
              panel: "panel",
              
          }); 
           // 根据起终点经纬度规划驾车导航路线
          driving.search(start, end,(status, result)=>{
              console.log(result)
              this.distance = result.routes[0].distance
              this.time = result.routes[0].time
          });
        })
      }
 
},
    
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#map{
  height: 100%;
}
 #panel {
            position: fixed;
            background-color: white;
            max-height: 60%;
            overflow-y: auto;
                top: 80px;
            right: 10px;
            width: 180px;
            z-index: 3;
        }


.hello{
  width: 100%;
  height: 100%;
  text-align: left;
  padding-bottom: 30px;
}
#container{
    height: 100%;
}
.nonelist{
  height: 200px;
  text-align: center;
  line-height: 200px;
}
.map{
  position: absolute;
  z-index: 0;
  width:100%;
  height:91%;
  /* float: left; */
}
.list{
  position: absolute;
   width: 362px;
   height: 600px;
   padding: 20px;
  /* float: left; */
  text-align: center;
  z-index: 1;
  top: 140px;
  padding-top: 60px;
  background: #fff;
  border:1px solid #999999;
  text-align: left;
  overflow-y: scroll;
  font-size: 14px;
}
.placename{
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  margin: auto;
  /* font-size: 20px; */

}
.tab{
  /* margin-left: 20px; */
  position: absolute;
   left: 20px;
  right: 0;
  margin:auto;
  /* font-size: 20px; */
  height: 80px;
  text-align: center;
  top: 10px;
  width: 501px;
}
.tab div{
  float: left;
  width: 108px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  background: #c4c8cc;
  border-radius: 5px;
  color: #fff;
  margin-top: 15px;
}
.tab .tabact{
  background:#137be2;
}
.jinan{
  margin-left: 15px;
  margin-right: 15px;
}
.hangzhou{
  margin-left: 15px;
}
.placelist{
  
  padding-left: 1px;
 

}
.bor{
    border: 1px solid #666666;
    height: 500px;
   position: relative;
}
.bor img{
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
margin: auto;
width: 150px;
}
table{
    width: 100%;
    /* border: 1px solid #333333; */
     border-collapse: collapse;
     text-align: center;
     background: #e7f4fd;
}
th{
  height: 60px;
  /* border: 1px solid #333333; */
  background: #f1f2f3;

}
td{
  /* border: 1px solid #333333; */
}
tr{
 /* position: relative; */
}

tr:nth-child(2n)  {
  background: #d2e8fc;
}
.aa{
  position: absolute;
      top: 374px;
    left: 352px;
  z-index: 2;

}
.ia{
  width: 100px;
  
}
.fff:hover{
  background: #409EFF;
}
.box{
  position: absolute;
    top: 10px;
      right: 10px;
      z-index: 2;
       width: 280px;
      
       
}
 .tip {
      background-color: #ddf;
      color: #333;
      border: 1px solid silver;
      box-shadow: 3px 4px 3px 0px silver;
    
     width: 280px;
      border-radius: 5px;
      overflow: hidden;
      line-height: 20px;
      z-index: 99;
  }
  .tip input {
      height: 25px;
      border: 0;
      padding-left: 5px;
      width: 280px;
      border-radius: 3px;
      outline: none;
  }
  .placeList{
    position: relative;
    
    padding: 10px;
  }
  .address{
    font-size: 13px;
    color: #999999;
  }
 .liebiao{
   margin-top: 3px;
    border-radius: 5px;
       background: #fff;
 }
 .ceng{
   position: absolute;
   width: 100%;
   height: 100%;
 }
 .na{
   padding-top: 10px;
   
 }
 .xiangxidiqu{
   padding-bottom: 10px;
   font-size: 13px;
   color: #999999;
   margin-top: 5px;
 }
 .lie{
   margin-top: 20px;
   border-radius: 5px;
   padding-left: 10px;
   position: relative;
 }
 .lie:hover{
   background: #deeafa;
 }

 
 .lie.active{
    background:#409EFF;
   color: #fff;
 }
 .active{
   /* background:#409EFF; */
   color: #fff;
 }
 .table{
   position: absolute;
   top: 212px;
   width: 400px;
   height: 478px;
   background: #fff;
   text-align: center;
       left: 182px;
    z-index: 2;
    border-radius: 5px;
    box-shadow:2px 2px 2px #c4c8cc;
    overflow-y: scroll;
  
 }
 
 .mune{
  padding-left: 15px;
   padding-right: 15px;
   padding-top: 15px;
  height: 90px;
  width: 372px;
  position: absolute;
  font-size: 14px;
  text-align: left;
  border: 1px solid #d1cece;
  background: #fff;
  z-index: 2;
}
.ingas,.pushenergy{
  position: absolute;
}
.ingas,.pushenergy{
  top: 0;
  bottom: 0;
  margin: auto;
  height: 60px;
  line-height: 60px;
  /* font-size: 25px; */
  background: #bdbbbb;
  color: #fff;
  border-radius: 40px;
  padding-left: 40px;
  padding-right: 40px;
}
a{

 text-decoration:none;
}
.ingas{
  left: 20px;
}
.pushenergy{
  left: 250px;
}
.act{
  background: #137be2;
}
.select{
  width: 95px;
}
.weizhi{
  margin-top: 20px;
}
.lf{
  margin-left: 10px;
}
.chong,.sousuo{
  position: absolute;
  width: 50px;
  border: 1px solid #409EFF;
  border-radius: 5px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  right: 25px;
}
.chong{
  color: #409EFF;
 top: 9px;
    right: 83px;
}
.sousuo{
  color: #fff;
  background: #409EFF;
      top: 9px;
    right: 24px;
}
.sousuo:active,.chong:active{
  background: #137be2;
}
.el-radio+.el-radio{
  margin-left: 15px;
}

.dao{
  top: 15px;
    width: 100px;
}
</style>
