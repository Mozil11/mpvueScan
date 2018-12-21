<template>
  <div id="app">
    <Head/>
    <router-view/>
  </div>
</template>

<script>

import Head from './components/Head'
export default {
  name: 'App',
  components:{
    Head
  }
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1200px;
}

.el-table th{
  text-align: center;
}
.el-badge__content.is-fixed{
      right: 9px;
    top: 10px;
}
</style>
