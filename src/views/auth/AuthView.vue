<template>
  <router-view></router-view>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const user = computed(() => store.getters['user/getUser']);

watch(user, (currentUser) => {
  if (currentUser) {
    router.push({name: 'home'});
  }
});

</script>

<style scoped lang="scss">
</style>