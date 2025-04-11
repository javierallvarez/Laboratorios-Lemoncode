<script lang="ts" setup>
import TheHeader from './components/TheHeader.vue';
import HomeView from './components/HomeView.vue';
import PageTitle from './components/PageTitle.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-base-100-light dark:bg-base-100-dark text-neutral-light dark:text-neutral-dark font-sans">
    <TheHeader />

    <!--- RouterView es un componente que renderiza la vista correspondiente -->
    <RouterView />
  </div>
</template>


