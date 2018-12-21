<template>
<div>

  <div class="container" v-if="isready">
    <div class="head">
      <div class="touxiang">
        <img src="/static/touxiang.jpeg" alt="">
      </div>
      <div class="miaoshu">
        <div>您好，{{data.username}}</div>
        <div>{{data.mobile}}</div>
      </div>
      
    </div>
    <div class="main">
      <div class="gasplace">{{data.deliveryPlaceName}}</div>
      <div class="inplace">{{data.placementPoint}}</div>
      <div class="huowu">
        <template v-if="data.diviceType==0">
          <img src="/static/huowu.png" alt="">
        </template>
        <template v-else>
          <img src="/static/chongdian.png" alt="">
        </template>
      </div>
      <div class="jieshao">
        <div class="gasname">{{data.oilquality}}</div>
        <template v-if="data.diviceType==0">

        <div class="price">{{data.oilprice}}元/升</div>
        </template>
        <template>
          <div class="price">{{data.oilprice}}元/度</div>
        </template>
        <div class="shibiema">设备识别码</div>
        <div class="number">{{deviceNumber}}</div>
      </div>
    </div>
    <div class="dosomething">
      <radio-group class="radio-group" @change="radioChange">
        <label :class="'radio'+i" v-for="(item,i) in items" :key="i">
          <radio :value="item.value" :checked="item.checked"/>{{item.name}}
        </label>
      </radio-group>
      <input type="text" class="inp" @change="inputchange"/>
      <span class="yuan">元</span>
    </div>
    <div class="kaishi" @click="start">
      开始加油
    </div>
  </div>
  <div v-else>
    <div v-if="jiazai">
      <img src="/static/ceshi.svg" alt="" class="ceshi">
      <div class="cont">
        <img src='/static/heng.svg' alt="" class="heng r">
        <span class="tet">服务升级中</span>
        <img src='/static/heng.svg' alt="" class="heng l">
      </div>
      <div class="foote">
        <img src='/static/fuwu.svg' alt="" class="fuwu">
        <span class="kefu">客服电话 </span>
        <span class="tel" @click="callnumber">182-0480-5392</span>
      </div>
    </div>
    <div v-else>
      <div class="loadbox">
        <img src="/static/loading.svg" alt="" class="loading">
      </div>
      <div class="jiazai">加油中</div>
    </div>
	</div>
</div>
</template>

