import { 
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "@/firebase";


export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    getUser (state) {
      return state.user;
    }
  },
  mutations: {
    setUser (state, newUser) {
      state.user = newUser;
    }
  },
  actions: {
    setUserProfile ({commit}, user)  {
      if (user !== null) {
        const userInfo = {
          uid: user.uid,
          name: user.displayName,
          email: user.email
        };
        commit('setUser', userInfo);
      }
    },
    updateUserProfile ({dispatch}, username) {
      const user = auth.currentUser;
      updateProfile(user, {
        displayName: username
      }).then(() => {
        // Profile updated!
        console.log('Profile updated!');
        dispatch('isLoggedUser');
        // ...
      }).catch((error) => {
        // An error occurred
        console.log(error);
        // ...
      });
    },
    loginUser ({dispatch}, {email, password}) {
      return new Promise((resolve, reject ) => {
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            dispatch('isLoggedUser');
          })
          .catch((error) => {
            reject(error);
          })
      });
    },
    registerUser ({dispatch}, {name, email, password}) {
      return new Promise((resolve, reject ) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            dispatch('updateUserProfile', name);
          })
          .catch((error) => {
            reject(error);
          })
      });
    },
    isLoggedUser ({state, dispatch}) {
      onAuthStateChanged(auth, (user) => {
        if (user && !state.user) {
          // User is signed in
          dispatch('setUserProfile', user);
        }
      });
    },
    logout ({state, commit}) {
      if (state.user) {
        signOut(auth).then(() => {
          // Sign-out successful.
          commit('setUser', null);
          alert('Sign-out successful.');
        }).catch((error) => {
          // An error happened.
          console.log(error);
        });
      }
    }
  },
}