import { EVENT_DETAILS } from '../data/eventData';

/**
 * HeroSection — visually striking opening of the invitation.
 * Displays celebrant name, date, venue, and dress code.
 * Fully responsive: stacked on mobile, centred/expanded on desktop.
 */
function HeroSection() {
  return (
    <header className="relative overflow-hidden py-20 sm:py-28 lg:py-36 px-4 text-center">

      {/* Decorative background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,200,66,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Eyebrow label */}
      <p className="animate-fade-in text-gold-400 font-body text-sm sm:text-base tracking-[0.25em] uppercase mb-4 opacity-0"
         style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        You Are Cordially Invited
      </p>

      {/* Celebrant Name */}
      <h1
        className="animate-fade-in-up font-display text-5xl sm:text-7xl lg:text-8xl text-gradient-gold leading-tight mb-4 opacity-0"
        style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
      >
        {EVENT_DETAILS.title}
      </h1>

      {/* Subtitle */}
      <p className="animate-fade-in-up font-display text-xl sm:text-2xl text-slate-200 italic mb-10 opacity-0"
         style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
        60th Birthday Celebration
      </p>

      {/* Divider */}
      <div className="animate-fade-in flex items-center justify-center gap-4 mb-10 opacity-0"
           style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}
           aria-hidden="true">
        <span className="h-px w-16 sm:w-24 bg-gold-600/50" />
        <span className="text-gold-400 text-lg">✦</span>
        <span className="h-px w-16 sm:w-24 bg-gold-600/50" />
      </div>

      {/* Event Details Cards */}
      <div className="animate-fade-in-up grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12 opacity-0"
           style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}>

        <div className="glass-card rounded-xl p-5">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-1 font-body">Date</p>
          <p className="text-slate-50 font-display text-lg leading-snug">{EVENT_DETAILS.date}</p>
        </div>

        <div className="glass-card rounded-xl p-5">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-1 font-body">Venue</p>
          <p className="text-slate-50 font-display text-lg leading-snug mb-3">{EVENT_DETAILS.venue}</p>
          <a
            href={EVENT_DETAILS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-body font-medium
                       text-silver-900 bg-gold-400 hover:bg-gold-300
                       px-3 py-1.5 rounded-full
                       transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            aria-label="Open Celandine Balintawak in Google Maps"
          >
            <span aria-hidden="true">📍</span> Get Directions
          </a>
        </div>

        <div className="glass-card rounded-xl p-5">
          <p className="text-gold-400 text-xs tracking-widest uppercase mb-1 font-body">Attire</p>
          <p className="text-slate-50 font-body text-sm leading-relaxed">
            <span className="block">👗 Women: {EVENT_DETAILS.dressWomen}</span>
            <span className="block">👔 Men: {EVENT_DETAILS.dressMen}</span>
            <span className="block mt-1 text-ruby-400 text-xs">No Red, please</span>
          </p>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
