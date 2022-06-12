<template>
  <main class="theme--dark">
    <header-view v-if="showHeader"/>
    <router-view v-slot="{ Component }">
      <transition name="slide">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup>
/*import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { HeaderView } from '@/views';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

const user = computed(() => store.getters['user/getUser']);

const showHeader = ref(false);

onMounted(() => {
  store.dispatch('product/fetchProducts');
  // store.dispatch('user/logout')
  store.dispatch('user/isLoggedUser')
    .then(() => {
      showHeader.value = true;
    })
    .catch((error) => {
      showHeader.value = false;
      router.push({name: 'login'});
      console.log(error);
    })
});

watch(user, (currentUser) => {
  if (currentUser) {
    showHeader.value = true;
  } else {
    showHeader.value = false;
    router.push({name: 'login'});
  }
});*/
</script>

<style scoped lang="scss">
.slide-enter-active, .slide-leave-active {
  transition: 0.4s;
}

.slide-enter-to { position: relative; right: 0; }

.slide-enter-from { position: relative; right: -100%; }

.slide-leave-to { position: relative; left: -100%; }

.slide-leave-from { position: relative; left: 0; }
</style>

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
    .icon { display: flex; justify-content: center; align-items: center; }
    button { @extend input; cursor: pointer; }
    input { border: none; outline: none; background: none; }
    img { max-width: 100%; height: auto; object-fit: cover; }
    main { overflow: hidden; }
    section { 
      padding: 2*$size-xxl 0 1rem+$size-navbar-height 0;
      @include media-for-tablet-landscape-up {
        padding: 3*$size-xxl 0 $size-xl 0;
      }
    }
    .container { 
      max-width: $size-max-width;
      margin: 0 $size-xl;
      @include media-for-desktop-up {
        margin: 0 auto;
      }
    }
  }
}
</style>

