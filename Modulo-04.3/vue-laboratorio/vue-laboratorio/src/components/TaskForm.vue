<script lang="ts" setup>
import { defineEmits, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';


const emit = defineEmits<{
    (e: 'add-task', task: string): void;
}>();


// Máximo de caracteres, contador y evitamos caracteres no permitidos
const newTask = ref<string>('');
const error = ref<string | null>(null);
const charCount = ref(0);
const MAX_LENGTH = 255;
const validPattern = /^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s.,;:¿?¡!@#$%^&*()_+-=[\]{}|<>/"'`~]*$/;


watch(newTask, (value) => {
  charCount.value = value.length;

  if (value.length > MAX_LENGTH) {
    error.value = `Text exceeds ${MAX_LENGTH} characters`;
    return;
  }

  if (value && !validPattern.test(value)) {
    error.value = 'Text contains invalid characters';
    return;
  }

  error.value = null;
});


function submitTask(): void {
  if (newTask.value.trim() && !error.value) {
    emit('add-task', newTask.value);
    newTask.value = '';
    charCount.value = 0;
    error.value = null;
  }
}

</script>


<template>
  <form @submit.prevent="submitTask" class="mb-6">
    <div class="flex gap-2">
      <label for="new-task" class="sr-only">New task - maximum 255 characters</label>
      <input
        id="new-task"
        v-model="newTask"
        type="text"
        placeholder="New task"
        :maxlength="MAX_LENGTH"
        aria-describedby="task-error task-count"
        class="flex-1 border border-gray-light dark:border-gray-dark p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-black text-gray-textLight dark:text-gray-textDark"
        :class="{ 'border-red-light dark:border-red-dark': error }"
      />
      <button
        type="submit"
        class="text-sm px-4 py-2 rounded-lg transition flex items-center gap-1"
        :class="{
          'bg-primary-light dark:bg-primary-dark text-white hover:opacity-90': !error && newTask.trim(),
          'bg-gray-light dark:bg-gray-dark text-gray-textLight dark:text-gray-textDark cursor-not-allowed': !!error || !newTask.trim()
        }"
        :disabled="!!error || !newTask.trim()"
        aria-label="Add task"
      >
        <Icon icon="mdi:plus" aria-hidden="true" />
        <span>Add</span>
      </button>
    </div>

    <!-- Div con contador de caracteres y mensaje de error -->
    <div class="mt-1 flex justify-between text-sm">
      <p 
        id="task-count" 
        class="text-gray-textLight dark:text-gray-textDark ml-1"
        :class="{ 'text-red-light dark:text-red-dark': charCount > MAX_LENGTH * 0.9 }"
      >
        {{ charCount }}/{{ MAX_LENGTH }}
      </p>
      <p 
        v-if="error" 
        id="task-error" 
        class="text-red-light dark:text-red-dark" 
        role="alert"
      >
        {{ error }}
      </p>
    </div>
  </form>
</template>


<!--
  Ocultamos el texto pero accesible para los lectores de pantalla.
-->
<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(0);
  white-space: nowrap;
  border: 0;
}
</style>
