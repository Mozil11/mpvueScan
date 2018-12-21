<template>
    <div class="goodlist">
        <template v-for="(list,i) in lists">
            <div class="goodbox" :key="i">
                <div class="imgbox">
                    <img :src="list.deviceModelPicMiddleUrl" alt="" class="goodimg">
                </div>
                <div class="info">
                    <div class="name">{{list.deviceModelName}}</div>
                    <div class="usertype">{{list.deviceClassicName}}</div>
                    <div class="do">
                        <el-button class="btn" @click="delgood(i)">
                            <img src="./../../static/jian.svg" alt="" class="pay">
                        </el-button>
                        <el-badge :is-dot="bools[i].bool">
                            <img src="./../../static/pay.svg" alt="" class="gou">
                        </el-badge>
                        <el-button class="btn" @click="addgood(i)">
                            <img src="./../../static/jia.svg" alt="" class="pay">
                        </el-button>
                    </div>
                </div>
            </div>
        </template>
        
    </div>
</template>

<script>
import {getGoods,changeGoodsNum} from './http/http.js';
import bus from './http/bus.js'
export default {
    data(){
        return{
            lists:[],
            userId:137,
            bools:[]
        }
    },
    mounted(){
        getGoods().then(res=>{
            console.log(res)
            this.lists = res.data
            for(var i = 0;i<res.data.length;i++){
                this.bools.push({bool:false})
            }
        })
    },
    methods:{
        //减
        delgood(i){
            changeGoodsNum({
                    // projId:this.lists[i].projId,
                    userId:this.userId,
                    // supplierId:this.lists[i].supplierId,
                    deviceModelId:this.lists[i].id,
                    id:this.lists[i].id,
                    deliveryPlaceId:1234567,
                    // deviceChargingWayId:this.lists[i].chargingWayId,
                    deliveryNumber:-1,
                    deviceModelName:this.lists[i].deviceModelName
                }).then(res=>{
                console.log(res)
               this.bools[i].bool = false
               bus.$emit('num',-1)
            })
        },
        //加
        addgood(i){
            changeGoodsNum({
                    projId:this.lists[i].projId,
                    userId:this.userId,
                    supplierId:this.lists[i].supplierId,
                    deviceModelId:this.lists[i].id,
                    id:this.lists[i].id,
                    deliveryPlaceId:1234567,
                    deviceChargingWayId:this.lists[i].chargingWayId,
                    deliveryNumber:1,
                    deviceModelName:this.lists[i].deviceModelName
                }).then(res=>{
                console.log(res)
                this.bools[i].bool = true
                bus.$emit('num',1)
            })
        }
    }
}
</script>

<style scoped>
.goodlist{
    padding-left: 10px;
    padding-right: 10px;
    text-align: left;
  
}
.imgbox{
    float: left;
     margin-top: 40px;
width: 51%;
}
.goodbox{
     height: 300px;
     border-bottom: 1px solid #eeeeee;
}
.goodimg{
    width: 100%;
}
.info{
    float: left;
    /* display: inline-block; */
    width: 140px;
    font-size: 14px;
     margin-top: 50px;
     margin-left: 5px;
}
.usertype{
    color: #909399;
    font-size: 13px;
    margin-top: 10px;
}
.pay{
    width: 12px;

}
.btn{
    border-radius: 50%;
    padding: 9px 10px;
}
.gou{
    width: 20px;
   
}
.do{
    margin-top: 40px;
}
</style>
