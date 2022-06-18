.<template>
  <section class="cart">
    <div class="container">
      <h1 class="title">Your Shopping Cart</h1>
      <p class="description"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus corrupti velit eos similique mollitia animi culpa soluta ratione, voluptas iste.</p>
    
      <div class="list">
        <!-- <flat-list
          class="item"
          :data="cart"
          :vertical="true"
          :renderItem="CartCardItem"
        /> -->
        <div class="item" v-for="product in favourite" :key="product.id">
          <cart-card-item :data="product" :show-option="true" />
        </div>
      </div>

      
    </div>
  </section>
</template>

<script setup>
import { CartCardItem, /*FlatList*/ } from '@/components'; 
import { useStore } from 'vuex';
import { computed, watch } from 'vue';

const store = useStore();

//const idP = store.getters['product/getProductsIdInCart'];

const favourite = computed(() => store.getters['product/getProductsInFavourite'] );

console.log(favourite.value)

watch(favourite, (current) => {
  console.log('cart', current);
})


</script>

<style scoped lang="scss">
/*========== VARIABLES ==========*/
@use '@/assets/styles' as *;

.cart {
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
    .list {
      display: flex; 
      row-gap: $size-m; 
      flex-direction: column;
      flex-wrap: nowrap;
      overflow-x: auto;
      height: 300px;
      .item { flex: 0 0 auto; }
    }
    .payment {
        h2 {text-align: center;}
        button {
          display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: $size-m;
        border-radius: $size-s;
        font-size: $size-m;
        color: $color-white;
        background-color: $color-primary;
        }
    }
  }
}

</style>