<template>
  <nav class="container">
    <!-- LOGO -->
    <router-link to="/" class="logo">
      <img 
        src="@/assets/images/logo.png" 
        alt="logo"
        class="img"
      />
    </router-link>
    <!-- MENU -->
    <nav-menu 
      @close-menu="closeMenu"
      :show-menu="showMenu"
      :links="menuLinks" 
    />
    <!-- BOUTON MENU -->
    <button 
      @click="openMenu"
      class="toggle"
    >
      <i class="ri-function-line"></i>
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

<style lang="scss">
@use '@/assets/styles' as *;

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $size-header-height;
  background: $color-body;
  .logo { display: flex; width: $size-xl; }
  .toggle { font-size: $size-xl; color: $color-white; }
}
</style>