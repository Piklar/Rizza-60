import { useState, useEffect, useCallback } from 'react';
import PinGate from '../components/PinGate';
import AdminTable from '../components/AdminTable';
import apiClient from '../services/apiClient';

/**
 * AdminDashboard — protected admin view (US3).
 * Shows PinGate until correct PIN entered, then fetches and displays all RSVPs.
 */
function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [rsvps, setRsvps]               = useState([]);
  const [totalHeadcount, setTotal]       = useState(0);
  const [loading, setLoading]            = useState(false);
  const [fetchError, setFetchError]      = useState(null);

  useEffect(() => {
    document.title = 'Admin Dashboard — Rizza @ 60';
  }, []);

  const fetchRsvps = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await apiClient.get('/api/rsvp');
      setRsvps(res.data.data);
      setTotal(res.data.totalHeadcount);
    } catch {
      setFetchError('Unable to load RSVP data. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) fetchRsvps();
  }, [authenticated, fetchRsvps]);

  if (!authenticated) {
    return <PinGate onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen px-4 py-10 sm:py-14">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <header className="text-center mb-10">
          <p className="text-gold-400 text-xs tracking-widest uppercase font-body mb-2">
            Admin Dashboard
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-gradient-gold mb-2">
            Rizza @ 60
          </h1>
          <p className="text-slate-200/50 font-body text-sm">
            RSVP Response Tracker — December 27, 2026
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16" role="status" aria-live="polite">
            <div className="inline-block w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mb-4" aria-hidden="true" />
            <p className="text-slate-200/50 font-body text-sm">Loading responses…</p>
          </div>
        )}

        {/* Error State */}
        {!loading && fetchError && (
          <div className="glass-card border border-ruby-400/30 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3" aria-hidden="true">⚠️</div>
            <p className="text-ruby-400 font-body mb-4">{fetchError}</p>
            <button onClick={fetchRsvps} className="btn-gold">
              Retry
            </button>
          </div>
        )}

        {/* Data Table */}
        {!loading && !fetchError && (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={fetchRsvps}
                className="text-gold-400 hover:text-gold-300 text-sm font-body transition-colors duration-200 flex items-center gap-1"
                aria-label="Refresh RSVP data"
              >
                ↻ Refresh
              </button>
            </div>
            <AdminTable rsvps={rsvps} totalHeadcount={totalHeadcount} />
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
