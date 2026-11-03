(() => {
  'use strict';
  const root = document.getElementById('xavier-edition');
  if (!root) return;
  const button = root.querySelector('[data-copy-command]');
  const command = root.querySelector('[data-container-command]');
  const feedback = root.querySelector('[data-copy-feedback]');
  if (!button || !command || !feedback) return;
  button.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(command.textContent.trim());
      button.textContent = 'Copied ✓';
      feedback.textContent = 'Command copied. Run it in your terminal.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(command);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      feedback.textContent = 'Command selected. Use your usual copy shortcut.';
    }
  });
})();
