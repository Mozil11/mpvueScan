<template>

    <div>
        <el-row class="titel">
            <el-col :span='24'>{{subject}}</el-col>
        </el-row>
        <el-row type="flex" justify="center" >
            <el-col :span="22">
        <template v-if="$route.query.radio == 1">
                <div class="form">
                    <div class="outTradeNo hig">
                        <span class="tab">订 单 号 ：</span>
                        <span>{{outTradeNo}}</span>
                    </div>
                    <div class="subject hig">
                        <span class="tab">购买详情：</span>
                        <span>{{subject}}X{{userbuynumber}}{{userkind}}</span>
                    </div>
                    <div class="totalAmount hig">
                        <span class="tab">付款金额：</span>
                        <span>{{totalAmount}}元</span>
                    </div>
                </div>
                <div class="bttn">
                    <a :href="url" id="getBrandWCPayRequest">
                            <el-button type="primary" class="btn">确 认 支 付</el-button>
                    </a>
                </div>
                <!-- <el-form ref="form" :model="form" label-width="100px" action='http://life.microger.com:8086/api/wxpay/pushOrder' method=post target="_blank" id="alipayment" label-position="left">
                    <el-form-item label="订单号：" name='outTradeNo' class="b f">
                        <span name='outTradeNo'>
                           {{outTradeNo}}
                        </span>
                    </el-form-item>
                    <el-form-item label="订单名称：" name='body' class="b">
                        <span>{{subject}}</span>
                    </el-form-item>
                    <el-form-item label="付款金额：" name='total_fee' class="b">
                        <span>{{totalAmount}}</span>
                    </el-form-item>
                    <el-form-item label="商品描述：" name='detail' class="b">
                        <span>{{body}}</span>
                    </el-form-item>
                    <el-form-item>
                        <a :href="url" id="getBrandWCPayRequest">
                            <el-button type="primary" class="btn">立即购买</el-button>
                        </a>
                    </el-form-item>
                </el-form> -->
        </template>
        <template v-else>
          <form name="alipayment" action="http://life.microger.com:8086/api/share/paymentOrder/submitOrder" method="post" target="_blank">
            <input type="hidden" id="payType" name="payType" :value="payType">
            <input type="hidden" id="device_number" name="device_number" :value="device_number">
            <input type="hidden" id="device_charging_way_id" name="device_charging_way_id" :value="device_charging_way_id">
            <input type="hidden" id="lease_number" name="lease_number" :value="lease_number">
            <input type="hidden" id="body" name="body" :value="body">
            <input type="hidden" id="orderSn" name="orderSn" :value="outTradeNo">
            <input type="hidden" id="total_fee" name="total_fee" :value="total_fee">
            <input type="hidden" id="detail" name="detail" :value="detail">
            <div class="form">
                    <div class="outTradeNo hig">
                        <span class="tab">订 单 号 ：</span>
                        <span>{{outTradeNo}}</span>
                    </div>
                    <div class="subject hig">
                        <span class="tab">购买详情：</span>
                        <span>{{subject}} X{{userbuynumber}} {{userkind}}</span>
                    </div>
                    <div class="totalAmount hig">
                        <span class="tab">付款金额：</span>
                        <span>{{totalAmount}}元</span>
                    </div>
                </div>
            <div style="clear:left;margin-top:50px;">
                
                        <span class="new-btn-login-sp">
                            <button class="new-btn-login" type="submit" style="text-align:center;">确 认 付 款</button>
                        </span>
                        <span class="note-help">如果您点击“确认”按钮，即表示您同意该次的执行操作。</span>
                  
            </div>
		</form>
        </template>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import $ from 'jquery'
