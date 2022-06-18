<template>
  <section class="order">
    <div class="container">
      Order
      <div class="grid">
        <div class="content">
          <div class="header">
            <div class="ref">fhrygjgvvjhfcjv</div>
            <span class="date">23 Mars 2021</span>
          </div>
          <div class="list">
            <div class="item" v-for="product in order" :key="product.id">
              <cart-card-item :data="product" />
            </div>
          </div>
          <div class="price">$120</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

import { CartCardItem } from '@/components';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
//const aa = ['DYREYU4Z0iPcJAvT84RU', 'Jb87kGAzcbKxYscLaGd1'];

//store.dispatch('product/addToOrder', aa);
const order = computed(() => store.getters['product/getProductsInOrder']);

console.log(order.value);

/*const produit = {
  brand: "brand",
  createdAt: "23 Mars 2021",
  id: "Jb87kGAzcbKxYscLaGd1",
  image: "https://firebasestorage.googleapis.com/v0/b/ecomm-fd555.appspot.com/o/images%2Fproduct3.png?alt=media&token=9b2b9798-8da5-4444-841e-b98c7eafbd07",
  price: 19.6,
  rate: 1,
  tintColor: "#AF6E36",
  title: "Beats Solo3",
}*/

</script>

<style scoped lang="scss">
@use '@/assets/styles' as *;

.order {
  .grid {
    display: grid;
    row-gap: $size-m;
    padding: $size-s;
    border-radius: $size-s;
    background-color: $color-primary-light;
    .content {
      display: grid;
      row-gap: $size-m;
      .header {
        display: flex;
        justify-content: space-between;
        .ref { font-size: $size-m; color: $color-text-light; }
        .date { font-size: $size-m; color: $color-title; }
      }
      .list { 
        
        display: flex; 
        row-gap: $size-m; 
        flex-direction: column;
        flex-wrap: nowrap;
        overflow-x: auto;
        height: 250px;
        .item { flex: 0 0 auto; }
      }
      .price {
        text-align: right;
        font-size: $size-xl;
        font-weight: $font-medium;
        border-top: 1px dashed $color-text-light;
      }
    }
  }
}
</style>