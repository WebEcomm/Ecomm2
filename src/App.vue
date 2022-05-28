<template>
  <main class="theme--dark">
    <header-view/>
    <router-view/>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { HeaderView } from '@/views';

const store = useStore();

onMounted(() => {
  store.dispatch('product/fetchProducts');
  store.dispatch('user/isLoggedUser');
})

</script>

<style lang="scss">
/*========== VARIABLES ==========*/
@use '@/assets/styles' as *;
/*========== GOOGLE FONTS `Poppins` ==========*/
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

/*========== BASE ==========*/
::-webkit-scrollbar { display: none; }
* { margin: 0; padding: 0; box-sizing: border-box; }
html {
  scroll-behavior: smooth;
  body {
    font-family: $font-body-font;
    font-size: $size-m;
    color: $color-text;
    background-color: $color-body;
    h1,h2,h3 { font-weight: $font-medium; color: $color-title; }
    ul { list-style: none; }
    a { text-decoration: none; } /* on utilise <router-link class="link"> pour les liens */
    .link { @extend a; cursor: pointer; }
    button { @extend input; cursor: pointer; }
    input { border: none; outline: none; background: none; }
    img { max-width: 100%; height: auto; object-fit: cover; }
    main { overflow: hidden; }
    section { 
      padding: 2*$size-xxl 0 $size-xxl 0;
    }
    .container { 
      max-width: $size-max-width;
      margin: 0 $size-xl;
    }
  }
}
</style>