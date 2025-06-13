import React, { useState, useMemo } from 'react';

const TaskList = ({ tasks, onToggle, onDelete }) => {
  const [filter, setFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <div>
      <div className="btn-group mb-3 mt-4 w-100" role="group">
        <button 
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button 
          className={`btn ${filter === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('pending')}
        >
          Pendientes
        </button>
        <button 
          className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('completed')}
        >
          Completadas
        </button>
      </div>

      <ul className="list-group">
        {filteredTasks.map(task => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id, !task.completed)}
                className="form-check-input me-2"
              />
              <span className={task.completed ? 'text-decoration-line-through text-muted' : ''}>
                {task.title}
              </span>
            </div>
            <button 
              className="btn btn-sm btn-danger" 
              onClick={() => onDelete(task.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
