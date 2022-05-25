import { createStore } from 'vuex'

import product from './modules/product';
import user from './modules/user';

// Create a new store instance.
const store = createStore({
  strict: true,
  modules: {
    user,
    product,
  },
});

export default store;