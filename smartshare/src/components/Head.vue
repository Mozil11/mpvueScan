<template>
    <div class="head">
        <el-row type='flex' justify="center">
            <el-col :span='19'>
                <el-row>
                    <el-col :span='6' class="weilogo">
                        <router-link to="/" class="abiao">
                        微分格 智能共享平台
                        </router-link>
                    </el-col>
                    <el-col :span='18'>
                        <el-row type='flex' justify="end" class="menu">
                            <el-col :span="3" class="leftt">
                                <span :class="btn?'chooseimp':'choose'" @click="gotohome">
                                    选择商品
                                    </span>
                            </el-col>
                            <template v-if="userId!=undefined">
                               <el-col :span='7' class="fr">
                                   
                                    <i class="el-icon-mobile-phone"></i>
                                    <span>你好，</span>
                                    {{userName}}
                                    <el-button size="small" class="itembutton tuichu" round @click="loginout" type="primary">退出</el-button>
                                </el-col>
                            </template>
                            <template v-else>
                                <el-col :span='2' class="fr">
                                <!-- <el-badge value="" class="item"> -->
                                    
                                    <el-button size="small" class="itembutton" round @click="show=!show" type="primary">登录</el-button>
                                <!-- </el-badge> -->
                                </el-col>
                            </template>
                            
                            <el-col :span='2' class="fr">
                                <el-badge :value="value"  class="item aaaa">
                                    <el-dropdown  @command="handleCommand" trigger="click">
                                       
                                            <!-- <el-button size="small" class="itembutton aaa" circle @click="gotomycar"> -->
                                            <el-button size="small" class="itembutton aaa" circle >
                                                <img src="./../../static/pay.svg" alt="" class="pay">
                                            </el-button>
                                            <span class="block"></span>
                                        <template v-if="carList.length>0">
                                            <el-dropdown-menu slot="dropdown" style="top:34px">
                                                <template v-for="(car,i) in carList">
                                                    <el-dropdown-item :command='car.deviceModelName' :key="i">{{car.deviceModelName}} <span> <el-button size="small" class="deviceNumber" round>x{{car.deliveryNumber}}</el-button></span></el-dropdown-item>
                                                </template>
                                                <router-link to="/mycar">
                                                    <el-button size="small" type="primary" class='gocar'>去租赁车</el-button>
                                                </router-link>
                                            </el-dropdown-menu>
                                        </template>
                                        <template v-else>
                                            <el-dropdown-menu slot="dropdown" style="top:34px" class="tx">
                                                暂无商品
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                    
                                </el-badge>
                            </el-col>
                            <!-- <el-col :span='2' class="fr">
                                <el-button size="small" class="itembutton" round>退出</el-button>
                            </el-col> -->
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!-- 弹框 -->
        <transition name="el-fade-in-linear">
            <div class="ab" v-show="show">
                <div class="shadow" >
                 <el-button aria-label="Close" type='button' class="el-message-box__headerbtn icon" @click="show =!show"><i class="el-message-box__close el-icon-close "></i></el-button>
               
                    <el-row >
                        <el-col :span='5' class="lf">
                            用户名：
                        </el-col>
                        <el-col :span='15'>
                             <el-input v-model="user.userName" placeholder="请输入用户名"></el-input>
                        </el-col>
                        <el-col :span='5' class="lf">
                            密码：
                        </el-col>
                        <el-col :span='15'>
                             <el-input v-model="user.passWord" type='password' placeholder="请输入密码"></el-input>
                        </el-col>
                        <el-col :span='24'>
                             <el-button @click="mylogin(user)" type='primary' class="log">登陆</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>

