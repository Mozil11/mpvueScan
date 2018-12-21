import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Goods from '@/components/page/Goods'
import Mycar from '@/components/page/Mycar'
import Makesure from '@/components/page/Makesure'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods,
    },
    {
      path: '/mycar',
      name: 'Mycar',
      component: Mycar,
    },
    {
      path: '/makesure',
      name: 'Makesure',
      component: Makesure,
    }
  ]
})
