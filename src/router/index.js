import { createRouter, createWebHistory } from "vue-router";
import { NotFound } from '@/components';
import { 
  AuthView, 
  HomeView, 
  ProductView, 
  RegisterView, 
  LoginView, 
  SetupProfile,
  CartView,   
} from '@/views';

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path:"/connexion",
    name : "connexion",
    component: AuthView,
    children: [
      { name: 'login', path: '/login', component: LoginView },
      { name: 'register', path: '/register', component: RegisterView },
      { name: 'setupProfile', path: '/profile', component: SetupProfile }
    ],
  },
  {
    path: "/products",
    name: "products",
    component: ProductView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
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
