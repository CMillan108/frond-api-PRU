# Aplicación de Lista de Tareas (Frontend)

Este proyecto es una aplicación web desarrollada en React para gestionar tareas por usuario, conectándose a una API REST. Permite listar usuarios, ver y filtrar tareas, agregar, marcar como completadas o pendientes y eliminar tareas.

## Requisitos previos
- Node.js >= 14.x
- npm >= 6.x
- Tener corriendo la API backend (verifica la URL en `src/api/api.js`)

## Instalación
1. Clona el repositorio o descarga el código.
2. Entra a la carpeta del frontend:
   ```bash
   cd frontend-tasks
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Modo de desarrollo
Para iniciar la app en modo desarrollo:
```bash
npm start
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.


## Estructura principal
- `src/App.js`: Lógica principal y estados globales.
- `src/components/TaskList.js`: Lista y filtros de tareas.
- `src/components/UserList.js`: Selector de usuarios.
- `src/components/Alert.js`: Mensajes de alerta.
- `src/api/api.js`: Llamadas a la API.
