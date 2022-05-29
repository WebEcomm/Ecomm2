<template>
  <div :class="{menu: true, show: true}">
    <!-- LISTE DE LIENS -->
    <ul class="list">
      <li 
        class="item"
        :key="link.id"
        v-for="(link) in props.links" 
        @click="handleClick(link)"
      >
        <router-link :to="link.path" 
          :class="{link: true, active: isActived}"
           @click="activeLink"
        >
          <div class="icon">
            <i :class="`bx bx-${link.icon}`"></i>
          </div>
          <span class="name">{{ link.name }}</span>
        </router-link>
      </li>
    </ul>
    <!-- BOUTON CLOSE -->
    <!-- <button 
      @click="emit('closeMenu')"
      class="close"
    >
      <span>x</span>
    </button> -->
  </div>
</template>
    
<script setup>
import { defineEmits, defineProps, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isActived = ref(false);

const props = defineProps({
  showMenu: {
    type: Boolean,
    required: true
  },
  links: {
    type: Array,
    default() { 
      return [{ id: '0', name: 'lien', path: '/' }];
    }
  }
});

const handleClick = (link) => {
  if (link.name === 'Déconnexion')
  { store.dispatch('user/logout'); }
  emit('closeMenu');
}

// Evenements personalisés
const emit = defineEmits(['closeMenu']);

const activeLink = () => {
  isActived.value = true
}
</script>

<style scoped lang="scss">
@use '@/assets/styles' as *;

.menu {
  position: fixed;
  bottom: -100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: $size-m 0;
  background-color: $color-body;
  @include media-for-tablet-landscape-up {
    position: initial;
    justify-content: flex-end;
    background: none;
  }
  .list {
    @include media-for-phone-only {
      width: 100%;
    }
    @include media-for-tablet-portrait-up {
      max-width: 600px;
      width: 65%;
    }
    display: flex;
    justify-content: space-around;
    align-items: center;
    row-gap: $size-m;
    .item {
      .link {
        @include shape-square($size-bigger);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: $color-title;
        font-weight: $font-semi-bold;
        @include media-for-tablet-landscape-up {
          @include shape-square(auto);
          flex-direction: row;
        }
        .icon { 
          font-size: $size-xl;
          @include media-for-tablet-landscape-up {
            display: none;
          }
        }
        .name {
          // visibility: hidden; 
          font-size: $size-s; 
          @include media-for-tablet-landscape-up {
            visibility: visible; 
            font-size: $size-m; 
          }
        }
        // @include color-gradient;
        &:hover {
          background: $color-white;
          background-clip: text;
          -webkit-background-clip: text;
        }
      }
    }
  }
  .close {
    position: absolute;
    top: $size-m;
    right: $size-m;
    font-size: $size-xl;
    color: $color-text;
    &:hover { color: $color-white; }
  }
}
.show { bottom: 0; }
</style>