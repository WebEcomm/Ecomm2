import { createStore } from 'vuex'
import { collection, getDocs } from 'firebase/firestore';

import { SET_NOTE } from '@/store/mutation-types';
import { db, getFileURL } from '@/firebase';

// Create a new store instance.
const store = createStore({
  state: {
    currentProduct: {},
    products: [],
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getCurrentProduct(state) {
      return state.currentProduct;
    }
  },
  mutations: {
    setProducts (state, newProduct) {
      state.products.push(newProduct);
    },
    setCurrentProduct (state, product) {
      state.currentProduct = product;
    },
    [SET_NOTE] (state, note) {
      state.currentProduct.note = note;
    }
  },
  actions: {
    setCurrentProduct ({commit, state}, productId) {
      let productFound = {};
      state.products.map((product) => {
        if (productId == product.id) {
          productFound = product;
        }
      })
      commit('setCurrentProduct', productFound);
    },
    [SET_NOTE] ({state}, {productId, rate}) {
      let productFound = state.products.find((product) => productId === product.id);
      productFound.rate = rate;
    },
    async fetchProducts({commit}) {
      const querySnapshot = await getDocs(collection(db, 'product'));
      //let productsFound = [];
      querySnapshot.docs.map( async (doc) => {
        let productImage = await getFileURL(doc.data().image);
        let product = {...doc.data(),id: doc.id, image: productImage}
        //productsFound = [...productsFound, product];
        commit('setProducts', product);
      })
    }
  }  
})

export default store;