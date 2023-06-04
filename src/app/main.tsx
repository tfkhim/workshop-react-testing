import React from 'react'
import ReactDOM from 'react-dom/client'
import { TodoListApp } from './TodoListApp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TodoListApp />
  </React.StrictMode>
)
