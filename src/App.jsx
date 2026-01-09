import { useEffect } from 'react'
import LandingPage from './components/LandingPage'
import { initGA, trackEvent } from './analytics/ga4'
import './App.css'

function App() {
  useEffect(() => {
    // Initialize Google Analytics 4 on app mount
    initGA()
    
    // Track page view event when the landing page loads
    // This helps measure total traffic entering the funnel
    trackEvent('page_view', {
      page_title: 'Lead Funnel Landing Page',
      page_location: window.location.href,
    })
  }, [])

  return (
    <div className="App">
      <LandingPage />
    </div>
  )
}

export default App
