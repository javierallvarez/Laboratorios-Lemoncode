<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import PageTitle from './PageTitle.vue';
import TaskForm from './TaskForm.vue';
import TaskItem from './TaskItem.vue';
import { Icon } from '@iconify/vue';

const taskStore = useTaskStore();
const filter = ref<'all' | 'completed' | 'pending'>('all');
const sortOption = ref<'date' | 'alphabetical' | 'status'>('date');
const searchQuery = ref('');
const currentPage = ref(1);
const tasksPerPage = 5;
const showNotification = ref(false);
const notificationMessage = ref('');
const selectedTasks = ref<Set<string>>(new Set());
const showBulkDeleteConfirm = ref(false);
const showMobileTaskSelector = ref(false);


// Filtramos las tareas según el filtro seleccionado y el texto de búsqueda
const filteredTasks = computed(() => {
  let tasks = taskStore.tasks;

  if (filter.value === 'completed') {
    tasks = tasks.filter(task => task.completed);
  } else if (filter.value === 'pending') {
    tasks = tasks.filter(task => !task.completed);
  }

  if (searchQuery.value.trim()) {
    tasks = tasks.filter(task =>
      task.text.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return tasks;
});


// Ordenamos las tareas
const sortedTasks = computed(() => {
  const tasks = [...filteredTasks.value];

  if (sortOption.value === 'date') {
    // console.log('sortOption', sortOption.value);
    return tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortOption.value === 'alphabetical') {
    return tasks.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sortOption.value === 'status') {
    return tasks.sort((a, b) => Number(a.completed) - Number(b.completed));
  }

  return tasks;
});


// Paginamos las tareas de 5 en 5
const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * tasksPerPage;
  const end = start + tasksPerPage;
  return sortedTasks.value.slice(start, end);
});


// Función para cambiar de página
const totalPages = computed(() => Math.ceil(sortedTasks.value.length / tasksPerPage));
function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}


// Mostrar notificaciones cuando se agregue una tarea
function notify(message: string) {
  notificationMessage.value = message;
  showNotification.value = true;
  setTimeout(() => {
    showNotification.value = false;
  }, 3000);
}


// Estadísticas de tareas por estado
const totalTasks = computed(() => taskStore.tasks.length);
const completedTasks = computed(() => taskStore.tasks.filter(task => task.completed).length);
const pendingTasks = computed(() => taskStore.tasks.filter(task => !task.completed).length);


// Seleccionar o deseleccionar una tarea
function toggleTaskSelection(taskId: string) {
  if (selectedTasks.value.has(taskId)) {
    selectedTasks.value.delete(taskId);
  } else {
    selectedTasks.value.add(taskId);
  }
}


// Marcar todas las tareas seleccionadas como completadas
function markSelectedAsDone() {
  selectedTasks.value.forEach(taskId => {
    const task = taskStore.tasks.find(task => task.id === taskId);
    console.log('task', task);
    if (task && !task.completed) {
      taskStore.toggleTaskCompletion(taskId);
    }
  });
  notify('Selected tasks marked as done!');
  selectedTasks.value.clear();
}


// Confirmación antes de borrar en bulk
function confirmBulkDelete() {
  showBulkDeleteConfirm.value = true;
}


function cancelBulkDelete() {
  showBulkDeleteConfirm.value = false;
}


// Borrar todas las tareas seleccionadas con confirmación
function deleteSelectedTasks() {
  selectedTasks.value.forEach(taskId => {
    taskStore.deleteTask(taskId);
  });
  notify('Selected tasks deleted!');
  selectedTasks.value.clear();
  showBulkDeleteConfirm.value = false;
}


// Marcar o desmarcar todas las tareas visibles en la página actual
function toggleSelectAll() {
  const allSelected = paginatedTasks.value.every(task => selectedTasks.value.has(task.id));
  if (allSelected) {
    paginatedTasks.value.forEach(task => selectedTasks.value.delete(task.id));
  } else {
    paginatedTasks.value.forEach(task => selectedTasks.value.add(task.id));
  }
}


// Verificar si todas las tareas visibles están seleccionadas
const isAllSelected = computed(() => paginatedTasks.value.every(task => selectedTasks.value.has(task.id)));


