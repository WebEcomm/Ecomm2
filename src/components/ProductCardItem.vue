<template>
  <article class="card">
    <div class="circle" :style="{backgroundColor: props.item.tintColor}"></div>
    <img 
      :src="props.item.image" 
      alt="product1" 
      class="img" 
      @click="showProduct"
    />
    <div class="note">
      <span 
        v-for="i in 5" :key="i" 
        :class="{'star': true, 'star--dark' : i > props.item.rate}" 
        @click="updateNote(i)">
        ⭐
      </span>
    </div>
    <div class="content">
      <div class="details">
        <h2 class="title">{{ props.item.title }}</h2>
        <span class="price">${{ props.item.price }}</span>
      </div>
      <button class="btn" @click="addToCart">
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
  item: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['updateCart']);

const store = useStore();
const router = useRouter();

const updateNote = (newNote) => {
  store.dispatch('product/setNote', {productId: props.item.id, rate: newNote});
}

const showProduct = () => {
  router.push({name: 'product', params: {id: props.item.id}})
}

const addToCart = () => {
  const user = computed(() => store.getters['user/getUser']);
  let msg = '';
  user.value
    ? msg = `${user.value.name}: product {${props.item.title}} add to your cart!`
    : msg = 'Please sign in before !'
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
  row-gap: $size-s;
  padding: $size-s;
  border-radius: $size-m;
  &:hover .img {
    transform: translateY(-$size-xs);
  }
  .circle {
    @include shape-circle(120px,$color-primary);
    position: absolute;
    top: 20%;
    left: 45%;
    transform: translateX(-50%);
    &::after {
      content: '';
      position: absolute;
      top: -$size-xxs;
      left: -$size-xxs;
      @include shape-circle(125px);
      backdrop-filter: blur(70px);
    }
  }
  .img {
    @include shape-square(150px);
    object-fit: contain;
    justify-self: center;
    transition: .3s;
    z-index: $font-tooltip;
  }
  .star {
    cursor: pointer;
    text-shadow: 0 0 8px #ffdc188c, 0 0 16px #ffffff54;
    &--dark { opacity:0.5; text-shadow: none; }
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
      @include shape-square(max-content, $size-xs, $color-primary);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: $size-xxs;
      font-size: $size-xl;
      color: $color-icon;
      &:hover { background-color: $color-primary-alt; }
    }
  }
}
</style>