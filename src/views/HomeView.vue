<template>
  <section class="home">
    <div class="container">
      <!-- SWIPER -->
      <swiper
        class="swiper"
        :slides-per-view="'auto'"
        :space-between="30"
        :autoplay="autoplay"
        :pagination="pagination"
      >
        <swiper-slide>
          <div 
            :style="{backgroundImage: 'url(\'' + require('@/assets/images/home1.jpg') + '\')'}"
            class="slide slide--1"
          >
            <div class="content">
              <span class="title">New Items with <br/> Free shipping</span>
              <button class="btn">Shop now</button>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div 
            :style="{backgroundImage: 'url(\'' + require('@/assets/images/home2.jpg') + '\')'}"
            class="slide slide--2"
          >
            <div class="content">
              <span class="special">Special offer</span>
              <span class="title">Black<br/> Friday</span>
              <button class="btn">
                <i class='bx bx-right-arrow-alt'></i>
              </button>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div 
            :style="{backgroundImage: 'url(\'' + require('@/assets/images/home3.jpg') + '\')'}"
            class="slide slide--2"
          >
            <div class="content">
              <div class="special">Special offer</div>
              <span class="title">Black<br/> Friday</span>
              <button class="btn">
                <i class='bx bx-right-arrow-alt'></i>
              </button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <!-- CATEGORY -->
      <category-list />
      <!-- FAVOURITE PRODUCTS -->
      <product-list />
    </div>
  </section>
</template>

<script setup>
import { CategoryList, ProductList } from '@/components';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide  } from 'swiper/vue';
import SwiperCore, { Autoplay, Pagination } from "swiper";

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/pagination';

SwiperCore.use([Pagination, Autoplay]);
const pagination = { clickable: true };
const autoplay = { disableOnInteraction: false, delay: 2500 };

</script>

<style scoped lang="scss">
@use '@/assets/styles' as *;

.swiper {
  width: 100%;
  height: 220px;
}

.slide {
  @include shape-square(100%);
  display: flex;
  padding: $size-bigger $size-l;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center right;
  background-color: $color-icon;
  .content {
    display: grid;
    width: 100%;
    height: 100%;
    .title {
      font-weight: $font-semi-bold;
      color: $color-white;
    }
    .btn {
      font-weight: $font-semi-bold;
      color: $color-title;
    }
  }
  &--1 {
    .content {
      .title {
        font-size: $size-l;
        font-style: italic;
      }
      .btn {
        width: fit-content;
        position: relative;
        font-weight: $font-semi-bold;
        color: $color-white;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          @include shape-box(100%, $size-xxs, $size-s, $color-white);
        }
      }
    }
  }
  &--2 {
    .content {
      position: relative;
      .special { 
        padding: $size-xxs;
        font-size: $size-s;
        text-transform: uppercase;
        font-weight: $font-semi-bold;
        color: $color-text-light;
        @include shape-square(fit-content, $size-xs, $color-shadow-light);
      }
      .title {
        font-size: $size-xl;
        text-transform: uppercase;
      }
      .btn {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        @include shape-circle(2*$size-xl, $color-white);
        font-size: $size-l;
      }
    }
  }
}

</style>

<style scoped lang="scss">
/*========== VARIABLES ==========*/
@use '@/assets/styles' as *;

.home {
  .container {
    display: flex;
    flex-direction: column;
    row-gap: $size-m;
  }
}
</style>