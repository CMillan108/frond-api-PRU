import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import TaskList from './components/TaskList';
import Alert from './components/Alert';
import { getTasks, addTask, updateTask, deleteTask } from './api/api';

function App() {
  const [userId, setUserId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      const userTasks = res.data.filter(task => task.user_id == userId);
      setTasks(userTasks);
    } catch (error) {
      showAlert(error.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  const handleAddTask = async () => {
    if (!newTask.trim()) {
      showAlert('La tarea no puede estar vacía', 'warning');
      return;
    }

    try {
      await addTask({ user_id: userId, title: newTask });
      setNewTask('');
      fetchTasks();
      showAlert('Tarea agregada exitosamente', 'success');
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };

  const handleToggleTask = async (id, completed) => {
    try {
      await updateTask(id, completed);
      fetchTasks();
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;

    try {
      await deleteTask(id);
      fetchTasks();
      showAlert('Tarea eliminada exitosamente', 'success');
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Gestión de Tareas</h1>
      
      <Alert {...alert} onClose={() => setAlert({ message: '', type: '' })} />
      
      <UserList onSelectUser={setUserId} />
      
      {userId && (
        <>
          <div className="input-group mt-3">
            <input
              className="form-control"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Nueva tarea"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <button 
              className="btn btn-primary" 
              onClick={handleAddTask}
              disabled={loading}
            >
              {loading ? 'Agregando...' : 'Agregar'}
            </button>
          </div>
          
          {loading ? (
            <div className="text-center mt-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            <TaskList 
              tasks={tasks} 
              onToggle={handleToggleTask} 
              onDelete={handleDeleteTask} 
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
