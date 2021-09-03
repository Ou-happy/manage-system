import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home/index.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页',
    },
    component: Home,
    redirect: '/main',
    children: [
      {
        name: 'Main',
        path: '/main',
        meta: {
          title: '欢迎体验',
        },
        component: () => import('@/views/Main/index.vue'),
      },
    ],
  },
  {
    name: 'Animate',
    path: '/animate',
    meta: {
      title: 'Animate',
    },
    component: () => import('@/views/Animate/index.vue'),
  },
  {
    name: 'Demo',
    path: '/demo',
    meta: {
      title: 'Demo',
    },
    component: () => import('@/views/Demo/index.vue'),
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/Login/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(), //若使用history模式部署需要运维/后端配置,所以此处使用hashhistory
  routes,
});

export default router;
