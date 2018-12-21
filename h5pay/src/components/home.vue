<template>
    <div>
        <div class="titel"> {{machine}} </div>
        <div class="tabs">
            <el-row type='flex' justify="center" class="tabbox">
                <el-col :span="12"  :class=isActtime>
                    <router-link to='/Home/time' tag="span" class="tab">按使用时间购买</router-link>
                </el-col>
                <el-col :span="12" :class=isActamount>
                    <router-link to='/Home/amount' tag="span" class="tab">按出水量购买</router-link>
                </el-col>
            </el-row>
            
            <router-view/>
            <div class="choose">
                <el-row type='flex' justify="center">
                    <el-col :span='20'>
                        <el-row>
                            <el-col :span='24' class="mb">
                                <el-radio v-model="radio" label="2"  @change='choosePay' border class="rio">支付宝支付</el-radio>
                            </el-col>
                            <el-col :span='24' >
                                <el-radio v-model="radio" label="1"  @change='choosePay' border class="rio">微信支付</el-radio>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-row class="footer" type="flex" justify="center">
            <el-col :span="20">
                <!-- <router-link to="/choosePay/machine" > -->
                <el-button type="primary" class="pay" @click="golink">购  买</el-button>
                <!-- </router-link> -->
            </el-col>
        </el-row>
        <div class="shadow" v-show="isWeixin">
            <img src="./../assets/a.png" alt="">
        </div>
    </div>
</template>
<script>
import 'whatwg-fetch'
export default {
    data(){
        return{
            machine:'美的xx净水器',
            isActtime:'time',
            isActamount:'amount',
            radio:"2",
            price:10,
            maxtime:100,
            mintime:1,
            timetype:'天',
            deviceNumber:'',
            charging_way_type:1,
            isWeixin:false
        }
    },
    //保持tab卡状态
   beforeRouteEnter (to, from, next) {
       console.log(to)
      
       next(vm=>vm.setData(to))
  },
//   watch: {
//       '$route' (to, from) {
//           // 对路由变化作出响应...
//       this.setData(to);
//     }
//   },
beforeRouteUpdate (to, from, next) {
    console.log(to)
    // react to route changes...
    // don't forget to call next()
    this.setData(to);
    next()
  },
  
  created(){
      var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        if (isWeixin) {

            this.isWeixin = true;
            // location.href = 'https://mp.weixin.qq.com/a/~P7axKVmnhWi36agktR1-KA~~'
        }else{
            this.isWeixin = false
            
        }
        console.log(this.isWeixin)
      setTimeout(()=>{
          this.machine = localStorage.getItem('machine')
      },200)
  },
  methods:{
      //激活后tab样式
      setData(to){
      
        if(to.name=='Time'){
            this.isActtime = 'time act'
            this.isActamount = 'amount'
            this.charging_way_type = 1
        }else{
            this.isActtime = 'time'
            this.isActamount = 'amount act'
            this.charging_way_type = 2;
        }
        localStorage.setItem('charging_way_type',this.charging_way_type)
      },
      //路由带参跳转
      golink(){
          localStorage.setItem('radio',this.radio);
          this.$router.push({
                path: '/choosePay',
                name: 'ChoosePay',
                query: {
                    machine: this.machine,
                    radio:this.radio,
                   
                }
          })
      },
    
      
      choosePay(e){
          console.log(e);
      }
  },
  mounted(){
    
  }
}
</script>
<style scoped>
.shadow{
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    top:0;
}
.shadow img{
    width: 100%;
}
.titel{
  font-size: 16px;
  height:50px;
  line-height:50px;
  margin-bottom: 20px;
  background: #fff;
}
.tabs{
  height: 30px;
  line-height: 30px;
  margin-left:10px;
  margin-right:10px;
}
.tab{
  display: inline-block;
  width: 100%;
   font-size: 14px;
   height: 40px;
   line-height: 40px;
   
}
.time{
  border: 1px solid #dcdfe6;
  background: #fff;
  color: #606266;
   border-radius: 5px 5px 0 0;
}
.amount{
  border: 1px solid #dcdfe6;
  background: #fff;
  color: #606266;
   border-radius: 5px 5px 0 0;
}
.act{
  color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
    border-bottom:none;
}
.btn{
  margin-top: 50px;
}
.choose{
    background: #fff;
    margin-top:20px;
    padding-top:20px;
    padding-bottom:20px;
     border-radius: 5px;
}
.rio{
    width:100%;
    text-align:left;
}
.mb{
    margin-bottom:10px;
}
.footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    background:#fff;
    padding:30px 0 30px 0;
   
}
.pay{
    width:100%;
}
.tabbox{
    height: 40px;
}
</style>
