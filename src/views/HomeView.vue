<template>
  <section class="home">
    <div class="container">
      <!-- IMAGE -->
      <img src="@/assets/images/home.png" alt="home" class="img" />
      <!-- DATA -->
      <div class="data">
        <h2 class="title">On ear Beat 3</h2>
        <p class="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam esse tenetur cumque itaque unde velit autem facere, quia aliquid eos.
        </p>
        <button class="btn">
          <span class="label">Explore</span>
          <div class="icon">
            <i class='bx bx-right-arrow-alt'></i>
          </div>
        </button>
      </div>
      <!-- SOCIAL -->
      <div class="social">
        <span class="follow">Follow Us</span>
        <div class="separator"></div>
        <ul class="links">
          <a href="https://www.facebook.com" target="_blank" class="link">
            <i class='bx bxl-facebook' ></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" class="link">
            <i class='bx bxl-instagram' ></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" class="link">
            <i class='bx bxl-twitter' ></i>
          </a>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped lang="scss">
/*========== VARIABLES ==========*/
@use '@/assets/styles' as *;

.home {
  .container {
    position: relative;
    display: grid;
    row-gap: $size-xl;
    .img { width: 200px; justify-self: center; }
    .data {
      .title { text-align: left; margin-bottom: $size-m; }
      .description { margin-bottom: $size-xxl; }
      .btn {
        @include color-neumorphism-out;
        display: flex;
        align-items: center;
        column-gap: $size-xxs;
        padding: $size-m $size-l;
        border-radius: $size-xs;
        //background-color: $color-primary;
        transition: .3s;
        &:hover .icon { 
          transform: rotate(45deg) translate($size-xxs, -$size-xxs); 
        }
        &:active {
          @include color-neumorphism-in;
        }
        .label { color: $color-title; }
        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          transform: rotate(45deg);
          transition: .3s;
          color: $color-title;
          
        }
      }
    }
    .social {
      position: absolute;
      top: 2rem;
      right: -1rem;
      display: grid;
      justify-items: center;
      .follow {
        position: relative;
        font-size: $size-s;
        font-weight: $font-medium;
        transform: rotate(90deg);
      }
      .separator {
        @include shape-box(2px,$size-l,$size-m,$color-text);
        margin-top: $size-xxl;
        margin-bottom: $size-s;
      }
      .links {
        display: flex;
        flex-direction: column;
        row-gap: $size-xxs;
        .link { 
          color: $color-text-light; 
          transition: .3s; 
          &:hover { transform: translateX($size-xs); }
        }
      }
    }
  }
}
</style>