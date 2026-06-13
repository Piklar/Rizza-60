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
      <div style={{borderTop: '1px solid rgba(220, 38, 38, 0.2)'}}>
        <EntourageSection
          title="16 Roses"
          members={ROSES}
          accentColor="text-slate-100"
        />
        <div className="divider" style={{maxWidth: '56rem'}} aria-hidden="true" />
        <EntourageSection
          title="16 Blue Bills"
          members={BLUE_BILLS}
          accentColor="text-slate-100"
        />
        <div className="divider" style={{maxWidth: '56rem'}} aria-hidden="true" />
        <EntourageSection
          title="16 Gifts"
          members={GIFTS}
          accentColor="text-slate-100"
        />
      </div>

      {/* RSVP Section */}
      <section className="rsvp-section" style={{borderTop: '1px solid rgba(220, 38, 38, 0.2)'}}>
        <div className="text-center" style={{marginBottom: '2.5rem'}}>
          <h2 className="section-title text-gradient-gold" style={{marginBottom: '0.75rem'}}>
            RSVP
          </h2>
          <p className="font-body" style={{maxWidth: '28rem', margin: '0 auto', color: '#A8A8A8'}}>
            Please confirm your attendance so we can celebrate together.
          </p>
        </div>
        <RsvpForm />
      </section>

      {/* Footer */}
      <footer className="text-center font-body" style={{padding: '2rem 0', fontSize: '0.75rem', color: '#A8A8A8', opacity: 0.6, borderTop: '1px solid rgba(232,232,232,0.1)'}}>
        Rizza @ 60 &copy; 2026 — Made with love for a very special celebration
      </footer>
    </main>
  );
}

export default InvitationPage;
