<template>
  <header v-show="showNavbar">
    <nav-bar />
  </header>
</template>

<script setup>
import { NavBar } from '@/components';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = computed(() => store.getters['user/getUser']);

const showNavbar = ref(false);

onMounted(() => {
  checkUser(user.value);
})

watch(user, (currentUser) => {
  checkUser(currentUser);
})

const checkUser = (user) => {
  user
    ? showNavbar.value = true
    : showNavbar.value = true
}
</script>

<style lang="scss">
@use '@/assets/styles' as *;

header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $font-fixed;
  width: 100%;
  background: $color-body;
}
</style>