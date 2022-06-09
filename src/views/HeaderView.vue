<template>
  <header class="header">
    <nav-bar />
  </header>
</template>

<script setup>
import { NavBar } from '@/components';
import { onMounted } from 'vue';

onMounted(() => {
  window.addEventListener('scroll', scrollHeader);
})

const scrollHeader = () => {
  const header = document.getElementsByTagName('header').item(0);
  const scrollY = window.pageYOffset;
  scrollY >= 30
    ? header.classList.add('scroll-header')
    : header.classList.remove('scroll-header')
}

</script>

<style scoped lang="scss">
@use '@/assets/styles' as *;

header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $font-fixed;
  width: 100%;
  background: $color-body;
  transition: .4s;
}
.scroll-header {
  box-shadow: $color-header-shadow;
}
</style>