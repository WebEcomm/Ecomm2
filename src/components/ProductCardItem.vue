<template>
  <article class="card">
    <button 
      class="bookmark"
      v-if="props.showCart"
      @click="addToFavourite"
    >
      <i class='bx bxs-heart'></i>
    </button>
    <div class="circle" :style="{backgroundColor: props.data.tintColor}"></div>
    <img 
      :src="props.data.image" 
      alt="product1" 
      class="img" 
      @click="showProduct"
    />
    <div class="note">
      <span 
        v-for="i in 5" :key="i" 
        :class="{'star': true, 'star--dark' : i > props.data.rate}" 
        @click="updateNote(i)">
        ⭐
      </span>
    </div>
    <div class="content">
      <div class="details">
        <h2 class="title">{{ props.data.title }}</h2>
        <span class="price">${{ props.data.price }}</span>
      </div>
      <button 
        class="btn"
        v-if="props.showCart"
        @click="addToCart"
      >
        <i class='bx bx-shopping-bag' ></i>
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps({
  data: { type: Object, required: true },
  showCart: { type: Boolean, default: false }
});

const emit = defineEmits(['updateCart']);

const store = useStore();
const router = useRouter();

const updateNote = (newNote) => {
  store.dispatch('product/setNote', {productId: props.data.id, rate: newNote});
}

const showProduct = () => {
  router.push({name: 'product', params: {id: props.data.id}})
}

const addToCart = () => {
  const user = computed(() => store.getters['user/getUser']);
  let msg = '';
  if (user.value) {
    msg = `${user.value.name}: product {${props.data.title}} add to your cart!`;
    store.dispatch('product/addToCart', props.data.id);
  } else {
    msg = 'Please sign in before !';
  }
  emit('updateCart', msg);
}

const addToFavourite = () => {
  const user = computed(() => store.getters['user/getUser']);
  let msg = '';
  if (user.value) {
    msg = `${user.value.name}: product {${props.data.title}} add to your cart!`;
    store.dispatch('product/addToFavourite', props.data.id);
  } else {
    msg = 'Please sign in before !';
  }
  emit('updateCart', msg);
}
</script>

<style scoped lang="scss">
/*========== VARIABLES ==========*/
@use '@/assets/styles' as *;

.card {
  @include color-neumorphism-out;
  position: relative;
  display: grid;
  row-gap: $size-xs;
  padding: $size-s;
  border-radius: $size-m;
  &:hover .img {
    transform: translateY(-$size-xs);
  }
  .bookmark {
    border: 1px solid;
    justify-self: flex-end;
    color: $color-white;
    font-size: $size-l;
    @include shape-circle($size-xxl, $color-error);
  }
  .circle {
    @include shape-circle(70px,$color-primary);
    position: absolute;
    top: 20%;
    left: 45%;
    transform: translateX(-50%);
    &::after {
      content: '';
      position: absolute;
      top: -$size-xxs;
      left: -$size-xxs;
      @include shape-circle(75px);
      backdrop-filter: blur(70px);
    }
  }
  .img {
    @include shape-square(100px);
    object-fit: contain;
    justify-self: center;
    transition: .3s;
    z-index: $font-tooltip;
  }
  .note {
    display: flex;
    .star {
      cursor: pointer;
      text-shadow: 0 0 8px #ffdc188c, 0 0 16px #ffffff54;
      &--dark { opacity:0.5; text-shadow: none; }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .details {
      .title {
        font-size: $size-m;
        font-weight: $font-semi-bold;
        color: $color-title;
      }
      .price { @extend .title; }
    }
    .btn {
      position: absolute;
      bottom: $size-s;
      right: $size-s;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: $size-xxs;
      font-size: $size-xl;
      color: $color-icon;
      @include shape-square(max-content, $size-xs, $color-primary);
      &:hover { background-color: $color-primary-alt; }
    }
  }
}
</style>