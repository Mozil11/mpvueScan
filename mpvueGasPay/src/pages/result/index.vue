<template>
    <div class="result">
        <div class="content">
            <img src="/static/success.svg" alt="" class="success">
            <div class="goumai">购买成功</div>
            <div class="aaa">
                <div class="placename">{{placeName}}</div>
                <div class="devicenumber">设备识别码：{{deviceNumber}}</div>
                <div class="buyamount">购买<span class="num">{{price/oilprice}}</span>升</div>
                <div class="pay">已支付{{price}}元</div>
                <div class="paytype">支付方式：合同支付</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            placeName:'西安加油站--0#号柴油机',
            deviceNumber:'XIANJYJ003',
            price:0,
            oilprice:0

        }
    },
    onLoad(){
        this.deviceNumber = wx.getStorageSync('deviceNumber')
     this.price = wx.getStorageSync('price')
     this.placeName = wx.getStorageSync('deliveryPlaceName')+'--'+ wx.getStorageSync('oilquality')
    
     this.oilprice = wx.getStorageSync('oilprice')
    }
}
</script>
<style scoped>
.result{
    height: 95%;
    padding-top: 20px;
}
.content{
    position: relative;
    width: 96%;
    background: #fff;
    border: 1px solid #333333;
    margin: auto;
    height: 95%;
   
}
.success{
    position: absolute;
    width: 50px;
    height: 50px;
    left: 0;
    right: 0;
    margin: auto;
    top: 100px;
}
.goumai{
    color: #333333;
    font-size: 20px;
    width: 200px;
    height: 100px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 200px;
    text-align: center;
}
.aaa{
    font-size: 15px;
    position: absolute;
     left: 0;
    right: 0;
    margin: auto;
    top: 250px;
    width: 85%;
    height: 200px;
    border: 1px solid #333333;
    border-radius: 10px;
    padding:10px;
}
.placename{
    margin-top: 10px;
    margin-bottom: 10px;
}
.devicenumber{
    font-size: 14px;
    color: #999999;
    margin-bottom: 20px;
}
.buyamount{
    margin-bottom: 10px;
}
.num{
    font-size: 20px;
}
.pay{
    margin-bottom: 10px;
}
</style>

