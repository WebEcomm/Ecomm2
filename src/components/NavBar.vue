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
      @close-menu="closeMenu"
      :showMenu="showMenu"
      :links="menuLinks" 
    />
    <!-- BOUTON MENU -->
    <button 
      @click="openMenu"
      class="toggle"
    >
      <i class='bx bx-shopping-bag' ></i>
    </button>
  </nav>
</template>

<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { NavMenu } from './';

const menuLinks = ref([
  { id: 1, name: 'Home', path: '/', icon: 'home-alt' },
  { id: 2, name: 'Products', path: '/products', icon: 'grid-alt' },
  { id: 3, name: 'Favourite', path: '/favourite', icon: 'heart' },
  { id: 4, name: 'Cart', path: '/cart', icon: 'shopping-bag' },
  { id: 4, name: 'Profile', path: '/profile', icon: 'user' },
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
      { id: '3', name: 'Favourite', path: '/favourite', icon: 'heart' },
      { id: '4', name: 'Cart', path: '/cart', icon: 'shopping-bag' },
      { id: '4', name: 'Profile', path: '/profile', icon: 'user' },
      {id: '5', name: 'Déconnexion', path: './'}
    ];
    menuLinks.value 
      = menuLinks.value
        .filter(MenuConnecte);
  } else {
    //
    menuLinks.value = [
      ...menuLinks.value,
       {id: '5', name: 'Connexion', path: './connexion/login', icon: 'user'},
       {id: '6', name: 'Register', path: './connexion/register', icon: 'user'}
    ];
    menuLinks.value 
      = menuLinks.value
        .filter(MenuPasConnecte);
  }
}

const MenuPasConnecte = (link) => {
  if (link.name != 'Déconnexion' & link.name !='Cart' & link.name !='Favourite' & link.name != 'Profile') {
    return link.name; 
  }
}

const MenuConnecte = (link) => {
   if ( link.name !='Connexion' & link.name != 'Register') {
    return link.name; 
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
    .title { color: $color-title; }
  }
  .toggle { font-size: $size-xl; color: $color-text; }
}
</style>