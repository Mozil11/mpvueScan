<template>
<div>

  <div class="container" @click="clickHandle('test click', $event)" v-if="isready">
    <div class="head">
        {{deviceModelName}}
    </div>
    <div class="contentbox">
      <div :class="'tableft '+(classname?'active':'')" @click="gettime" v-show="shown">{{timename}}</div>
      <div :class="'tabright '+(!classname?'active':'')" @click="getlitter"  v-show="shown">{{litrename}}</div>
      <div :class="'content '+(!shown?'content0':'')">
        <div :class="'pic '+(!shown?'pic0':'')">
           <img :src="deviceModelPicBigUrl" alt="" class="image">
        </div>
        <div class="option">
          <div class="zuyong">租用</div>
          <div class="do">
            <div class="inp">
              <span class="jian" @click="jian">-</span>
              <input type="text" class="in" v-model="num" :min='mintime' :max="maxtime" />
              <span class="jia" @click="jia">+</span>
            </div>
            <span class="ppr">{{danwei}}</span>
          </div>
          <div class="inf">
            <span>共计</span>
            <span class="red">{{num*price}}</span>
            <span>元</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click="gopay">立 即 购 买</button>
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
      <div class="jiazai">加载中</div>
    </div>
	</div>
</div>
</template>

<script>

