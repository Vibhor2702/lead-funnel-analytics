/**
 * Example: Custom Event Tracking in React Components
 * 
 * This file demonstrates best practices for tracking custom events
 * in your React components using the GA4 utility module.
 */

import { trackEvent } from '../ga'

/**
 * Example 1: Tracking Button Clicks
 */
function CTAButton() {
  const handleClick = () => {
    // Track the CTA click event before performing the action
    trackEvent('cta_click', {
      event_category: 'engagement',
      event_label: 'hero_cta_button',
      button_text: 'Get Started',
      button_location: 'hero_section'
    })
    
    // Perform your action (e.g., scroll, navigate, show modal)
    console.log('CTA clicked!')
  }

  return (
    <button onClick={handleClick} className="cta-button">
      Get Started
    </button>
  )
}

/**
 * Example 2: Tracking Form Submissions
 */
function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Track form submission
    trackEvent('form_submit', {
      event_category: 'conversion',
      event_label: 'contact_form',
      form_name: 'contact_us',
      form_location: 'footer'
    })
    
    // Send form data to your backend
    console.log('Form submitted!')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" required />
      <button type="submit">Subscribe</button>
    </form>
  )
}

/**
 * Example 3: Tracking Link Clicks (Outbound)
 */
function SocialLinks() {
  const handleSocialClick = (platform) => {
    trackEvent('social_click', {
      event_category: 'engagement',
      event_label: platform,
      link_type: 'outbound'
    })
  }

  return (
    <div>
      <a 
        href="https://twitter.com/yourhandle" 
        onClick={() => handleSocialClick('twitter')}
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>
      <a 
        href="https://linkedin.com/company/yourcompany" 
        onClick={() => handleSocialClick('linkedin')}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    </div>
  )
}

/**
 * Example 4: Tracking Video Engagement
 */
function VideoPlayer() {
  const handleVideoPlay = () => {
    trackEvent('video_play', {
      event_category: 'engagement',
      event_label: 'product_demo',
      video_title: 'Product Demo 2024'
    })
  }

  const handleVideoComplete = () => {
    trackEvent('video_complete', {
      event_category: 'engagement',
      event_label: 'product_demo',
      video_title: 'Product Demo 2024'
    })
  }

  return (
    <video 
      onPlay={handleVideoPlay}
      onEnded={handleVideoComplete}
      controls
    >
      <source src="/demo.mp4" type="video/mp4" />
    </video>
  )
}

/**
 * Example 5: Tracking with useEffect (Page Views for SPA routing)
 */
import { useEffect } from 'react'
import { trackPageView } from '../ga'

function AboutPage() {
  useEffect(() => {
    // Track page view when component mounts
    // Useful for single-page applications with client-side routing
    trackPageView('/about', 'About Us')
  }, [])

  return (
    <div>
      <h1>About Us</h1>
      <p>Content here...</p>
    </div>
  )
}

/**
 * Best Practices for Event Tracking:
 * 
 * 1. Track User Intent, Not Just Actions
 *    - Track when users show intent (button clicks, form starts)
 *    - Track when they complete goals (form submits, purchases)
 * 
 * 2. Use Consistent Naming Conventions
 *    - Use snake_case for event names: 'button_click', 'form_submit'
 *    - Use descriptive labels: 'hero_cta_button', 'footer_email_signup'
 * 
 * 3. Add Contextual Parameters
 *    - event_category: Groups similar events
 *    - event_label: Specific identifier
 *    - Custom params: button_text, form_name, etc.
 * 
 * 4. Never Track PII (Personally Identifiable Information)
 *    - ❌ Don't track: emails, names, addresses, phone numbers
 *    - ✅ Do track: has_email: true, form_field_count: 3
 * 
 * 5. Test in Development
 *    - Check browser console for "📊 GA4 Event:" logs
 *    - Use GA4 DebugView to verify events in real-time
 *    - Wait 24-48 hours for data in standard reports
 */

export { CTAButton, ContactForm, SocialLinks, VideoPlayer, AboutPage }
