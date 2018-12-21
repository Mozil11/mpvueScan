<template>
    <div class="addplace">
        <div class="head">
            新增投放点
        </div>
        <el-form ref="formaa" :model="addplace" label-width="100px" class="addform" label-position="left">
                    <el-form-item label="投放点名称">
                        <el-input v-model="addplace.deliveryPlaceName" placeholder="请填入投放点名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属客户">
                        <div class="sd">{{username}}</div>
                        
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
                            <el-select v-model="addplace.sceneType" placeholder="请选择类型">
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
                        <el-input v-model="addplace.area"  placeholder='请填写省市区'></el-input>
                        <el-input v-model="addplace.address" placeholder='请填写详细地址'></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="addplace.description"  placeholder='请填写地点描述'></el-input>
                    </el-form-item>
                    <el-form-item label="投放点联系人">
                        <el-input type="text" v-model="addplace.deliveryPlaceLeader"  placeholder='请填写联系人'></el-input>
                        <!-- <el-input type="text" v-model="placedata.zhiwei" placeholder='请填写职位'></el-input> -->
                    </el-form-item>
                    <el-form-item label="联系人电话">
                        <el-input type="text" v-model="addplace.deliveryPlaceLeaderPhone" placeholder='请填写联系电话'></el-input>
                        
                    </el-form-item>
                    <!-- <el-form-item label="联系人固话">
                        <el-input type="text" v-model="placedata.tele"></el-input>
                        
                    </el-form-item> -->
                    <el-form-item>
                        <template slot-scope="scope">

                            <el-button type="primary" @click="addtouplace">保存</el-button>
                            <el-button @click="goback">返回</el-button>
                        </template>
                    </el-form-item>
                </el-form>
    </div>
</template>

<script>
import bus from './../http/bus.js'
import {addplace} from './../http/http.js'
export default {
    data(){
        return{
            username:"",
            userId:'',
            addplace:{
                //投放点编号
                // id:'',
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
        }
    },
    beforeRouteEnter (to, from, next) {
       console.log(to)
      
       next(vm=>vm.setData(to))
  },
    created(){
        this.userId = this.$route.query.userId;
        this.username = localStorage.getItem('userName');

    },
    methods:{
        setData(a){
            if(a.name=='home'){
                bus.$emit('show',false)
            }else{
                 bus.$emit('show',true)
            }
        },
        //新增投放点
        addtouplace(){
            this.addplace.userId = this.userId;
            addplace(this.addplace).then(res=>{
                console.log(res)
                 this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.$router.push({
                    path:'/mycar',
                    query:{
                    userId:this.$route.query.userId
                    }
                })
            })
        },
        goback(){
            this.$router.push({
                path:'/mycar',
                query:{
                   userId:this.$route.query.userId
                }
            })
        }
    }
}
</script>

<style scoped>
.addplace{
    padding-left: 10px;
    padding-right: 10px;
}
.addform{
    width: 90%;
    margin-left: 5%;
}
.head{
    font-size: 15px;
    font-weight: bold;
    color: #409EFF;
    text-align: left;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 10px;
}
.sd{
    text-align: left;
}
</style>
