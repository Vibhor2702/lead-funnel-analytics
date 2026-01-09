# Lead Funnel Analytics - React Landing Page

A conversion-optimized landing page built with React and Vite, featuring Google Analytics 4 integration for tracking user behavior through a digital marketing funnel.

## 🎯 Project Overview

This project demonstrates a simple lead generation funnel with event tracking:

1. **Page View** → User lands on the page
2. **CTA Click** → User clicks "Get Early Access" button
3. **Form Submit** → User completes the lead form
4. **Thank You** → Conversion complete

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **JavaScript** - No TypeScript for simplicity
- **Plain CSS** - No framework dependencies
- **Google Analytics 4** - Event tracking via gtag.js

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Google Analytics 4:**
   
   Create a `.env` file in the root directory (or copy `.env.example`):
   ```bash
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   
   Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID.

   **How to get your GA4 Measurement ID:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Select your property
   - Navigate to: Admin → Property Settings → Measurement ID
   - Copy the ID (format: G-XXXXXXXXXX)

## 🚀 Running the Project

Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 📊 Google Analytics 4 Setup

### Setting Up GA4 (First Time)

1. **Create a GA4 Property:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Click "Admin" → "Create Property"
   - Follow the setup wizard
   - Copy your Measurement ID

2. **Add Measurement ID to Project:**
   - Open `.env` file
   - Replace `G-XXXXXXXXXX` with your Measurement ID
   - Restart the dev server

### Tracked Events

This project tracks three key funnel events:

| Event Name | Trigger | Parameters | Purpose |
|------------|---------|------------|---------|
| `page_view` | Page loads | page_title, page_location | Measure total traffic |
| `cta_click` | CTA button clicked | event_category, event_label, button_text | Measure engagement |
| `form_submit` | Form submitted | event_category, event_label, form_name | Measure conversions |

### Viewing Events in GA4

**Option 1: DebugView (Recommended for Development)**

1. Install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Enable the extension
3. Open your app at `http://localhost:5173`
4. In GA4: Go to **Admin → DebugView**
5. You should see events appearing in real-time as you interact with the page

**Option 2: Realtime Reports**

1. In GA4: Go to **Reports → Realtime**
2. Open your app and interact with it
3. Events appear within seconds in the Realtime view

**Option 3: Events Report (Takes 24-48 hours)**

1. In GA4: Go to **Reports → Engagement → Events**
2. Wait 24-48 hours for data to process
3. View historical event data and metrics

## 📈 Analyzing the Funnel

### Key Metrics to Track

**1. Engagement Rate**
```
(cta_click events / page_view events) × 100
```
Measures how many visitors show interest by clicking the CTA.

**2. Conversion Rate**
```
(form_submit events / page_view events) × 100
```
Measures overall funnel effectiveness.

**3. Form Completion Rate**
```
(form_submit events / cta_click events) × 100
```
Measures how well the form converts interested users.

### Example Analysis

If you see:
- 100 page views
- 60 CTA clicks
- 30 form submissions

Then:
- **Engagement Rate:** 60% (good - people are interested)
- **Conversion Rate:** 30% (strong conversion)
- **Form Completion Rate:** 50% (could improve form UX)

## 📁 Project Structure

```
lead-funnel-analytics/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx      # Main landing page component
│   │   └── LandingPage.css      # Landing page styles
│   ├── analytics/
│   │   └── ga4.js               # GA4 initialization and tracking
│   ├── App.jsx                  # Root component
│   ├── App.css                  # App-level styles
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── .env                         # Environment variables (GA4 ID)
├── .env.example                 # Environment template
├── index.html                   # HTML entry point
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🎨 Customization

### Changing Colors

Edit the gradient in `src/components/LandingPage.css`:
```css
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Modifying Event Parameters

Edit `src/analytics/ga4.js` to add custom parameters:
```javascript
trackEvent('form_submit', {
  event_category: 'conversion',
  event_label: 'lead_generation_form',
  // Add your custom parameters here
  custom_param: 'custom_value'
})
```

### Adding More Form Fields

Update `src/components/LandingPage.jsx`:
1. Add field to state
2. Add input field to JSX
3. Handle in `handleInputChange`

## 🔒 Privacy & GDPR Compliance

**Important:** This project does NOT send any personally identifiable information (PII) to Google Analytics. The form submission event only tracks metadata (e.g., `has_name: true`, `has_email: true`), never the actual user data.

For production use:
- Implement a cookie consent banner
- Add a privacy policy
- Comply with GDPR/CCPA regulations
- Store lead data securely in your backend

## 🚢 Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

Preview the production build:
```bash
npm run preview
```

## 🎓 Learning Objectives

This project teaches:

1. **Conversion Funnel Concepts**
   - Understanding user journey stages
   - Identifying drop-off points
   - Measuring conversion rates

2. **Event Tracking Implementation**
   - Setting up GA4 with gtag.js
   - Tracking custom events
   - Passing event parameters

3. **React Fundamentals**
   - Component state management
   - Event handlers
   - Conditional rendering
   - Environment variables

4. **Analytics Best Practices**
   - Privacy-conscious tracking
   - Meaningful event naming
   - Funnel analysis methodology

## 📝 Interview Talking Points

When discussing this project:

- **Technical Skills:** React hooks (useState, useEffect), event tracking, Vite configuration
- **Analytics Knowledge:** Funnel analysis, conversion metrics, GA4 event model
- **UX Thinking:** Progressive disclosure (show form after CTA), clear success states
- **Best Practices:** Environment variables, no PII tracking, clean code structure
- **Business Impact:** How event data informs optimization decisions

## 🐛 Troubleshooting

**Events not showing in GA4:**
- Check that your Measurement ID is correct in `.env`
- Restart the dev server after changing `.env`
- Enable GA Debugger extension
- Check browser console for GA logs

**Form not submitting:**
- Check browser console for errors
- Verify event handlers are attached
- Ensure preventDefault() is working

## 📚 Additional Resources

- [GA4 Events Documentation](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)

## 📄 License

MIT License - Free for personal and commercial use.

---

Built with ❤️ for digital marketing excellence
