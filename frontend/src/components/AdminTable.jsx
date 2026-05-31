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
      <div className="text-center py-16">
        <div className="text-5xl mb-4" aria-hidden="true">📭</div>
        <h3 className="font-display text-xl text-slate-200/60 mb-2">No RSVPs yet</h3>
        <p className="text-slate-200/40 text-sm font-body">Check back soon — responses will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Aggregate Summary Card */}
      <div className="glass-card gold-border rounded-2xl p-6 mb-8 text-center">
        <p className="text-gold-400 text-xs tracking-widest uppercase font-body mb-1">
          Total Expected Guests
        </p>
        <p className="font-display text-6xl sm:text-7xl text-gradient-gold">
          {totalHeadcount}
        </p>
        <p className="text-slate-200/50 text-sm font-body mt-2">
          across {rsvps.length} {rsvps.length === 1 ? 'response' : 'responses'}
        </p>
      </div>

      {/* RSVP Records Table */}
      <div className="overflow-x-auto rounded-xl gold-border">
        <table className="w-full text-sm font-body" aria-label="RSVP responses">
          <thead>
            <tr className="bg-silver-800 text-gold-400 text-xs tracking-wider uppercase">
              <th scope="col" className="px-4 py-3 text-left">#</th>
              <th scope="col" className="px-4 py-3 text-left">Full Name</th>
              <th scope="col" className="px-4 py-3 text-center">Status</th>
              <th scope="col" className="px-4 py-3 text-center">Party Size</th>
              <th scope="col" className="px-4 py-3 text-right">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((rsvp, idx) => (
              <tr
                key={rsvp._id}
                className="border-t border-white/5 hover:bg-silver-800/50 transition-colors duration-150"
              >
                <td className="px-4 py-3 text-slate-200/40">{idx + 1}</td>
                <td className="px-4 py-3 text-slate-50 font-medium">{rsvp.name}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full text-xs">
                    ✓ Confirmed
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-gold-400 font-semibold">
                  {rsvp.maxGuests}
                </td>
                <td className="px-4 py-3 text-right text-slate-200/40 text-xs whitespace-nowrap">
                  {new Date(rsvp.createdAt).toLocaleDateString('en-PH', {
                    month: 'short', day: 'numeric', year: 'numeric',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gold-600/30 bg-silver-800/50">
              <td colSpan={3} className="px-4 py-3 text-right text-slate-200/50 text-xs uppercase tracking-wider">
                Total
              </td>
              <td className="px-4 py-3 text-center text-gold-400 font-bold text-base">
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
