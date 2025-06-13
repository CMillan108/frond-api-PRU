import axios from 'axios';

const API_URL = 'http://localhost/backend-api/public';

// Configuración base de axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000
});

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'Error en la conexión';
    throw new Error(message);
  }
);

export const getUsers = () => api.get('/users');
export const getTasks = () => api.get('/tasks');
export const addUser = (data) => api.post('/users', data);
export const addTask = (data) => api.post('/tasks', data);
export const updateTask = (id, completed) => api.put(`/tasks/${id}`, { completed });
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
