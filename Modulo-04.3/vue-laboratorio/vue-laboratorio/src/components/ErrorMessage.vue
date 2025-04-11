<script lang="ts" setup>
defineProps<{
  message: string;
  details?: string;
}>();
</script>


<template>
  <div class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-100 px-4 py-3 rounded relative my-4">
    <strong class="font-bold">Error:</strong>
    <span class="block sm:inline">{{ message }}</span>
    <p v-if="details" class="mt-2 text-sm">{{ details }}</p>
  </div>
</template>
