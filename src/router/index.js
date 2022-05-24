import { createRouter, createWebHistory } from "vue-router";
import { NotFound } from '@/components';
import { HomeView, ProductView, RegisterView, LoginView } from '@/views';

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path:"/register",
    name : "register",
    component: RegisterView,
  },
  {
    path:"/login",
    name : "login",
    component: LoginView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductView,
  },
  // { 
  //   name: 'movie',
  //   path: '/movie/:id', 
  //   component: () => import('@/views/MovieView.vue'), 
  //   props:true 
  // },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'not-found', 
    component: NotFound 
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
