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
  PaymentView,
  SuccesfulPaymentView,
} from '@/views';

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { transition: 'slide-left' },
  },
  {
    path:"/connexion",
    name : "connexion",
    component: AuthView,
    children: [
      { name: 'login', path: 'login', component: LoginView },
      { name: 'register', path: 'register', component: RegisterView },
      { name: 'setupProfile', path: 'profile', component: SetupProfile }
    ],
  },
  {
    path: "/products",
    name: "products",
    component: ProductView,
    meta: { transition: 'slide-right' },
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/payment/:price",
    name: "payment",
    component : PaymentView,
  },
  {
    path: "/successful-payment",
    name: "successfulPayment",
    component: SuccesfulPaymentView,
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
