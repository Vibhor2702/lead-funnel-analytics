/**
 * Google Analytics 4 (GA4) Integration
 * 
 * This file handles all GA4 tracking for the lead funnel.
 * It uses gtag.js (Google's official tracking library) to send events.
 * 
 * Key Concepts:
 * - Measurement ID: Unique identifier for your GA4 property
 * - Events: User interactions we want to track (page_view, cta_click, form_submit)
 * - Parameters: Additional context sent with each event
 */

/**
 * Initialize Google Analytics 4
 * This loads the gtag.js script and configures it with your Measurement ID
 * 
 * The Measurement ID should be stored in environment variables for security
 * and easy configuration across different environments (dev, staging, prod)
 */
export const initGA = () => {
  // Get GA4 Measurement ID from environment variable
  // Format: G-XXXXXXXXXX
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

  // Only initialize if Measurement ID is provided
  if (!measurementId) {
    console.warn('GA4 Measurement ID not found. Analytics will not be tracked.')
    console.warn('Please add VITE_GA_MEASUREMENT_ID to your .env file')
    return
  }

  // Create and inject the gtag.js script into the page
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Initialize the global gtag function
  window.dataLayer = window.dataLayer || []
  window.gtag = function() {
    window.dataLayer.push(arguments)
  }
  
  // Set the current timestamp
  window.gtag('js', new Date())
  
  // Configure GA4 with your Measurement ID
  window.gtag('config', measurementId, {
    send_page_view: false, // We'll manually track page views for better control
  })

  console.log('✅ GA4 initialized with Measurement ID:', measurementId)
}

/**
 * Track custom events in GA4
 * 
 * @param {string} eventName - Name of the event (e.g., 'cta_click', 'form_submit')
 * @param {object} eventParams - Additional parameters to send with the event
 * 
 * Event parameters help you understand context:
 * - event_category: Groups similar events (e.g., 'engagement', 'conversion')
 * - event_label: Specific identifier (e.g., 'get_early_access_button')
 * - Custom params: Any additional data you want to track
 */
export const trackEvent = (eventName, eventParams = {}) => {
  // Check if gtag is available (it won't be if GA wasn't initialized)
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams)
    console.log('📊 GA4 Event tracked:', eventName, eventParams)
  } else {
    console.warn('gtag is not initialized. Event not tracked:', eventName)
  }
}

/**
 * Funnel Tracking Strategy:
 * 
 * 1. page_view (Top of Funnel)
 *    - Tracked automatically when user lands on page
 *    - Measures total traffic
 * 
 * 2. cta_click (Middle of Funnel)
 *    - Tracked when user clicks "Get Early Access"
 *    - Measures engagement and interest level
 *    - Calculate: (cta_click / page_view) = Engagement Rate
 * 
 * 3. form_submit (Bottom of Funnel - Conversion)
 *    - Tracked when user submits the form
 *    - Measures actual conversions
 *    - Calculate: (form_submit / page_view) = Conversion Rate
 *    - Calculate: (form_submit / cta_click) = Form Completion Rate
 * 
 * These metrics help identify where users drop off in the funnel
 * and where optimizations can have the biggest impact.
 */
