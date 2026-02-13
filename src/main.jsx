import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { initGA } from './utils/ga'
import { initUTMTracking } from './utils/utm'
import './index.css'

// Initialize Google Analytics 4 before rendering
initGA()

// Initialize UTM parameter tracking for campaign attribution
initUTMTracking()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
