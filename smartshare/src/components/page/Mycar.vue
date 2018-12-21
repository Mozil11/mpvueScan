<template>
    <div class="mycar">
        <el-row type='flex'  justify="center">
            <el-col :span='19'>
                <el-row>
                    <el-col :span='3' class="title">
                        我的租赁车
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='24' class="tou aa">
                        请选择配送地点
                    </el-col>
                    <el-col :span='24' class="h">
                        <el-row class="bt">
                                <template v-if="options.length==0">
                                    <el-button type="primary" class="xiu" @click="show = !show">添加投放点</el-button>
                                </template>
                                <template v-else>
                                    <el-col :span='4' class="tou">
                                        <span>投放点：</span>
                                        <el-select v-model="value" placeholder="请选择" class="sele">
                                            <el-option
                                            v-for="(item,i) in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="i">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span='14' class="tou">
                                        <span class="build">地址：</span>
                                        <span>{{placedata[value].area}}</span>
                                        <span>{{placedata[value].address}}</span>
                                        <span class="man">联系人：</span>
                                        <span>{{placedata[value].deliveryPlaceLeader}}</span>
                                    
                                        <span>{{placedata[value].deliveryPlaceLeaderPhone}}</span>
                                    </el-col>
                                    <el-col :span='6' class="tou r">
                                        <el-button type="primary" class="xiu" @click="addshow = !addshow">添加投放点</el-button>
                                        <el-button type="primary" class="xiu" @click="show = !show">修改</el-button>
                                    </el-col>
                                </template>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row type='flex'  justify="center" class="list">
                    <el-col :span='24'>
                        <template v-for="(item,i) in data">

                            <el-row class="goods" :key="i">
                                <el-col :span='5' class="lll v">
                                    <img :src="item.deviceModelPicBigUrl" alt="" class="imgg">
                                </el-col>
                                <el-col :span='8' class="lll">
                                    <div class="cc kk">{{item.deviceModelName}}</div>
                                    <!-- <div class="cc">
                                        <span class="ss yy">{{item.price}}元/月</span>
                                        <span class="ss">{{item.yajin}}</span>
                                    </div> -->
                                </el-col>
                               
                                <el-col :span='7' class="lll">
                                    <span>数量：</span>
                                    <el-input-number v-model="item.deliveryNumber" @change="handleChange(item.deliveryNumber,item.id)" :min="1"  label="描述文字"></el-input-number>
                                </el-col>
                                <!-- <el-col :span='5' class="lll">
                                    <span>价格：</span>
                                    <span>￥{{item.price*item.deliveryNumber}}</span>
                                </el-col> -->
                                <el-col :span='4' class="lll todo">
                                    <el-button type="primary" @click="remove(i,item.id)" class="xiu">删除</el-button>
                                </el-col>
                            </el-row>
                        </template>
                        <template v-if="data.length==0">
                            <div class="emp">购物车为空</div>
                        </template>
                    </el-col>
                </el-row>
               
            </el-col>
            
        </el-row>
        <div class="foot">
        <el-row type='flex'  justify="center" class="boxx">
            <el-col :span='19'>
                <el-row  type='flex'  justify="end" class="bo">
                    <el-col :span='20'>
                        <div class="ma ri"><span>送往：</span><span>{{placedata[value].deliveryPlaceName}}</span>（{{placedata[value].address}} | {{placedata[value].area}}）</div>
                        <div class="ri"><span>联系人：</span>{{placedata[value].deliveryPlaceLeader}} <span>&nbsp;&nbsp;&nbsp;&nbsp;{{placedata[value].deliveryPlaceLeaderPhone}}</span></div>
                        <!-- <div class="ri"><span>联系电话：</span></div> -->
                    </el-col>
                    <!-- <el-col :span='3' class="total">
                        <span>总额：</span>
                        <span class="totalnumber">{{totalvalue}}</span>
                        <span>元</span>
                    </el-col> -->
                    <el-col :span='4' class="bb">
                        <template v-if="data.length==0">
                            <el-button type='primary' class="mt bot" plain>确定下单</el-button>
                        </template>
                        <template v-else>
                            
                                <el-button type='primary' class="mt bot" @click="open2">确定下单</el-button>
                           
                        </template>
                        
                    </el-col>
                </el-row>
            </el-col>
            
        </el-row>
        </div>
        <!-- 弹框 -->
        <transition name="el-fade-in-linear">
            <div class="ab" v-show="show">

            <div class="shadow" >
                <el-form ref="form" :model="placedata[value]" label-width="100px">
                    <el-form-item label="投放点名称">
                        <el-input v-model="placedata[value].deliveryPlaceName"></el-input>
                    </el-form-item>
                    <el-form-item label="所属客户" class="tal">
                        
                        <span>{{userName}}</span>
                        
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
                            <el-select v-model="placedata[value].sceneType" placeholder="请选择类型">
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
                        <el-input v-model="placedata[value].area"></el-input>
                        <el-input v-model="placedata[value].address" placeholder='请填写详细地址'></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="placedata[value].description"></el-input>
                    </el-form-item>
                    <el-form-item label="投放点联系人">
                        <el-input type="text" v-model="placedata[value].deliveryPlaceLeader"></el-input>
                        <!-- <el-input type="text" v-model="placedata.zhiwei" placeholder='请填写职位'></el-input> -->
                    </el-form-item>
                    <el-form-item label="联系人电话">
                        <el-input type="text" v-model="placedata[value].deliveryPlaceLeaderPhone"></el-input>
                        
                    </el-form-item>
                    <!-- <el-form-item label="联系人固话">
                        <el-input type="text" v-model="placedata.tele"></el-input>
                        
                    </el-form-item> -->
                    <el-form-item>
                        <template slot-scope="scope">

                            <el-button type="primary" @click="chnagetouplace">保存</el-button>
                            <el-button @click="show = !show">取消</el-button>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            </div>
        </transition>
        <!-- 弹框 -->
        <transition name="el-fade-in-linear">
            <div class="ab" v-show="addshow">

            <div class="shadow adddd" >
                <el-form ref="formaa" :model="addplace" label-width="100px">
                    <el-form-item label="投放点名称">
                        <el-input v-model="addplace.deliveryPlaceName" placeholder="请填入投放点名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属客户" class="tal">
                         
                         <span>{{userName}}</span>
                        
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
                            <el-button @click="addshow = !addshow">取消</el-button>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            </div>
        </transition>
    </div>
