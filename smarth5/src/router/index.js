import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Mycar from '@/components/page/mycar'
import Changeplace from '@/components/page/changeplace'
import Addplace from '@/components/page/addplace'
import Login from '@/components/page/login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/mycar',
      name: 'mycar',
      component: Mycar
    },
    {
      path: '/changeplace',
      name: 'changeplace',
      component: Changeplace
    },
    {
      path: '/addplace',
      name: 'addplace',
      component: Addplace
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
