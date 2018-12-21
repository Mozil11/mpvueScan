<template>
  <div id="app">
    <Head/>
   
    <router-view/>
     
  </div>
</template>

<script>
import Head from './components/head'

export default {
  name: 'App',
  components:{
Head
  },
   
  methods:{
    
  }
}
</script>

<style>
body{
 background: #ffffff;
 
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}

</style>
