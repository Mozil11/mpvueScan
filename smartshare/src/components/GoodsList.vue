<template>
    <div class="goods">
        <el-row type='flex'  justify="center">
            <el-col :span='19'>
                <el-row :gutter="4" type='flex'  justify="center" class="pp">
                    <template v-for="(list,index) in lists ">
                        <el-col :span='8' :key="index" >
                            <el-row>
                                    <!-- <el-col :span='24' :class="{'imgboxg':(index%2==0),'imgbox':(index%2!=0)}"> -->
                                    <el-col :span='24' class="bor">
                                        <img :src="list.deviceModelPicBigUrl" alt="" class="pic"/>
                                    </el-col>
                                <!-- <router-link to="/goods/"> -->
                                <!-- </router-link> -->
                                <el-col :span='24' class="under">
                                    <el-row>
                                        <el-col :span='14'>
                                            <div class="name">{{list.deviceModelName}}</div>
                                            <div class="dec">
                                                <span> {{list.deviceClassicName}}</span>
                                                <!-- <span>租金：{{list.metering_unit_price}}</span> -->
                                            </div>
                                        </el-col>
                                        <el-col :span='10'>
                                            <el-button size="small" class="itembutton bbb r" circle @click="backgoods(index)">
                                                <img src="./../../static/jian.svg" alt="" class="size ">
                                            </el-button>

                                             <el-badge :value="list.number" class="item">
                                                  <img src="./../../static/pay.svg" alt="" class="pay">
                                             </el-badge>
                                             <el-button size="small" class="itembutton aaa l" circle @click="buygoods(index)">
                                               <img src="./../../static/jia.svg" alt="" class="size ">
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-col>

                    </template>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// import 'whatwg-fetch'
import image from './../../static/image.json'
// import httpFetch from 'http-fetch'
import {getGoods,changeGoodsNum,getbuycar} from './http/http.js'
import {getCookie} from './http/rewritelocalStorage.js'
import bus from './http/bus.js'

export default {
    data(){
        return{
            lists:[
                
            ],
            goodsnumber:'',
           userId:''
        }
    },
    created(){
        this.userId = getCookie('userId')
        console.log(getCookie('userId'))
        bus.$on('userId',msg=>{
                    this.userId = getCookie('userId')
        })
    },
    computed:{
       
    },
    mounted(){
        this.getgoodslist()
    },
    methods:{
       
        // golink(d){
        //     localStorage.setItem('index',d)
        //     this.$router.push({
        //         path: '/goods',
        //         name: 'Goods',
        //         params: {
        //             id: d
        //         }
        //     })
        // },
        //获取设备列表
        getgoodslist(){
            getGoods().then(res=>{
                console.log(res);
               
                for(var i=0;i<res.data.length;i++){
                    var element = res.data[i]
                    console.log(element)
                     var obj = {
                        id:'',
                        projId:'',
                        deviceModelPicBigUrl:'',
                        deviceModelName:'',
                        deviceClassicName:'',
                        number:'',
                        supplierId:'',
                        chargingWayId:''
                    }
                    obj.id = element.id
                    obj.projId = element.projId;
                    obj.deviceModelPicBigUrl = element.deviceModelPicBigUrl;
                    obj.deviceModelName = element.deviceModelName;
                    obj.deviceClassicName = element.deviceClassicName;
                    obj.supplierId = element.supplierId
                    obj.chargingWayId = element.chargingWayId
                this.lists.push(obj);
                }
            })
           
        },
        //购物数量
        buygoods(i){
            if(this.userId==undefined || this.userId == ''){
                bus.$emit('logshow',true)
            }else{

                this.lists[i].number++;
                changeGoodsNum({
                    // projId:this.lists[i].projId,
                    userId:this.userId,
                    // supplierId:this.lists[i].supplierId,
                    deviceModelId:this.lists[i].id,
                    id:this.lists[i].id,
                    deliveryPlaceId:1234567,
                    // deviceChargingWayId:this.lists[i].chargingWayId,
                    deliveryNumber:1,
                    deviceModelName:this.lists[i].deviceModelName
                }).then(res=>{
                    console.log(res);
                    getbuycar({userId:this.userId}).then(res=>{
                        console.log(res);
                        this.data = res.data;
                        bus.$emit('data',this.data);
                    })
                })
               
            }
        },
        backgoods(i){
             if(this.userId==undefined){
                bus.$emit('logshow',true)
            }else{

                this.lists[i].number--
                if(this.lists[i].number < 0){
                    
                    this.lists[i].number = '';
                }else{
                    if(this.lists[i].number==0){
                         this.lists[i].number = '';
                    }
                   changeGoodsNum({
                       projId:this.lists[i].projId,
                       userId:this.userId,
                       supplierId:this.lists[i].supplierId,
                       deviceModelId:this.lists[i].id,
                       deliveryPlaceId:1234567,
                       deviceChargingWayId:this.lists[i].chargingWayId,
                       deliveryNumber:-1,
                       deviceModelName:this.lists[i].deviceModelName
                   }).then(res=>{
                       console.log(res);
                       getbuycar({userId:this.userId}).then(res=>{
                           console.log(res);
                           this.data = res.data;
                           bus.$emit('data',this.data);
                       })
                   })
                }
            }
        },
        
        
    }
}
</script>
<style scoped>
.goods{
    margin-top: 100px;
}
.pic{
    height: 49%;
}
.imgbox{
    height: 430px;
    line-height: 39;
}
.imgbox:hover,.imgboxg:hover,.bor:hover{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    transition: .3s;
}
.imgboxg{
    height: 430px;
    background: #f9f9f9;
    line-height: 39;
}
.name{
    font-size: 15px;
    font-weight: 700;
    margin-top: 20px;
}
.dec{
    font-size: 14px;
    color: #b4b4b4;
}
.under{
    height: 150px;

}
.pay{
    width: 30px;
}
.itembutton{
    margin-top: 20px;
}
.bbb{
  
    color: #b4b4b4;
}
.size{
    width: 10px;
}
.el-badge__content.is-fixed{
    top: 5px;
    right: 5px;
}
.r{
    padding: 10px;
    margin-right: 10px;
}
.l{
    padding: 10px;
    margin-left: 10px;
}
.bor{
    border: 1px solid #dfdcdc;
    height: 430px;
    line-height: 39;
}
.pp{
   flex-wrap: wrap;
   -webkit-flex-wrap:wrap;
    -webkit-box-lines:multiple;
    -moz-flex-wrap:wrap;
}
</style>
