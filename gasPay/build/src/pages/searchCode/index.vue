<template>
    <div class="saoCode">
		<img src="/static/bg.png" alt="" class="bg">
        <img src='/static/shab.png' alt="" @click="getcode" class="ma">
		<div class="btnbox">
			<button class="btn" @click="gotoSao">请 扫 描 设 备 码</button>
		</div>
		<div class="foot">
			微分格科技有限公司
		</div>
    </div>
	
</template>

<script>
           
export default {
    data(){
        return{
         data:'dianji',
	
        }
    },
   
    methods:{
        gotoSao(){
			this.data = 1111
            wx.scanCode({
                success: (res) => {
                    console.log(res)
					console.log(res.result.split('time/')[1])
				
					wx.setStorageSync('deviceNumber',res.result.split('time/')[1]);
					wx.navigateTo({
						url:'./../index/main'
					})
				},
				fail:(res)=>{
					this.data = res.result
				}
            })
        },
      
	},
	 onLoad(options) {
		 var deviceNumberUrl = decodeURIComponent(this.$root.$mp.query.q)
		 var deviceNumber = deviceNumberUrl.split('time/')[1]
          console.log(deviceNumber)
		if(deviceNumber!=undefined){
			wx.setStorageSync('deviceNumber',deviceNumber);
			wx.redirectTo({
						url:'./../index/main'
			})
		}
    },
    mounted(){
      
    },
   
    created(){
       
    }
}
</script>

<style>
.saoCode{
    text-align: center;
}
.ma{
	width: 200px;
	margin-top: 82px;
	height: 200px;
}
.btnbox{
	text-align: center;
	margin-top: 40px;
}
.btn{
	display: inline-block;
	height: 94rpx;
	line-height: 80rpx;
	width: 496rpx;
	border-radius: 45rpx;
	/* background:-webkit-linear-gradient(left,#3399ff,#1b81ff);

	background:-o-linear-gradient(right,#3399ff,#1b81ff);

	background:-moz-linear-gradient(right,#3399ff,#1b81ff);

	background:linear-gradient(to right,#3399ff,#1b81ff); */
	/* background: url('./../../../static/btn.png') ; */
	color: #ffffff;
	font-size: 16px;
	box-shadow: 2px 2px 5px #c7c6c6;
	border-style: solid;
  border-width: 2px;
  border-color: rgb(255, 255, 255);
  background-image: -moz-linear-gradient( 113deg, rgb(0,102,255) 0%, rgb(51,153,255) 100%);
  background-image: -webkit-linear-gradient( 113deg, rgb(0,102,255) 0%, rgb(51,153,255) 100%);
  background-image: -ms-linear-gradient( 113deg, rgb(0,102,255) 0%, rgb(51,153,255) 100%);
  opacity: 0.8;
  box-shadow: 0px 17px 50.76px 3.24px rgba(10, 70, 188, 0.35);
 
}
.btn:active{
	background-image: -moz-linear-gradient( 113deg, rgb(51,153,255) 0%, rgb(0,102,255) 100%);
  background-image: -webkit-linear-gradient( 113deg, rgb(51,153,255) 0%, rgb(0,102,255) 100%);
  background-image: -ms-linear-gradient( 113deg, rgb(51,153,255) 0%, rgb(0,102,255) 100%);
  opacity: 0.8;
  box-shadow: 0px 17px 50.76px 3.24px rgba(10, 70, 188, 0.06);
}
.foot{
	font-size: 12px;
	color: #c7c6c6;
	position: absolute;
	bottom: 25px;
	left: 0;
	right: 0;
	margin: auto;
}
.bg{
	position: absolute;
	z-index: -1;
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;
}
</style>