import{getbuycar,login}from './http/http.js'
import {setCookie,getCookie,deleteCookie} from './http/rewritelocalStorage.js'
import bus from './http/bus.js'
　
　
export default {
    data(){
        return{
             carList:[],
             badge:false,
             show:false,
             user:{
                 userName:'',
                 passWord:''
             },
             value:'',
             userName:'',
             userId:'',
             btn:false
        }
    },
    created(){
        bus.$on('data',msg=>{
            console.log(msg)
                this.carList = msg;
                 if(this.carList.length == 0){
                this.badge =false
                this.value = ''
            }else{
                 this.value = 0
                this.badge =true
                for(var i=0;i<this.carList.length;i++){
                    this.value+=Number(this.carList[i].deliveryNumber)
                }
            }
            })
        bus.$on('logshow',msg=>{
            console.log(msg)
            this.show = msg
        })
        bus.$on('show',msg=>{
            console.log(msg)
            this.btn = msg
        })
        this.userId = getCookie('userId')
        this.userName = getCookie('userName')
      
    },
    computed:{
        // badgeget(){

        //     console.log(this.carList.length)
        //     if(this.carList.length == 0){
        //         this.badge =false
        //         this.value = ''
        //     }else{
        //          this.value = 0
        //         this.badge =true
        //         for(var i=0;i<this.carList.length;i++){
        //             this.value+=Number(this.carList[i].deliveryNumber)
        //         }
        //     }
        //     return this.value
        // }
    },
    
    mounted(){
         this.getbuycarlist({userId:this.userId})
    },
    methods:{
        gotohome(){
            this.$router.push({
                path:'/'
            })
            this.btn = false;
        },
        handleCommand(command){
            //  this.$message('click on item ' + command);
             this.$router.push({
                path: '/mycar',
                name: 'Mycar',
             })
        },
        //购物车列表
        getbuycarlist(a){
            getbuycar(a).then(res=>{
                console.log(res);
                this.carList = [];
                this.value = 0
                for(var i=0;i<res.data.length;i++){
                    var element = res.data[i]
                    var obj ={
                        deviceModelName:'',
                        deliveryNumber:''
                    }
                    obj.deviceModelName = element.deviceModelName;
                    obj.deliveryNumber = element.deliveryNumber
                    this.value+=Number(element.deliveryNumber)
                    this.carList.push(obj);
                }
            })
        },
        //登陆
        mylogin(a){
            console.log(a)
            login(a).then(res=>{
                console.log(res);
                if(res.data.code==500){
                   this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }else{
                    this.show = !this.show
                    this.userdata = res.data
                    this.userId = res.data.userId
                    this.userName = res.data.userName
                    setCookie('userId',this.userId)
                    setCookie('userName',res.data.userName)
                    bus.$emit('userId',res.data.userId);
                    getbuycar({userId: this.userId}).then(res=>{
                        console.log(res);
                        this.carList = [];
                        this.value = 0
                        for(var i=0;i<res.data.length;i++){
                            var element = res.data[i]
                            var obj ={
                                deviceModelName:'',
                                deliveryNumber:''
                            }
                            obj.deviceModelName = element.deviceModelName;
                            obj.deliveryNumber = element.deliveryNumber
                            this.value+=Number(element.deliveryNumber)
                            this.carList.push(obj);
                        }
                    })
                }
            })
        },
        gotomycar(){
            if(this.userId==''){
                this.show = !this.show;
            }else{
                this.$router.push({
                    path: '/mycar',
                })
            }
        },
        loginout(){
            deleteCookie('userId');
            deleteCookie('userName');
            this.$router.push({
                path:'/'
            })
            location.reload();
        }
    },
}
</script>

<style scoped>
.head{
    height: 55px;
    line-height: 55px;
    /* position: fixed; */
    width: 100%;
    top: 0;
    z-index: 10;
    background: #fff;
    border-bottom: 1px solid #eeeeee;
}
.abiao{
     text-decoration: none;
     color: #303133;
}
.itembutton{
    border:none;
    /* color: #909399; */
}
.fr{
    text-align: right;
}
.menu{
    font-size: 14px;
    color: #909399;
}
.tuichu{
    margin-left: 10px;
}
.weilogo{
    font-weight: bold;
    text-align: left;
}
.pay{
    width: 20px;
}
.aaa{
    /* margin-top: 7px; */
    position: absolute;
    top: 0;
    left: 0;
}
.block{
    width: 40px;
    height: 20px;
    display: inline-block;
}
.el-dropdown-menu.el-popper.el-dropdown-menu--small{
    margin: 0;
}
.tx{
    color: #909399;
    padding: 20px;
    font-size: 13px;
}
.deviceNumber{
    color: #F56C6C;
    padding-left: 7px;
    padding-right: 7px;
    padding-top: 2px;
    padding-bottom: 2px;
    border:1px solid #F56C6C;
    margin-left: 10px;
    margin-bottom: 5px;
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
    width: 339px;
    height: 172px;
    padding: 40px 40px 40px 40px;
    background: #fff;
    border-radius: 5px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
.log{
    width: 83.16667%;
}
.lf{
    text-align: left;
    margin-left: 28px;
}
.icon{
    position: absolute;
    right: 10px;
    top: 10px;
    color: #909399;
    border: none;
    background: none;
    font-size: 17px;
}

.el-badge__content.is-fixed {
    top: 18px;
    left: 9px;
}
.el-badge__content.is-dot{
    height: 10px;
    width: 10px;
}
.gocar{
    width: 100%;
    margin-top: 20px;
}
.aaaa{
    height: 41px;
}
.choose{
    color: #999999;
    font-size: 15px;
    font-weight: bold;
    margin-right: 10px;
    padding: 5px;
    border-radius: 5px;
}
.chooseimp{
    
    font-size: 15px;
    font-weight: bold;
    margin-right: 10px;
    padding: 5px;
    border-radius: 5px;
    color: #303133;
}
.choose:hover,.chooseimp:hover{
    background: #ecf5ff;
}
.leftt{
    text-align: left;
}
</style>

