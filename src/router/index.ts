import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'upload',
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/downloads',
    name: 'downloads',
    component: () => import('@/pages/downloads.vue')
  }
]

export default routes
