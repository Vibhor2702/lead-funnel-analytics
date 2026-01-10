import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Blog from './components/Blog'
import './App.css'

/**
 * App Component
 * 
 * Root component with routing setup.
 * Routes:
 * - / (Home): Landing page with lead form
 * - /blog: Blog content page
 */
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
