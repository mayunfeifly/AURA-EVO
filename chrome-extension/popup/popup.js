// AURA EVO - Popup Script
// i18n + Dark Mode + Apple-style interactions

// i18n helper
function getMessage(key) {
  if (typeof chrome !== 'undefined' && chrome.i18n) {
    return chrome.i18n.getMessage(key) || key;
  }
  return key;
}

// Apply i18n to all elements with data-i18n attribute
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const message = getMessage(key);
    if (message !== key) {
      el.textContent = message;
    }
  });
}

// Theme management
const ThemeManager = {
  get() {
    return localStorage.getItem('aura-theme') || 'auto';
  },
  
  set(theme) {
    localStorage.setItem('aura-theme', theme);
    this.apply(theme);
    this.updateUI(theme);
  },
  
  apply(theme) {
    const root = document.documentElement;
    root.removeAttribute('data-theme');
    
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    }
    // 'auto' = follow system, no data-theme attribute, uses @media
  },
  
  updateUI(theme) {
    document.querySelectorAll('.aura-theme-btn').forEach(btn => {
      btn.classList.toggle('aura-theme-btn--active', btn.dataset.theme === theme);
    });
  },
  
  init() {
    const theme = this.get();
    this.apply(theme);
    this.updateUI(theme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.get() === 'auto') {
        this.apply('auto');
      }
    });
  }
};

// Toast notification
function showToast(message) {
  const existing = document.querySelector('.aura-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'aura-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--aura-text);
    color: var(--aura-bg);
    padding: 10px 20px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    z-index: 1000;
    animation: auraToastIn 0.3s ease;
    box-shadow: var(--aura-shadow-hover);
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'auraToastOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Apply i18n
  applyI18n();
  
  // Init theme
  ThemeManager.init();
  
  // Theme toggle buttons
  document.querySelectorAll('.aura-theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      ThemeManager.set(btn.dataset.theme);
    });
  });

  // Distill button
  const distillBtn = document.querySelector('.aura-btn--primary');
  if (distillBtn) {
    distillBtn.addEventListener('click', () => {
      console.log('AURA: Open distillation');
      showToast(getMessage('distillationSoon'));
    });
  }

  // Expert cards
  const expertCards = document.querySelectorAll('.aura-expert-card');
  expertCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('h4').textContent;
      console.log('AURA: Open expert', name);
      showToast(`${name} - ${getMessage('comingSoon')}`);
    });
  });

  // Quick actions
  const actionBtns = document.querySelectorAll('.aura-btn--ghost');
  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim();
      console.log('AURA: Action', text);
      showToast(`${text} - ${getMessage('comingSoon')}`);
    });
  });
});

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
  @keyframes auraToastIn {
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  @keyframes auraToastOut {
    from { opacity: 1; transform: translateX(-50%) translateY(0); }
    to { opacity: 0; transform: translateX(-50%) translateY(10px); }
  }
`;
document.head.appendChild(style);
