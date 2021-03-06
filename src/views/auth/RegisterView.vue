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
          <h2 class="title">Let's get started!</h2>
          <span class="subtitle">Please enter your valid data in order to create an account.</span>
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
          <div class="terms">
            <input type="checkbox" v-model="termsChecked" />
            <span class="description">
              I agree with the <span class="link">Terms of services</span> & privacy.
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
      :label="termsChecked ? 'Oh snap!' : 'Warning!'"
      :msg="msgError"
      :flag="termsChecked ? 'ERROR_FLAG' : 'WARNING_FLAG'"
      v-if="msgError" 
      @on-close="closeFlashMesssage"
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
const termsChecked = ref(false);

const user = computed(() => store.getters['user/getUser']);

watch(user, (currentUser) => {
  if (currentUser) {
    router.push({name: 'home'});
  }
});

watch(termsChecked, (terms) => {
  console.log(terms);
});

const closeFlashMesssage = () => { 
  msgError.value = '';
}

const validateInput = () => {
  !validateName(name.value.trim())
    ? nameError.value = name.value ? 'Enter a valid name' : 'Name is required'
    : nameError.value = ''
  !validateEmail(email.value.trim())
    ? emailError.value = email.value ? 'Enter a valid email address' : 'Email is required'
    : emailError.value = ''
  !validatePassword(password.value.trim())
    ? passwordError.value = password.value ? 'Password size must be at least 6' : 'Password is required'
    : passwordError.value = ''
}

/**
 * Créer un utilisateur
 */
const register = () => {

  validateInput();

  if (!nameError.value && !emailError.value && !passwordError.value) {
    if (termsChecked.value) {
      store.dispatch('user/registerUser', {
        name: name.value,
        email: email.value,
        password: password.value
      }).catch((error) => {
        msgError.value = 'An account is already registered with your email address';
        console.log(error.code);
      })
    } else {
      msgError.value = 'You must agree to our terms of services and privacy policy'
    }
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
            font-size: $size-m;
            color: $color-text;
          }
        }
      }
      .warning {
        .entry { border: 1px solid $color-error; }
        .msg { 
          margin-left: $size-m;
          font-size: $size-s;
          color: $color-error;
        }
      }
      .terms {
        display: flex;
        align-items: center;
        column-gap: $size-s;
        padding: 0 $size-m;
        .description { 
          font-size: $size-s; 
          .link { color: $color-primary; }
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
  position: fixed;
  bottom: $size-xl;
  left: 0;
  width: 100%;
  z-index: $font-tooltip;
}
</style>