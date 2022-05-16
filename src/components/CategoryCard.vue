<template>
  <div class="card">
    <img 
      :src="require(`@/assets/icons/${props.item.icon}`)" 
      alt="item.logo"
      class="img"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<style lang="scss">
/*========== VARIABLES ==========*/
@use '@/assets/styles' as *;

.card {
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3*$size-xxl;
  height: $size-biggest;
  border-radius: $size-m;
  // margin-right: $size-m;
  background-color: $color-text;
  .img { width: $size-xxl; }
}
</style>