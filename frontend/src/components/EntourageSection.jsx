/**
 * EntourageSection — reusable card for one entourage group.
 *
 * @param {object}   props
 * @param {string}   props.title   - Section heading (e.g., "16 Roses")
 * @param {string[]} props.members - Array of member full names
 * @param {string}   props.icon    - Emoji icon representing the group
 * @param {string}   [props.accentColor] - Tailwind text colour class for member names
 */
function EntourageSection({ title, members, icon, accentColor = 'text-slate-100' }) {
  return (
    <section className="px-4 py-12 max-w-6xl mx-auto">

      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="text-4xl mb-3 block" aria-hidden="true">{icon}</span>
        <h2 className="font-display text-3xl sm:text-4xl text-gradient-gold mb-2">
          {title}
        </h2>
        <p className="text-slate-200/60 text-sm font-body">
          {members.length} honoured members
        </p>
        <div className="flex items-center justify-center gap-3 mt-4" aria-hidden="true">
          <span className="h-px w-12 bg-gold-600/40" />
          <span className="text-gold-600 text-xs">✦</span>
          <span className="h-px w-12 bg-gold-600/40" />
        </div>
      </div>

      {/* Members Grid */}
      <ul
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        aria-label={`${title} members`}
      >
        {members.map((name) => (
          <li key={name}>
            <div className={`glass-card gold-border rounded-lg px-3 py-3 text-center name-card cursor-default ${accentColor}`}>
              <span className="font-body text-sm sm:text-base leading-snug">{name}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EntourageSection;
