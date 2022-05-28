.<template>
  <section>
    <div class="auth container">
      <img 
        src="@/assets/images/login.jpg" 
        alt="auth_img" 
        class="img"
      />
      <form class="form"  @submit.prevent="register">
        <div class="header">
          <h2 class="title">Welcome back!</h2>
          <span class="subtitle">Login with your data that you entered during your registration.</span>
        </div>
        <div class="content">
          <!-- NAME FIELD -->
          <div :class="{field: true, warning: nameError}">
            <div class="entry">
              <div class="icon">
                <i class='bx bx-user '></i>
              </div>
              <input
                type="text"
                placeholder="Your name..."
                v-model="name"
                class="input"
              />
            </div>
            <span class="msg" v-if="nameError">
              {{ nameError }}
            </span>
          </div>
          <!-- EMAIL FIELD -->
          <div :class="{field: true, warning: emailError}">
            <div class="entry">
              <div class="icon">
                <i class='bx bx-envelope '></i>
              </div>
              <input
                type="text"
                placeholder="Email address..."
                v-model="email"
                class="input"
              />
            </div>
            <span class="msg" v-if="emailError">
              {{ emailError }}
            </span>
          </div>
          <!-- PASSWORD FIELD -->
          <div :class="{field: true, warning: passwordError}">
            <div class="entry">
              <div class="icon">
                <i class='bx bx-lock '></i>
              </div>
              <input
                type="text"
                placeholder="Password..."
                v-model="password"
                class="input"
              />
            </div>
            <span class="msg" v-if="passwordError">
              {{ passwordError }}
            </span>
          </div>
        </div>
        <div class="footer">
          <!-- LOGIN BUTTON -->
          <button type="submit" class="btn">Register</button>
          <!-- REDIRECT TO SIGN UP -->
          <div class="sign">
            Already have an account?
            <router-link :to="{name: 'login'}" class="sign--link link">
              Sign In
            </router-link>
          </div>
        </div>
      </form>
    </div>
    <flash-message 
      class="flash__msg" 
      :label="'Oh snap!'"
      :msg="msgError"
      :flag="'ERROR_FLAG'"
      v-if="msgError" 
    />
  </section>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { validateEmail, validatePassword, validateName } from '@/utils';
import { FlashMessage} from '@/components';
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const name = ref('');
const nameError = ref('');
const email = ref('');
const emailError = ref('');
const password = ref('');
const passwordError = ref('');
const msgError = ref('');

const user = computed(() => store.getters['user/getUser']);

watch(user, (currentUser) => {
  if (currentUser) {
    router.push({name: 'home'});
  }
});

watch(msgError, (currentValue) => {
  if (currentValue) {
    closeFlashMesssage();
  }
})

const closeFlashMesssage = () => { 
  let delay = 3000;
  setTimeout(() => {
    msgError.value = '';
  }, delay)
}

const validateInput = () => {
  !validateName(name.value)
    ? nameError.value = 'Name is invalid'
    : nameError.value = ''
  !validateEmail(email.value)
    ? emailError.value = 'Email is invalid'
    : emailError.value = ''
  !validatePassword(password.value)
    ? passwordError.value = 'Password size must be at least 6'
    : passwordError.value = ''
}

/**
 * Créer un utilisateur
 */
const register = () => {

  validateInput();

  if (!emailError.value && !passwordError.value) {
    store.dispatch('user/registerUser', {
      name: name.value,
      email: email.value,
      password: password.value
    }).catch((error) => {
      msgError.value = 'An account is already registered with your email adress';
      console.log(error.code);
    })
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles' as *;

.auth {
  display: grid;
  row-gap: $size-m;
  .img {
    @include shape-box(100%, 270px);
    border-radius: $size-m $size-m 0 0;
  }
  .form {
    display: grid;
    grid-template-rows: max-content 1fr max-content;
    row-gap: $size-m;
    .header {
      .subtitle { 
        font-size: $size-s; 
        color: $color-text-light; 
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      row-gap: $size-m;
      .field {
        .entry {
          display: flex;
          align-items: center;
          column-gap: $size-s;
          padding: $size-m;
          border-radius: $size-s;
          background-color: $color-body-alt;
          .icon { 
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: $size-xl; 
            color: $color-text-light;
          }
          .input {
            width: 100%;
            font-size: $size-l;
            color: $color-text;
          }
        }
      }
      .warning {
        .entry { border: 1px solid red; }
        .msg { 
          margin-left: $size-m;
          font-size: $size-s;
          color: $color-warning;
        }
      }
    }
    .footer {
      display: grid;
      row-gap: $size-m;
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: $size-m;
        border-radius: $size-s;
        font-size: $size-m;
        color: $color-white;
        background-color: $color-primary;
      }
      .sign {
        display: flex;
        justify-content: center;
        column-gap: $size-xs;
        font-size: $size-s;
        &--link {
          color: $color-primary;
          &:hover { color: $color-primary-alt; }
        }
      }
    }
  }
}
.flash__msg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>