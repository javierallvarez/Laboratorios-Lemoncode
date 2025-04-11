<script lang="ts" setup>
defineProps<{ text: string }>();
</script>

<template>
  <h1 class="text-center font-bold text-2xl my-4 text-primary-light dark:text-primary-dark">{{ text }}</h1>
</template>
