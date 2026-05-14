// AURA EVO - Content Script
// Injected into web pages for context awareness

(function() {
  'use strict';
  
  // Prevent double injection
  if (window.auraInjected) return;
  window.auraInjected = true;

  // Listen for messages from popup/background
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'EXTRACT_CONTENT') {
      const content = extractPageContent();
      sendResponse({ success: true, content });
    }
    return true;
  });

  // Extract readable content from page
  function extractPageContent() {
    const title = document.title || '';
    const url = window.location.href;
    
    // Try to get main content
    const article = document.querySelector('article') || 
                    document.querySelector('main') || 
                    document.querySelector('[role="main"]');
    
    const body = article ? article.innerText : document.body.innerText;
    
    // Truncate to reasonable size
    const truncated = body.substring(0, 5000);
    
    return {
      title,
      url,
      content: truncated,
      timestamp: new Date().toISOString()
    };
  }

  console.log('AURA EVO: Content script loaded');
})();
