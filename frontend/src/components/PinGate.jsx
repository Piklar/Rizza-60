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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card gold-border rounded-2xl p-8 w-full max-w-sm text-center">
        <div className="text-4xl mb-4" aria-hidden="true">🔐</div>
        <h1 className="font-display text-2xl text-gradient-gold mb-2">Admin Access</h1>
        <p className="text-slate-200/60 text-sm font-body mb-6">
          Enter the admin PIN to view RSVP responses.
        </p>

        <form onSubmit={handleSubmit} aria-label="Admin PIN form">
          <label htmlFor="admin-pin" className="block text-gold-400 text-sm font-body mb-1.5 text-left">
            PIN
          </label>
          <input
            id="admin-pin"
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(''); }}
            placeholder="Enter admin PIN"
            autoComplete="current-password"
            className={`input-field mb-4 ${error ? 'border-ruby-400 focus:ring-ruby-400' : ''}`}
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? 'pin-error' : undefined}
          />
          {error && (
            <p id="pin-error" role="alert" className="text-ruby-400 text-xs font-body mb-3 -mt-2 text-left">
              {error}
            </p>
          )}
          <button type="submit" className="btn-gold w-full">
            Enter Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default PinGate;
