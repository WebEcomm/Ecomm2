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
        alert('Profile updated!');
        dispatch('setUserProfile', user)
        // ...
      }).catch((error) => {
        // An error occurred
        console.log(error);
        // ...
      });
    },
    loginUser ({dispatch}, {email, password}) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch('setUserProfile', user);
        })
    },
    registerUser ({dispatch}, {name, email, password}) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          localStorage.setItem('userToken', userCredential._tokenResponse.idToken);
          dispatch('updateUserProfile', name);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    },
    isLoggedUser ({dispatch}) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          dispatch('setUserProfile', user);
        }
      });
      /*const userToken = localStorage.getItem('userToken');
      console.log(userToken);
      if (userToken) {
        signInWithCustomToken(auth, userToken)
          .then(() => {
            // Signed in
            dispatch('setUserProfile');
            // ...
          })
          .catch((error) => {
            console.log(error);
            // ...
          })
      }*/
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