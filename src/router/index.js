import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from "@/components/HelloWorld"
import NavMenu from "@/components/NavMenu"
import AddProduct from "@/components/AddProduct"
import AddEpc from "@/components/AddEpc"
import AllProduct from "@/view/AllProduct"
import AllEpcProduct from "@/view/AllEpcProduct"
import TagStatus from "@/view/TagStatus"
import TagPosition from "@/view/TagPosition"
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'NavMenu',
      component: NavMenu,
      children: [
        {
          path: '/addProduct',

          name: 'addProduct',
          component: AddProduct
        },
        {
          path:'/allProduct',
          name:'allProduct',
          component:AllProduct
        },
        {
          path:'/epcProduct',
          name:'epcProduct',
          component:AllEpcProduct
        },
        {
          path:'/addEpc',
          name:'addEpc',
          component:AddEpc
        },
        {
          path:'/tagStatus',
          name:'tagStatus',
          component:TagStatus
        },
        {
          path:'/tagPosition',
          name:'tagPosition',
          component:TagPosition
        }
      ]
    }
  ]
})

export default router
