import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import PostList from '../views/PostList.vue'
import Write from '../views/Write.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'postList',
    component: PostList
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/write',
    name: 'write',
    component: Write
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
