import { collection, doc, getDocs, updateDoc, where, query, arrayUnion, arrayRemove } from 'firebase/firestore';
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