<template>
  <nav class="container">
    <!-- LOGO -->
    <router-link :to="{name: 'home'}" class="link logo">
      <img 
        src="@/assets/images/logo.png" 
        alt="logo"
        class="img"
      />
      <span>Headphone</span>
    </router-link>
    <!-- MENU -->
    <nav-menu 
      @close-menu="closeMenu"
      :showMenu="showMenu"
      :links="menuLinks" 
    />
    <!-- BOUTON MENU -->
    <button 
      @click="openMenu"
      class="toggle"
    >
      <i class='bx bx-grid-alt' ></i>
    </button>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { NavMenu } from './';
const menuLinks = [
  { id: 1, name: 'Home', path: '/' },
  { id: 2, name: 'Specs', path: '/specs' },
  { id: 3, name: 'Case', path: '/cases' },
  { id: 4, name: 'Products', path: '/products' },
  { id: 4, name: 'Login', path: '/login' },
  { id: 4, name: 'Register', path: '/register' },
];

const showMenu = ref(false);

//const emit = defineEmits(['openMenu'])

const openMenu = () => {
  console.log('menu open!')
  showMenu.value = true;
}

const closeMenu = () => {
  console.log('menu closed!')
  showMenu.value = false;
}

</script>

<style scoped lang="scss">
@use '@/assets/styles' as *;

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $size-header-height;
  background: $color-body;
  .logo { 
    display: flex; 
    align-items: center;
    column-gap: $size-xxs;
    width: $size-xl; 
  }
  .toggle { font-size: $size-xl; color: $color-text; }
}
</style>