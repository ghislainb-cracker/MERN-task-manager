import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/api/tasks');
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!title) return;
    
    await axios.post('http://localhost:5000/api/tasks', {
      title,
      description
    });
    
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const toggleComplete = async (id, currentStatus) => {
    await axios.patch(`http://localhost:5000/api/tasks/${id}`, {
      completed: !currentStatus
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      
      <div className="task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      
      <div className="task-list">
        {tasks.map(task => (
          <div key={task._id} className={`task ${task.completed ? 'completed' : ''}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-actions">
              <button onClick={() => toggleComplete(task._id, task.completed)}>
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;