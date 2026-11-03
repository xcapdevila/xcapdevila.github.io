(() => {
  const initialiseRecoveryIllustration = () => {
    const illustration = document.querySelector('#edition-recovery-illustration');
    if (!illustration) return;

    const phases = ['25', '50', '75', '100'];
    const phaseButtons = illustration.querySelectorAll('button[data-phase]');
    const actionButtons = illustration.querySelectorAll('button[data-recovery-action]');
    const explanations = illustration.querySelectorAll('[data-recovery-explanation]');
    let current = '25';

    const describe = () => {
      if (current === 'OPEN') {
        return 'OPEN rejects normal calls. After the configured open wait, recovery can start again at 25%. Use Advance to illustrate that transition; no clock or live traffic is running here.';
      }

      if (current === 'CLOSED') {
        return 'In this example, the final recovery checks have passed and the circuit is CLOSED. Normal CircuitBreaker failure handling resumes. Reset to explore another recovery; CLOSED-state failure decisions are outside this illustration.';
      }

      if (current === '100') {
        return 'The admission target is 100%, and the circuit remains HALF_OPEN while the final phase is evaluated. Healthy final checks can close the circuit; STEP_BACK can reduce the target to 75% if health deteriorates.';
      }

      const nextPhase = phases[phases.indexOf(current) + 1];
      const previousPhase = current === '25' ? 'OPEN' : `${phases[phases.indexOf(current) - 1]}%`;
      return `HALF_OPEN targets admission of ${current}% of attempted calls. After the minimum phase duration and enough healthy completed calls, recovery may advance to ${nextPhase}%. With STEP_BACK, deteriorating health returns it to ${previousPhase}. This target is not a measured pass rate.`;
    };

    const render = () => {
      const state = phases.includes(current) ? 'HALF_OPEN' : current;
      const percentage = current === 'OPEN' ? 0 : current === 'CLOSED' ? 100 : Number(current);
      illustration.dataset.state = state;
      illustration.dataset.phase = String(percentage);

      illustration.querySelectorAll('[data-recovery-state]').forEach((label) => {
        label.textContent = state;
      });
      illustration.querySelectorAll('[data-recovery-target]').forEach((label) => {
        label.textContent = `${percentage}%`;
      });
      illustration.querySelectorAll('[data-recovery-track]').forEach((track) => {
        track.style.setProperty('--admission-percent', `${percentage}%`);
        Array.from(track.children).forEach((segment, index) => {
          segment.dataset.active = String((index + 1) * 25 <= percentage);
        });
      });

      phaseButtons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.phase === current));
      });
      actionButtons.forEach((button) => {
        const action = button.dataset.recoveryAction;
        button.disabled = action === 'advance'
          ? current === 'CLOSED'
          : action === 'regress' && (current === 'OPEN' || current === 'CLOSED');
      });
      explanations.forEach((explanation) => {
        explanation.textContent = describe();
      });
    };

    explanations.forEach((explanation) => {
      explanation.setAttribute('aria-live', 'polite');
      explanation.setAttribute('aria-atomic', 'true');
    });

    phaseButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (!phases.includes(button.dataset.phase)) return;
        current = button.dataset.phase;
        render();
      });
    });

    actionButtons.forEach((button) => {
      button.addEventListener('click', () => {
        switch (button.dataset.recoveryAction) {
          case 'advance':
            if (current === 'CLOSED') return;
            current = current === 'OPEN'
              ? '25'
              : phases[phases.indexOf(current) + 1] || 'CLOSED';
            break;
          case 'regress':
            if (!phases.includes(current)) return;
            current = phases[phases.indexOf(current) - 1] || 'OPEN';
            break;
          case 'reset':
            current = '25';
            break;
          default:
            return;
        }
        render();
      });
    });

    render();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseRecoveryIllustration, { once: true });
  } else {
    initialiseRecoveryIllustration();
  }
})();
