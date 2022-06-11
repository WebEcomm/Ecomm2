.<template>
  <section class="payment-page">
  <h1>Proceed to the payment</h1>
  <h1>Price : {{$route.params.price}} €</h1>
  <form class="payment-form" @submit.prevent="payment">
    <div class="header"><h2 class="title">Enter your creditcard details</h2></div>
    <div class="card-number">
      <h2>Card number</h2>
      <input
       type="text"
       v-model="cardNumber"
        placeholder="1234 5678 9012 3456"/>
        <span class="msg" v-if="creditCardError">
              {{ creditCardError }}
            </span>
    </div>
    <div class="name-on-card">
      <h2>Name on card</h2>
      <input
       type="text"
       v-model="name"
        placeholder="Ex : John Card"/>
          <span class="msg" v-if="nameError">
              {{ nameError }}
            </span>
    </div>
    <div class="expiry-date">
      <h2>Expiry date</h2>
      <input
       type="text"
       v-model="expirationDate"
        placeholder="01/23"/>
          <span class="msg" v-if="expirationDateError">
              {{ expirationDateError }}
            </span>
    </div>
    <div class="security-code">
      <h2>Security code</h2>
      <input
       type="text"
       v-model="securityCode"
        placeholder="143"/>
        <span class="msg" v-if="securityCodeError">
              {{ securityCodeError }}
            </span>
    </div>
    <div class="check-out">
      <button class="check-out-btn">
        <h2>Pay</h2>
      </button>
    </div>
  </form>
  </section>
</template>

<script setup>
import {ref} from 'vue';
 import {validateCreditCard, validateName, validateExpirationDate, validateSecurityCode} from '@/utils'; 
import { useRouter } from "vue-router";
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const name = ref('');
const cardNumber = ref('');
const expirationDate = ref('');
const securityCode = ref('');

const creditCardError = ref('');
const nameError = ref('');
const expirationDateError = ref('');
const securityCodeError = ref('');

const validateInput = () => {
  !validateCreditCard(cardNumber.value)
    ? creditCardError.value = 'Credit card number is invalid'
    : creditCardError.value = ''
  !validateName(name.value)
    ? nameError.value = 'Name on card is invalid'
    : nameError.value = ''
  !validateExpirationDate(expirationDate.value)
    ? expirationDateError.value = 'Expiration Date is invalid'
    : expirationDateError.value = ''  
  !validateSecurityCode(securityCode.value)
    ? securityCodeError.value = 'Security Code is invalid'
    : securityCodeError.value = ''   
}

const payment = () => {
  validateInput();
   if (!nameError.value && !creditCardError.value && !expirationDateError.value && !securityCodeError.value){
      store.dispatch('product/emptyCart');
      router.push("/successful-payment");
   }
}
</script>

<style scoped lang="scss"> 
@use '@/assets/styles' as *;
  .payment-page {
   justify-content: center;
   display: grid;
   row-gap: $size-m;
  .check-out-btn {
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

    .payment-form {
    display: grid;
    grid-template-rows: max-content 1fr max-content;
    row-gap: $size-m;
      input {
 display: flex;
          align-items: center;
          column-gap: $size-s;
          padding: $size-m;
          border-radius: $size-s;
          background-color: $color-body-alt;
      }
      .header {
      .title { 
        color: $color-text-light; 
      }
    }
    }
  }
</style>