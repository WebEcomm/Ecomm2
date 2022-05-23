.<template>
  <div>
  <form class="login--form" @submit.prevent="register">
    <h2>Login</h2>
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
    <button type="submit">Login</button>
  </form>
</div>
</template>

<script>
import {firebase} from 'firebase/auth'
export default {
methods: {
  login() {
    firebase
    .auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        alert('Successfully logged in');
        this.$router.push('/dashboard');
      })
      .catch(error => {
        alert(error.message);
      });
  },
},
}
</script>

<style lang="scss">
.login--form {
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