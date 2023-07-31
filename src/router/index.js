import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/layout.vue'
import Login from '@/views/login/login.vue'
import Home from '@/views/home/home.vue'

const Product = ()=> import('@/views/product/product.vue')
const List = ()=> import('@/views/product/list/list.vue')
const Detail = ()=> import('@/views/product/list/detail.vue')

const Category = ()=> import('@/views/product/category/category.vue')
const Order = ()=>import('@/views/order/order.vue')
const OrderList = ()=>import('@/views/order/order-list/order-list.vue')
const Collect=()=>import('@/views/order/collect/collect.vue')
const Review=()=>import('@/views/order/review/review.vue')
const Advert=()=>import('@/views/advert/advert.vue')
const AdvertList=()=>import('@/views/advert/advert-list/advert-list.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:Layout,
    children:[
      {
        path:'/',
        name:'home',
        component: Home
      },{
        path:'/product',
        name:'product',
        component: Product,
        children:[{
          path:'list',
          name:'list',
          component: List
        },
        {
          path:'detail',
          name:'detail',
          component:Detail,
          meta:{
            activeMenu:'/product/list'
          }
        },
        {
          path:'category',
          name:'category',
          component: Category
        }]
      },
      {
        path:'/order',
        name:'order',
        component: Order,
        children:[{
          path:'order-list',
          name:'order-list',
          component: OrderList
        },{
          path:'collect',
          name:'collect',
          component: Collect
        },{
          path:'review',
          name:'review',
          component: Review
        }]
      },
      {
        path:'/advert',
        name:'advert',
        component: Advert,
        children:[{
          path:'advert-list',
          name:'advert-list',
          component: AdvertList
        }]
      },
    ]
  },{
    path:'/login',
    name:'login',
    component:Login,
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
