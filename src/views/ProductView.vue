<template>
  <section class="products">
    <div class="container">
      <h2 class="title">Check out our <br/> products</h2>
      <p class="description">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus corrupti velit eos similique mollitia animi culpa soluta ratione, voluptas iste.
      </p>
      <!-- PRODUCT GRID -->
      <div class="grid">
        <product-card-item 
        v-for="product in products" :key="product.id"
        :item="product"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ProductCardItem } from '@/components';

const store = useStore();
const products = computed(() => store.getters.getProducts);
</script>

<style scoped lang="scss">
/*========== VARIABLES ==========*/
@use '@/assets/styles' as *;

.products {
  .container {
    display: grid;
    row-gap: $size-xxl;
    .title { 
      font-size: $size-xl;
      font-weight: $font-semi-bold;
      color: $color-title;
      text-align: center;
    }
    .description { text-align: center; }
    .grid {
      display: grid;
      @include media-for-phone-only {
        grid-template-columns: repeat(2, 1fr);
        row-gap: $size-xxl;
        column-gap: $size-l;
      }
    }
  }
}
</style>