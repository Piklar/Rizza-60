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
    <div className="dashboard-layout">
      <div className="dashboard-container">

        {/* Header */}
        <header className="dashboard-header">
          <p className="dashboard-eyebrow font-body">
            Admin Dashboard
          </p>
          <h1 className="font-display dashboard-title text-gradient-gold">
            Rizza @ 60
          </h1>
          <p className="font-body dashboard-subtitle">
            RSVP Response Tracker — December 27, 2026
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="loading-state" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <p className="font-body text-slate-600" style={{fontSize: '0.875rem', opacity: 0.5}}>Loading responses…</p>
          </div>
        )}

        {/* Error State */}
        {!loading && fetchError && (
          <div className="glass-card error-state">
            <div className="error-icon" aria-hidden="true">⚠️</div>
            <p className="font-body error-text">{fetchError}</p>
            <button onClick={fetchRsvps} className="btn-gold">
              Retry
            </button>
          </div>
        )}

        {/* Data Table */}
        {!loading && !fetchError && (
          <>
            <div className="flex-right">
              <button
                onClick={fetchRsvps}
                className="refresh-btn font-body"
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
