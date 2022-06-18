import { createRouter, createWebHistory } from "vue-router";
import { NotFound } from '@/components';
import { 
  AuthView, 
  HomeView, 
  ProductView, 
  OrderView,
  RegisterView, 
  LoginView, 
  SetupProfile,
  CartView,   
  PaymentView,
  SuccesfulPaymentView,
  FavouriteView
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
      { name: 'login', path: 'login', component: LoginView },
      { name: 'register', path: 'register', component: RegisterView },
      { name: 'setupProfile', path: 'profile', component: SetupProfile }
    ],
  },
  {
    path: "/profile",
    name: "profile",
    component: OrderView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductView,
  },
  {
    path: "/favourite",
    name: "favourite",
    component: FavouriteView,
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
