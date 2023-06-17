import React from 'react'
import ReactDOM from 'react-dom/client'
import { TaskListApp } from './TaskListApp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TaskListApp />
  </React.StrictMode>
)
