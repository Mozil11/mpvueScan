<template>
    <div class="goods">
        <el-row type='flex'  justify="center">
            <el-col :span='19'>
                <el-row>
                    <el-col :span='12'>
                        <img :src="list[num].src" alt="" class=""/>
                    </el-col>
                    <el-col :span='12'>
                        <div class="goodsname">{{list[num].name}}</div>
                        <el-row>
                            <el-col :span='12' class="cont">租金500元/月</el-col> <el-col :span='12' class="cont">押金：免押金</el-col>
                            <el-col :span='12' class="cont"> <el-button type="success" round class="w">按约定结算</el-button></el-col> <el-col :span='12' class="cont">注：最少租一个月</el-col>
                            <el-col :span='12' class="cont"><el-button type="primary" plain class="w aa">立即下单</el-button></el-col><el-col :span='12' class="cont"><el-button type="primary" class="w aa">加入租赁车</el-button></el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import image from './../../../static/image.json'
export default {
    data(){
        return{
            list:image.image,
            id:''
        }
    },
    computed:{
        num(){
            console.log(this.$route.params.id)
            
            return this.id = localStorage.getItem('index') 
        }
    },
   
}
</script>
<style scoped>
.goods{
    border-top: 1px solid #eeecec;
    padding-top: 100px;
}
.goodsname{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}
.cont{
    margin-top: 30px;
    height: 40px;
    line-height: 40px;
    color:#909399;
}
.w{
    width: 100px;
}
.aa{
    width: 70%;
}
</style>

