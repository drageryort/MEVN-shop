import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta:{
      layout: 'CommonLayout'
    }
  },
  {
    path: '/product/:id',
    name: 'ProductCardView',
    component: () => import('../views/ProductCardView.vue'),
    meta:{
      layout: 'CommonLayout'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
