<template>
  <section class="product container">
    <div class="category">
      <h2 class="label">{{ categoryLabel }}</h2>
      <div class="category-card">
        <category-card 
          v-for="item in categoryItems"
          :key="item.id"
          :item="item" 
        />
      </div>
    </div>
    <!--  -->
    <div class="data">
      <h2 class="label">{{ dataLabel }}</h2>
      <div class="product-card">
        <product-card 
          @favourite="setFavourite"
          @rate="setRate"
          v-for="item in productItems"
          :key="item.id"
          :item="item" 
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { CategoryCard, ProductCard } from '@/components';
import { categoryItems, productItems } from '@/data';

const categoryLabel = 'Choose Brand';
const dataLabel = 'Choose Brand';


const setFavourite = (productId) => {
  console.log({product: productId})
};
const setRate = (value) => {
  console.log({rate: value})
};
</script>

<style lang="scss">
/*========== VARIABLES ==========*/
@use '@/assets/styles' as *;

.product {
  display: flex;
  flex-direction: column;
  row-gap: $size-m;
  .category {
    display: flex;
    flex-direction: column;
    row-gap: $size-m;
    .label { font-size: $size-m; }
    .category-card {
      display: flex;
      column-gap: $size-s;
      flex-wrap: nowrap;
      overflow-x: auto;
    }
  }
  .data {
    display: flex;
    flex-direction: column;
    row-gap: $size-m;
    .label { font-size: $size-m; }
    .product-card {
      display: grid;
      gap: $size-m;
      @include media-for-phone-only {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}
</style>