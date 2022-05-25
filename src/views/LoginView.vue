.<template>
  <div class="form">
  <form class="login--form" @submit.prevent="login">
    <h2>Login</h2>
    <span>{{ user }}</span>
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
  <button @click="logout">Logout</button>
</div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const email = ref('');
const password = ref('');

onMounted(() => {
  store.dispatch('user/isLoggedUser');
})

const logout = () => {
  store.dispatch('user/logout');
}

const user = computed(() => store.state.user.user);

/**
 * Créer un utilisateur
 */
const login = () => {
  store.dispatch('user/loginUser', {
    email: email.value,
    password: password.value
  });
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