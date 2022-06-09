<template>
  <nav class="container">
    <!-- LOGO -->
    <router-link :to="{name: 'home'}" class="link logo">
      <img 
        src="@/assets/images/logo.png" 
        alt="logo"
        class="img"
      />
      <span class="title">Headphone</span>
    </router-link>
    <!-- MENU -->
    <nav-menu 
      :showMenu="showMenu"
      :links="menuLinks" 
    />
    <!-- SEARCH BUTTON -->
    <button 
      class="btn"
    >
      <i class='bx bx-search' ></i>
    </button>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { NavMenu } from './';

const menuLinks = ref([
  { id: 1, name: 'Home', path: '/', icon: 'home-alt' },
  { id: 2, name: 'Products', path: '/products', icon: 'grid-alt' },
  { id: 3, name: 'Favourite', path: '/favourite', icon: 'heart' },
  { id: 4, name: 'Cart', path: '/cart', icon: 'shopping-bag' },
  { id: 4, name: 'Profile', path: '/profile', icon: 'user' },
]);

</script>

<style scoped lang="scss">
@use '@/assets/styles' as *;

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $size-header-height;
  @include media-for-tablet-landscape-up {
    height: $size-header-height + $size-xl;
  }
  .logo { 
    display: flex; 
    align-items: center;
    column-gap: $size-xxs;
    .img { width: $size-xl; }
    .title { font-weight: $font-medium; color: $color-title; }
  }
  .btn { font-size: $size-xl; color: $color-text; }
}
</style>