import Vue from 'vue'
import Router from 'vue-router'
import youTripHome from '@/components/youTripHome'
import communityComment from '@/components/communityComment'
import communityPeople from '@/components/communityPeople'
import communityRecommend from '@/components/communityRecommend'
import communityShare from '@/components/communityShare'
import country from '@/components/country'
import customerCase from '@/components/customerCase'
import customerCenter from '@/components/customerCenter'
import managerList from '@/components/managerList'
import orderDesigner from '@/components/orderDesigner'
import orderManage from '@/components/orderManage'
import roleManage from '@/components/roleManage'
import routeOrder from '@/components/routeOrder'
import visaManage from '@/components/visaManage'
import insurance from '@/components/insurance'
import visaOrder from '@/components/visaOrder'
import customerDesign from '@/components/customerDesign'
import addShops from '@/components/addShops'
import updateShops from '@/components/updateShops'
window.Vue = Vue;

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'youTripHome',
      component: youTripHome
    },
    {
      path: '/youTripHome',
      name: 'youTripHome',
      component: youTripHome
    },
    {
      path: '/communityComment',
      name: 'communityComment',
      component: communityComment
    },
    {
      path: '/communityPeople',
      name: 'communityPeople',
      component: communityPeople
    },
    {
      path: '/communityRecommend',
      name: 'communityRecommend',
      component: communityRecommend
    },
    {
      path: '/communityShare',
      name: 'communityShare',
      component: communityShare
    },
    {
      path: '/country',
      name: 'country',
      component: country
    },
    {
      path: '/customerCase',
      name: 'customerCase',
      component: customerCase
    },
    {
      path: '/addShops',
      name: 'addShops',
      component:addShops
    },
    {
      path: '/updateShops',
      name: 'updateShops',
      component:updateShops
    },
    {
      path: '/customerCenter',
      name: 'customerCenter',
      component: customerCenter
    },
    {
      path: '/customerDesign',
      name: 'customerDesign',
      component: customerDesign
    },
    {
      path: '/insurance',
      name: 'insurance',
      component: insurance
    },
    {
      path: '/managerList',
      name: 'managerList',
      component: managerList
    },
    {
      path: '/orderDesigner',
      name: 'orderDesigner',
      component: orderDesigner
    },
    {
      path: '/orderManage',
      name: 'orderManage',
      component: orderManage
    },
    {
      path: '/roleManage',
      name: 'roleManage',
      component: roleManage
    },
    {
      path: '/visaManage',
      name: 'visaManage',
      component: visaManage
    },
    {
      path: '/routeOrder',
      name: 'routeOrder',
      component: routeOrder
    },
    {
      path: '/visaOrder',
      name: 'visaOrder',
      component: visaOrder
    }
  ]
})

