<template>
 
   <div class="timebox">
       <el-row type="flex" justify="center">
           <el-col :span="22">
               <el-row  :gutter="20">
                  
                    <el-col :span="7">
                        <img :src="deviceModelPicBigUrl" alt="" class="image">
                    </el-col>
                    <el-col :span="17">
                        <div class="in">
                            <span>租用</span>
                            <el-input-number v-model="num1" @change="handleChange" :min="mintime" :max="maxtime" label="描述文字" size="mini" class="inp"></el-input-number>
                            <!-- <el-select v-model="value" @change="changetype" size="mini" class="sele">
                                <el-option
                                v-for="(item,i) in timetype"
                                :key="i"
                                :label="item.type"
                                :value="i">
                                </el-option>
                            </el-select> -->
                            <span class="sheng">升</span>
                        </div>
                        <div class="in ss">
                             共计<span class="amo" ref="amount">{{num1*price}}</span>元
                        </div>
                    </el-col>
               </el-row>
           </el-col>
          
       </el-row>
   </div>

</template>
<script>
import 'whatwg-fetch'

import httpFetch from 'http-fetch'
export default {
  data(){
      return{
          num1:1,
            price:1,
            timetype:[],
            mintime:1,
            maxtime:100,
            machine:'',
            data:[],
            value:0,
            userkind:'升',
            deviceModelPicBigUrl:''
        //   swiperOption:{
        //         notNextTick: true,
        //         autoplay: 500,
        //         pagination: {
        //             el: '.swiper-pagination',
        //             //clickable :true,
        //         },
        //        effect : 'fade',
        //         fadeEffect: {
        //             crossFade: true,
        //         }

              
        //   }
         
      }
  },
  mounted(){

        this.getinfo();
         localStorage.setItem('userkind',this.userkind)
  },
  methods:{
      handleChange(e){
          console.log(e)
          var a = this.num1*this.price
          localStorage.setItem('amountMoney',a)
          localStorage.setItem('lease_number',this.num1)

      },
      changetype(e){
          console.log(e)
            this.price = this.data[e].meteringUnitPrice
            this.mintime = this.data[e].meteringUnitSmall
            this.maxtime = this.data[e].meteringUnitMax
            // this.timetype = this.data[e].meteringUnitName
            localStorage.setItem('amountMoney',this.num1*this.price)
            localStorage.setItem('lease_number',this.num1)
            localStorage.setItem('price',this.data[e].meteringUnitPrice)
            localStorage.setItem('mintime',this.data[e].meteringUnitSmall)
            localStorage.setItem('maxtime',this.data[e].meteringUnitMax)
            // localStorage.setItem('timetype',this.data[e].meteringUnitName)
            localStorage.setItem('deviceNumber',this.deviceNumber);
            localStorage.setItem('id',this.data[e].id);
            localStorage.setItem('chargingWayType',this.data[e].chargingWayType);
      },
      getinfo(){
          this.deviceNumber = this.$route.query.deviceNumber || localStorage.getItem('deviceNumber')
          console.log(this.deviceNumber)
          httpFetch.get('http://life.microger.com:8086/api/share/deviceInfo/loadDeviceInfo?deviceNumber='+this.deviceNumber,{
                // 本次请求的fetch request配置 默认：全局requestOptions配置
                requestOptions: {
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    mode: 'cors',

                }}).then(res=>{
                console.log(res.data);
                // console.log(res.data.deviceChargingWayDOList)
                if(res.data.litreDeviceChargingWayDOList.length!=0){
                    //按时间
                    this.timetype = [];
                    for(var i=0; i<res.data.litreDeviceChargingWayDOList.length;i++){
                        var obj = {}
                        obj.type = res.data.litreDeviceChargingWayDOList[i].meteringUnitName
                        this.timetype.push(obj)
                    }
                    this.price = res.data.litreDeviceChargingWayDOList[0].meteringUnitPrice
                    this.mintime = res.data.litreDeviceChargingWayDOList[0].meteringUnitSmall
                    this.maxtime = res.data.litreDeviceChargingWayDOList[0].meteringUnitMax
                    // this.timetype = res.data.timeDeviceChargingWayDOList[0].meteringUnitName
                    localStorage.setItem('amountMoney',this.num1*this.price)
                    localStorage.setItem('lease_number',this.num1)
                    localStorage.setItem('price',res.data.litreDeviceChargingWayDOList[0].meteringUnitPrice)
                    localStorage.setItem('mintime',res.data.litreDeviceChargingWayDOList[0].meteringUnitSmall)
                    localStorage.setItem('maxtime',res.data.litreDeviceChargingWayDOList[0].meteringUnitMax)
                    // localStorage.setItem('timetype',res.data.timeDeviceChargingWayDOList[0].meteringUnitName)
                    localStorage.setItem('deviceNumber',this.deviceNumber);
                    localStorage.setItem('id',res.data.litreDeviceChargingWayDOList[0].id);
                    localStorage.setItem('chargingWayType',res.data.litreDeviceChargingWayDOList[0].chargingWayType);
                    this.data = res.data.litreDeviceChargingWayDOList
                    localStorage.setItem('machine',res.data.deviceModel.deviceModelName);
                    this.machine = res.data.deviceModel.deviceModelName;
                     this.deviceModelPicBigUrl = res.data.deviceModel.deviceModelPicBigUrl
                    

                }
             
          })
      },
     
      
  }
}
</script>
<style scoped>
.timebox{
    padding-top:30px;
    border: 1px solid #dcdfe6;
    border-top:none;
    padding-bottom:35px;
    background:#fff;
    border-radius: 0 0 5px 5px;
}
.wid{
    width: 100%;
    margin-bottom: 10px;
}
.money{
    margin-left: 66%;
}
.freeinput{
    width: 40%;
}
.inputbox{
    float: left;
    text-align: left;
    font-size: 14px;

}
.inputmoney{
    font-size: 14px;
    margin-top: 10px;
    
}
.lef{
    float:left;
}
.rit{
    float:right;
}
.num{
    text-align:left;
    margin-top:10px;
}
.gongji{
    text-align:right;
    margin-top: 20px;
}
.aaa{
    overflow: hidden;
}
.image{
    width: 100%;
}
.swiper-slide-prev{
    transform: scale(0.9)
}
.swiper-slide-next{
    transform: scale(0.9)
}
.in{
    font-size: 13px;
}
.ss{
    margin-top: 10px;
}
.amo{
    font-size: 17px;
    font-weight: bold;
    color: #F56C6C;
    margin-right: 5px;
    margin-left: 5px;
}
.inp{
    width: 100px;
}
.sele{
    width: 65px;
}
</style>

