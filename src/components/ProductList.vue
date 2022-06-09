<template>
  <div class="products">
      <div class="label">Popular products</div>
      <flat-list
        class="list"
        :data="productItems"
        :slides-per-view="2"
        :render-item="ProductCardItem"
      />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FlatList, ProductCardItem } from '@/components';
import { productItems } from '@/data';

// const currentItem = ref(items.value[0]);

const product = ref(productItems[0]);
console.log(product.value);

</script>

<style scoped lang="scss">
@use '@/assets/styles' as *;

.products {
  height: 270px;
}
</style>