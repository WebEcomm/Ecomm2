.<template>
  <div class="form">
  <form class="login--form" @submit.prevent="login">
    <h2>Login</h2>
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
    <button type="submit">Login</button>
  </form>
</div>
</template>

<script>
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
export default {
methods: {
  login() {
    const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        alert('Successfully logged in');
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