</template>
<script>
import {getplace,updateGoods,getbuycar,delGoods,changeplace,addplace,gotopay} from './../http/http.js';
import bus from './../http/bus.js'
import {getCookie} from './../http/rewritelocalStorage.js'

export default {
    data(){
        return{
            show:false,
            addshow:false,
            userName:'',
            options: [],
            value: 0,
            form:{
                buildname:'凯德大厦',
                city:'北京朝阳区东直门,XX街道XX号',
                linkman:'刘朋',
                phone:18600000589,
                zhiwei:'大堂经理'
            },
            totalvalue:0,
            data:[
               
            ],
            placedata:[{
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
                
            }],
            addplace:{
                userId:'',
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
    // watch:{
    //     initgettotal:(newValue,oldValue)=>{
    //         console.log(newValue,oldValue)
    //     }
    // },
    // computed:{
    //     //每次改变计算总额
    //     //开始获取总额
    //     initgettotal(){
    //         //初始化
    //         this.totalvalue = 0;
    //         this.data.forEach((i)=>{
    //             console.log(i)
    //             this.totalvalue += i.price*i.num1; 
    //         })
    //         return this.totalvalue;
    //     },
    // },
    created(){
        
        this.userId = getCookie('userId')
        this.addplace.userId = getCookie('userId')
        this.userName = getCookie('userName')
        bus.$on('userId',msg=>{
            
            console.log(this.userId)
        })
        this.getplacelist();
    },
    mounted(){
        this.getbuycarlist({userId:this.userId});
    },
    methods:{
         setData(to){
      
        if(to.name=='Mycar'){
            bus.$emit('show',true)
        }
      },
        //更新设备数量
       handleChange(a,id) {
            console.log(a);
            console.log(id);
             updateGoods({userId:this.userId,id:id,deliveryNumber:a}).then(res=>{
                 console.log(res);
                  getbuycar({userId:this.userId}).then(res=>{
                        this.data = []
                        console.log(res);
                        this.data = res.data;
                        bus.$emit('data',this.data);
                    })
             })
        },
        remove(i,id){
            this.data.splice(i,1);
            delGoods({userId:this.userId,id:id}).then(res=>{
                console.log(res);
                getbuycar({userId:this.userId}).then(res=>{
                this.data = []
                console.log(res);
                this.data = res.data;
                bus.$emit('data',this.data);
            })
            })
        },
        //获取购物列表
        getbuycarlist(a){
            getbuycar(a).then(res=>{
                this.data = []
                console.log(res);
                this.data = res.data;
                bus.$emit('data',this.data);
            })
        },
        //获取地点
        getplacelist(){
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
                    
                }
                    //修改
                this.placedata = res.data

            })
        },
       //修改投放点
       chnagetouplace(){
           this.placedata[this.value].userId = this.userId
          
           changeplace(this.placedata[this.value]).then(res=>{
               console.log(res);
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                getplace({userId:this.userId}).then(res=>{
                    this.options = []
                console.log(res);
                for(var i=0;i<res.data.length;i++){
                    var element = res.data[i]
                     //select
                    var obj={
                        value:'',
                        label:''
                    }
                    obj.value = element.id;
                    obj.label = element.address;
                    this.options.push(obj);
                    
                }
                    //修改
                this.placedata = res.data
                console.log(this.placedata)
                this.show = !this.show
            })

           })
       },
       //新增投放点
        addtouplace(){
            addplace(this.addplace).then(res=>{
                console.log(res)
                 this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                getplace({userId:this.userId}).then(res=>{
                    this.options = []
                console.log(res);
                for(var i=0;i<res.data.length;i++){
                    var element = res.data[i]
                     //select
                    var obj={
                        value:'',
                        label:''
                    }
                    obj.value = element.id;
                    obj.label = element.address;
                    this.options.push(obj);
                    
                }
                    //修改
                this.placedata = res.data
                console.log(this.placedata)
                this.addshow = !this.addshow
            })
            })
        },
        //去下单
        open2() {
            this.$confirm('确定是否下单', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success'
            }).then(() => {
                gotopay({deliveryPlaceId:this.placedata[this.value].id,leaseOrder:this.data,userId:this.userId}).then(res=>{
                console.log(res)
                
                this.$router.push({
                    path: '/',
                });
                bus.$emit('show',false);
                this.$confirm('单号：'+`${res.data.order_sn}`, '下单成功', {
                    confirmButtonText: '确    定',
                   center: true,
                    type: 'success',
                    showCancelButton:false
                }).then(() => {
                    this.getbuycarlist({userId:this.userId});
                })
            })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消下单'
                });          
            });
        },

       
    }
}
</script>
<style scoped>
.mycar{
    border-top: 1px solid #eeecec;
    padding-top: 40px;
}
.title{
    font-size: 18px;
    font-weight: bold;
    text-align: left;
}
.tou{
    text-align: left;
    color: #909399;
    font-size: 14px;
    margin-top: 20px;
}
.boxx{
     color: #909399;
    font-size: 14px;
    height: 100%;
}
.bo{
    height: 100%;
}
.aa{
    margin-top: 40px;
}
.part{
     color: #909399;
    font-size: 14px;
    text-align: left;
}
.h{
    height: 50px;
    line-height: 50px;
}
.bt{
    border-bottom: 1px solid #eeecec;
    padding-bottom: 20px;
}
.xiu{
    width: 100px;
    
}
.r{
    text-align: right;
}
.man{
    margin-left: 30px;
}
.list{
    margin-top: 108px;
    color: #909399;
    font-size: 14px;
    min-height: 250px;
        padding-bottom: 100px;

}
.imgg{
    width: 100px;
}
.lll{
    height: 100px;
    line-height: 100px;
}
.cc{
    line-height: normal;
     margin-top: 10px;
}
.kk{
    margin-top: 40px;
}
.ss{
    font-size: 12px;
   
}
.yy{
    margin-right: 20px;
   
}
.v{
        line-height: 13;
}
.goods{
    border-bottom: 1px solid #eeecec;
}
.sele{
    width: 50%;
}
.foot{
    background: #eeecec;
    height: 100px;
   position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 10;
    min-width: 1200px;
}
.mt{
    margin-top: 33px;
}
.ma{
    margin-top: 25px;
}
.bb{
    text-align: right;
   
}
.bot{
    width: 165px;
    height: 50px;
    margin-top: 25px;
}
.ri{
    text-align: right;
}
.total{
    line-height: 100px;
    color: #F56C6C;
}
.totalnumber{
    font-size: 24px;
    font-weight: bold;
}
.ab{
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 10;
}
.shadow{
    width: 400px;
    height: 449px;
    padding: 40px 80px 40px 80px;
    background: #fff;
    border-radius: 5px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
.xiangmu{
    width: 100%;
}
.emp{
    height: 200px;
    line-height: 200px;
    font-size: 20px;
    font-weight: bold;
}
.tal{
    text-align: left;
}
.todo{
    text-align: right;
}
</style>
