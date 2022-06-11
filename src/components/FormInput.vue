<template>
  <!-- EMAIL FIELD -->
  <div :class="{field: true, warning: props.valueError}">
    <div class="entry">
      <div class="icon">
        <i :class="`bx bx-${props.icon}`"></i>
      </div>
      <input
        :name="props.name"
        :type="props.type"
        :value="props.value"
        :placeholder="props.label"
        class="input"
        @keyup="handleChange"
      />
    </div>
    <span class="msg" v-if="props.valueError">
      {{ props.valueError }}
    </span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, required: true },
  label: { type: String, required: true },
  valueError: { type: String, required: true },
});

const emit = defineEmits(['updateValue']);

const handleChange = (e) => {
  emit('updateValue', e.target);
}
</script>

<style scoped lang="scss">
@use '@/assets/styles' as *;

.field {
  .entry {
    display: flex;
    align-items: center;
    column-gap: $size-s;
    padding: $size-m;
    border-radius: $size-s;
    background-color: $color-body-alt;
    .icon { 
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $size-xl; 
      color: $color-text-light;
    }
    .input {
      width: 100%;
      font-size: $size-l;
      color: $color-text;
    }
  }
}
.warning {
  .entry { border: 1px solid red; }
  .msg { 
    margin-left: $size-m;
    font-size: $size-s;
    color: $color-warning;
  }
}
</style>