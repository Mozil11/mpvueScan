import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Time from '@/components/deplentTime'
import Amount from '@/components/deplentAmount'
import ChoosePay from '@/components/choosePay'
import Result from '@/components/result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/Home/time'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/Home/time',
          name: 'Time',
          component: Time
        },
        {
          path:'/Home/amount',
          name:'Amount',
          component:Amount
        }
      ],
      
    },
    {
      path:'/choosePay/:machine',
      name:'ChoosePay',
      component:ChoosePay,
      
    },
    {
      path:'/result',
      name:'Result',
      component:Result
    }
    
  ]
})
