import Vue from 'vue'
import Router from 'vue-router'
import login from '@/main/system/login'
import index from '@/main/basic/index'
import register from '@/main/system/register'
import forgetPwd from '@/main/system/forgetPwd'
import inIndex from '@/main/basic/inIndex'
import status from '@/main/system/status'

//模块路由文件
import warehouse from './warehouseRouter'
import main from './mainRouter'
import platformRouter from './platformRouter'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: forgetPwd
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
        path: '/status/:code',
        name: 'status',
        component: status,
        props: true
    },
    {
      name: 'inIndex',
      path: '/main',
      component: inIndex,
      children:[
        ...main,
        ...warehouse,
        ...platformRouter
      ]
    },
    {
        path: '*',
        redirect: '/status/404'
    }
  ]
})