<script>
let type=1,number
import{getQueryString}from './../../utils/index.js'
export default {
  data () {
    return {
      data:{},
     deviceNumber:0,
    
     isready:true,
     jiazai:false,
     number:null,
     type:1,
     items:[
       {name:'加满',value:1,checked:true},
       {name:'金额',value:2}
     ]
    }
  },
 methods:{
   inputchange(e){
     if(type ==1){
    
       }else{

         number = e.target.value
         console.log(e.target.value)
       }
   },
 radioChange(e) {
    // console.log(e.target.value)
   type = e.target.value
  },
  start(){
    this.number = number;
    this.type = type;
    this.isready = false;
    this.jiazai = false;
    if(this.type == 1){
      wx.setStorageSync('diviceType',this.data.diviceType)
      wx.setStorageSync('price',200);
       wx.setStorageSync('oilprice',this.data.oilprice);
       wx.setStorageSync('deliveryPlaceName',this.data.deliveryPlaceName)
       wx.setStorageSync('oilquality',this.data.oilquality)
       wx.setStorageSync('placementPoint',this.data.placementPoint)
        wx.setStorageSync('username',this.data.username)
        wx.setStorageSync('enterprise',this.data.enterprise)
       setTimeout(()=>{

         this.startOil(200/this.data.oilprice,200,this.data.username,this.data.oilprice)
       },1000)
    }else{
      wx.setStorageSync('diviceType',this.data.diviceType)
       wx.setStorageSync('price',this.number);
        wx.setStorageSync('oilprice',this.data.oilprice);
       wx.setStorageSync('deliveryPlaceName',this.data.deliveryPlaceName)
       wx.setStorageSync('oilquality',this.data.oilquality)
         wx.setStorageSync('placementPoint',this.data.placementPoint)
          wx.setStorageSync('username',this.data.username)
          wx.setStorageSync('enterprise',this.data.enterprise)
       setTimeout(()=>{

         this.startOil(this.number/this.data.oilprice,this.number,this.data.username,this.data.oilprice)
       },1000)
    }
    
  },
  //扫码获取信息
  // getdeviceInfo(){
  //   wx.request({
  //     url:'https://life.microger.com:8085/api/v2/pay/selectDevice?deviceNumber='+this.deviceNumber,
  //     // url:'http://169.254.14.18:8086/api/v2/pay/selectDevice?deviceNumber='+this.deviceNumber,
  //     type:'GET',
     
  //     success:res=>{
  //       console.log(res)
  //     }
  //   })
  // },
  //开启设备
  openDevice(){
    wx.request({
      url:'https://life.microger.com:8085/api/v2/pay/updateStatus?deviceNumber='+this.deviceNumber,
      // url:'http://169.254.14.18:8086/api/v2/pay/selectDevice?deviceNumber='+this.deviceNumber,
      type:'GET',
     
      success:res=>{
        console.log(res)
        this.data = res.data
      }
    })
  },
  //开始加油
  startOil(amount,money,userName,Oilprice){
    wx.request({
      url:'https://life.microger.com:8085/api/v2/pay/updateDeviceStatus',
      // url:'http://169.254.14.18:8086/api/v2/pay/selectDevice?deviceNumber='+this.deviceNumber,
      type:'GET',
     data:{
       deviceNumber:this.deviceNumber,
       purchaseAmount:amount,
       amountOfConsumption:money,
       userName:userName,
       Oilprice:Oilprice
     },
      success:res=>{
        console.log(res)

        wx.redirectTo({
						url:'./../logs/main'
			})
      }
    })
  }
 },

 

  created () {
    // 调用应用实例的方法获取全局数据
    this.isready = true;
    this.jiazai = false;
    this.deviceNumber = wx.getStorageSync('deviceNumber')
  },
 
  mounted(){

   

  },
  
  onLoad(options){
        
  this.isready = true;
    this.deviceNumber = wx.getStorageSync('deviceNumber')
    if(this.deviceNumber==''){
      wx.showModal({
        title:'提示',
        content:'请扫描设备二维码',
        success:(res)=>{
          console.log(res)
          if (res.confirm) {
        console.log('用户点击确定')
        wx.redirectTo({
          url:'./../searchCode/main'
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
          
        }
      })
    }else{
      // this.getdeviceInfo();
      this.openDevice();
    }
  }
}
</script>

<style scoped>
.head{
   height: 60px;
  width: 96%;
  margin: auto;
  background: #fff;
  border: 1px solid #666666;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  text-align: center
}
.main{
  width: 96%;
  margin: auto;
  background: #fff;
  border: 1px solid #666666;
 padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
}
.touxiang,.miaoshu{
  display: inline-block;
  vertical-align: middle;
 
}
.touxiang img{
  width: 60px;
  height: 60px;
  vertical-align: middle;
  border-radius: 50%;
}
.miaoshu{
  font-size: 15px;
  color: #333333;
  margin-left: 20px;

}
.gasplace{
  margin-top: 10px;
  font-size: 15px;
   padding-left: 10px;
  padding-right: 10px;
}
.inplace{
  margin-top: 10px;
   font-size: 14px;
    padding-left: 10px;
  padding-right: 10px;
}
.huowu,.jieshao{
  margin-top: 10px;
  float: left;
}
.huowu img{
width: 150px;
height:150px ;
}
.jieshao{
  font-size: 15px;
  margin-left: 10px;
}
.gasname,.price,.shibiema,.number{
margin-top: 10px;
}
.shibiema{
  margin-top: 25px;
}
.gongsi{
  float: right;
   font-size: 15px;
  color: #333333;
  border-left: 1px solid #333333;
   margin-top: 10px;
   padding-left: 10px;
   margin-right: 10px;
}
.dosomething{
  height: 80px;
  line-height: 80px;
  margin-top: 20px;
  width: 96%;
  text-align: center;
}
.radio-group{
  display: inline-block;
}
.kaishi{
  height: 45px;
  width: 90%;
  background: #3399ff;
  color: #fff;
  line-height: 45px;
  text-align: center;
  border-radius: 5px;
  margin: auto;
  margin-top: 20px;
}
.radio0,.radio1{
  font-size: 15px;
}
.radio0{
  margin-right: 80px;
}
.inp{
  width: 50px;
  background: #fff;
  display: inline-block;
  margin-left: 7px;
  margin-right: 7px;
  vertical-align:middle;
  border: 1px solid #666666;
}
.yuan{
  font-size: 15px;
}
.pic0{
  top: 230rpx;
}
.content0{
  margin-top: 0;
}
.ceshi{
  width: 113rpx;
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  margin: auto;
}
.tet,.heng{
  display: inline-block;
}
.heng{
  width: 72rpx;
  height: 8rpx;
  vertical-align:middle;
}
.cont{
  height: 60rpx;
  line-height: 60rpx;
  font-size: 16px;
  color: #666666;
  position: absolute;
  top: 225px;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
}
.r{
  margin-right: 10px;
}
.l{
  margin-left: 10px;
}
.foote{
  height: 60rpx;
  line-height: 60rpx;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
}
.fuwu{
  height: 36rpx;
  width: 33rpx;
  vertical-align: middle;
  margin-right: 5px;
}
.kefu{
  color: #999999;
  font-size: 13px;
}
.tel{
   font-size: 13px;
   color: #3399ff;
}
.jiazai{
  color: #999999;
  font-size: 15px;
  text-align: center;

}
.loadbox{
  text-align: center;
  height: 200px;
  position: relative;
}
.loading{
  width: 60px;
  position: absolute;
 animation: rote 3s linear;
  animation-iteration-count: infinite;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
@keyframes rote {
   0% {
     transform: rotateZ(0)
  }
  50%{
    transform: rotateZ(180deg)
  }
  100%{
    transform: rotateZ(360deg)
  }
}
</style>
