<template>
    <div class="changeplace">
       <div class="box">
           <div class="doc">修改投放点
                <el-button type="primary" @click="gotoadd" size="mini" class="btn">新增</el-button>
           </div>
           <el-form ref="form" :model="placeList[number]" label-width="100px" class="form" label-position="left">
                    <el-form-item label="投放点名称">
                        <el-input v-model="placeList[number].deliveryPlaceName"></el-input>
                    </el-form-item>
                    <el-form-item label="所属客户" class="tal">
                        
                        <div class="dddd">{{username}}</div>
                        
                    </el-form-item>
                    <!-- <el-form-item label="所属项目">
                        <el-select v-model="placedata.project" placeholder="请选择" class="xiangmu">
                        <el-option label="a" value="a"></el-option>
                        <el-option label="b" value="b"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="场所类型">
                        <!-- <el-col :span="12">
                            <el-select v-model="placedata.sceneType" placeholder="请选择类型">
                                <el-option label="公寓" value="公寓"></el-option>
                                <el-option label="酒店" value="酒店"></el-option>
                            </el-select>
                        </el-col> -->
                        
                        <el-col :span="12">
                            <el-select v-model="placeList[number].sceneType" placeholder="请选择类型">
                                <el-option label="酒店式公寓" value="酒店式公寓"></el-option>
                                <el-option label="公寓式酒店" value="公寓式酒店"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <!-- <el-form-item label="所在建筑">
                        <span>{{placedata.build}}</span>
                    </el-form-item>
                    <el-form-item label="建筑层数">
                        <el-input v-model="placedata.buildlevel"></el-input>
                    </el-form-item> -->
                    <el-form-item label="地理位置">
                        <el-input v-model="placeList[number].area"></el-input>
                        <el-input v-model="placeList[number].address" placeholder='请填写详细地址'></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="placeList[number].description"></el-input>
                    </el-form-item>
                    <el-form-item label="投放点联系人">
                        <el-input type="text" v-model="placeList[number].deliveryPlaceLeader"></el-input>
                        <!-- <el-input type="text" v-model="placedata.zhiwei" placeholder='请填写职位'></el-input> -->
                    </el-form-item>
                    <el-form-item label="联系人电话">
                        <el-input type="text" v-model="placeList[number].deliveryPlaceLeaderPhone"></el-input>
                        
                    </el-form-item>
                    <!-- <el-form-item label="联系人固话">
                        <el-input type="text" v-model="placedata.tele"></el-input>
                        
                    </el-form-item> -->
                    <el-form-item>
                        <template slot-scope="scope">

                            <el-button type="primary" @click="chnagetouplace" size="mini">保存</el-button>
                            
                            <el-button @click="goback" size="mini">返回</el-button>
                        </template>
                    </el-form-item>
                   
                </el-form>
       </div>
    </div>
</template>

<script>
import {getplace,changeplace} from './../http/http.js'
import bus from './../http/bus.js'

export default {
    data(){
        return{
            username:'',
            userId:'',
            placeList:[
                {
                    //投放点编号
                id:'',
                //投放点名称
                deliveryPlaceName:'',
                //投放点负责人
                 deliveryPlaceLeader:'',
                //负责人电话
                deliveryPlaceLeaderPhone:'',
                //业主或客户
                 clientName:'',
                //场所类型
                sceneType:'',
                //所在区域-省市区
                area:'',
                //详细地址
                address:'',
                //经度坐标
                longitude:1,
                //纬度坐标
                latitude:1,
                //投放点描述
                description:'',
                //设备型号
                deviceModelId:'',
                }
            ],
            number:0
        }
    },
    created(){
        this.number = this.$route.query.number
        this.userId = this.$route.query.userId;
        this.username = localStorage.getItem('userName')

    },
    mounted(){
        getplace({userId:this.userId}).then(res=>{
            console.log(res.data)
            this.placeList = res.data;
        })
    },
    beforeRouteEnter (to, from, next) {
       console.log(to)
      
       next(vm=>vm.setData(to))
  },
    methods:{
        setData(a){
            if(a.name=='home'){
                bus.$emit('show',false)
            }else{
                 bus.$emit('show',true)
            }
        },
        //修改投放点
       chnagetouplace(){
           this.placeList[this.number].userId = this.userId
           console.log(this.placeList[this.number])
           changeplace(this.placeList[this.number]).then(res=>{
               console.log(res);
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                

           })
       },
       goback(){
           this.$router.push({
               path:'/mycar',
               query:{
                   userId:this.$route.query.userId
               }
           })
       },
       gotoadd(){
           this.$router.push({
               path:'/addplace',
               query:{
                   userId:this.$route.query.userId
               }
           })
       }
    }
}
</script>

<style scoped>
.box{
    padding-left: 10px;
    padding-right: 10px;
}
.doc{
    font-size: 15px;
    font-weight: bold;
    color: #409EFF;
    text-align: left;
    margin-top: 20px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    margin-left: 2%;
    margin-right: 2%;
    border-bottom: 1px solid #eeeeee;
    position: relative;
}
.form{
    width: 90%;
     margin-left: 5%;
}
.dddd{
    text-align: left;
}
.btn{
   position: absolute;
   right: 0px;
}
</style>
