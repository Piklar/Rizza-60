import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import EntourageSection from '../components/EntourageSection';
import RsvpForm from '../components/RsvpForm';
import { ROSES, BLUE_BILLS, GIFTS } from '../data/eventData';

/**
 * InvitationPage — public invitation page (US1 + US2).
 * Composes HeroSection, three EntourageSection groups, and RsvpForm.
 */
function InvitationPage() {
  useEffect(() => {
    document.title = "Rizza @ 60 — You're Invited!";
  }, []);

  return (
    <main style={{minHeight: '100vh'}}>
      <HeroSection />

      {/* Entourage Sections */}
      <div style={{borderTop: '1px solid rgba(201, 162, 39, 0.2)'}}>
        <EntourageSection
          title="16 Roses"
          members={ROSES}
          accentColor="text-slate-600"
        />
        <div className="divider" style={{maxWidth: '56rem'}} aria-hidden="true" />
        <EntourageSection
          title="16 Blue Bills"
          members={BLUE_BILLS}
          accentColor="text-slate-600"
        />
        <div className="divider" style={{maxWidth: '56rem'}} aria-hidden="true" />
        <EntourageSection
          title="16 Gifts"
          members={GIFTS}
          accentColor="text-slate-600"
        />
      </div>

      {/* RSVP Section */}
      <section className="rsvp-section" style={{borderTop: '1px solid rgba(201, 162, 39, 0.2)'}}>
        <div className="text-center" style={{marginBottom: '2.5rem'}}>
          <h2 className="section-title text-gradient-gold" style={{marginBottom: '0.75rem'}}>
            RSVP
          </h2>
          <p className="font-body text-slate-600" style={{maxWidth: '28rem', margin: '0 auto', opacity: 0.7}}>
            Please confirm your attendance so we can celebrate together.
          </p>
        </div>
        <RsvpForm />
      </section>

      {/* Footer */}
      <footer className="text-center font-body text-slate-600" style={{padding: '2rem 0', fontSize: '0.75rem', opacity: 0.3, borderTop: '1px solid rgba(0,0,0,0.05)'}}>
        Rizza @ 60 &copy; 2026 — Made with love for a very special celebration
      </footer>
    </main>
  );
}

export default InvitationPage;
