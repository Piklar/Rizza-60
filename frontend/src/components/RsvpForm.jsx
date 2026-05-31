import { useState } from 'react';
import Swal from 'sweetalert2';
import apiClient from '../services/apiClient';

const INITIAL_FORM = { name: '', maxGuests: 1 };

/**
 * RsvpForm — guest attendance form (US2).
 * Validates name + maxGuests, POSTs to /api/rsvp,
 * shows SweetAlert2 modals for success/error, locks form on success.
 */
function RsvpForm() {
  const [form, setForm]         = useState(INITIAL_FORM);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.maxGuests || form.maxGuests < 1)
      errs.maxGuests = 'Party size must be at least 1.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'maxGuests' ? Number(value) : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      await apiClient.post('/api/rsvp', {
        name: form.name.trim(),
        maxGuests: form.maxGuests,
      });

      setSubmitted(true);
      await Swal.fire({
        icon: 'success',
        title: '🎉 See you there!',
        text: `Thank you, ${form.name.trim()}! Your RSVP has been confirmed.`,
        background: '#FFFFFF',
        color: '#334155',
        confirmButtonColor: '#C9A227',
        confirmButtonText: 'Wonderful!',
      });
    } catch {
      await Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong. Please check your connection and try again.',
        background: '#FFFFFF',
        color: '#334155',
        confirmButtonColor: '#C9A227',
        confirmButtonText: 'Try Again',
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto glass-card gold-border rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4" aria-hidden="true">🎊</div>
        <h3 className="font-display text-2xl text-gold-400 mb-2">You&rsquo;re on the list!</h3>
        <p className="text-slate-200/70 font-body text-sm">
          Thank you, <strong className="text-slate-50">{form.name}</strong>. We can&apos;t wait to celebrate with you!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-md mx-auto glass-card gold-border rounded-2xl p-6 sm:p-8 space-y-5"
      aria-label="RSVP Form"
    >
      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-gold-400 text-sm font-body mb-1.5">
          Full Name <span aria-hidden="true" className="text-ruby-400">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
          placeholder="e.g. Maria Santos"
          autoComplete="name"
          className={`input-field ${errors.name ? 'border-ruby-400 focus:ring-ruby-400' : ''}`}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1 text-ruby-400 text-xs font-body">
            {errors.name}
          </p>
        )}
      </div>

      {/* Party Size */}
      <div>
        <label htmlFor="maxGuests" className="block text-gold-400 text-sm font-body mb-1.5">
          How many are coming? <span aria-hidden="true" className="text-ruby-400">*</span>
        </label>
        <input
          id="maxGuests"
          name="maxGuests"
          type="number"
          min="1"
          step="1"
          value={form.maxGuests}
          onChange={handleChange}
          disabled={loading}
          className={`input-field ${errors.maxGuests ? 'border-ruby-400 focus:ring-ruby-400' : ''}`}
          aria-required="true"
          aria-invalid={!!errors.maxGuests}
          aria-describedby={errors.maxGuests ? 'guests-error' : 'guests-hint'}
        />
        <p id="guests-hint" className="mt-1 text-slate-200/40 text-xs font-body">
          Include yourself in the count
        </p>
        {errors.maxGuests && (
          <p id="guests-error" role="alert" className="mt-1 text-ruby-400 text-xs font-body">
            {errors.maxGuests}
          </p>
        )}
      </div>

      {/* Attendance status — always accepted in v1 */}
      <div className="glass-card rounded-lg px-4 py-3 flex items-center gap-3">
        <span className="text-gold-400 text-lg" aria-hidden="true">✓</span>
        <p className="text-slate-200/80 text-sm font-body">I will be attending</p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full text-base"
        aria-busy={loading}
      >
        {loading ? 'Sending RSVP…' : 'Confirm Attendance 🎉'}
      </button>
    </form>
  );
}

export default RsvpForm;
