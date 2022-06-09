<template>
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
          <!-- *** -->
          <!-- NAME FIELD -->
          <form-input 
            name="name"
            type="text"
            :value="userInfo.name"
            label="Your name..."
            icon="user"
            :value-error="userInfo.nameError"
            @update:value="handleChange"
          />
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
import { useStore } from "vuex";
import { validateEmail, validatePassword, validateName } from '@/utils';
import { FlashMessage, FormInput } from '@/components';

const store = useStore();

const termsChecked = ref(false);

const msgFlash = ref({
  label: '',
  msg: '',
  flag: ''
});

const userInfo = reactive({
  name: '',
  nameError: '',
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
  !validateName(userInfo.name.trim())
    ? userInfo.nameError = userInfo.name ? 'Enter a valid name' : 'Name is required'
    : userInfo.nameError = ''
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
const register = () => {

  validateInput();

  if (!userInfo.nameError && !userInfo.emailError && !userInfo.passwordError) {
    if (termsChecked.value) {
      store.dispatch('user/registerUser', {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password
      }).catch((error) => {
        let msgError = 'An account is already registered with your email address';
        msgFlash.value = {label: 'Oh snap!', msg: msgError, flag: 'ERROR_FLAG'};
        console.log(error.code);
      })
    } else {
      let msgError = 'You must agree to our terms of services and privacy policy'
      msgFlash.value = {label: 'Warning!', msg: msgError, flag: 'WARNING_FLAG'};
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