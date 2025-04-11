<script lang="ts" setup>
defineProps<{
  user: string;
  size?: 'sm' | 'md' | 'lg';
}>();


// Pillamos la primera letra del nombre y primera del apellido o las dos primeras letras si no hay apellido
function getInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}


// Tamaños de avatar para usar con props
function getSizeClass(size: string | undefined): string {
  switch (size) {
    case 'sm':
      return 'w-7 h-7 text-xs';
    case 'lg':
      return 'w-10 h-10 text-base';
    case 'md':
    default:
      return 'w-8 h-8 text-sm';
  }
}
</script>


<template>
  <div 
    class="avatar !bg-yellow-light dark:bg-gray-dark !text-white rounded-full flex items-center justify-center"
    :class="getSizeClass(size)"
  >
    {{ getInitials(user) }}
  </div>
</template>


<style scoped>
.avatar {
  font-weight: bold;
  letter-spacing: -1px;
}
</style>
