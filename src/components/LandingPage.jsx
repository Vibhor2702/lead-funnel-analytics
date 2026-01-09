import { useState, useRef, useEffect } from 'react'
import {
  trackCTAClick,
  trackFormStart,
  trackFormSubmit,
  trackThankYouView,
} from '../utils/ga'
import './LandingPage.css'

/**
 * LandingPage Component
 * 
 * This component represents a simple conversion funnel:
 * 1. User lands on page (page_view event tracked in App.jsx)
 * 2. User clicks CTA button (cta_click event)
 * 3. User fills and submits form (form_submit event)
 * 4. User sees thank you message (conversion complete)
 * 
 * This funnel structure allows us to measure:
 * - Drop-off rates at each step
 * - Conversion rate (form_submit / page_view)
 * - CTA effectiveness (cta_click / page_view)
 */
function LandingPage() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  
  // UI state
  const [showForm, setShowForm] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [errors, setErrors] = useState({})
  
  // Track if form_start has been fired (session-safe)
  const formStartTracked = useRef(false)

  /**
   * Handle CTA button click
   * Tracks intent and reveals the form
   */
  const handleCTAClick = () => {
    // Track GA4 event
    trackCTAClick('get_early_access')
    
    // Show form
    setShowForm(true)
    
    // Smooth scroll to form
    setTimeout(() => {
      document.getElementById('lead-form')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }

  /**
   * Handle first input focus
   * Fires form_start event once per session
   */
  const handleFormStart = () => {
    if (!formStartTracked.current) {
      trackFormStart()
      formStartTracked.current = true
    }
  }

  /**
   * Handle form input changes with validation
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  /**
   * Validate form fields
   */
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handle form submission
   * Validates, tracks, and shows success state
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate
    if (!validateForm()) {
      return
    }
    
    // Show loading state
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      // Track conversion
      trackFormSubmit(!!formData.name, !!formData.email)
      
      // Update UI
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Clear form data
      setFormData({ name: '', email: '' })
    }, 800)
  }

  /**
   * Track thank_you_view when success message appears
   */
  useEffect(() => {
    if (isSubmitted) {
      trackThankYouView()
    }
  }, [isSubmitted])

  /**
   * Show sticky CTA after 40% scroll
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      setShowStickyCTA(scrollPercent > 40 && !showForm && !isSubmitted)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showForm, isSubmitted])

  return (
    <div className="landing-page">
      {/* Header Section */}
      <header className="hero-section">
        <div className="container">
          <h1 className="headline">Transform Your Marketing with Data-Driven Insights</h1>
          <p className="subheadline">
            Join thousands of marketers who use our analytics platform to optimize their funnels 
            and increase conversions by up to 300%.
          </p>
          
          {!showForm && !isSubmitted && (
            <button 
              className="cta-button" 
              onClick={handleCTAClick}
              aria-label="Get early access to our platform"
            >
              Get Early Access
            </button>
          )}
        </div>
      </header>

      {/* Sticky CTA (shows after 40% scroll) */}
      {showStickyCTA && (
        <button 
          className="sticky-cta"
          onClick={handleCTAClick}
          aria-label="Get early access"
        >
          Get Early Access
        </button>
      )}

      {/* Form Section */}
      {showForm && !isSubmitted && (
        <section className="form-section" id="lead-form">
          <div className="container">
            <h2>Start Your Free Trial</h2>
            <p className="form-description">
              Enter your details below to get instant access to our platform.
            </p>
            
            <form className="lead-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={handleFormStart}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                  className={errors.name ? 'error' : ''}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <span className="error-message" id="name-error" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={handleFormStart}
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                  className={errors.email ? 'error' : ''}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <span className="error-message" id="email-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* Thank You Section */}
      {isSubmitted && (
        <section className="thank-you-section">
          <div className="container">
            <div className="success-message">
              <div className="success-icon">🎉</div>
              <h2>Thank You!</h2>
              <p>
                We've received your information and will send you early access details shortly.
              </p>
              <p className="secondary-text">
                Check your email inbox for next steps.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 Lead Funnel Analytics. Built for digital marketing excellence.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
