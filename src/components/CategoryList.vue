<template>
  <div class="category">
    <div class="label">Categories</div>
    <flat-list
      class="list"
      :data="items"
      :slides-per-view="4"
      :render-item="CategoryItem"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FlatList } from '@/components';

const items = ref([
  { id: 0, value: 'All' },
  { id: 1, value: 'On Sale' },
  { id: 2, value: 'Headphones' },
  { id: 3, value: 'Earphones' },
]);

const currentItem = ref(items.value[0]);

const CategoryItem = ({data}) => {
  return <button 
    className = {`category--btn${currentItem.value.id === data.id ? ' category--btn--active' : ''}`} 
    onClick = {() => currentItem.value = data}
  >
    { data.value }
  </button>
}

</script>

<style lang="scss">
@use '@/assets/styles' as *;

.category--btn {
  width: 100%;
  padding: $size-xxs;
  color: $color-text;
  transition: .3s;
  &--active { 
    border-radius: $size-m;
    color: $color-white;
    background-color: $color-primary; 
  }
}

</style>

<style scoped lang="scss">
@use '@/assets/styles' as *;

.category {
  display: grid;
  row-gap: $size-m;
}
</style>