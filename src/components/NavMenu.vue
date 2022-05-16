<template>
  <div class="menu" :class="{show: props.showMenu}">
    <!-- LISTE DE LIENS -->
    <ul class="list">
      <li 
        @click="emit('closeMenu')"
        v-for="(item) in props.links" 
        :key="item.id"
        class="item"
      >
        <router-link :to="item.path" class="link">{{ item.name }}</router-link>
      </li>
    </ul>
    <!-- BOUTON CLOSE -->
    <button 
      @click="emit('closeMenu')"
      class="close"
    >
      <i class="ri-close-line"></i>
    </button>
  </div>
</template>
    
<script setup>
import { defineEmits, defineProps } from 'vue';
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

// Evenements personalisés
const emit = defineEmits(['closeMenu'])
</script>

<style lang="scss">
@use '@/assets/styles' as *;

.menu {
  @include media-for-phone-only {
    position: fixed;
    top: -100%;
    left: 0;
    width: 100%;
    padding-top: 2*$size-xxl;
    padding-bottom: 2*$size-xl;
    background-color: $color-body;
    transition: .4s;
  }
  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: $size-m;
    .item {
      .link {
        text-transform: uppercase;
        font-size: $size-xl;
        font-weight: $font-semi-bold;
        color: transparent;
        background: $color-text-gradient;
        background-clip: text;
        -webkit-background-clip: text;
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
    &:hover { color: $color-white; }
  }
}
.show { top: 0; }
</style>