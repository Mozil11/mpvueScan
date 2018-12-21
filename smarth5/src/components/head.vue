<template>
    <div class="head">
        <el-button class="choose" v-show="show" @click="gochoose">
            选择商品
        </el-button>
        <span @click="gohome" class="abiao">
            微分格 智能共享平台
        </span>
        <el-button class="mine" circle @click="gotolog">
            <img src="./../../static/mine.svg" alt="" class="my">
        </el-button>
    </div>
</template>

<script>
import bus from './http/bus.js'
export default {
    data(){
        return{
            userId:'',
            show:true
        }
    },
    created(){
        bus.$on('show',msg=>{
            this.show = msg
        })
        
    },
   
  
    methods:{
        gochoose(){
            this.userId = this.$route.query.userId
            if(this.userId == ''||this.userId == undefined || this.userId == null){

                this.$router.push({
                    path:'/login'
                })
            }else{
                this.$router.push({
                    path:'/',
                    query:{
                        userId:this.userId
                    }
                })
            }
        },
        gotolog(){
            this.userId = this.$route.query.userId
            if(this.userId == ''||this.userId == undefined || this.userId == null){

                this.$router.push({
                    path:'/login'
                })
            }
            
        },
        gohome(){
            this.userId = this.$route.query.userId
            if(this.userId == ''||this.userId == undefined || this.userId == null){

                this.$router.push({
                    path:'/login'
                })
            }else{
                this.$router.push({
                    path:'/',
                    query:{
                        userId:this.userId
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.head{
    position: relative;
    height: 50px;
    border-bottom: 1px solid #eeeeee;
    box-shadow: 0px 0px 5px #d1cfcf;
    line-height: 50px;
    z-index: 10;
}
.abiao{
    font-size: 15px;
}
.my{
    width: 20px;
}
.mine{
    padding: 5px 6px;
    position: absolute;
    top: 17%;
    right: 8px;
}
.choose{
    color: #909399;
    position: absolute;
    top: 17%;
    left:8px;
}
</style>

