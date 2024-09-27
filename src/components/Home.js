import React, { useState, useEffect, useCallback } from 'react'
import './Home.css'

export default function Navbar({ isAuthenticated, setIsAuthenticated, setToken, backendHost, token, username }) {

  const [openTasks, setOpenTasks] = useState('');
  const [delayedTasks, setDelayedTasks] = useState('');
  const fetchTaskSummary = useCallback(async () => {
    if (!token) return;

    try {
        const response = await fetch(`${backendHost}/api/task/task_summary/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setOpenTasks(data.tasks.task_summary.open_task);
        setDelayedTasks(data.tasks.task_summary.delayed_task);
      } else {
        console.error('Failed to fetch task summary');
      }
    } catch (error) {
      console.error('Error fetching task summary:', error);
    }
  }, [backendHost, token]);

  useEffect(() => {
    fetchTaskSummary();
  }, [backendHost, token, fetchTaskSummary]);


  return (
    <div id='home-container'>
      <div className="card p-2 mx-5 bg-light my-2 align-self-center" id='welcome-card'>
                    <span className="material-symbols-outlined">
                                  waving_hand
                                  </span>
                  <h5 className="card-title">Hello {username}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">Welcome to TaskHive</h6>
                </div>
      <div className='card bg-light p-4 mx-4 my-2' id='task-summary-card'>
        <h5>Task Summary</h5>
      <div className="row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <div className="card" id='open-tasks-card'>
                      <div className="card-body text-bg-primary rounded-2">
                        <h3 className="card-title">{openTasks}</h3>
                        <p className="card-text">Open tasks</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="card" id='delayed-tasks-card'>
                      <div className="card-body text-bg-danger rounded-2">
                        <h3 className="card-title">{delayedTasks}</h3>
                        <p className="card-text">Delayed tasks</p>
                      </div>
                    </div>
                  </div>
                </div>
    </div>
    </div>
  )
}