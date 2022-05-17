// store.js
import { computed } from 'vue';
import { createStore, mapState } from 'vuex';
import { productItems } from '@/data';
//import types from './';

const store = createStore({
  state: {
    products: productItems
  },
  getters: {
    getAllProducts(state){
      return state.products;
    }
  }
});

const con = computed(
  () => {
    return mapState(['id', 'title', 'price'])
  }
);

console.log(con.value)


export default store;