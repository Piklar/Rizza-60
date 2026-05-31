import { useState } from 'react';

/**
 * PinGate — admin access control component (US3).
 *
 * @param {object}   props
 * @param {Function} props.onSuccess - Callback invoked when correct PIN is entered
 */
function PinGate({ onSuccess }) {
  const [pin, setPin]     = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === import.meta.env.VITE_ADMIN_PIN) {
      onSuccess();
    } else {
      setError('Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  return (
    <div className="pin-gate-container">
      <div className="glass-card gold-border pin-gate-card">
        <div className="pin-gate-icon" aria-hidden="true">🔐</div>
        <h1 className="font-display pin-gate-title text-gradient-gold">Admin Access</h1>
        <p className="font-body pin-gate-subtitle">
          Enter the admin PIN to view RSVP responses.
        </p>

        <form onSubmit={handleSubmit} aria-label="Admin PIN form">
          <label htmlFor="admin-pin" className="input-label" style={{textAlign: 'left', color: 'var(--gold-400)'}}>
            PIN
          </label>
          <input
            id="admin-pin"
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(''); }}
            placeholder="Enter admin PIN"
            autoComplete="current-password"
            className={`input-field ${error ? 'border-ruby-400' : ''}`}
            style={{marginBottom: '1rem'}}
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? 'pin-error' : undefined}
          />
          {error && (
            <p id="pin-error" role="alert" className="text-ruby-400" style={{fontSize: '0.75rem', marginBottom: '0.75rem', marginTop: '-0.5rem', textAlign: 'left'}}>
              {error}
            </p>
          )}
          <button type="submit" className="btn-gold" style={{width: '100%'}}>
            Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default PinGate;
