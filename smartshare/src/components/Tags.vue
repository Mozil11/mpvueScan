<template>
    <div class="tags">
        <el-row type='flex' justify="center">
            <el-col :span='19'>
                <el-row>
                    <el-col :span='4' class="shangpin">
                        <el-dropdown trigger="click"  @command="goodstypehandleCommand">
                            <span class="el-dropdown-link">
                                商品类型<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="净水器">净水器</el-dropdown-item>
                                <el-dropdown-item command="空气净化器">空气净化器</el-dropdown-item>
                              
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-tag>{{goodstype == ''?'全部':goodstype}}</el-tag>
                    </el-col>
                    <el-col :span='8'>
                        <span class="el-dropdown-link">
                            <span class="choose">场所选择：</span>
                            <el-tag :key="tag" v-for="tag in place" closable :disable-transitions="false" @close="handleClose(tag)">
                            {{tag}}
                            </el-tag>
                        </span>
                        <el-dropdown trigger="click"  @command="placehandleCommand">
                            <span class="el-dropdown-link">
                                更多<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="酒店">酒店</el-dropdown-item>
                                <el-dropdown-item command="医院">医院</el-dropdown-item>
                              
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <el-col :span='6'></el-col>
                    <el-col :span='6'></el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            goodstype:'',
            place:['公寓','游泳馆'],
            chooseplace:''
        }
    },
    
    methods:{
        goodstypehandleCommand(command){
            this.goodstype = command;
           
        },
        placehandleCommand(command){
            this.chooseplace = command;
            this.place.push(command);
        },
        handleClose(tag) {
            this.place.splice(this.place.indexOf(tag), 1);
        },

    }
}
</script>
<style scoped>
.shangpin{
    text-align: left;
}
.tags{
    margin-top: 30px;
}
.choose{
    font-size: 14px;
}
.el-tag {
    margin-right: 10px;
}
</style>
