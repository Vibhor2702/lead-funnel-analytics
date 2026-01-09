import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import GA4 initialization
import { initGA } from './ga.js'

// Initialize Google Analytics before rendering the app
// This ensures GA is ready to track page views and events
initGA()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
