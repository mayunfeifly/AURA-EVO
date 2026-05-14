// AURA EVO - Popup Script
// Minimal, Apple-style interactions

document.addEventListener('DOMContentLoaded', () => {
  // Distill button
  const distillBtn = document.querySelector('.aura-btn--primary');
  if (distillBtn) {
    distillBtn.addEventListener('click', () => {
      // TODO: Open knowledge upload / distillation flow
      console.log('AURA: Open distillation');
      // Placeholder: show coming soon
      showToast('Distillation coming in v0.2');
    });
  }

  // Expert cards
  const expertCards = document.querySelectorAll('.aura-expert-card');
  expertCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('h4').textContent;
      console.log('AURA: Open expert', name);
      showToast(`Opening ${name}...`);
    });
  });

  // Quick actions
  const actionBtns = document.querySelectorAll('.aura-btn--ghost');
  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim();
      console.log('AURA: Action', text);
      showToast(`${text} coming soon`);
    });
  });
});

// Simple toast notification
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
    background: #1a1a1a;
    color: white;
    padding: 10px 20px;
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    z-index: 1000;
    animation: auraToastIn 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'auraToastOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

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
