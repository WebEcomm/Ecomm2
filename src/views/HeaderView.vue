<template>
  <header>
    <nav-bar />
  </header>
</template>

<script setup>
import { NavBar } from '@/components';
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