.<template>
  <article class="card">
    <div class="circle" :style="{backgroundColor: props.item.tintColor}"></div>
    <img 
      :src="props.item.image" 
      alt="product1" 
      class="img" 
      @click="showProduct"
    />
    <div class="content">
      <div class="details">
        <h2 class="title">{{ props.item.title }}</h2>
        <span class="price">${{ props.item.price }}</span>
      </div>
      <button class="btn" @click="removeFromCart">
      <i>Supprimer</i>
      </button>
    </div>
     
  </article>
</template>

<script setup>
import { defineProps } from 'vue';
import { useLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const removeFromCart=() => {
  console.log("props id : "+ props.item.id);
   store.dispatch('product/removeFromCart', {productId: props.item.id})
};

console.log(props)
const showProduct = () => {
  const l = useLink({name: 'product', params: {id: props.item.id}})
  console.log(l.route)
  const r = useRouter();
  r.push({name: 'home', params: {id: props.item.id}})
};
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
      @include shape-square(max-content, $size-xs, $color-error-alt);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: $size-xxs;
      font-size: $size-xl;
      color: $color-icon;
      &:hover { background-color: $color-error; }
    }
  }
 
}
</style>