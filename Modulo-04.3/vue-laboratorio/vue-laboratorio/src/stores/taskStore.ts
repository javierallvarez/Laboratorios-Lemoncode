import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  edited: boolean;
  editedAt: string | null;
  createdAt: string;
  user: string;
}


export const useTaskStore = defineStore('tasks', () => {
  const STORAGE_KEY = 'vue-todo-tasks';
  const tasks = ref<Task[]>([]);
  

  // Cargar tareas desde localStorage (se puede ver el objeto abriendo Application > Local Storage en el navegador)
  function loadTasks() {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    // Asignar IDs randmom y fechas de creación a las tareas
    // Si no hay tareas guardadas, se inicializa con un array vacío
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      tasks.value = parsedTasks.map((task: any) => ({
        id: task.id || crypto.randomUUID(),
        text: task.text || '',
        completed: task.completed || false,
        edited: task.edited || false,
        editedAt: task.editedAt || null,
        createdAt: task.createdAt || new Date().toISOString(),
        user: task.user || 'Hans Topo'
      }));
    } else {
      tasks.value = [];
    }
  }
  
  // Guardar tareas en localStorage cuando cambien
  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    },
    { deep: true }
  );
  

  // Añadir tarea
  function addTask(text: string) {
    tasks.value.push({
      id: crypto.randomUUID(),
      text,
      completed: false,
      edited: false,
      editedAt: null,
      createdAt: new Date().toISOString(),
      user: 'Hans Topo'
    });
  }
  

  // Marcar tarea como completada/no completada
  function toggleTaskCompletion(id: string) {
    const task = tasks.value.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }
  

  function editTask(id: string, newText: string) {
    const task = tasks.value.find(t => t.id === id);
    if (task && task.text !== newText) {
      task.text = newText;
      task.edited = true;
      task.editedAt = new Date().toISOString();
    }
  }
  

  function deleteTask(id: string) {
    const index = tasks.value.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks.value.splice(index, 1);
    }
  }
  
  // Llamo a la función para cargar las tareas al iniciar la aplicación
  loadTasks();
  
  
  return {
    tasks,
    addTask,
    toggleTaskCompletion,
    editTask,
    deleteTask
  };
});
