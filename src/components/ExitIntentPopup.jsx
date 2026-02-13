import { useState, useEffect } from 'react';
import './ExitIntentPopup.css';

/**
 * Exit Intent Popup Component
 * 
 * CRO Strategy: Captures abandoning visitors by detecting exit intent
 * Triggers when mouse moves toward browser top (to close tab or change URL)
 * Shows only once per session to avoid annoying users
 * 
 * Best Practices:
 * - Desktop only (mobile has poor UX for exit intent)
 * - Session-based display (localStorage)
 * - Clear value proposition
 * - Easy dismiss option
 */
const ExitIntentPopup = ({ onConvert, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    // Only show on desktop (screen width > 768px)
    if (window.innerWidth <= 768) return;

    // Check if popup was already shown this session
    const hasSeenPopup = sessionStorage.getItem('exitIntentShown');
    if (hasSeenPopup) return;

    let timeoutId;

    const handleMouseLeave = (e) => {
      // Detect mouse moving to top of viewport (intent to leave)
      if (e.clientY <= 10 && !isVisible && !hasSeenPopup) {
        // Small delay to avoid false positives
        timeoutId = setTimeout(() => {
          setIsVisible(true);
          sessionStorage.setItem('exitIntentShown', 'true');
          
          // Track popup view in GA4
          if (window.gtag) {
            window.gtag('event', 'popup_view', {
              popup_type: 'exit_intent',
              funnel_stage: 'retention'
            });
          }
        }, 100);
      }
    };

    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseout', handleMouseLeave);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
    
    // Track popup dismissal
    if (window.gtag) {
      window.gtag('event', 'popup_dismiss', {
        popup_type: 'exit_intent',
        action: 'close_button'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'popup_conversion', {
        popup_type: 'exit_intent',
        funnel_stage: 'conversion',
        has_email_field: true
      });
    }

    setShowThankYou(true);
    if (onConvert) onConvert(email);

    // Auto-close after 3 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="exit-popup-overlay" onClick={handleClose}>
      <div className="exit-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="exit-popup-close" onClick={handleClose} aria-label="Close">
          ×
        </button>

        {!showThankYou ? (
          <>
            <div className="exit-popup-icon">⚡</div>
            <h2 className="exit-popup-title">Wait! Don't Miss Out</h2>
            <p className="exit-popup-subtitle">
              Get our <strong>free guide</strong> on building high-converting funnels
            </p>

            <form onSubmit={handleSubmit} className="exit-popup-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="exit-popup-input"
                required
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                className="exit-popup-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner"></span>
                ) : (
                  'Get Free Guide'
                )}
              </button>
            </form>

            <p className="exit-popup-disclaimer">
              No spam. Unsubscribe anytime. 🔒
            </p>
          </>
        ) : (
          <div className="exit-popup-thank-you">
            <div className="exit-popup-icon success">✓</div>
            <h2 className="exit-popup-title">Thank You!</h2>
            <p className="exit-popup-subtitle">
              Check your inbox for the free guide.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExitIntentPopup;
