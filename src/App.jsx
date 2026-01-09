import LandingPage from './components/LandingPage'
import './App.css'

/**
 * App Component
 * 
 * Root component of the application.
 * GA4 is initialized in main.jsx before React renders,
 * so we don't need to initialize it here.
 */
function App() {
  return (
    <div className="App">
      <LandingPage />
    </div>
  )
}

export default App
