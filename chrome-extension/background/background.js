// AURA EVO - Background Service Worker
// Handles side panel, context menu, and message passing

chrome.runtime.onInstalled.addListener(() => {
  console.log('AURA EVO installed');
  
  // Set default storage
  chrome.storage.local.set({
    auraUser: null,
    auraTwin: null,
    auraExperts: [],
    auraVersion: '0.1.0'
  });
});

// Open side panel on action click
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
  .catch(err => console.log('Side panel not supported:', err));

// Handle messages from popup/content
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_PAGE_CONTENT') {
    // TODO: Extract page content for knowledge distillation
    sendResponse({ success: true, content: '' });
  }
  
  if (request.type === 'CHAT_WITH_TWIN') {
    // TODO: Send message to backend API
    sendResponse({ success: true, response: 'Coming soon...' });
  }
  
  return true;
});
