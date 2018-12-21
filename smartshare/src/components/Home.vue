<template>
<div>
    
    <!-- <Banner/> -->
    <el-row type='flex' justify="center">
        <el-col :span='6' class="name">
            <span class="bottom">
            </span>
                PRODUCT CENTER
        </el-col>
    </el-row>
    <GoodsList/>
    <!-- <Tags/> -->
</div>
</template>
<script>

import Banner from './Banner'
import GoodsList from './GoodsList'
import bus from './http/bus.js'
// import Tags from './Tags'
export default {
    components:{
Banner,GoodsList
    },
    data(){
        return{

        }
    },
    beforeRouteEnter (to, from, next) {
       console.log(to)
      
       next(vm=>vm.setData(to))
  },
  methods:{
       setData(to){
      
        if(to.name=='Mycar'){
            bus.$emit('show',false)
        }
      },
  }
}
</script>
<style scoped>
.name{
    font-size: 15px;
    font-weight: 700;
    position: relative;
    margin-top: 80px;
    padding-bottom: 10px;
}
.bottom{
    background: #7a7a7a;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 2px;
    width: 20px;
}
</style>
