/**
 * UTM Parameter Tracking Utility
 * 
 * Tracks campaign attribution by capturing and persisting UTM parameters
 * Used to understand which marketing channels drive conversions
 * 
 * Standard UTM Parameters:
 * - utm_source: Traffic source (e.g., google, facebook, email)
 * - utm_medium: Marketing medium (e.g., cpc, social, email)
 * - utm_campaign: Campaign name (e.g., spring_sale, webinar_promo)
 * - utm_term: Paid keywords (for PPC campaigns)
 * - utm_content: Ad variation (for A/B testing ads)
 * 
 * Example URL:
 * https://yoursite.com/?utm_source=linkedin&utm_medium=social&utm_campaign=launch_week
 */

const UTM_PARAMS = [
  'utm_source',
  'utm_medium', 
  'utm_campaign',
  'utm_term',
  'utm_content'
];

const STORAGE_KEY = 'utm_params';
const STORAGE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

/**
 * Parse UTM parameters from current URL
 * @returns {Object} Object with UTM parameters (empty if none found)
 */
export const getUTMParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};

  UTM_PARAMS.forEach(param => {
    const value = urlParams.get(param);
    if (value) {
      utmParams[param] = value;
    }
  });

  return utmParams;
};

/**
 * Save UTM parameters to sessionStorage
 * First-touch attribution: Only saves if no UTM params exist yet
 * This ensures we credit the original campaign that brought the user
 * 
 * @param {Object} params - UTM parameters object
 */
export const saveUTMParams = (params) => {
  if (Object.keys(params).length === 0) return;

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    
    // First-touch attribution: don't overwrite existing UTMs
    if (!stored) {
      const data = {
        params: params,
        timestamp: Date.now()
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      
      if (import.meta.env.DEV) {
        console.log('📍 UTM Params captured:', params);
      }
    } else if (import.meta.env.DEV) {
      console.log('📍 UTM Params already captured (first-touch attribution)');
    }
  } catch (error) {
    console.error('❌ Failed to save UTM params:', error);
  }
};

/**
 * Retrieve stored UTM parameters
 * @returns {Object|null} Stored UTM parameters or null
 */
export const getStoredUTMParams = () => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);
    
    // Check if data expired (30 days)
    if (Date.now() - data.timestamp > STORAGE_DURATION) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return data.params;
  } catch (error) {
    console.error('❌ Failed to retrieve UTM params:', error);
    return null;
  }
};

/**
 * Initialize UTM tracking
 * Call this once when app loads
 */
export const initUTMTracking = () => {
  const currentUTMs = getUTMParams();
  
  if (Object.keys(currentUTMs).length > 0) {
    saveUTMParams(currentUTMs);
    
    // Track campaign landing in GA4
    if (window.gtag) {
      window.gtag('event', 'campaign_landing', {
        ...currentUTMs,
        page_location: window.location.href
      });
    }
  }
};

/**
 * Get attribution data for events
 * Returns stored UTM params or organic traffic marker
 * @returns {Object} Attribution data
 */
export const getAttributionData = () => {
  const storedUTMs = getStoredUTMParams();
  
  if (storedUTMs) {
    return {
      attribution: 'campaign',
      ...storedUTMs
    };
  }
  
  return {
    attribution: 'organic',
    utm_source: 'direct',
    utm_medium: 'none'
  };
};
