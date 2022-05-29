.<template>
  <section class="cart">
      <div class="container">
          <h1 class="title">Your Shopping Cart</h1>
          <p class="description"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus corrupti velit eos similique mollitia animi culpa soluta ratione, voluptas iste.</p>
      
      <div class="grid">
        <cart-card-item 
        v-for = 'product in cart'
        :key="product.id"
        :item="product"
        />
      </div>
      <div class="payment">
          <h2>Total cost : {{totalCost}}</h2>
      </div>
      </div>
  </section>
</template>

<script setup>
 import CartCardItem from '@/components/CartCardItem.vue'; 
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const idP = store.getters['product/getProductsIdInCart'];
    console.log(idP);

const cart = computed(() => store.getters['product/getProductsInCart'] );

/* const createCart = () => {

   console.log('CreateCart' + idP); 
  let entireCart =  ;
  console.log(entireCart);
} */

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
    .grid {
      display: grid;
      @include media-for-phone-only {
        grid-template-columns: repeat(2, 1fr);
        row-gap: $size-xxl;
        column-gap: $size-l;
      }
    }
    .payment {
        h2 {text-align: center;}
    }
  }
}

</style>