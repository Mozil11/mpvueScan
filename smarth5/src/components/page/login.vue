<template>
    <div class="login">
        <div class="box">
            <div class="user">
                <span class="username">用户名：</span>
                <span class="inusre">
                    <el-input placeholder="请输入用户名" class="in" v-model="user.userName"></el-input>
                </span>
            </div>
            <div class="密码">
                <span class="pass">密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
                <span class="inpass">
                    <el-input placeholder="请输入密码" class="in" type="password" v-model="user.passWord"></el-input>
                </span>
            </div>
            <div class="log">
                <el-button type="primary" class="aaa" @click="gologin(user)">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {login} from './../http/http.js'
import bus from './../http/bus.js'

export default {
    data(){
        return{
            user:{
                 userName:'',
                 passWord:''
             },
        }
    },
    beforeRouteUpdate (to, from, next) {
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
        gologin(a){
            login(a).then(res=>{
                console.log(res)
                localStorage.setItem('userName',res.data.userName)
                
                this.$router.push({
                    path:'/',
                    query:{
                        userId:res.data.userId
                    }
                })
            })
        }
    }
}
</script>

<style scoped>
.in{
    width: 100%;
}
.box{
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 100px;
}
.username,.pass{
    display: inline-block;
    width: 65px;
    height: 50px;
    line-height: 50px;
    color: #606266;
}
.inusre,.inpass{
    display: inline-block;
    width: 180px;
}
.log{
    margin-top: 20px;
}
.aaa{
    width: 254px;
}
</style>
