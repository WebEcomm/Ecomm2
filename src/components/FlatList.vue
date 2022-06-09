<template>
   <!-- SWIPER -->
    <div class="content">
      <swiper
        :slides-per-view="props.slidesPerView"
        class="swiper"
      >
        <swiper-slide v-for="item in props.data" :key="item.id">
          <component :is="props.renderItem" :data="item"/>
        </swiper-slide>
      </swiper>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide  } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';

const props = defineProps({
  data: { type: Array, required: true },
  vertical: { type: Boolean, default: false },
  slidesPerView: { type: Number,  default: 1 },
  renderItem: { type: Function, required: true },
});
</script>

<style scoped lang="scss">
@use '@/assets/styles' as *;

.swiper {
  &-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

