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
    <main className="min-h-screen">
      <HeroSection />

      {/* Entourage Sections */}
      <div className="border-t border-gold-600/20">
        <EntourageSection
          title="16 Roses"
          members={ROSES}
          icon="🌹"
          accentColor="text-ruby-300"
        />
        <div className="h-px bg-gold-600/10 max-w-4xl mx-auto" aria-hidden="true" />
        <EntourageSection
          title="16 Blue Bills"
          members={BLUE_BILLS}
          icon="💙"
          accentColor="text-blue-300"
        />
        <div className="h-px bg-gold-600/10 max-w-4xl mx-auto" aria-hidden="true" />
        <EntourageSection
          title="16 Gifts"
          members={GIFTS}
          icon="🎁"
          accentColor="text-gold-300"
        />
      </div>

      {/* RSVP Section */}
      <section className="border-t border-gold-600/20 py-16 px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl text-gradient-gold mb-3">
            RSVP
          </h2>
          <p className="text-slate-200/70 font-body text-base max-w-md mx-auto">
            Please confirm your attendance so we can celebrate together.
          </p>
        </div>
        <RsvpForm />
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-200/30 text-xs font-body border-t border-white/5">
        Rizza @ 60 &copy; 2026 — Made with love for a very special celebration
      </footer>
    </main>
  );
}

export default InvitationPage;
