// store.js
//import { computed } from 'vue';
import { createStore } from 'vuex';
import { productItems } from '@/data';
//import types from './';

const store = createStore({
  state: {
    products: productItems,
    user: null,
  },
  getters: {
    getAllProducts(state){
      return state.products;
    },
    getUser(state){
      return state.user;
    }
  },
  mutations:{
    setUser(state,newUser){
      state.user=newUser;
    }
  },
  actions:{
     setUser({commit},newUser){
      console.log(newUser);
        commit("setUser",newUser);
    }
  }
});

export default store;
