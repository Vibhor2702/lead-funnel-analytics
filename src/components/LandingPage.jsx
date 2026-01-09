import { useState } from 'react'
import { trackEvent } from '../analytics/ga4'
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
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  
  // Track if form has been submitted
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Track if form is visible (used to show/hide form after CTA click)
  const [showForm, setShowForm] = useState(false)

  /**
   * Handle CTA button click
   * This is the first conversion point in the funnel
   */
  const handleCTAClick = () => {
    // Track CTA click event in GA4
    // This helps measure user engagement and intent
    trackEvent('cta_click', {
      event_category: 'engagement',
      event_label: 'get_early_access_button',
      button_text: 'Get Early Access'
    })
    
    // Show the form
    setShowForm(true)
    
    // Smooth scroll to form
    setTimeout(() => {
      document.getElementById('lead-form')?.scrollIntoView({ 
        behavior: 'smooth' 
      })
    }, 100)
  }

  /**
   * Handle form input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /**
   * Handle form submission
   * This is the final conversion point in the funnel
   */
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page reload
    
    // Track form submission event in GA4
    // This is the key conversion metric for the funnel
    trackEvent('form_submit', {
      event_category: 'conversion',
      event_label: 'lead_generation_form',
      form_name: 'early_access_form',
      // Note: Never send PII (Personally Identifiable Information) to GA
      // We only send metadata about the submission
      has_name: !!formData.name,
      has_email: !!formData.email
    })
    
    // In a real application, you would:
    // 1. Send data to your backend/CRM
    // 2. Store in database
    // 3. Trigger email automation
    // For this demo, we just show the thank you message
    
    setIsSubmitted(true)
    
    // Clear form data (optional, for security)
    setFormData({ name: '', email: '' })
  }

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
            >
              Get Early Access
            </button>
          )}
        </div>
      </header>

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
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <button type="submit" className="submit-button">
                Submit
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
              <h2>🎉 Thank You!</h2>
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
