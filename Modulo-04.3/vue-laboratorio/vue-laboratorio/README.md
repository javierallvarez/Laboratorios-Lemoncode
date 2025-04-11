# Ejercicio: ToDo App con Vue

### Vista principal
![Vista principal](assets/todofy.png)

## Funcionalidades
### **Añadir tareas**
- Los usuarios pueden añadir nuevas tareas utilizando campo de texto.
- El formulario valida:
  - Un máximo de 255 caracteres.
  - Solo caracteres permitidos (letras, números y algunos caracteres especiales).
- Muestra un contador de caracteres y mensajes de error en caso de que se exceda el límite o se introduzcan caracteres no válidos.

### **Filtrar, buscar y ordenar tareas**
- Las tareas se pueden filtrar por: Todas, completadas y pendientes.
- Las tareas se pueden ordenar por: Fecha, alfabéticamente y estado.
- Los usuarios pueden buscar tareas escribiendo texto en un campo de búsqueda.

### **Paginación**
- Las tareas se muestran en páginas de 5 elementos.
- Los usuarios pueden navegar entre páginas utilizando botones de "Anterior" y "Siguiente".

### **Diseño responsive**
- La interfaz está optimizada para dispositivos móviles y de escritorio.
- Los botones flotantes y checkboxes se comportan de manera diferente según el tamaño de la pantalla:
  - En pantallas grandes, los botones flotantes de acciones en bulk están visibles.
  - En pantallas pequeñas, las acciones en bulk están disponibles en el modal.

### **Tema oscuro**
- La aplicación soporta un tema oscuro que se adapta automáticamente según las preferencias del sistema operativo del usuario usando Tailwind CSS.

### **Gestión de estado con Pinia**
- La aplicación utiliza **Pinia** como sistema de gestión de estado para manejar las tareas de manera centralizada.
- Esto permite que los componentes compartan y actualicen el estado de las tareas de forma eficiente.

### **Persistencia con localStorage**
- Las tareas se almacenan en **localStorage**, asegurando que los datos persistan incluso si el usuario recarga la página o cierra el navegador.

### **Accesibilidad con ARIA**
- La aplicación utiliza atributos **ARIA** para mejorar la accesibilidad:
  - Los mensajes de error en el formulario están asociados al campo de entrada mediante `aria-describedby`.
  - Los botones y elementos interactivos tienen etiquetas y roles accesibles (`aria-label`, `role`).
  - Esto asegura que la aplicación sea usable para personas que utilizan lectores de pantalla.
