// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import AMap from 'vue-amap';
// import AMap from 'AMap'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "babel-polyfill"
Vue.config.productionTip = false
/* eslint-disable no-new */
 
// Vue.use(AMap);
// Vue.use(Table)
Vue.use(ElementUI)

  // 初始化vue-amap
//   var a = AMap.initAMapApiLoader({
//   // 高德key
//   key: '3423224473c50877f86187a73c90fac4',
//   // 插件集合 （插件按需引入）
//   plugin: ['AMap.Geolocation','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Driving'],
//   v: '1.4.9'
// });

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
