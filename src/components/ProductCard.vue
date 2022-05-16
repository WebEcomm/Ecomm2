<template>
  <div class="_card">
    <div class="favourite">
      <button 
        @click="emit('favourite', props.item.id)"
        class="dot" 
      >
        <i class="ri-heart-fill"></i>
      </button>
    </div>
    <!--  -->
    <img 
      :src="require(`@/assets/images/${props.item.icon}`)" 
      alt="item.logo"
      class="img"
    />
    <!--  -->
    <div class="info">
      <span class="title">{{ props.item.title }}</span>
      <span class="price">${{ props.item.price }}</span>
      <div class="rating">
        <i 
          @click="emit('rate', i)"
          v-for="i in 5" 
          :key="i" 
          :class="`ri-star-${props.item.rate>=i ? 'fill' : 'line'}`"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['favourite', 'rate'])
</script>

<style lang="scss">
/*========== VARIABLES ==========*/
@use '@/assets/styles' as *;

._card {
  flex: 0 0 auto;
  display: grid;
  height: 5*$size-bigger;
  border-radius: $size-m;
  padding: $size-s;
  background-color: $color-black;
  .favourite {
    display: flex;
    justify-content: flex-end;
    .dot {
      justify-self: flex-end;
      display: flex;
      justify-content: center;
      align-items: center;
      width: $size-xxl;
      height: $size-xxl;
      border-radius: 50%;
      background-color: grey;
      &:hover { background-color: red; }
      i { font-size: $size-l; color: $color-white; }
    }
  }
  .img { 
    justify-self: center; 
    width: 80px; 
    margin-bottom: $size-xl; 
  }
  .info {
    display: grid;
    .title {
      margin-bottom: $size-s;
      font-size: $size-l;
      font-weight: normal;
      text-align: left;
    }
    .price {
      color: red;
    }
    .rating {
      display: flex;
      column-gap: $size-xxs;
      i { color: gold; }
    }
  }
}
</style>