import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue"
import Shop from "../views/Shop.vue"
import Layout from "../views/Layout/Layout.vue"
import {checktoken} from "@/api/api"
Vue.use(VueRouter)

const routes = [
  //登录页面
  {
    path: '/',
    name: 'Login',
    component: Login,
   
  },
  //店铺
  {
    path: '/shop',
    name: 'Shop',
    component: Layout,
    redirect: "/shop",
    children: [{
      path: "/shop",
      meta:{breadList:["店铺管理"]},
      component: () => import("@/views/Shop.vue")
    }]
  },
  // 首页
  {
    path: '/home',
    name: 'home',
    component: Layout,
    redirect: "/home",
    children: [{
      path: "/home",
      meta:{breadList:["首页"]},
      component: () => import("@/views/Home.vue")
    }]
  },
  //商品管理
  {
    path: "/goods",
    name: "goodslist",
    component: Layout,
    meta:{breadList:["商品管理"]},
    redirect:"/goods/goodslist",
    children: [{
      path: "/goods/goodslist",
      meta:{breadList:["商品管理","商品列表"]},
      component: () => import("@/views/Goods/GoodsList.vue")
    }, {
      path: "/goods/goodsadd",
      meta:{breadList:["商品管理","商品添加"]},
      component: () => import("@/views/Goods/GoodsAdd.vue")
    }, {
      path: "/goods/goodscate",
      meta:{breadList:["商品管理","商品分类"]},
      component: () => import("@/views/Goods/GoodsCate.vue")
    }]
  },
  //订单统计
  {
    path: "/total",
    name: "total",
    meta:{breadList:["订单统计"]},
    component: Layout,
    redirect:"/total/goodstotal",
    children: [{
      path: "/total/goodstotal",
      meta:{breadList:["订单统计","商品统计"]},
      component: () => import("@/views/Total/GoodsTotal.vue")
    }, {
      path: "/order/ordertotal",
      meta:{breadList:["订单统计","订单统计"]},
      component: () => import("@/views/Total/OrderTotal.vue")
    }]
  },
  //账号
  {
    path: "/account",
    name: "account",
    component: Layout,
    meta:{breadList:["账号管理"]},
    redirect:"/account/accountadd",
    children: [{
      path: "/account/accountadd",
      meta:{breadList:["账号管理","账号添加"]},
      component: () => import("@/views/Account/AccountAdd.vue")
    }, {
      path: "/account/accountlist",
      meta:{breadList:["账号管理","账号列表"]},
      component: () => import("@/views/Account/AccountList.vue")
    }, {
      path: "/account/accountedit",
      meta:{breadList:["账号管理","账号修改"]},
      component: () => import("@/views/Account/AccountEdit.vue")
    },
    {
      path: "/account/personal",
      meta:{breadList:["账号管理","个人中心"]},
      component: () => import("@/views/Account/Personal.vue")
    }]
  },//订单
  { 
    path:"/order",
    name:"order",
    component: Layout,
    meta:{breadList:["订单管理"]},
    redirect:"/order/orderlist",
    children:[{
      path: "/order/orderedit",
      meta:{breadList:["订单管理","订单修改"]},
      component: () => import("@/views/Order/OrderEdit.vue")
    },
  {
    path: "/order/orderlist",
    meta:{breadList:["订单管理"]},
      component: () => import("@/views/Order/OrderList.vue")
  }]
  }

]

const router = new VueRouter({
  routes
})
//路由拦截
router.beforeEach((to,from,next)=>{
  if(to.path !="/"){
    checktoken(localStorage.getItem("token")).then((res)=>{
      if(res.data.code==0){
        next()
      }else{
        next("/")
      }
    })
  }else{
    next()
  }
})
export default router
