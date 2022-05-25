import { collection, getDocs } from 'firebase/firestore';
import { db, getFileURL } from '@/firebase';
import { SET_NOTE } from '@/store/mutation-types';


export default {
  namespaced: true,
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
      state.currentProduct.rate = note;
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
    setNote ({dispatch, commit}, {productId, rate}) {
      dispatch('setCurrentProduct', productId)
      commit(SET_NOTE, rate);
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
};