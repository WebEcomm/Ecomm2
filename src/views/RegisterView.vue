.<template>
  <div class="form">
  <form class="register--form" @submit.prevent="register">
    <h2>Register</h2>
    <input
      type="email"
      placeholder="Email address..."
      v-model="email"
    />
    <input
      type="password"
      placeholder="Password..."
      v-model="password"
    />
    <button type="submit">Register</button>
  </form>
</div>
</template>

<script>
import {getAuth, createUserWithEmailAndPassword/*,signInWithCustomToken*/} from 'firebase/auth';



export default {
    data() { 
  return { 
    email: '', 
    password: '', 
  }; 
},
methods: {
  register() {
   
     const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((reponse) => {
        //console.log(reponse.user);
        alert('Successfully registered! Please login.');
        this.$store.dispatch("setUser",reponse.user);
        this.$router.push('/');
      })
      .catch(error => {
        alert(error.message);
      });

      //import { getAuth } from "firebase/auth";

const user = auth.currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
 // const displayName = user.displayName;
 // const email = user.email;
 // const photoURL = user.photoURL;
 // const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
  console.log(uid);
} 
  },
},
}
</script>

<style lang="scss">
.form {
  margin-top : 50%;
  h2 {
    text-align: center;
  }
  input {
    padding : 0.8rem;
    margin : 1rem;
    border-color: white;
    color: white;
    border-bottom: 1px solid white;
  }
  button {
    padding : 15px 24px;
    font-size: 1rem;
    border: 1px solid white;
    color: white;
  }
}

</style>