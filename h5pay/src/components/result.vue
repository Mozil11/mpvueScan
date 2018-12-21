<template>
    <div>
        <div class="titel"> {{machine}} </div>
        <div class="small">欢迎使用 {{deviceNumber}} 号设备</div>
        <div class="main">
            <div class="time">
                剩余使用时间
                <div class="number">
                    <div class="box">
                        <span>12</span><span>:</span><span>00</span><span>:</span><span>00</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <el-button class="xu" type="primary" @click="gotohome">续租</el-button>
            <el-button class="bao">报修</el-button>
        </div>
    </div>
</template>

<script>
import 'whatwg-fetch'

import httpFetch from 'http-fetch'
export default {
    data(){
        return{
            deviceNumber:'1212121',
            machine:'美的空调'
        }
    },
    created(){
        this.deviceNumber = this.$route.query.deviceNumber || localStorage.getItem('deviceNumber')
    },
    mounted(){
        httpFetch.get('http://life.microger.com:8086/api/share/deviceInfo/loadDeviceInfo?deviceNumber='+this.deviceNumber,{
                // 本次请求的fetch request配置 默认：全局requestOptions配置
                requestOptions: {
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    mode: 'cors',

                }}).then(res=>{
                console.log(res.data);
              
                    localStorage.setItem('machine',res.data.deviceModel.deviceModelName);
                    this.machine = res.data.deviceModel.deviceModelName;
             
          })
    },
    methods:{
        gotohome(){
            this.$router.push({
                path:'/',
                query:{deviceNumber:this.deviceNumber}
            })
        }
    }
}
</script>

<style scoped>
.titel{
  font-size: 16px;
  height:50px;
  line-height:50px;
  margin-bottom: 2px;
  background: #fff;
}
.small{
    height: 30px;
    font-size: 14px;
    background: #fff;
    line-height: 30px;
}
.main{
    width: 95%;
    margin: 0 auto;
    height: 300px;
    background: #fff;
    margin-top: 20px;
    padding-top: 30px;
}
.time{
    text-align: left;
    font-size: 14px;
    width: 90%;
    margin: 0 auto;
}
.number{
    height: 150px;
    width: 100%;
    border: 1px solid #eeeeee;
    margin-top: 20px;
    font-size: 25px;
    font-weight: bold;
}
.box{
    width: 100%;
    height: 100px;
    margin-top: 25px;
    text-align: center;
    line-height: 100px;
}
.foot{
    position: fixed;
    width: 100%;
    height: 89px;
    bottom: 0;
    left: 0;
    line-height: 89px;
}
.xu{
    width: 61%;
}
.bao{
    width: 30%;
}
</style>
