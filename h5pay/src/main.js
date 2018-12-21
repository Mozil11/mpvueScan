// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Select,Option, Row, Col, Radio, RadioGroup, RadioButton,Input,InputNumber,Tabs,TabPane,Form,FormItem,} from 'element-ui';
import router from './router'
import "babel-polyfill"

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Select)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Option)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
