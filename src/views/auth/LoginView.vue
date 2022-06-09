.<template>
  <section>
    <div class="auth container">
      <img 
        src="@/assets/images/login.jpg" 
        alt="auth_img" 
        class="img"
      />
      <form class="form"  @submit.prevent="login">
        <div class="header">
          <h2 class="title">Welcome back!</h2>
          <span class="subtitle">Login with your data that you entered during your registration.</span>
        </div>
        <div class="content">
          <!-- *** -->
          <!-- EMAIL FIELD -->
          <form-input 
            name="email"
            type="text"
            :value="userInfo.email"
            label="Email adress..."
            icon="envelope"
            :value-error="userInfo.emailError"
            @update:value="handleChange"
          />
          <!-- PASSWORD FIELD -->
          <form-input 
            name="password"
            type="password"
            :value="userInfo.password"
            label="Password..."
            icon="lock"
            :value-error="userInfo.passwordError"
            @update:value="handleChange"
          />
        </div>
        <div class="footer">
          <!-- LOGIN BUTTON -->
          <button type="submit" class="btn">Login</button>
          <!-- REDIRECT TO SIGN UP -->
          <div class="sign">
            Don't have an account?
            <router-link :to="{name: 'register'}" class="sign--link link">
              Sign up
            </router-link>
          </div>
        </div>
      </form>
    </div>
    <flash-message 
      class="flash__msg" 
      :label="msgFlash.label"
      :msg="msgFlash.msg"
      :flag="msgFlash.flag"
      v-if="msgFlash.msg" 
      @on-close="closeFlashMesssage"
    />
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import { validateEmail, validatePassword } from '@/utils';
import { FlashMessage, FormInput } from '@/components';
import { useStore } from "vuex";

const store = useStore();

const msgFlash = ref({
  label: '',
  msg: '',
  flag: ''
});

const userInfo = reactive({
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
});

const closeFlashMesssage = () => {
  msgFlash.value = {label: '', msg: '', flag: ''};
}

const handleChange = ({name, value}) => {
  userInfo[name] = value;
}

const validateInput = () => {
  !validateEmail(userInfo.email.trim())
    ? userInfo.emailError = userInfo.email ? 'Enter a valid email address' : 'Email is required'
    : userInfo.emailError = ''
  !validatePassword(userInfo.password.trim())
    ? userInfo.passwordError = userInfo.password ? 'Password size must be at least 6' : 'Password is required'
    : userInfo.passwordError = ''
}

/**
 * Créer un utilisateur
 */
const login = () => {

  validateInput();

  if (!userInfo.emailError && !userInfo.passwordError) {
    store.dispatch('user/loginUser', {
      email: userInfo.email,
      password: userInfo.password
    }).catch((error) => {
      msgFlash.value = {label: 'Oh snap!', msg: 'Wrong email or password', flag: 'ERROR_FLAG'};
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
</style>
