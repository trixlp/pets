import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        name: 'Posts',
        path: 'posts',
        component: () => import('@/views/POST/posts.vue'),
      },
      {
        path: 'posts/:id',
        component: () => import('@/views/POST/posts-id.vue'),
      },
      {
        path: 'posts/clinic',
        component: () => import('@/views/MAPS/clinic.vue'),
      },
      {
        path: 'posts/shops',
        component: () => import('@/views/MAPS/shops.vue'),
      },
      {
        path: 'creating',
        component: () => import('@/views/POST/creating.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/PROFILE/profile.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/AUTH/login.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/AUTH/register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
