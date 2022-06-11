<template>
  <section>
    <div class="profile auth container">
      <!-- UPLOAD IMAGE -->
      <div class="upload">
        <img src="" alt="#"/>
        <div class="camera"></div>
        <input type="file" />
      </div>
      <!-- FORM INPUT -->
      <form class="form">
        <form-input 
          name="name"
          type="text"
          :value="userInfo.name"
          label="Full name..."
          icon="user"
          :value-error="userInfo.nameError"
          @update-value="handleChange"
        />
        <form-input 
          name="birthdate"
          type="text"
          :value="userInfo.birthdate"
          label="Date of birth"
          icon="calendar"
          :value-error="userInfo.birthdateError"
          @update-value="handleChange"
        />
        <form-input 
          name="phone"
          type="tel"
          :value="userInfo.phone"
          label="Phone number..."
          icon="phone"
          :value-error="userInfo.phoneError"
          @update-value="handleChange"
        />
        <!-- BUTTONS -->
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
// import { useStore } from "vuex";
import { validateBirthdate } from '@/utils';
import { FormInput } from '@/components';

// const store = useStore();
const userInfo = ref({
  birthdate: '12',
  birthdateError: '',
  name: '',
  nameError: '',
  phone: '',
  phoneError: '',
});


// const user = computed(() => store.getters['user/getUser']);

const handleChange = ({name, value}) => {
  userInfo.value = {
    ...userInfo.value,
    [name]: value
  };
  checkInput(name);
}

const checkInput = (name) => {
  let bb = '';
  if (name === 'birthdate') {
    bb = userInfo.value.birthdate.split('/').join('');
    console.log(bb);
    validateBirthdate(userInfo.value.birthdate)
    ? console.log('OK') && bb.length % 2 === 0
      ? userInfo.value.birthdate += '/' 
      : null
    : userInfo.value.birthdate = userInfo.value.birthdate.slice(0,-1)
  }
  console.log(userInfo.value.birthdate);
}

</script>

<style scoped lang="scss">

</style>