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
          @update:value="handleChange"
        />
        <!-- BUTTONS -->
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
// import { useStore } from "vuex";
import { FormInput } from '@/components';

// const store = useStore();
const userInfo = ref({
  name: '',
  nameError: '',
});

// const user = computed(() => store.getters['user/getUser']);

const handleChange = ({name, value}) => {
  userInfo.value = {
    ...userInfo.value,
    [name]: value
  };
}

</script>

<style scoped lang="scss">

</style>