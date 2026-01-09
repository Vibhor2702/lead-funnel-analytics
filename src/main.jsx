import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initGA } from './utils/ga'
import './index.css'

// Initialize Google Analytics 4 before rendering
initGA()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
