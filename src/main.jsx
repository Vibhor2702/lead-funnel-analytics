import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ReactGA from 'react-ga4'
import './index.css'

// Get GA4 Measurement ID from environment variable with fallback
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-GH1KDE62G9'

// Initialize Google Analytics 4 before rendering React app
// This ensures GA is ready to track all user interactions
if (GA_ID) {
  ReactGA.initialize(GA_ID, {
    gtagOptions: {
      send_page_view: true,
    },
  })
  
  // Send initial pageview event
  ReactGA.send('pageview')
  
  console.log('✅ GA4 initialized with react-ga4:', GA_ID)
} else {
  console.warn('⚠️ GA4 Measurement ID not found. Analytics disabled.')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
