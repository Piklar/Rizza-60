/**
 * EntourageSection — reusable card for one entourage group.
 *
 * @param {object}   props
 * @param {string}   props.title   - Section heading (e.g., "16 Roses")
 * @param {string[]} props.members - Array of member full names
 * @param {string}   [props.accentColor] - Tailwind text colour class for member names
 */
function EntourageSection({ title, members, accentColor = 'text-slate-100' }) {
  return (
    <section className="entourage-section">
      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title text-gradient-gold">
          {title}
        </h2>
        <p className="section-subtitle font-body">
          {members.length} honoured members
        </p>
        <div className="flex-center" style={{gap: '0.75rem', marginTop: '1rem'}} aria-hidden="true">
          <span className="divider" style={{width: '3rem'}} />
          <span className="text-gold-600" style={{fontSize: '0.75rem'}}>✦</span>
          <span className="divider" style={{width: '3rem'}} />
        </div>
      </div>

      {/* Members Grid */}
      <ul
        className="entourage-grid"
        aria-label={`${title} members`}
      >
        {members.map((name) => (
          <li key={name}>
            <div className={`glass-card gold-border name-card ${accentColor}`}>
              <span className="font-body" style={{lineHeight: 1.25}}>{name}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EntourageSection;
