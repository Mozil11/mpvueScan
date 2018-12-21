<template>
  <div id="app">
    <div class="head">
      <div class="icon">
        <img src="./../static/icon.png" alt="">
      </div>
      <div class="name">
        物流服务云分享平台
      </div>
      <div class="log" v-if="!islog">
         <a  href="#" @click="login">
            登陆
          </a>
        
      </div>
      <div class="out" v-else>
        <span>
        您好，王师傅  - 18600920001  -  顺丰公司卡车司机
        </span>
        <span class="l">|</span>
        <a href="#" @click="logout">退出</a>
        
      </div>
    </div>
    
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  data(){
    return{
      isgasact:'ingas act',
      isenact:'pushenergy',
      islog:false,
      radio:"1",
      value:'',
      options:[{
          value: '选项',
          label: '黄金糕'
        },],
        value1:'',
      options1:[{
          value: '选项1',
          label: '黄金糕1'
        },],
        value2:'',
      options2:[{
          value: '选项2',
          label: '黄金糕2'
        },]
    }
  },

   created(){
    
  },
  
  watch:{
       
    },
  methods:{
    radiochange(e){
      console.log(e)
      if(e == '1'){
        this.$router.push({
            path: '/',
        })
      }else{
        this.$router.push({
            path: '/energy',
        })
      }
    },
    selectchange(e){
      console.log(e)
    },
    selectchange1(e){
      console.log(e)
    },
    selectchange2(e){
      console.log(e)
    },
    login(){
        this.islog = true;
    },
    logout(){
      this.islog = false;
    },
    search(){
      
    }
  }
}
</script>

<style>

html{
 height: 100%;
}
body{
  height: 98%;
  padding: 0;
  margin: 0;
}
#app {
  height: 90%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* min-width: 1280px; */
  /* margin-top: 60px; */
}
.head{
  width: 100%;
  height: 80px;
  line-height: 80px;
}
.line{
  background: #2c3e50;
  height: 1px;
  width: 100%;
}
.head>div{
  float: left;
 height: 80px;
  line-height: 80px;
  
}
.icon{
  margin-right: 20px;
  margin-left: 20px;
}
.icon img{
  width: 80px;
  border-radius: 50%;
  vertical-align: middle;
}
.name{
  font-size: 20px;
}
.head .log{
  float: right;
  text-align: right;
  color: #137be2;
  margin-right: 20px;
  height: 80px;
  line-height: 80px;
}
.head .out{
  float: right;
  margin-right: 20px;
 height: 80px;
  line-height: 80px;
  font-size: 14px;
}
a{
  font-size: 14px;
}
.l{
  margin-left: 10px;
  margin-right: 10px;
}
.tupian{
  text-align: right;
}
.tupian img{
  width: 50px;
}
.mine{
  margin-left: 10px;
  margin-right: 10px;
}

.ingas,.pushenergy{
  position: absolute;
}
.ingas,.pushenergy{
  top: 0;
  bottom: 0;
  margin: auto;
  height: 60px;
  line-height: 60px;
  font-size: 25px;
  background: #bdbbbb;
  color: #fff;
  border-radius: 40px;
  padding-left: 40px;
  padding-right: 40px;
}
a{

 text-decoration:none;
}
.ingas{
  left: 20px;
}
.pushenergy{
  left: 250px;
}
.act{
  background: #137be2;
}

.weizhi{
  margin-top: 20px;
}
.lf{
  margin-left: 10px;
}
.chong,.sousuo{
  position: absolute;
  width: 70px;
  border: 1px solid #409EFF;
  border-radius: 5px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  right: 25px;
}
.chong{
  color: #409EFF;
  top: 15px;
}
.sousuo{
  color: #fff;
  background: #409EFF;
  top: 63px;
}
.sousuo:active,.chong:active{
  background: #137be2;
}
</style>
