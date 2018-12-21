import Vue from 'vue'
import Router from 'vue-router'
import Ingas from '@/components/Ingas'
import Energy from '@/components/energy'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Ingas',
      component: Ingas
    },
    {
      path: '/energy',
      name: 'Energy',
      component: Energy
    }
  ]
})
