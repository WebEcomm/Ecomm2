.<template>
  <div class="form">
  <form class="register--form" @submit.prevent="register">
    <h2>Register</h2>
    <span>{{ user }}</span>
    <input
      type="text"
      placeholder="Name..."
      v-model="name"
    />
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
  <button @click="logout">Logout</button>
</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const name = ref('');
const email = ref('');
const password = ref('');

const logout = () => {
  store.dispatch('user/logout');
}

const user = computed(() => store.getters['user/getUser']);

/**
 * Créer un utilisateur
 */
const register = () => {
  store.dispatch('user/registerUser', {
    name: name.value,
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