/**
 * Google Analytics 4 Utility
 * 
 * Centralized helper for GA4 event tracking using gtag.js
 * Uses lowercase snake_case naming and GA4-recommended parameters
 */

/**
 * Initialize Google Analytics 4
 * Dynamically injects gtag.js script and configures GA4
 * 
 * @returns {boolean} Success status
 */
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

  if (!measurementId) {
    console.warn('⚠️ GA4: Measurement ID not found')
    return false
  }

  if (window.gtag) {
    console.warn('⚠️ GA4: Already initialized')
    return true
  }

  try {
    // Inject gtag.js script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || []
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }

    window.gtag('js', new Date())
    window.gtag('config', measurementId, {
      send_page_view: true,
    })

    if (import.meta.env.DEV) {
      console.log('✅ GA4 initialized:', measurementId)
    }

    return true
  } catch (error) {
    console.error('❌ GA4 initialization failed:', error)
    return false
  }
}

/**
 * Track custom GA4 events with standardized parameters
 * 
 * @param {string} eventName - Event name in lowercase snake_case
 * @param {Object} params - Custom event parameters
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag !== 'function') {
    console.warn('⚠️ GA4: gtag not initialized')
    return false
  }

  try {
    // Always include page_location for context
    const eventParams = {
      page_location: window.location.href,
      ...params,
    }

    window.gtag('event', eventName, eventParams)

    // Debug logging in development only
    if (import.meta.env.DEV) {
      console.log('📊 GA4 Event:', eventName, eventParams)
    }

    return true
  } catch (error) {
    console.error('❌ GA4 event failed:', error)
    return false
  }
}

/**
 * Funnel Event Helpers
 * Pre-configured functions for common funnel stages
 */

export const trackCTAClick = (buttonName = 'primary_cta') => {
  trackEvent('cta_click', {
    button_name: buttonName,
    funnel_stage: 'intent',
  })
}

export const trackFormStart = () => {
  trackEvent('form_start', {
    funnel_stage: 'engagement',
    form_name: 'lead_generation',
  })
}

export const trackFormSubmit = (hasName, hasEmail) => {
  trackEvent('form_submit', {
    funnel_stage: 'conversion',
    form_name: 'lead_generation',
    // Never send PII - only metadata
    has_name_field: hasName,
    has_email_field: hasEmail,
  })
}

export const trackThankYouView = () => {
  trackEvent('thank_you_view', {
    funnel_stage: 'completion',
    conversion_status: 'success',
  })
}

/**
 * Blog Event Tracking
 */

export const trackBlogView = () => {
  trackEvent('blog_view', {
    content_type: 'blog_post',
    page_type: 'content',
  })
}

export const trackBlogCTAClick = () => {
  trackEvent('blog_cta_click', {
    funnel_stage: 'intent',
    cta_location: 'blog_bottom',
  })
}

/**
 * Exit Intent Popup Event Tracking
 * CRO strategy: Track popup performance for conversion optimization
 */

export const trackPopupView = () => {
  trackEvent('popup_view', {
    popup_type: 'exit_intent',
    funnel_stage: 'retention',
  })
}

export const trackPopupDismiss = (action = 'close_button') => {
  trackEvent('popup_dismiss', {
    popup_type: 'exit_intent',
    action: action,
  })
}

export const trackPopupConversion = () => {
  trackEvent('popup_conversion', {
    popup_type: 'exit_intent',
    funnel_stage: 'conversion',
    has_email_field: true,
  })
}
