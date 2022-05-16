<template>
  <section v-on:scroll.passive="scrollHeader" class="home">
    <div class="container">
      <!--  -->
      <div>
        <img 
          src="@/assets/images/home.png" 
          alt="home"
          class="img"
        />
      </div>
      <!--  -->
      <div class="data">
        <div class="header">
          <h2 class="title">On ear</h2>
          <h2 class="subtitle">Beats 3</h2>
        </div>
        <div class="footer">
          <h2 class="title">Overview</h2>
          <p class="description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem, aspernatur consectetur numquam nam assumenda omnis obcaecati reprehenderit tempore cum magnam accusantium blanditiis ratione voluptates tenetur perferendis minima aperiam quod, dolor asperiores placeat ut corrupti laborum. Eius ipsam molestiae deserunt optio!
          </p>
          <div class="pricing">
            <icon-button label="Add to Bage" icon="shopping-bag-line"/>
            <div class="price">$299</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
//import { defineEmits } from 'vue';
import { IconButton } from '@/components';
const scrollHeader = () => {
  console.log("scroll")
}
//const emit = defineEmits(['scrollHeader'])
</script>

<style lang="scss">
/*========== VARIABLES ==========*/
@use '@/assets/styles' as *;

.home {
  margin-top: $size-header-height;
  .container {

    .img {
      position: absolute;
      top: -3*$size-biggest;
      right: $size-xxl;
      width: 250px;
      //z-index: $font-fixed;
    }
    .data {
      display: grid;
      margin-top: $size-biggest;
      .header {
        display: flex;
        flex-direction: column;
        position: relative;
        .title { 
          @include color-gradient;
          margin: 0; 
        }
        .subtitle { 
          transform: translate(-$size-biggest,-2*$size-xl);
          text-align: center;
          font-size: 2*$size-l;
        }
      }
      .footer {
        .title { 
          text-align: left;
          font-size: $size-xl; 
          margin-bottom: $size-m; 
        }
        .description { margin-bottom: 2*$size-xl; }
        .pricing { 
          display: flex;
          align-items: center;
          column-gap: $size-s;
          width: max-content;
          padding-right: $size-s;
          border-radius: $size-s;
          background-color: $color-black;
          &:hover { background-color: $color-black-alt; }
          .btn { background: transparent; }
        }
      }
    }
  }
}
</style>