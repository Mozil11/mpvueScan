<template>
    
    <div>
        
        <div class="buycar">
            <el-badge :value="value"  class="item">
                <el-button size="small" class="itembutton" circle @click="gotocar">
                    <img src="./../../static/pay.svg" alt="" class="pay">
                </el-button>
            </el-badge>
        </div>
        <Goodlist></Goodlist>
    </div>
   
</template>

<script>
import Goodlist from './goodlist';
import{getbuycar}from'./http/http.js'
import bus from './http/bus.js'
export default {
    data(){
        return{
            value:0,
            userId:137,
        }
    },
    components:{
      Goodlist
    },
    created(){
        this.userId = this.$route.query.userId;
        bus.$on('num',res=>{
            console.log(res)
            this.value= this.value + res;
        })
    },
    beforeRouteEnter (to, from, next) {
       console.log(to)
      
       next(vm=>vm.setData(to))
  },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to)
  //   // react to route changes...
  //   // don't forget to call next()
  //   this.setData(to);
  //   next()
  // },
    mounted(){
        getbuycar({userId:this.userId}).then(res=>{
            console.log(res);
            for(var i=0;i<res.data.length;i++){

                this.value += res.data[i].deliveryNumber;
            }
        })
    },
    methods:{
        setData(a){
            if(a.name=='home'){
                bus.$emit('show',false)
            }
        },
        gotocar(){
            this.$router.push({
                path:'/mycar',
                query:{
                    userId:this.userId
                }
            })
        }
    }
}
</script>

<style scoped>
.pay{
    width: 20px;
}
.buycar{
    position: fixed;
    border-radius: 50%;
    box-shadow: 0 2px 8px #979696;
    bottom: 50px;
    right: 50px;
}
.itembutton{
    user-select: none;
     -webkit-tap-highlight-color:transparent;
}
</style>
