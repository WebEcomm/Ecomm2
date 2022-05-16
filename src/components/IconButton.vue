<template>
  <button class="btn" :class="{vertical: props.vertical}">
    <div class="icon">
      <i :class="`ri-${props.icon}`"></i>
    </div>
    <div class="label">
      {{ props.label }}
    </div>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: "Button Text"
  },
  icon: {
    type: String,
    default: "forbid-2-line"
  },
  vertical: {
    type: Boolean,
    default: false
  }
})
//console.log(props)

</script>

<style lang="scss">
/*========== VARIABLES ==========*/
@use '@/assets/styles' as *;

.vertical {
  
}
.btn {
  display: flex;
  align-items: center;
  column-gap: $size-s;
  padding: $size-s;
  border-radius: $size-s;
  color: $color-white;
  background-color: $color-black;
  transition: .4s;
  &:hover { background-color: $color-black-alt; }
  .icon { font-size: $size-l; }
}
</style>