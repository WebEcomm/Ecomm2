<template>
  <div :class="{menu: true}">
    <!-- LISTE DE LIENS -->
    <ul class="list">
      <li 
        class="item"
        :key="link.id"
        v-for="(link) in props.links" 
      >
        <router-link :to="link.path" 
          :class="{link: true, active: isActived}"
           @click="activeLink"
        >
          <div class="icon">
            <i :class="`bx bx-${link.icon}`"></i>
            <span class="count" v-if="link.name.toLowerCase() === 'cart'">
              {{ numberOfProducts }}
            </span>
          </div>
          <span class="name">{{ link.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
    
<script setup>
import { computed, defineProps, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const numberOfProducts = computed(() => 
  store.getters['product/getNumberOfProducts']
);

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

const activeLink = () => {
  isActived.value = true
}
</script>

<style scoped lang="scss">
@use '@/assets/styles' as *;

.menu {
  @include media-for-phone-only {
    position: fixed;
    bottom: 0;
    left: 0;
    display: grid;
    align-content: center;
    box-shadow: $color-header-shadow;
    @include shape-box(100%, $size-navbar-height, $fill: $color-body);
    border-radius: $size-l $size-l 0 0;
    padding: 0 $size-m;
    transition: .4s;
  }
  @include media-for-tablet-landscape-up {
    width: 100%;
  }
  .list {
    display: flex;
    justify-content: space-around;
    @include media-for-tablet-portrait-up {
      justify-content: center;
      column-gap: 2*$size-xl;
    }
    @include media-for-tablet-landscape-up {
      justify-content: flex-end;
      margin-right: $size-m;
    }
    .item {
      .link {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: $size-xxs;
        font-weight: $font-medium;
        color: $color-title;
        .icon { 
          position: relative;
          font-size: $size-xl; 
          .count {
            position: absolute;
            top: $size-s;
            right: -$size-s;
            font-size: $size-s;
            color: $color-white;
            @include shape-circle($size-l, $color-primary);
          }
        }
        .name { font-size: $size-s; }
        @include media-for-tablet-landscape-up {
          position: relative;
          .icon { 
            position: static;
            i { display:  none; }
            .count {
              position: absolute;
              top: $size-s;
              right: -$size-l;
              @include shape-circle($size-l, $color-primary);
            }
          }
          .name { font-size: $size-m; }
        }
      }
      .router-link-active {
        position: relative;
        color: $color-primary;
        transition: .4s;
        @include media-for-tablet-landscape-up {
          position: relative;
          &::before {
            content: '';
            position: absolute;
            bottom: -$size-s;
            @include shape-square($size-xs, 50%, $color-primary);
          }
        }
      }
    }
  }
}
</style>