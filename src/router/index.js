import Vue from 'vue'
import VueRouter from 'vue-router'

import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'signin'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  }
  ,
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
