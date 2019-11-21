import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Sqlmap from '@/components/Sqlmap'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/sqlmap',
      name: 'Sqlmap',
      component: Sqlmap
    }
  ]
})
