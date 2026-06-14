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
         style={{ animationDelay: '0.4s', animationFillMode: 'forwards', marginBottom: '0.25rem' }}>
        AND
      </p>

      {/* Subtitle */}
      <p className="animate-fade-in-up hero-subtitle opacity-0"
         style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
        Urbano Clan Annual Family Reunion
      </p>

      {/* Divider */}
      <div className="animate-fade-in flex-center opacity-0"
           style={{ gap: '0.75rem', marginBottom: '2rem', animationDelay: '0.55s', animationFillMode: 'forwards' }}
           aria-hidden="true">
        <span className="divider" style={{width: '6rem'}} />
          <span style={{fontSize: '0.875rem', color: 'rgba(201, 86, 106, 0.7)'}}>✦</span>
          <span className="divider" style={{width: '6rem'}} />
      </div>

      {/* Event Details Vertical Stack */}
      <div className="animate-fade-in-up opacity-0"
           style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}>

        <p className="font-display" style={{fontSize: '1.125rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem', color: '#D4D0CA'}}>
          SUNDAY, DECEMBER 27, 2026
        </p>
        <p className="font-display" style={{fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem', color: 'rgba(212, 208, 202, 0.7)'}}>
          AT 4:00 PM
        </p>

        <p style={{fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontWeight: 600, fontSize: '2rem', lineHeight: 1, letterSpacing: '0.06em', marginBottom: '0.75rem', color: 'var(--ruby-400)'}}>
          Venue
        </p>
        <p style={{fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontWeight: 500, fontSize: '1.25rem', letterSpacing: '0.04em', lineHeight: 1.6, marginBottom: '2rem', color: 'rgba(212, 208, 202, 0.88)', textShadow: '0 1px 6px rgba(0,0,0,0.7)'}}>
          <span style={{display: 'block'}}>The Celandine</span>
          <span style={{display: 'block'}}>Balintawak, Quezon City</span>
          <span style={{display: 'block'}}>(Event Hall)</span>
        </p>

        {/* Divider */}
        <div className="flex-center" style={{gap: '0.75rem', marginBottom: '2rem'}} aria-hidden="true">
          <span className="divider" style={{width: '6rem'}} />
          <span style={{fontSize: '0.875rem', color: 'rgba(201, 86, 106, 0.7)'}}>✦</span>
          <span className="divider" style={{width: '6rem'}} />
        </div>

        <p style={{fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontWeight: 600, fontSize: '2rem', lineHeight: 1, letterSpacing: '0.06em', marginBottom: '0.75rem', color: 'var(--ruby-400)'}}>
          Dress Code
        </p>
        <p style={{fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontWeight: 500, fontSize: '1.2rem', letterSpacing: '0.02em', lineHeight: 1.7, maxWidth: '28rem', margin: '0 auto', color: 'rgba(212, 208, 202, 0.88)', textShadow: '0 1px 6px rgba(0,0,0,0.7)'}}>
          Kindly come in Cocktail Dress for Ladies <br></br> Pants &amp; Polo for Gentlemen in any colors except Red
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
