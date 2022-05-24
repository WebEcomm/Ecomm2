import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {initializeApp} from 'firebase/app'
import store from './store'

const firebaseConfig = {

    apiKey: "AIzaSyBG8MKwyAIRu1Ekh80iHTmfNpinu4c0MKQ",
  
    authDomain: "ecomm-fd555.firebaseapp.com",
  
    projectId: "ecomm-fd555",
  
    storageBucket: "ecomm-fd555.appspot.com",
  
    messagingSenderId: "692954667163",
  
    appId: "1:692954667163:web:a38e0120cf4649a0f20e3e"
  
  };

export const firebase = initializeApp(firebaseConfig);

createApp(App).use(router).use(store).use(firebase).mount('#app')
