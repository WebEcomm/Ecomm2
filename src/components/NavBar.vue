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
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { NavMenu } from './';

const menuLinks = ref([
  { id: 1, name: 'Home', path: '/' },
  { id: 2, name: 'Specs', path: '/specs' },
  { id: 3, name: 'Case', path: '/cases' },
  { id: 4, name: 'Products', path: '/products' },
]);

const store = useStore();

const user = computed(() => store.getters['user/getUser']);

const showMenu = ref(false);

onBeforeMount(() => {
  showAuthLink(user.value);
})

watch(user, (currentUser) => {
  showAuthLink(currentUser);
})

const showAuthLink = (currentUser) => {
  //
  if (currentUser) {
    //
    menuLinks.value = [
      ...menuLinks.value,
      {id: '5', name: 'Déconnexion', path: './'}
    ];
    menuLinks.value 
      = menuLinks.value
        .filter((link) => link.name !== 'Connexion');
  } else {
    //
    menuLinks.value = [
      ...menuLinks.value,
      {id: '5', name: 'Connexion', path: './connexion/login'}
    ];
    menuLinks.value 
      = menuLinks.value
        .filter((link) => link.name !== 'Déconnexion');
  }
}

const openMenu = () => {
  showMenu.value = true;
}

const closeMenu = () => {
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