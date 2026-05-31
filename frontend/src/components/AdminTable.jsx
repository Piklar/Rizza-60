/**
 * AdminTable — displays all RSVP records in a responsive table (US3).
 *
 * @param {object}   props
 * @param {Array}    props.rsvps          - Array of RSVP record objects
 * @param {number}   props.totalHeadcount - Pre-computed aggregate headcount from API
 */
function AdminTable({ rsvps, totalHeadcount }) {
  if (rsvps.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon" aria-hidden="true">📭</div>
        <h3 className="section-title text-muted" style={{fontSize: '1.25rem'}}>No RSVPs yet</h3>
        <p className="text-muted text-sm font-body">Check back soon — responses will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Aggregate Summary Card */}
      <div className="glass-card gold-border summary-card">
        <p className="summary-label">
          Total Expected Guests
        </p>
        <p className="summary-value text-gradient-gold">
          {totalHeadcount}
        </p>
        <p className="text-muted text-sm mt-2">
          across {rsvps.length} {rsvps.length === 1 ? 'response' : 'responses'}
        </p>
      </div>

      {/* RSVP Records Table */}
      <div className="table-wrapper gold-border">
        <table className="admin-table" aria-label="RSVP responses">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full Name</th>
              <th scope="col" className="text-center">Status</th>
              <th scope="col" className="text-center">Party Size</th>
              <th scope="col" className="text-right">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((rsvp, idx) => (
              <tr key={rsvp._id}>
                <td className="text-muted">{idx + 1}</td>
                <td className="text-slate-50" style={{fontWeight: 500}}>{rsvp.name}</td>
                <td className="text-center">
                  <span className="status-badge">
                    ✓ Confirmed
                  </span>
                </td>
                <td className="text-center text-gold-400" style={{fontWeight: 600}}>
                  {rsvp.maxGuests}
                </td>
                <td className="text-right text-muted" style={{fontSize: '0.75rem', whiteSpace: 'nowrap'}}>
                  {new Date(rsvp.createdAt).toLocaleDateString('en-PH', {
                    month: 'short', day: 'numeric', year: 'numeric',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{backgroundColor: 'rgba(243, 244, 246, 0.5)'}}>
              <td colSpan={3} className="text-right text-muted" style={{textTransform: 'uppercase', letterSpacing: '0.05em'}}>
                Total
              </td>
              <td className="text-center text-gold-400" style={{fontWeight: 'bold', fontSize: '1rem'}}>
                {totalHeadcount}
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default AdminTable;
