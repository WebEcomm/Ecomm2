import { collection, doc, getDocs, updateDoc, where, query, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, getFileURL } from '@/firebase';
import { SET_NOTE, PUT_IN_CART, REMOVE_FROM_CART } from '@/store/mutation-types';


export default {
  namespaced: true,
  state: {
    currentProduct: {},
    products: [],
	cart: [],
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getCurrentProduct(state) {
      return state.currentProduct;
    },
	getProductsIdInCart(state) {
      return state.cart;
    },
    getNumberOfProducts(state) {
      return state.cart.length;
    },
    getProductsInCart(state) {
      let cartEntire = [];
      state.cart.map((element) => {
        console.log('element '+ element.productId);
        let newProduct = state.products.find((product) => 
         element.productId == product.id);
            cartEntire.push(newProduct);
      });
      return cartEntire;
    },
    getTotalCost(state, getters) {
       let totalCost = 0.0; 
      let cartEntire = getters.getProductsInCart; 
      cartEntire.map((item) => {
      totalCost += item.price;
      })
    return totalCost; 
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
    },
	[PUT_IN_CART](state, id){
      /* console.log(id); */
      state.cart.push(id);
      /* console.log(state.cart); */
    },
    [REMOVE_FROM_CART](state, id){
      state.cart.splice(id, 1);
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
	addToCart(state, productId){
      console.log(productId);
      state.commit("PUT_IN_CART", productId);
    },
    removeFromCart(state, productId) {
      state.commit("REMOVE_FROM_CART", productId);
    },
    async setNote ({dispatch, commit}, {productId, rate}) {
      await updateDoc(doc(db, 'product', productId), {
        rate: rate
      }).then(() => {
        dispatch('setCurrentProduct', productId)
        commit(SET_NOTE, rate);
      }).catch((error) => console.log(error))
    },
    async fetchProducts({commit}) {
      const querySnapshot = await getDocs(collection(db, 'product'));
      querySnapshot.docs.map( async (doc) => {
        const product = {
          ...doc.data(),
          id: doc.id, 
          image: await getFileURL(doc.data().image)
        };
        commit('setProducts', product);
      })
    },
    async test () {
      const q = query(collection(db, "cart"), where("clientId", "==", "1"));
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (docu) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(docu.id, " => ", docu.data().clientId);
        // Atomically add a new region to the "regions" array field.
        await updateDoc(doc(db, "cart", docu.id), {
          region: arrayUnion("greater_virginia", "dfhgjhkjl")
        });
        // Atomically remove a region from the "regions" array field.
        await updateDoc(doc(db, "cart", docu.id), {
          regions: arrayRemove("greater_virginia")
        });
      });

    }
  }  
};