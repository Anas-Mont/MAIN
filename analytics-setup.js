// This function checks if the visitor already has an ID. 
// If they don't, it creates one and saves it in their browser forever.
function getOrSetPersistentUserID() {
  const storageKey = 'digital_jungle_visitor_id';
  let userId = localStorage.getItem(storageKey);

  if (!userId) {
    // Generate a secure, randomized anonymous ID (e.g., client_1712398123_abc123)
    // We use Date.now() for uniqueness and a random string for security
    const randomString = Math.random().toString(36).substring(2, 10);
    userId = 'client_' + Date.now() + '_' + randomString;
    
    // Save it to the browser's local storage so it persists across sessions
    localStorage.setItem(storageKey, userId);
  }

  return userId;
}

// Replace this string with your actual GA4 Measurement ID (found in Admin > Data Streams)
const GA_MEASUREMENT_ID = 'G-MBY0KQQBPM'; 

// We inject the script into the document dynamically so you don't have to 
// clutter your HTML file with extra tracking scripts.
const script = document.createElement('script');
script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
script.async = true;
document.head.appendChild(script);

// Initialize the dataLayer array which Google Analytics uses to process events
window.dataLayer = window.dataLayer || [];
function gtag(){
  dataLayer.push(arguments);
}

// Register the current timestamp for the initialization
gtag('js', new Date());

// Retrieve the unique ID for this specific visitor
const currentVisitorId = getOrSetPersistentUserID();

// Configure the GA4 tag to attach this user_id to every single event and pageview
gtag('config', GA_MEASUREMENT_ID, {
  'user_id': currentVisitorId,
  // Optional: Send a custom dimension if you want to filter by this ID in reports easily
  'custom_map': {
    'dimension1': 'user_id'
  }
});

// Log for debugging purposes so you know it works when you inspect the page
console.log('Google Analytics 4 initialized. Assigned Visitor ID:', currentVisitorId);