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
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';



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
      .then(() => {
        alert('Successfully registered! Please login.');
        this.$router.push('/');
      })
      .catch(error => {
        alert(error.message);
      });
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