import { EVENT_DETAILS } from '../data/eventData';

/**
 * HeroSection — visually striking opening of the invitation.
 * Displays celebrant name, date, venue, and dress code.
 * Matches the reference image layout.
 */
function HeroSection() {
  return (
    <header className="hero-section">

      {/* Eyebrow label */}
      <p className="animate-fade-in hero-eyebrow opacity-0"
         style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        Join us as we celebrate
      </p>

      {/* Celebrant Name */}
      <h1
        className="animate-fade-in-up hero-title text-gradient-gold opacity-0"
        style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
      >
        {EVENT_DETAILS.title}
      </h1>

      {/* Subtitle */}
      <p className="animate-fade-in-up hero-subtitle opacity-0"
         style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
        Urbano Clan Annual Family Reunion
      </p>

      {/* Divider */}
      <div className="animate-fade-in flex-center opacity-0"
           style={{ gap: '0.75rem', marginBottom: '2rem', animationDelay: '0.55s', animationFillMode: 'forwards' }}
           aria-hidden="true">
        <span className="divider" style={{width: '6rem', backgroundColor: 'rgba(201, 162, 39, 0.4)'}} />
        <span className="text-gold-600" style={{fontSize: '0.875rem'}}>✦</span>
        <span className="divider" style={{width: '6rem', backgroundColor: 'rgba(201, 162, 39, 0.4)'}} />
      </div>

      {/* Event Details Vertical Stack */}
      <div className="animate-fade-in-up opacity-0"
           style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}>

        <p className="font-display text-gold-600" style={{fontSize: '1.125rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem'}}>
          SUNDAY, DECEMBER 27, 2026
        </p>
        <p className="font-display text-slate-800" style={{fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem'}}>
          AT 4:00 PM
        </p>

        <p className="font-script text-gold-600" style={{fontSize: '2.5rem', lineHeight: 1, marginBottom: '0.75rem'}}>
          Venue
        </p>
        <p className="font-display text-slate-800" style={{fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.5, marginBottom: '2rem'}}>
          <span style={{display: 'block'}}>THE CELANDINE</span>
          <span style={{display: 'block'}}>BALINTAWAK, QUEZON CITY</span>
          <span style={{display: 'block'}}>(EVENT HALL)</span>
        </p>

        {/* Divider */}
        <div className="flex-center" style={{gap: '0.75rem', marginBottom: '2rem'}} aria-hidden="true">
          <span className="divider" style={{width: '6rem', backgroundColor: 'rgba(201, 162, 39, 0.4)'}} />
          <span className="text-gold-600" style={{fontSize: '0.875rem'}}>✦</span>
          <span className="divider" style={{width: '6rem', backgroundColor: 'rgba(201, 162, 39, 0.4)'}} />
        </div>

        <p className="font-script text-gold-600" style={{fontSize: '2.5rem', lineHeight: 1, marginBottom: '0.75rem'}}>
          Dress Code
        </p>
        <p className="font-display text-slate-800" style={{fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.625, maxWidth: '28rem', margin: '0 auto'}}>
          KINDLY COME IN COCKTAIL DRESS FOR LADIES AND PANTS & POLO FOR GENTLEMEN IN ANY COLORS
        </p>

        <a
          href={EVENT_DETAILS.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
          style={{marginTop: '2.5rem', fontSize: '0.875rem'}}
          aria-label="Open Celandine Balintawak in Google Maps"
        >
          Get Directions
        </a>
      </div>
    </header>
  );
}

export default HeroSection;