// Abrir el modal de selección en móvil
function openMobileTaskSelector() {
  showMobileTaskSelector.value = true;
}


// Cerrar el modal de selección en móvil
function closeMobileTaskSelector() {
  showMobileTaskSelector.value = false;
}


// Función para truncar texto a 30 caracteres
function truncateText(text: string, maxLength: number = 30): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
</script>


<template>
  <div class="p-4 mt-11 max-w-2xl mx-auto font-sans">
    <PageTitle text="Task List" />
    <TaskForm @add-task="task => { taskStore.addTask(task); notify('Task added successfully!'); }" />

    <!-- Notificación -->
    <div
      v-if="showNotification"
      class="fixed bottom-[5%] right-[5%] bg-primary-light text-white px-4 py-2 rounded-lg shadow-lg transition-transform transform translate-y-4 opacity-0 animate-slide-up"
    >
      {{ notificationMessage }}
    </div>
    
    <!-- Estadísticas -->
    <div class="my-4 flex justify-center gap-3 text-sm text-gray-textLight dark:text-gray-textDark">
      <p>Total: {{ totalTasks }}</p>
      <p class="text-primary-light">Completed: {{ completedTasks }}</p>
      <p class="text-yellow-light">Pending: {{ pendingTasks }}</p>
    </div>

    <!-- Filtros -->
    <div class="flex justify-center gap-4 my-4">
      <button
        @click="filter = 'all'"
        :class="{ 'bg-primary-light text-white': filter === 'all', 'bg-gray-light text-gray-textLight': filter !== 'all' }"
        class="px-4 py-2 rounded-lg transition"
      >
        View all
      </button>
      <button
        @click="filter = 'completed'"
        :class="{ 'bg-primary-light text-white': filter === 'completed', 'bg-gray-light text-gray-textLight': filter !== 'completed' }"
        class="px-4 py-2 rounded-lg transition"
      >
        Completed
      </button>
      <button
        @click="filter = 'pending'"
        :class="{ 'bg-primary-light text-white': filter === 'pending', 'bg-gray-light text-gray-textLight': filter !== 'pending' }"
        class="px-4 py-2 rounded-lg transition"
      >
        Pending
      </button>
    </div>

    <!-- Ordenar y búsqueda -->
    <div class="my-4 flex flex-col gap-2">
      <div class="w-full">
        <input
        v-model="searchQuery"
        type="text"
        placeholder="Search tasks..."
        class="w-full border border-gray-light dark:border-gray-dark p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-black text-gray-textLight dark:text-gray-textDark"
        />
      </div>
      <select
        v-model="sortOption"
        class="border border-gray-light dark:border-gray-dark p-2 rounded-lg bg-white dark:bg-black text-gray-textLight dark:text-gray-textDark"
      >
        <option value="date">Sort by Date</option>
        <option value="alphabetical">Sort Alphabetically</option>
        <option value="status">Sort by Status</option>
      </select>
    </div>

    <!-- Si no hay tareas -->
    <div v-if="totalTasks === 0" class="text-center text-gray-textLight dark:text-gray-textDark mt-8">
      <p class="text-lg">No tasks available</p>
      <p class="text-sm mt-2">Create your first task to get started.</p>
    </div>

    <!-- Lista de tareas paginadas -->
    <ul v-else class="space-y-4 relative">
      <!-- Checkbox para seleccionar o desmarcar todas las tareas visibles -->
      <li v-if="totalTasks > 0" class="flex items-center hidden lg:flex">
        <input
          type="checkbox"
          :checked="isAllSelected"
          @change="toggleSelectAll"
          class="w-4 h-4 absolute -left-7 text-primary-light dark:text-primary-dark border-gray-light dark:border-gray-dark rounded focus:ring-primary-light dark:focus:ring-primary-dark"
        />
        <span class="text-sm text-gray-textLight dark:text-gray-textDark">Select/Deselect All</span>
      </li>

      <li v-for="task in paginatedTasks" :key="task.id" class="flex items-center gap-4 w-full">
        <input
          type="checkbox"
          :value="task.id"
          @change="toggleTaskSelection(task.id)"
          :checked="selectedTasks.has(task.id)"
          class="absolute -left-7 w-4 h-4 text-primary-light dark:text-primary-dark border-gray-light dark:border-gray-dark rounded focus:ring-primary-light dark:focus:ring-primary-dark hidden lg:block"
        />
        <div class="flex-1">
          <TaskItem :task="task" />
        </div>
      </li>

      <!-- Botones flotantes de acción en bulk -->
      <div
        v-if="selectedTasks.size > 0"
        class="absolute top-7 -left-[12%] flex flex-col gap-2 transition-transform transform translate-y-4 opacity-0 animate-slide-up lg:flex hidden"
      >
        <button
          @click="markSelectedAsDone"
          class="w-10 h-10 bg-primary-light dark:bg-primary-dark text-white rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition"
          title="Mark selected as done"
        >
          <Icon icon="mdi:check" class="text-xl" />
        </button>
        <button
          @click="confirmBulkDelete"
          class="w-10 h-10 bg-red-light dark:bg-red-dark text-white rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition"
          title="Delete selected tasks"
        >
          <Icon icon="mdi:trash-can" class="text-xl" />
        </button>
      </div>
    </ul>

    <!-- Modal de confirmación de borrado en bulk -->
    <div
      v-if="showBulkDeleteConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-dark p-6 rounded-lg shadow-lg text-center">
        <p class="text-lg text-gray-textLight dark:text-gray-textDark mb-4">
          Are you sure you want to delete the selected tasks?
        </p>
        <div class="flex justify-center gap-4">
          <button
            @click="deleteSelectedTasks"
            class="px-4 py-2 bg-red-light dark:bg-red-dark text-white rounded-lg hover:opacity-90 transition"
          >
            Yes, Delete
          </button>
          <button
            @click="cancelBulkDelete"
            class="px-4 py-2 bg-gray-light dark:bg-gray-dark text-gray-textLight dark:text-gray-textDark rounded-lg hover:opacity-90 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Botón flotante para abrir el modal de selección en móvil -->
    <button
      @click="openMobileTaskSelector"
      class="fixed bottom-4 right-4 w-12 h-12 bg-primary-light dark:bg-primary-dark text-white rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition md:hidden"
      title="Select Tasks"
    >
      <Icon icon="mdi:checkbox-multiple-marked-outline" class="text-2xl" />
    </button>

    <!-- Modal de selección en móvil -->
    <div
      v-if="showMobileTaskSelector"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-dark p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 class="text-lg font-bold text-gray-textLight dark:text-gray-textDark mb-4">Select Tasks</h2>
        <ul class="space-y-2">
          <li v-for="task in paginatedTasks" :key="task.id" class="flex items-center gap-2">
            <input
              type="checkbox"
              :value="task.id"
              @change="toggleTaskSelection(task.id)"
              :checked="selectedTasks.has(task.id)"
              class="w-5 h-5 text-primary-light dark:text-primary-dark border-gray-light dark:border-gray-dark rounded focus:ring-primary-light dark:focus:ring-primary-dark"
            />
            <span class="text-sm text-gray-textLight dark:text-gray-textDark">
              {{ truncateText(task.text) }}
            </span>
          </li>
        </ul>
        <div class="flex justify-between mt-4">
          <button
            @click="markSelectedAsDone"
            class="px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90 transition"
          >
            Mark as Done
          </button>
          <button
            @click="confirmBulkDelete"
            class="px-4 py-2 bg-red-light dark:bg-red-dark text-white rounded-lg hover:opacity-90 transition"
          >
            Delete
          </button>
          <button
            @click="closeMobileTaskSelector"
            class="px-4 py-2 bg-gray-light dark:bg-gray-dark text-gray-textLight dark:text-gray-textDark rounded-lg hover:opacity-90 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- Paginación -->
    <div v-if="totalTasks > 0" class="flex justify-center gap-2 mt-4">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-light dark:bg-gray-dark text-gray-textLight dark:text-gray-textDark rounded-lg hover:opacity-90 transition"
      >
        Previous
      </button>
      <span class="px-4 py-2">{{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-light dark:bg-gray-dark text-gray-textLight dark:text-gray-textDark rounded-lg hover:opacity-90 transition"
      >
        Next
      </button>
    </div>
  </div>
</template>


<style scoped>
li > .flex-1 {
  width: 100%;
}

@keyframes slide-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out forwards;
}
</style>
