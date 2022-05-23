.<template>
  <div>
  <form class="register--form" @submit.prevent="register">
    <h2>Register</h2>
    <input
      type="email"
      placeholder="Email address..."
      v-model="email"
    />
    <input
      type="password"
      placeholder="password..."
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
.register--form {
  padding-top : 80px;
  input {
    border-color: white;
    color: white;
  }
  button {
    color: white;
  }
}

</style>