<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
import UserAvatar from './UserAvatar.vue';
</script>


<template>
  <header class="bg-primary-light dark:bg-primary-dark text-white p-4 font-sans fixed top-0 left-0 w-full z-50 shadow-md">
    <nav class="flex justify-between items-center">
      <RouterLink to="/" class="text-2xl font-bold flex items-center gap-2">
        <Icon icon="mdi:format-list-checks" />
        todofy
      </RouterLink>
      
      <div class="flex items-center gap-2">
        <span class="text-sm text-black font-serif hidden sm:inline">Hello, <b class="text-white">Hans Topo</b></span>
        <UserAvatar 
          user="Hans Topo" 
          size="md" 
          class="!bg-black text-primary-light dark:bg-gray-dark dark:text-primary-dark" 
        />
      </div>
    </nav>
  </header>
</template>


<style scoped>
.avatar {
  font-size: 0.875rem;
  font-weight: bold;
}
</style>