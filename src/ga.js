/**
 * Google Analytics 4 (GA4) Utility Module
 * 
 * This module provides a clean, reusable way to integrate GA4 into a React app.
 * It dynamically injects the gtag.js script and provides helpers for event tracking.
 * 
 * Key Features:
 * - Environment-based configuration (no hardcoded IDs)
 * - Dynamic script injection (no manual <script> tags)
 * - Safe initialization with error handling
 * - Modular event tracking helpers
 */

/**
 * Initialize Google Analytics 4
 * 
 * This function:
 * 1. Reads the GA Measurement ID from environment variables
 * 2. Dynamically injects the gtag.js script into the document
 * 3. Initializes the global gtag function and dataLayer
 * 4. Configures GA4 with the Measurement ID
 * 
 * Should be called once at app startup (in main.jsx)
 * 
 * @returns {boolean} - Returns true if initialized successfully, false otherwise
 */
export const initGA = () => {
  // Get GA4 Measurement ID from Vite environment variables
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

  // Guard: Exit if no Measurement ID is provided
  if (!measurementId) {
    console.warn(
      '⚠️ GA4: No Measurement ID found.',
      'Set VITE_GA_MEASUREMENT_ID in your .env file to enable analytics.'
    )
    return false
  }

  // Guard: Prevent duplicate initialization
  if (window.gtag) {
    console.warn('⚠️ GA4: Already initialized. Skipping duplicate initialization.')
    return true
  }

  try {
    // Step 1: Dynamically inject the gtag.js script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    // Step 2: Initialize the dataLayer and gtag function
    window.dataLayer = window.dataLayer || []
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }

    // Step 3: Set initialization timestamp
    window.gtag('js', new Date())

    // Step 4: Configure GA4 with the Measurement ID
    window.gtag('config', measurementId, {
      send_page_view: true, // Enable automatic page view tracking
    })

    console.log('✅ GA4: Successfully initialized with ID:', measurementId)
    return true

  } catch (error) {
    console.error('❌ GA4: Initialization failed:', error)
    return false
  }
}

/**
 * Track custom events in GA4
 * 
 * This helper function provides a safe way to send custom events to GA4.
 * It checks if gtag is available before attempting to track.
 * 
 * @param {string} eventName - Name of the event (e.g., 'cta_click', 'form_submit')
 * @param {Object} eventParams - Optional parameters to send with the event
 * 
 * @example
 * trackEvent('button_click', {
 *   button_id: 'cta-button',
 *   button_text: 'Get Started'
 * })
 */
export const trackEvent = (eventName, eventParams = {}) => {
  // Guard: Check if gtag is initialized
  if (typeof window.gtag !== 'function') {
    console.warn(
      '⚠️ GA4: gtag not initialized. Event not tracked:',
      eventName
    )
    return false
  }

  try {
    // Send the event to GA4
    window.gtag('event', eventName, eventParams)
    
    // Log for debugging (remove in production if needed)
    if (import.meta.env.DEV) {
      console.log('📊 GA4 Event:', eventName, eventParams)
    }
    
    return true

  } catch (error) {
    console.error('❌ GA4: Event tracking failed:', error)
    return false
  }
}

/**
 * Track page views manually
 * 
 * Useful for single-page applications with client-side routing.
 * 
 * @param {string} pagePath - The page path to track (e.g., '/about')
 * @param {string} pageTitle - Optional page title
 */
export const trackPageView = (pagePath, pageTitle = document.title) => {
  return trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.href,
  })
}

/**
 * Funnel Tracking Best Practices:
 * 
 * For lead generation funnels, track these key events:
 * 
 * 1. page_view - Top of funnel (automatic)
 * 2. cta_click - Middle of funnel (engagement)
 * 3. form_submit - Bottom of funnel (conversion)
 * 
 * Example event parameters:
 * - event_category: Groups similar events ('engagement', 'conversion')
 * - event_label: Specific identifier ('get_early_access_button')
 * - event_value: Numeric value for revenue tracking
 * 
 * Calculate funnel metrics:
 * - Engagement Rate = (cta_click / page_view) × 100
 * - Conversion Rate = (form_submit / page_view) × 100
 * - Form Completion = (form_submit / cta_click) × 100
 */
