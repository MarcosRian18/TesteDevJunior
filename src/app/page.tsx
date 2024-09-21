'use client';

import React, { useState } from 'react';
import './styles/tasks.scss';
import Header from './components/Header';

type Task = {
  id: number;
  name: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Comprar pão', completed: false },
    { id: 2, name: 'Estudar programação', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const handleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const addTask = () => {
    if (newTask.trim()) {
      const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
      setTasks([...tasks, { id: newId, name: newTask, completed: false }]);
      setNewTask('');
      closeAddModal();
    }
  };

  const openDeleteModal = (id: number) => {
    setTaskToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    if (taskToDelete !== null) {
      setTasks((prev) => prev.filter((task) => task.id !== taskToDelete));
      closeDeleteModal();
    }
  };

  return (
    
      <div className="task-page">
        <Header />
        <div className={`task-container ${isAddModalOpen || isDeleteModalOpen ? 'blur-background' : ''}`}>
          <div className="task-message">
            <h1>Minhas Tarefas</h1>
            <p>Abaixo estão as tarefas a serem realizadas:</p>
    
            <div className="add-task">
              <button onClick={openAddModal}>Nova Tarefa</button>
            </div>
          </div>
    
          <div className="task-list">
            {tasks.filter((task) => !task.completed).length === 0 ? (
              <p className="no-tasks">Você não tem tarefas pendentes!</p>
            ) : (
              tasks
                .filter((task) => !task.completed)
                .map((task) => (
                  <div key={task.id} className="task">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleComplete(task.id)}
                    />
                    <span>{task.name}</span>
                    <button
                      onClick={() => openDeleteModal(task.id)}
                      className="delete-button"
                    >
                      🗑️
                    </button>
                  </div>
                ))
            )}
          </div>
    
          <h2 className='tarefasFinalizadas'>Tarefas Finalizadas</h2>
          <div className="completed-tasks">
            {tasks.filter((task) => task.completed).length === 0 ? (
              <p className="no-tasks">Nenhuma tarefa finalizada.</p>
            ) : (
              tasks
                .filter((task) => task.completed)
                .map((task) => (
                  <div key={task.id} className="task completed">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleComplete(task.id)}
                    />
                    <span>{task.name}</span>
                    <button
                      onClick={() => openDeleteModal(task.id)}
                      className="delete-button"
                    >
                      🗑️
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>
    
        {isAddModalOpen && (
          <div className="modal-overlay" onClick={closeAddModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Nova Tarefa</h3>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Digite o nome da tarefa"
              />
              <div className="modal-actions">
                <button className='salvar' onClick={addTask}>Salvar</button>
                <button className='cancelar' onClick={closeAddModal}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
    
        {isDeleteModalOpen && (
          <div className="modal-overlay" onClick={closeDeleteModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Deletar Tarefa</h3>
              <p>Tem certeza que deseja deletar essa tarefa?</p>
              <div className="modal-actions">
                <button className='deletar' onClick={handleDelete}>Deletar</button>
                <button className='cancelar' onClick={closeDeleteModal}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}
