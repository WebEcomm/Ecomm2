.<template>
  <article class="card">
    <div class="box" :style="{backgroundColor: null}"></div>
    <img 
      :src="props.data.image" 
      alt="product1" 
      class="img" 
      @click="showProduct"
    />
    <div class="content">
      <div class="details">
        <h2 class="title">{{ props.data.title }}</h2>
        <span class="price">${{ props.data.price }}</span>
      </div>
      <div class="option">
        <button v-if="showOption" @click="add">+</button>
        <button class="quantity">2</button>
        <button v-if="showOption" @click="remove">-</button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { defineProps } from 'vue';
import { useLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  data: { type: Object, required: true },
  showOption: { type: Boolean, default: false },
});

console.log(props.data)

const add = () => {
  console.log(props.data);
  store.dispatch('product/addToCart',props.data.id);
}

const remove = () => {
  console.log(props.data);
  store.dispatch('product/removeFromCart',props.data.id);
}

const showProduct = () => {
  const l = useLink({name: 'product', params: {id: props.data.id}})
  console.log(l.route)
  const r = useRouter();
  r.push({name: 'home', params: {id: props.data.id}})
}

</script>

<style scoped lang="scss">
/*========== VARIABLES ==========*/
@use '@/assets/styles' as *;

.card {
  position: relative;
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: $size-s;
  .box {
    @include shape-square(90px, $size-s, $color-primary);
    position: absolute;
    top: 0;
    left: 0;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      @include shape-square(90px, $size-s);
      backdrop-filter: blur(20px);
    }
  }
  .img {
    padding: $size-xxs;
    z-index: $font-tooltip;
    object-fit: contain;
    @include shape-square(90px, $size-s);
  }
  .content {
    display: grid;
    grid-template-columns: 1fr max-content;
    .details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title { font-size: $size-m; color: $color-text-light; }
      .price { font-size: $size-l; color: $color-title; }
    }
    .option {
      display: flex;
      align-items: center;
      button {
        font-size: $size-l;
        color: $color-primary;
        @include shape-square($size-xl, $size-xs, $color-primary-light);
      }
      .quantity { background: none; }
    }
  }
}
</style>