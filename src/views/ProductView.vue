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
        @update-cart="updateCart"
        />
      </div>
    </div>
     <flash-message 
      class="flash__msg" 
      :label="msgFlash.label"
      :msg="msgFlash.msg"
      :flag="msgFlash.flag"
      v-if="msgFlash.msg" 
      @on-close="closeFlashMesssage"
    />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { FlashMessage, ProductCardItem } from '@/components';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const products = computed(() => store.getters['product/getProducts']);
const user = computed(() => store.getters['user/getUser']);

const msgFlash = ref({
  label: '',
  msg: '',
  flag: ''
});


const closeFlashMesssage = () => {
  msgFlash.value = {label: '', msg: '', flag: ''};
  if (!user.value) {
    router.push({name: 'login'});
  }
}

const updateCart = (value) => {
  user.value 
    ? msgFlash.value = {label: 'Hi there!', msg: value, flag: 'INFO_FLAG'}
    : msgFlash.value = {label: 'Warning!', msg: value, flag: 'WARNING_FLAG'}
  console.log(msgFlash.value)
}
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
  .flash__msg {
  position: fixed;
  bottom: $size-xl;
  left: 0;
  width: 100%;
  z-index: $font-tooltip;
}
}
</style>