function getOrSetPersistentUserID() {
  const storageKey = 'digital_jungle_visitor_id';
  
  // Checking if there is a secret "?set_id=" in the browser URL
  const urlParams = new URLSearchParams(window.location.search);
  const secretId = urlParams.get('set_id');

  if (secretId) {
    // If found, save this exact word (like owner_pc) in local storage forever
    localStorage.setItem(storageKey, secretId);
    
    // Clean the URL so "?set_id=" disappears from the address bar automatically
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    
    return secretId;
  }

  let userId = localStorage.getItem(storageKey);

  if (!userId) {
    // Generate a secure, randomized anonymous ID
    const randomString = Math.random().toString(36).substring(2, 10);
    userId = 'client_' + Date.now() + '_' + randomString;
    
    // Save it to the browser's local storage so it persists across sessions
    localStorage.setItem(storageKey, userId);
  }

  return userId;
}

// Replace this string with your actual GA4 Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; 

// We inject the script into the document dynamically
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

// Retrieve the unique ID for this specific visitor (or owner)
const currentVisitorId = getOrSetPersistentUserID();

// Configure the GA4 tag to attach this user_id to every single event and pageview
gtag('config', GA_MEASUREMENT_ID, {
  'user_id': currentVisitorId,
  'custom_map': {
    'dimension1': 'user_id'
  }
});

// Log for debugging purposes
console.log('Google Analytics 4 initialized. Assigned Visitor ID:', currentVisitorId);