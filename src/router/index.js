import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/components/NotFound'
import Header from '@/components/Header'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Header',
      component: Header
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})
