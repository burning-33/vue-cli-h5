import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../App.vue'),
    redirect: '/home',
    children:[
      {
        path:'home',
        name:'home',
        component: () => import('../views/Home/index.vue'),
        redirect:'/home/homepage',
        children:[
          {
            path: 'homepage',
            name: 'homepage',
            component: () => import('../views/Home/HomePage/index')
          },
          {
            path: 'demo1',
            name: 'demo1',
            component: () => import('../views/Home/Demo1/index')
          },
          {
            path: 'demo2',
            name: 'demo2',
            component: () => import('../views/Home/Demo2/index')
          },
          {
            path: 'userpage',
            name: 'userpage',
            component: () => import('../views/Home/UserPage/index')
          }
        ]
      },
      {
        path:'signin',
        name:'signin',
        component: () => import('../views/Signin/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'notFound',
    component:() => import('../views/NotFound/index')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