import{getQueryString}from './../../utils/index.js'
export default {
  data () {
    return {
      number:'18204805392',
       isready:false,
      shown:true,
      motto: 'Hello World',
      userInfo: {},
      num:1,
      price:1,
      deviceNumber:'',
      outTradeNo:'',
      subject:'小米',
      totalAmount:1,
      body:'',
      url:'',
      dom:'<p>智能设备</p>',
      payType:1,
      device_number:'KTBli64x',
      device_charging_way_id:1,
      body:'智能设备',
      total_fee:1,
      detail:'test',
      radio:1,
      lease_number:1,
      openid:'',
      prepay_id:'',
      mintime:1,
      maxtime:100,
      res:{
        timeDeviceChargingWayDOList:[],
        litreDeviceChargingWayDOList:[]
      },
      classname:true,
      danwei:'天',
      deviceModelPicBigUrl:'',
      deviceModelName:'',
      timename:'按时长计费',
      litrename:"按规格计费",
      jiazai:false
    }
  },
 

  methods: {
    gettime () {
      this.timename = this.res.timeDeviceChargingWayDOList[0].chargingWayName
      this.classname = true;
      this.danwei =this.res.timeDeviceChargingWayDOList[0].meteringUnitName
      this.price = this.res.timeDeviceChargingWayDOList[0].meteringUnitPrice
      this.subject = this.res.deviceModel.deviceModelName
      this.totalAmount = this.num*this.price
      this.total_fee =  this.num*this.price
      this.device_charging_way_id = this.res.timeDeviceChargingWayDOList[0].id
      this.body = this.res.deviceModel.deviceClassicName
      this.lease_number = this.num
      this.mintime = this.res.timeDeviceChargingWayDOList[0].meteringUnitSmall
      this.maxtime = this.res.timeDeviceChargingWayDOList[0].meteringUnitMax
    },

    getlitter(){
      this.litrename = this.res.litreDeviceChargingWayDOList[0].chargingWayName
      this.classname = false;
     this.danwei =this.res.litreDeviceChargingWayDOList[0].meteringUnitName
     console.log(this.danwei)
      this.price = this.res.litreDeviceChargingWayDOList[0].meteringUnitPrice
      this.subject = this.res.deviceModel.deviceModelName
      this.totalAmount = this.num*this.price
      this.total_fee =  this.num*this.price
      this.device_charging_way_id = this.res.litreDeviceChargingWayDOList[0].id
      this.body = this.res.deviceModel.deviceClassicName
      this.lease_number = this.num
      this.mintime = this.res.litreDeviceChargingWayDOList[0].meteringUnitSmall
      this.maxtime = this.res.litreDeviceChargingWayDOList[0].meteringUnitMax
    },
    getUserInfo () {
      // 调用信息接口
      
      wx.login({
      success: (res) => {
        console.log(res.code)
        if (res.code) {
          //发起网络请求

          wx.request({
            url: 'https://life.microger.com:8085/api/share/paymentOrder/getOpenId',
            data: {
              code: res.code
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' 
            },
            method:'POST',
            success:(res)=>{
              console.log(res)
             
              this.openid = res.data.openid
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
     wx.request({
       url:'https://life.microger.com:8085/api/share/deviceInfo/loadDeviceInfo',
       data:{
         deviceNumber:this.deviceNumber
       },
       
       method:'GET',
       success:(data)=>{
         console.log(data)
         if(data.data.code==undefined){
            this.isready = true;
          if(data.data.timeDeviceChargingWayDOList.length==0){
            this.shown = false;
             this.price = data.data.litreDeviceChargingWayDOList[0].meteringUnitPrice
          this.subject = data.data.deviceModel.deviceModelName
          this.totalAmount = this.num*this.price
          this.total_fee =  this.num*this.price
          this.device_charging_way_id = data.data.litreDeviceChargingWayDOList[0].id
          this.body = data.data.deviceModel.deviceClassicName
          this.lease_number = this.num
          this.mintime = data.data.litreDeviceChargingWayDOList[0].meteringUnitSmall
            this.maxtime = data.data.litreDeviceChargingWayDOList[0].meteringUnitMax
            this.deviceModelPicBigUrl = data.data.deviceModel.deviceModelPicBigUrl
            this.deviceModelName =  data.data.deviceModel.deviceModelName
            this.danwei = data.data.litreDeviceChargingWayDOList[0].meteringUnitName
          }else if(data.data.litreDeviceChargingWayDOList.length==0){
            this.shown = false;
             this.price = data.data.timeDeviceChargingWayDOList[0].meteringUnitPrice
          this.subject = data.data.deviceModel.deviceModelName
          this.totalAmount = this.num*this.price
          this.total_fee =  this.num*this.price
          this.device_charging_way_id = data.data.timeDeviceChargingWayDOList[0].id
          this.body = data.data.deviceModel.deviceClassicName
          this.lease_number = this.num
          this.mintime = data.data.timeDeviceChargingWayDOList[0].meteringUnitSmall
            this.maxtime = data.data.timeDeviceChargingWayDOList[0].meteringUnitMax
            this.deviceModelPicBigUrl = data.data.deviceModel.deviceModelPicBigUrl
            this.deviceModelName =  data.data.deviceModel.deviceModelName
            this.danwei = data.data.timeDeviceChargingWayDOList[0].meteringUnitName
          }else{
            this.shown = true;
              this.price = data.data.timeDeviceChargingWayDOList[0].meteringUnitPrice
          this.subject = data.data.deviceModel.deviceModelName
          this.totalAmount = this.num*this.price
          this.total_fee =  this.num*this.price
          this.device_charging_way_id = data.data.timeDeviceChargingWayDOList[0].id
          this.body = data.data.deviceModel.deviceClassicName
          this.lease_number = this.num
          this.mintime = data.data.timeDeviceChargingWayDOList[0].meteringUnitSmall
            this.maxtime = data.data.timeDeviceChargingWayDOList[0].meteringUnitMax
            this.deviceModelPicBigUrl = data.data.deviceModel.deviceModelPicBigUrl
            this.deviceModelName =  data.data.deviceModel.deviceModelName
            this.danwei = data.data.timeDeviceChargingWayDOList[0].meteringUnitName
          }
          this.res = data.data
         
         }else{
            this.isready = false;
            wx.showModal({
              title:'提示',
              content:'未查到该设备',
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
         }
       },
       error:(res)=>{
         this.jiazai = true;
       }
       
     })
   
    },
    //调用生成订单
    getNumber(){
      wx.request({
         url:'https://life.microger.com:8085/api/share/paymentOrder/geneOrderSn',
         method:'GET',
         success:(res)=>{
           console.log(res)
           this.outTradeNo = res.data
         },
        
       error:(res)=>{
         this.jiazai = true;
       }
      })
    },
    callnumber(){
      this.number = '18204805392'
      wx.makePhoneCall({
        phoneNumber:this.number
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    //购买
    gopay(){
      console.log('payType:'+this.payType,'outTradeNo:'+this.outTradeNo,'device_number:'+this.device_number,'device_charging_way_id:'+this.device_charging_way_id,'lease_number:'+this.lease_number,'total_fee:'+this.total_fee)
      if(this.openid != ''){
      wx.request({
        url:'https://life.microger.com:8085/api/share/paymentOrder/submitOrder',
        method:'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded' 
        },
        data:{
          openid : this.openid,
          payType:this.payType,
          orderSn:this.outTradeNo,
          device_number:this.deviceNumber,
          device_charging_way_id:this.device_charging_way_id,
          lease_number:this.lease_number,
          body:'智能设备',
          total_fee:this.total_fee,
          detail:'test'
        },
        success:(res)=>{
          console.log(res);
          if(res.data.code==500){
            wx.showModal({
              title:'提示',
              content:'设备唯一序列号为空',
              success:(res)=>{
                  console.log(res)
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.redirectTo({
                      url:'./../searchCode/main'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    wx.redirectTo({
                      url:'./../searchCode/main'
                    })
                  }
                }
            })
          }
          this.prepay_id = res.data.prepay_id
          wx.request({
            url:'https://life.microger.com:8085/api/share/paymentOrder/generateSignature',
            method:'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded' 
            },
            data:{
              prepayId:this.prepay_id
            },
            success:(data)=>{
              console.log(data);
              wx.requestPayment(data.data);

            }
          })
        },
       error:(res)=>{
         this.jiazai = true;
       }
      })
      }else{
        alert("openid为空")
      }
    },
    jian(){
     
      if(this.num<=0){
        this.num = 1
      }else{
         this.num--;
      }
    },
    jia(){
      this.num++
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.deviceNumber = wx.getStorageSync('deviceNumber')
  },
  computed:{
    
  },
  mounted(){

    this.getNumber()

  },
  
  onLoad(options){
        
 
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
      this.getUserInfo();
    }
  }
}
</script>

<style scoped>
.contentbox{
  width: 90%;
 text-align: center;
  background: #fff;
  border-radius: 10rpx;
  box-shadow: 1px 2px 20px #cad7f5;
}
.head{
  background: #fff;
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  font-size: 15px;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 40px;
  box-shadow: 1px 2px 2px #eeeeee;
}
.tableft,.tabright{
  background: #eeeeee;
  color: #8a8a8a;
  float: left;
  width: 50%;
  height: 100rpx;
  text-align: center;
  font-size: 16px;
  line-height: 100rpx;
  /* border: 1rpx solid #eeeeee; */
  box-sizing: border-box;
}
.tabright{
  border-radius: 0 10rpx 0 10rpx;
  box-shadow: 2px -2px 5px #e9e6e6 inset;
}
.tableft{
  border-radius: 10rpx 0 10rpx 0;
  box-shadow: -2px -2px 5px #e9e6e6 inset;
}
.active{
  box-shadow:none;
   background: #fff;
  border-bottom: none;
    color: #409eff;
   
}
.content{
   background: #fff;
  height: 350rpx;
  /* border-bottom: 1rpx solid #eeeeee;
  border-left: 1rpx solid #eeeeee;
  border-right: 1rpx solid #eeeeee; */
  margin-top: 70rpx;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0 0 10rpx 10rpx;
}
.pic{
  position: absolute;
  display: inline-block;
  width: 30%;
  height:18%;
  top:315rpx;
  left:90rpx;

  
}
.pic img{
  width: 100%;
  height: 90%;
}
.option{
  float: right;
  width: 50%;
  font-size: 14px;
  right: 0;
  top:0;
  text-align: left;

}
.zuyong{
  margin-top: 20px;
  margin-bottom: 20px;
}
.in{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #3399ff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 75rpx;
    line-height: 75rpx;
    outline: 0;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    text-align: center;
}
.inp{
  position: relative;
  display: inline-block;
  width: 74%;
  height: 75rpx;
  line-height: 75rpx;
}
.jian,.jia{
  position: absolute;
  font-size: 20px;
    z-index: 10;
    top: 1px;
    width: 40px;
    color: #3399ff;
    text-align: center;
    cursor: pointer;
    height: 72rpx;
    line-height: 65rpx;
    border-radius: 4px;
}
.jian{
  left: 1px;
  border: #3399ff;
}
.jia{
  right: 1px;
  border: #3399ff;
}
.jian:active{
  background: #b3d8ff;
}
.jia:active{
  background: #b3d8ff;
}
.do{
  position: relative;
  height: 75rpx;
  line-height: 75rpx;
}
.pp{
  position: absolute;
  top: -10px;
  left: 5px;
  margin: auto;
}
.ppr{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 15px;
  margin: auto;
}
.inf{
  margin-top: 20px;
}
.red{
  font-size: 17px;
    font-weight: bold;
    color: #F56C6C;
    margin-right: 5px;
    margin-left: 5px;
}
.footer{
  position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    padding: 30px 0 30px 0;
    text-align: center;
}
.footer button{
  height: 50px;
  display: inline-block;
    line-height: 1.5;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 50rpx;
    color: #fff;
    border-color: #409EFF;
    width: 90%;
    background:-webkit-linear-gradient(left,#3399ff,#0066ff);

	background:-o-linear-gradient(right,#3399ff,#0066ff);

	background:-moz-linear-gradient(right,#3399ff,#0066ff);

	background:linear-gradient(to right,#3399ff,#0066ff);
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
