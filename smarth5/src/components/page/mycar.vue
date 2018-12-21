<template>
    
    <div class="mycar">
        <div class="place">
            <span class="title">

            配送地点
            </span>
            <div class="info">
                <template v-if="options.length==0">
                   <div class="placename" @click="gotoadd">
                       新增投放点
                       <span class="rightbox">
                           <img src="./../../../static/right.svg" alt="">
                       </span>
                   </div>
                </template>
                <template v-else>
                    <div class="toufang">
                        <span>投放点：</span>
                        <el-select v-model="value" placeholder="请选择" class="sele" size="mini">
                            <el-option
                            v-for="(item,i) in options"
                            :key="item.value"
                            :label="item.label"
                            :value="i">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="placename" @click="changeplace">
                        <div class="haveinfo">
                             <span>{{placedata[value].area}}</span>
                              <span>{{placedata[value].address}}</span>
                        </div>
                        <div class="userinfo">
                            <span>{{placedata[value].deliveryPlaceLeader}}</span>       
                            <span>{{placedata[value].deliveryPlaceLeaderPhone}}</span>
                        </div>
                        <span class="rightbox">
                            <img src="./../../../static/right.svg" alt="">
                        </span>
                   </div>
                </template>
            </div>
        </div>
        <div class="buycar">
            <template v-for="(item,i) in buycardata">
                <div class="carlist" :key="i">
                    <span class="imag">
                        <img :src="item.deviceModelPicBigUrl" alt="">
                    </span>
                    <span class="name">
                        <div class="mode">

                        {{item.deviceModelName}}
                        </div>
                        <span class="num">
                            <span class="g">数量：</span>
                            <el-input-number v-model="item.deliveryNumber" @change="handleChange(item.deliveryNumber,item.id)" :min="1"  label="描述文字" size="mini" class="innumber"></el-input-number>
                            <el-button type="primary" @click="remove(i,item.id)" size="mini">删除</el-button>
                        </span>
                    </span>
                   
                </div>
            </template>
            <template v-if="buycardata.length==0">
                <div class="emp">购物车为空</div>
            </template>
        </div>
        <div class="footer">
            <template v-if="buycardata.length==0">
                <el-button type='primary' class="mt bot" plain>确定下单</el-button>
            </template>
            <template v-else>
                
                    <el-button type='primary' class="mt bot" @click="open2">确定下单</el-button>
                
            </template>
        </div>
    </div>
    
</template>

<script>
import {getplace,getbuycar,updateGoods,delGoods,gotopay} from './../http/http.js'
import bus from './../http/bus.js'
export default {
    data(){
        return{
            options:[],
            placedata:{

            },
            value:0,
            userId:'',
            buycardata:[]
        }
    },
    created(){
        this.userId = this.$route.query.userId;
    },
    beforeRouteEnter (to, from, next) {
       console.log(to)
      
       next(vm=>vm.setData(to))
  },
    mounted(){
        getplace({userId:this.userId}).then(res=>{
            console.log(res);
            this.options = []
            for(var i=0;i<res.data.length;i++){
                var element = res.data[i]
                    //select
                var obj={
                    value:'',
                    label:''
                }
                obj.value = element.id;
                obj.label = element.deliveryPlaceName;
                this.options.push(obj);
                this.placedata = res.data
            }
        });
        if(this.userId == ''||this.userId==undefined){
            this.$router.push({
                path:'/login'
            })
        }else{
            getbuycar({userId:this.userId}).then(res=>{
                console.log(res)
                this.buycardata = []
               
                this.buycardata = res.data;
            })
        }
    },
    methods:{
        setData(a){
            if(a.name=='home'){
                bus.$emit('show',false)
            }else{
                bus.$emit('show',true)
            }
        },
         //更新设备数量
       handleChange(a,id) {
            console.log(a);
            console.log(id);
             updateGoods({userId:this.userId,id:id,deliveryNumber:a}).then(res=>{
                 console.log(res);
                  
             })
        },
        remove(i,id){
            this.buycardata.splice(i,1);
            delGoods({userId:this.userId,id:id}).then(res=>{
                console.log(res);
            
            })
        },
        //去下单
        open2() {
            this.$confirm('确定是否下单', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            }).then(()=>{

            gotopay({deliveryPlaceId:this.placedata[this.value].id,leaseOrder:this.data,userId:this.userId}).then(res=>{
                console.log(res)
                setTimeout(()=>{
                    this.$confirm('单号：'+`${res.data.order_sn}`, '下单成功', {
                        confirmButtonText: '确    定',
                       center: true,
                        type: 'success',
                        showCancelButton:false
                    })
                },300)
               this.$router.push({
                            path: '/',
                            query:{
                                userId:this.userId
                            }
                           
                        })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '下单失败'
                });          
            });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消下单'
                });          
            });
        },
        changeplace(){
            this.$router.push({
                    path: '/changeplace',
                    query:{
                        number:this.value,
                        userId:this.userId
                    }
                })
        },
        gotoadd(){
            this.$router.push({
                    path: '/addplace',
                    query:{
                        userId:this.userId
                    }
            })
        }
    }
}
</script>

<style scoped>
.title{
    color: #409EFF;
}
.mycar{
    padding-left: 10px;
    padding-right: 10px;
}
.info{
    border-bottom: 1px solid #eeeeee;
    margin-top: 10px;
}
.place{
    font-size: 12px;
    text-align: left;
    margin-left: 10px;
    margin-top: 20px;
    color: #909399;
}
.placename{
    height: 70px;
    line-height: 70px;
    font-size: 16px;
    position: relative;
    margin-top: 15px;
}
.rightbox{
   position: absolute;
   height: 70px;
    line-height: 70px;
    /* display: inline-block; */
    right: 0;
        top: 0;
}
.rightbox img{
    width: 20px;
vertical-align: sub;
}
.toufang{
    margin-top: 10px;
}
.sele{
    width: 76%;
}
.haveinfo{
    height: 40px;
    line-height:40px ;
    font-size: 15px;
    width: 90%;
    white-space:nowrap; 
    overflow-x: scroll;
    overflow-y: hidden
}
.userinfo{
    height: 20px;
    line-height:20px ;
    font-size: 13px;
}   
.carlist{
    height: 100px;

}
.imag,.name{
    float: left;
    height: 100%;
}
.imag{
    width: 89px;
}
.mode{
    font-size: 13px;
    text-align: right;
    margin-top: 20px;
    margin-bottom: 20px;
}
.num{
    font-size: 14px;
   
}
.innumber{
    width: 95px;
}
.g{
    color: #909399;
    font-size: 13px;
}
.buycar{
    min-height: 367px;
    padding-bottom: 68px;
}
.carlist{
    margin-top: 20px;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 10px;
}
.name{
    margin-left: 10px;
    width: 67%;
    text-align: right;
}
.footer{
    background: #eeeeee;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    left: 0;
    line-height: 70px;
    text-align: right;
    z-index: 2
}
.bot{
    height: 100%;
}

</style>
