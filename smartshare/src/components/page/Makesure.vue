<template>
    <div class="makesure">
        <el-row type='flex'  justify="center">
            <el-col :span='19'>
                <div class="name">确认订单</div>
            </el-col>
            <el-col :span='19'>
                <el-row>
                    <el-col :span='4'>
                       <span>投放点：</span> 
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import bus from './../http/bus.js'
export default {
    data(){
        return{
            data:{}
        }
    },
    created(){
        bus.$on('data',msg=>{
            console.log(msg)
            this.data = msg;
            
        })
    }

}
</script>
<style scoped>
.name{
    text-align: left;
    font-weight: bold;
    padding-top: 40px;
}
.makesure{
    border-top: 1px solid #eeecec;
    margin-top: 56px;
}
</style>
