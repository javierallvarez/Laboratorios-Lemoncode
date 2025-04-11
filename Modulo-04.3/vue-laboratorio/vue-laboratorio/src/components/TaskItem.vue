<script lang="ts" setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useTaskStore, type Task } from '../stores/taskStore';
import UserAvatar from './UserAvatar.vue';


const props = defineProps<{
  task: Task
}>();
const taskStore = useTaskStore();
const isEditing = ref(false);
const editedText = ref('');
const showDeleteConfirm = ref(false);


// Editar tareas
function startEdit(): void {
  isEditing.value = true;
  editedText.value = props.task.text;
}


function cancelEdit(): void {
  isEditing.value = false;
  editedText.value = '';
}


function saveEdit(): void {
  if (editedText.value.trim()) {
    taskStore.editTask(props.task.id, editedText.value);
    isEditing.value = false;
    editedText.value = '';
  }
}


// Muestra la confirmación antes de eliminar una tarea
function confirmDelete(): void {
  showDeleteConfirm.value = true;
}


function cancelDelete(): void {
  showDeleteConfirm.value = false;
}


function deleteTask(): void {
  taskStore.deleteTask(props.task.id);
  showDeleteConfirm.value = false;
}

// Fecha para mostrar al crear o editar una tarea
function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
</script>


<template>
  <div class="flex flex-col bg-gray-light dark:bg-gray-dark p-4 rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-2 text-gray-textLight dark:text-gray-textDark opacity-70">
      <div class="flex items-center gap-1">
        <UserAvatar :user="task.user" size="sm" />
        <span class="text-sm">{{ task.user }}</span>
      </div>
      <span class="text-xs">{{ formatDate(task.createdAt) }}</span>
    </div>

    <div class="flex items-center justify-between">
      <!-- Modo de visualización normal de la tarea -->
      <template v-if="!isEditing">
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <Icon
              v-if="task.completed"
              icon="mdi:check-circle"
              class="text-primary-light dark:text-primary-dark text-lg"
            />
            <!-- Texto de la tarea -->
            <span
              :class="{ 'line-through text-gray-500 dark:text-gray-400': task.completed }"
              class="text-lg text-gray-textLight dark:text-gray-textDark"
            >
              {{ task.text.toUpperCase()[0] + task.text.slice(1) }}
            </span>
          </div>
          <small v-if="task.edited" class="text-xs text-gray-textLight opacity-60 dark:text-gray-textDark dark:opacity-50">
            edited {{ formatDate(task.editedAt) }}
          </small>
        </div>
        <div class="flex items-center relative">
          <button
            @click="taskStore.toggleTaskCompletion(task.id)"
            class="icon-btn"
            :title="task.completed ? 'Unmark' : 'Complete'"
          >
            <Icon :icon="task.completed ? 'mdi:undo' : 'mdi:check'" class="text-xl" />
          </button>
          <button
            @click="startEdit"
            class="icon-btn"
            title="Edit"
          >
            <Icon icon="mdi:pencil" class="text-xl" />
          </button>
          <div class="relative">
            <button
              @click="confirmDelete"
              class="icon-btn text-red-light dark:text-red-dark"
              title="Delete"
              v-if="!showDeleteConfirm"
            >
              <Icon icon="mdi:trash-can" class="text-xl" />
            </button>
            
            <div v-if="showDeleteConfirm" class="delete-confirm text-black">
              <span class="text-sm font-medium">Are you sure you want to delete this task?</span>
              <div class="flex gap-1 mt-1">
                <button 
                  @click="deleteTask"
                  class="confirm-btn bg-red-light dark:bg-red-dark hover:opacity-80"
                  title="Yes"
                >
                  <Icon icon="mdi:check" class="text-white" />
                </button>
                <button 
                  @click="cancelDelete"
                  class="confirm-btn bg-gray-400 dark:bg-gray-600 hover:opacity-80"
                  title="No"
                >
                  <Icon icon="mdi:close" class="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <!-- Modo de edición de la task -->
      <template v-else>
        <input
          v-model="editedText"
          type="text"
          class="flex-1 border border-gray-light dark:border-gray-dark p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-white dark:bg-black text-gray-textLight dark:text-gray-textDark"
          @keyup.enter="saveEdit"
        />
        <div class="flex gap-1">
          <button
            @click="saveEdit"
            class="icon-btn text-primary-light dark:text-primary-light ml-1"
            title="Save"
          >
            <Icon icon="mdi:content-save" class="text-xl" />
          </button>
          <button
            @click="cancelEdit"
            class="icon-btn text-gray-400 dark:text-gray-500"
            title="Cancel"
          >
            <Icon icon="mdi:close" class="text-xl" />
          </button>
        </div>
      </template>
    </div>
  </div>
</template>


<style scoped>
.line-through {
  text-decoration: line-through;
}

.icon-btn {
  @apply flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition;
}

.delete-confirm {
  position: absolute;
  right: 0;
  top: 0;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 10;
  white-space: nowrap;
}

.dark .delete-confirm {
  background-color: #1a202c;
  border-color: #4a5568;
}

.confirm-btn {
  @apply flex items-center justify-center w-6 h-6 rounded-full transition;
}
</style>
