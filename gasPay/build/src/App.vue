<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
  

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
page{
  height: 100%;
  background: #f5f5f5;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  /* padding: 200rpx 0; */
  box-sizing: border-box;
  color: #606266;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
