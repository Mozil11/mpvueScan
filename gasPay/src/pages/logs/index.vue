<template>
  <div class="paypage">
    <div class="payhead">
      <div class="gasnumber">{{placeName}}</div>
      <div class="shebeinumber">设备识别码：{{deviceNumber}}</div>
      <div class="good">商品：{{good}}</div>
      <template v-if='diviceType==0' >

        <div class="price">单价：{{oilprice}}元/升</div>
        <div class="number">数量：{{amount}}升</div>
      </template>
      <template v-else>
<div class="price">单价：{{oilprice}}元/度</div>
        <div class="number">数量：{{amount}}度</div>
      </template>
      <div class="allprice">总价：{{price}}元</div>
    </div>
    <div class="gopay">
      <div class="liji"  @click="money">
        <img src="/static/moneypay1.svg" alt="">
        立即支付
      </div>
      <div class="liji"  @click="hetong">
        <img src="/static/pass1.svg" alt="">
        合同支付
      </div>
    </div>
  </div>
</template>

<script>


export default {
  
  data () {
    return {
     deviceNumber:0,
     openid:0,
     outTradeNo:0,
     prepay_id:0,
     time:'',
     place:'浙江省杭州市余杭区中泰街道蒋家潭绿城·桃花源',
     userName:'杨师傅',
     payType:'',
    oilprice:'',
    price:0,
     placeName:'',
     good:'',
     amount:0,
     pname:'',
     enterprise:'',
     diviceType:''
    }
  },
  onLoad(){
    this.diviceType = wx.getStorageSync('diviceType')
     this.deviceNumber = wx.getStorageSync('deviceNumber')
     this.price = wx.getStorageSync('price')
     this.placeName = wx.getStorageSync('deliveryPlaceName')+'--'+ wx.getStorageSync('oilquality')
     this.good =  wx.getStorageSync('oilquality')
     this.pname =  wx.getStorageSync('deliveryPlaceName')
     this.oilprice = wx.getStorageSync('oilprice')
     this.place =  wx.getStorageSync('placementPoint')
     this.userName =  wx.getStorageSync('username')
     this.enterprise = wx.getStorageSync('enterprise')
     this.amount =this.price/this.oilprice
  },
  created () {
    var myDate = new Date();
    var date = myDate.toLocaleString( );
    var arr = date.split(' ')[0].split('/')
    this.time = arr[0]+'-'+arr[1]+'-'+arr[2]
    console.log(this.time)
     this.deviceNumber = wx.getStorageSync('deviceNumber')
     this.price = wx.getStorageSync('price')
     console.log(this.deviceNumber)
      console.log(this.price)
      this.getNumber()
      this.getUserInfo()
  },
  methods:{
    money(){
      this.payType = '立即支付'
      console.log(this.payType)
      this.gotomoney()
    },
    hetong(){
      this.payType = '合同支付'
       console.log(this.payType)
      this.gopay()
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
    //  wx.request({
    //    url:'https://life.microger.com:8085/api/share/deviceInfo/loadDeviceInfo',
    //    data:{
    //      deviceNumber:this.deviceNumber
    //    },
       
    //    method:'GET',
    //    success:(data)=>{
    //      console.log(data)
    //      if(data.data.code==undefined){
           

         
    //      }else{
         
    //         wx.showModal({
    //           title:'提示',
    //           content:'未查到该设备',
    //            success:(res)=>{
    //               console.log(res)
    //               if (res.confirm) {
    //                 console.log('用户点击确定')
    //                 wx.redirectTo({
    //                   url:'./../searchCode/main'
    //                 })
    //               } else if (res.cancel) {
    //                 console.log('用户点击取消')
    //               }
                  
    //             }
    //         })
    //      }
    //    },
      
       
    //  })
   
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
        
      
      })
    },
     gopay(){
      wx.request({
        url:'https://life.microger.com:8085/api/v2/pay/selectPaymentDatails',
        method:'GET',
        
        data:{
          paymentTime : this.time,
          deviceNumber :this.deviceNumber,
          placementPoint:this.place,
          userName:this.userName,
          paymentMrthod:this.payType,
          companyName:this.enterprise,
          productName:this.good,
          purchaseAmount:this.price/5,
          amountOfConsumption:0.01
        },
        success:(res)=>{
          console.log(res);
           wx.redirectTo({
               url:'./../result/main'
           })
        },
      })
     
    },
    gotomoney(){
      if(this.openid != ''){
      wx.request({
        url:'https://life.microger.com:8085/api/share/paymentOrder/submitOrder',
        method:'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded' 
        },
        data:{
          openid : this.openid,
          payType:1,
          orderSn:this.outTradeNo,
          device_number:this.deviceNumber,
          device_charging_way_id:98,
          lease_number:1,
          body:'智能设备',
          total_fee:0.01,
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
    }
  }
}
</script>

<style>
.payhead{
  width: 96%;
  height: 300px;
  background: #fff;
  border: 1px solid #333333;
  margin: auto;
  font-size: 15px;
   margin-top: 20px;
}
.gasnumber{
  margin-top: 40px;
  margin-left: 20px;
}
.shebeinumber{
  font-size: 14px;
  color: #999999;
  margin-top: 20px;
   margin-left: 20px;
}
.good{
  margin-top: 20px;
  margin-left: 20px;
}
.price{
  margin-top: 20px;
   margin-left: 20px;
}
.number{
  margin-top: 20px;
   margin-left: 20px;
}
.allprice{
   margin-top: 20px;
    margin-left: 20px;
}
.gopay{
  width: 90%;
  text-align: center;
  margin: auto;
}
.liji{
  margin-top: 40px;
  position: relative;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  width: 100%;
  border-radius: 5px;
  background-image: -moz-linear-gradient( 113deg, rgb(0,102,255) 0%, rgb(51,153,255) 100%);
  background-image: -webkit-linear-gradient( 113deg, rgb(0,102,255) 0%, rgb(51,153,255) 100%);
  background-image: -ms-linear-gradient( 113deg, rgb(0,102,255) 0%, rgb(51,153,255) 100%);
  opacity: 0.8;
}
.liji:active{
  	background-image: -moz-linear-gradient( 113deg, rgb(51,153,255) 0%, rgb(0,102,255) 100%);
  background-image: -webkit-linear-gradient( 113deg, rgb(51,153,255) 0%, rgb(0,102,255) 100%);
  background-image: -ms-linear-gradient( 113deg, rgb(51,153,255) 0%, rgb(0,102,255) 100%);
  opacity: 0.8;
}
.liji img{
  vertical-align: middle;
  width: 30px;
  height: 30px;
}
</style>