import httpFetch from 'http-fetch'
import 'whatwg-fetch'
export default {
    
    data(){
        return{
            userkind:'',
            userbuynumber:'',
           form:{
              out_trade_no:'',
              body:localStorage.getItem('machine'),
              total_fee:'0.01',
              detail:'一辆车',
              
           },
           outTradeNo:'',
           subject:localStorage.getItem('machine'),
           totalAmount:localStorage.getItem('amountMoney'),
           body:'',
           url:'',
           dom:'<p>智能设备</p>',
           payType:localStorage.getItem('radio'),
           device_number:localStorage.getItem('deviceNumber'),
           device_charging_way_id:localStorage.getItem('id'),
           lease_number:localStorage.getItem('lease_number'),
           body:'智能设备',
           total_fee:localStorage.getItem('amountMoney'),
           detail:'test',
           radio:1
        }
    },
    
    mounted(){
        console.log(this.form.out_trade_no)
        this.form.total_fee = localStorage.getItem('amountMoney');
        this.userbuynumber = localStorage.getItem('lease_number');
        this.userkind =  localStorage.getItem('userkind')
        this.getnumber();
        // this.GetDateNow();
      
        // httpFetch.post('/api/wxpay/pushOrder',{this.$refs.form})
    },
    methods:{
        
       
    //获得订单号
    getnumber(){
        httpFetch.get('http://life.microger.com:8086/api/share/paymentOrder/geneOrderSn').then((res=>{
            console.log(res);
            this.form.out_trade_no = res.data;
            this.outTradeNo = res.data;
            this.radio = this.$route.query.radio||localStorage.getItem('radio') 
            if(this.radio == 1){
                console.log({
                     payType:this.payType,
                   orderSn:this.form.out_trade_no,
                   device_number:this.device_number,
                   device_charging_way_id:this.device_charging_way_id,
                   lease_number:this.lease_number,
                   body:'智能设备',
                   total_fee:this.total_fee,
                   detail:'test'
                })
                httpFetch.post('http://life.microger.com:8086/api/share/paymentOrder/submitOrder',httpFetch.jsonToUrlParams({
                   payType:this.payType,
                   orderSn:this.form.out_trade_no,
                   device_number:this.device_number,
                   device_charging_way_id:this.device_charging_way_id,
                   lease_number:this.lease_number,
                   body:'智能设备',
                   total_fee:this.total_fee,
                   detail:'test'
   
               }),{
                       // 本次请求的fetch request配置 默认：全局requestOptions配置
                       requestOptions: {
                           headers: {
                           'Content-Type': 'application/x-www-form-urlencoded'
                           },
                           mode: 'cors',
                       }})
               .then(res=>{
                   console.log(res);
                   this.url = res.data.payUrl;
               })
            }
        }))
    },
    
   
    },
    

}

</script>
<style scoped>
.titel{
    background: #fff;
    height: 50px;
    line-height: 50px;
    margin-bottom: 10px;
}
.btn{
    width: 100%;
}
.form{
    background: #fff;
    font-size: 14px;
    padding-top: 20px;
}
.b{
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 0;
}
.f{
    margin-top: 20px;
}
*{
        margin:0;
        padding:0;
    }
    ul,ol{
        list-style:none;
    }
    body{
        font-family: "Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;
    }
    .hidden{
        display:none;
    }
    .new-btn-login-sp{
        padding: 1px;
        display: inline-block;
        width: 100%;

        
    }
    .new-btn-login {
        background-color: #409EFF;
        color: #FFFFFF;
        border: none;
        width: 100%;
        height: 40px;
        border-radius: 5px;
        font-size: 14px;
    }
    #main{
        width:100%;
        margin:0 auto;
        font-size:14px;
    }
    .red-star{
        color:#f00;
        width:10px;
        display:inline-block;
    }
    .null-star{
        color:#fff;
    }
    .content{
        margin-top:5px;
    }
    .content dt{
        width:100px;
        display:inline-block;
        float: left;
        margin-left: 20px;
        color: #666;
        font-size: 13px;
        margin-top: 8px;
    }
    .content dd{
        margin-left:120px;
        margin-bottom:5px;
        margin-top: 5px;
        font-size: 14px;
    }
    .content dd input {
        width: 85%;
        height: 28px;
        border: 0;
        -webkit-border-radius: 0;
        -webkit-appearance: none;
    }
    #foot{
        margin-top:10px;
        position: absolute;
        bottom: 15px;
        width: 100%;
    }
    .foot-ul{
        width: 100%;
    }
    .foot-ul li {
        width: 100%;
        text-align:center;
        color: #666;
    }
    .note-help {
        color: #999999;
        font-size: 12px;
        line-height: 130%;
        margin-top: 5px;
        width: 100%;
        display: block;
    }
    #btn-dd{
        margin: 20px;
        text-align: center;
    }
    .foot-ul{
        width: 100%;
    }
    .one_line{
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #eeeeee;
        width: 93%;
    margin-left: 20px;
    }
    .am-header {
        display: -webkit-box;
        display: -ms-flexbox;
        display: box;
        width: 100%;
        position: relative;
        padding: 7px 0;
        -webkit-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
        background: #1D222D;
        height: 50px;
        text-align: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        box-pack: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        box-align: center;
    }
    .am-header h1 {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        box-flex: 1;
        line-height: 18px;
        text-align: center;
        font-size: 18px;
        font-weight: 300;
        color: #fff;
    }
    #getBrandWCPayRequest{
        display: inline-block;
        width: 100%;
        height: 40px;
    }
    #getBrandWCPayRequest button{
        height: 100%;
    }
    .tab{
        float: left;
        width: 73px;
        margin-left: 20px;
    }
    .hig{
        height: 50px;
    }
    .bttn{
        margin-top: 50px;
    }
</style>
