import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { trackBlogView, trackBlogCTAClick } from '../utils/ga'
import './Blog.css'

/**
 * Blog Component
 * 
 * Single blog page for content marketing and SEO.
 * This demonstrates:
 * - Content marketing strategy
 * - SEO implementation
 * - Funnel integration (CTA at bottom)
 * - GA4 content tracking
 * 
 * IMPORTANT: Paste your blog content in the designated section below
 */
function Blog() {
  const navigate = useNavigate()

  // Track blog view on component mount
  useEffect(() => {
    trackBlogView()
  }, [])

  /**
   * Handle CTA button click
   * Tracks event and navigates back to homepage with form
   */
  const handleCTAClick = () => {
    trackBlogCTAClick()
    navigate('/')
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>How Simple Funnels Drive Lead Generation | Lead Funnel Analytics</title>
        <meta 
          name="description" 
          content="Learn how data-driven marketing funnels can increase your conversion rates by up to 300%. Discover proven strategies for lead generation and analytics tracking." 
        />
        <meta name="keywords" content="lead generation, marketing funnel, conversion optimization, analytics, digital marketing" />
      </Helmet>

      <div className="blog-page">
        {/* Navigation */}
        <nav className="blog-nav">
          <div className="container">
            <button onClick={() => navigate('/')} className="back-link">
              ← Back to Home
            </button>
          </div>
        </nav>

        {/* Blog Article */}
        <article className="blog-article">
          <div className="container">
            {/* Blog Header */}
            <header className="blog-header">
              <h1 className="blog-title">
                How Simple Funnels Drive Lead Generation
              </h1>
              
              <p className="blog-meta">
                Published: January 2026 · Category: Digital Marketing · 5 min read
              </p>
            </header>

            {/* Blog Content Section */}
            <section className="blog-content">
              
              {/* ========================================
                  BLOG CONTENT START
                  ========================================
                  
                  PASTE YOUR BLOG CONTENT HERE
                  
                  You can use any HTML elements:
                  - <h2> for section headers
                  - <h3> for subsections
                  - <p> for paragraphs
                  - <ul> and <li> for lists
                  - <strong> for bold text
                  - <em> for italic text
                  - <blockquote> for quotes
                  
                  Example structure:
                  
                  <h2>Introduction</h2>
                  <p>Your paragraph text here...</p>
                  
                  <h2>Main Point 1</h2>
                  <p>More content...</p>
                  
                  <h3>Subsection</h3>
                  <ul>
                    <li>Bullet point 1</li>
                    <li>Bullet point 2</li>
                  </ul>
                  
                  ======================================== */}

              {/* DELETE THIS PLACEHOLDER AND PASTE YOUR CONTENT HERE */}
              <p className="content-placeholder">
                📝 <strong>Your blog content goes here.</strong>
                <br /><br />
                Delete this placeholder paragraph and paste your own content.
                <br /><br />
                Use proper headings (&lt;h2&gt;, &lt;h3&gt;) and paragraphs (&lt;p&gt;) 
                for SEO-friendly structure.
              </p>

              {/* ========================================
                  BLOG CONTENT END
                  ======================================== */}

            </section>

            {/* Call-to-Action */}
            <div className="blog-cta">
              <div className="blog-cta-content">
                <h3>Want to build a funnel like this?</h3>
                <p>
                  This entire landing page and blog is a working example of 
                  conversion-driven design with GA4 analytics tracking.
                </p>
                <button 
                  className="blog-cta-button"
                  onClick={handleCTAClick}
                >
                  Get Early Access
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Footer */}
        <footer className="blog-footer">
          <div className="container">
            <p>© 2026 Lead Funnel Analytics. Built for digital marketing excellence.</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Blog
