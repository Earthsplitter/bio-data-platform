import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/components/NotFound'
import Header from '@/components/Header'
import PatientList from '@/components/PatientList.vue'
import PatientDetail from '@/components/PatientDetail.vue'

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
      path: '/list/:page*',
      name: 'List',
      component: PatientList
    },
    {
      path: '/patient/:id',
      name: 'Patient',
      component: PatientDetail
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})
