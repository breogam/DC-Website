import { useState, useEffect, type JSX } from 'react';
import { COMPANY, SERVICES, AWARDS, VALUES, TESTIMONIALS, STATS } from '../data';
import { useInView, useScrollProgress } from '../hooks';

/* ─────────────────────────────────────────────
   Design 3 — "Editorial"
   Minimalist magazine / editorial aesthetic
   Kinfolk × Cereal × high-end architecture
   ───────────────────────────────────────────── */

/* ── Inline SVG illustrations ─────────────── */

const HouseIllustration = () => (
  <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    {/* House exterior */}
    <line x1="100" y1="280" x2="400" y2="120" stroke="#2d6a6f" strokeWidth="1.2" />
    <line x1="400" y1="120" x2="700" y2="280" stroke="#2d6a6f" strokeWidth="1.2" />
    <rect x="140" y="280" width="520" height="180" stroke="#2d6a6f" strokeWidth="1.2" fill="none" />
    {/* Door */}
    <rect x="340" y="360" width="60" height="100" stroke="#6b8f71" strokeWidth="1" fill="none" />
    <circle cx="390" cy="415" r="3" fill="#6b8f71" />
    {/* Windows left */}
    <rect x="190" y="310" width="80" height="60" stroke="#2d6a6f" strokeWidth="1" fill="none" />
    <line x1="230" y1="310" x2="230" y2="370" stroke="#2d6a6f" strokeWidth="0.6" />
    <line x1="190" y1="340" x2="270" y2="340" stroke="#2d6a6f" strokeWidth="0.6" />
    {/* Windows right */}
    <rect x="470" y="310" width="80" height="60" stroke="#2d6a6f" strokeWidth="1" fill="none" />
    <line x1="510" y1="310" x2="510" y2="370" stroke="#2d6a6f" strokeWidth="0.6" />
    <line x1="470" y1="340" x2="550" y2="340" stroke="#2d6a6f" strokeWidth="0.6" />
    {/* Chimney */}
    <rect x="550" y="160" width="40" height="80" stroke="#2d6a6f" strokeWidth="1" fill="none" />
    {/* Attic window */}
    <circle cx="400" cy="210" r="28" stroke="#6b8f71" strokeWidth="1" fill="none" />
    <line x1="400" y1="182" x2="400" y2="238" stroke="#6b8f71" strokeWidth="0.5" />
    <line x1="372" y1="210" x2="428" y2="210" stroke="#6b8f71" strokeWidth="0.5" />
    {/* Ground line */}
    <line x1="60" y1="460" x2="740" y2="460" stroke="#2d6a6f" strokeWidth="0.8" />
    {/* Bushes */}
    <ellipse cx="180" cy="450" rx="50" ry="18" stroke="#6b8f71" strokeWidth="0.8" fill="none" />
    <ellipse cx="620" cy="450" rx="50" ry="18" stroke="#6b8f71" strokeWidth="0.8" fill="none" />
    {/* Path to door */}
    <line x1="350" y1="460" x2="340" y2="490" stroke="#2d6a6f" strokeWidth="0.6" />
    <line x1="390" y1="460" x2="400" y2="490" stroke="#2d6a6f" strokeWidth="0.6" />
    {/* Decorative plant left of door */}
    <line x1="320" y1="460" x2="320" y2="430" stroke="#6b8f71" strokeWidth="0.6" />
    <ellipse cx="320" cy="425" rx="8" ry="6" stroke="#6b8f71" strokeWidth="0.6" fill="none" />
    {/* Decorative plant right of door */}
    <line x1="420" y1="460" x2="420" y2="430" stroke="#6b8f71" strokeWidth="0.6" />
    <ellipse cx="420" cy="425" rx="8" ry="6" stroke="#6b8f71" strokeWidth="0.6" fill="none" />
  </svg>
);

const serviceIcons: Record<string, JSX.Element> = {
  interior: (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <rect x="10" y="16" width="44" height="36" stroke="#2d6a6f" strokeWidth="1.2" />
      <rect x="22" y="28" width="12" height="24" stroke="#6b8f71" strokeWidth="1" />
      <rect x="38" y="24" width="10" height="10" stroke="#2d6a6f" strokeWidth="0.8" />
      <line x1="10" y1="16" x2="32" y2="6" stroke="#2d6a6f" strokeWidth="1" />
      <line x1="54" y1="16" x2="32" y2="6" stroke="#2d6a6f" strokeWidth="1" />
    </svg>
  ),
  exterior: (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <rect x="12" y="24" width="40" height="30" stroke="#2d6a6f" strokeWidth="1.2" />
      <polygon points="8,24 32,8 56,24" stroke="#2d6a6f" strokeWidth="1.2" fill="none" />
      <line x1="6" y1="54" x2="58" y2="54" stroke="#6b8f71" strokeWidth="0.8" />
      <rect x="26" y="38" width="12" height="16" stroke="#6b8f71" strokeWidth="1" />
      <circle cx="36" cy="47" r="1.5" fill="#6b8f71" />
    </svg>
  ),
  cabinet: (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <rect x="10" y="10" width="44" height="44" rx="1" stroke="#2d6a6f" strokeWidth="1.2" />
      <line x1="32" y1="10" x2="32" y2="54" stroke="#2d6a6f" strokeWidth="0.8" />
      <line x1="10" y1="32" x2="54" y2="32" stroke="#2d6a6f" strokeWidth="0.8" />
      <circle cx="27" cy="21" r="2" stroke="#6b8f71" strokeWidth="1" />
      <circle cx="37" cy="21" r="2" stroke="#6b8f71" strokeWidth="1" />
      <circle cx="27" cy="43" r="2" stroke="#6b8f71" strokeWidth="1" />
      <circle cx="37" cy="43" r="2" stroke="#6b8f71" strokeWidth="1" />
    </svg>
  ),
  restoration: (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <rect x="14" y="20" width="36" height="34" stroke="#2d6a6f" strokeWidth="1.2" />
      <line x1="14" y1="20" x2="32" y2="8" stroke="#2d6a6f" strokeWidth="1" />
      <line x1="50" y1="20" x2="32" y2="8" stroke="#2d6a6f" strokeWidth="1" />
      <path d="M20 54 L20 34 Q32 28 44 34 L44 54" stroke="#6b8f71" strokeWidth="1" fill="none" />
      <line x1="32" y1="30" x2="32" y2="54" stroke="#6b8f71" strokeWidth="0.5" />
    </svg>
  ),
  faux: (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <rect x="12" y="12" width="40" height="40" rx="2" stroke="#2d6a6f" strokeWidth="1.2" />
      <path d="M16 42 Q24 22 32 32 Q40 42 48 22" stroke="#6b8f71" strokeWidth="1.2" fill="none" />
      <circle cx="20" cy="20" r="3" stroke="#2d6a6f" strokeWidth="0.8" />
      <circle cx="44" cy="44" r="3" stroke="#2d6a6f" strokeWidth="0.8" />
    </svg>
  ),
  color: (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <circle cx="32" cy="28" r="16" stroke="#2d6a6f" strokeWidth="1.2" />
      <circle cx="26" cy="24" r="4" stroke="#6b8f71" strokeWidth="0.8" />
      <circle cx="38" cy="24" r="4" stroke="#6b8f71" strokeWidth="0.8" />
      <circle cx="32" cy="34" r="4" stroke="#6b8f71" strokeWidth="0.8" />
      <line x1="32" y1="44" x2="32" y2="56" stroke="#2d6a6f" strokeWidth="1.2" />
      <line x1="28" y1="56" x2="36" y2="56" stroke="#2d6a6f" strokeWidth="1.2" />
    </svg>
  ),
  deck: (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <line x1="8" y1="30" x2="56" y2="30" stroke="#2d6a6f" strokeWidth="1.2" />
      <line x1="8" y1="36" x2="56" y2="36" stroke="#2d6a6f" strokeWidth="0.8" />
      <line x1="8" y1="42" x2="56" y2="42" stroke="#2d6a6f" strokeWidth="0.8" />
      <line x1="12" y1="30" x2="10" y2="56" stroke="#2d6a6f" strokeWidth="1" />
      <line x1="52" y1="30" x2="54" y2="56" stroke="#2d6a6f" strokeWidth="1" />
      <line x1="12" y1="12" x2="12" y2="30" stroke="#6b8f71" strokeWidth="1" />
      <line x1="52" y1="12" x2="52" y2="30" stroke="#6b8f71" strokeWidth="1" />
      <line x1="12" y1="12" x2="52" y2="12" stroke="#6b8f71" strokeWidth="1" />
    </svg>
  ),
  drywall: (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
      <rect x="10" y="10" width="44" height="44" stroke="#2d6a6f" strokeWidth="1.2" />
      <line x1="10" y1="32" x2="54" y2="32" stroke="#2d6a6f" strokeWidth="0.6" strokeDasharray="4 2" />
      <line x1="32" y1="10" x2="32" y2="54" stroke="#2d6a6f" strokeWidth="0.6" strokeDasharray="4 2" />
      <path d="M24 28 L28 20 L32 28" stroke="#6b8f71" strokeWidth="1" fill="none" />
      <line x1="28" y1="20" x2="28" y2="12" stroke="#6b8f71" strokeWidth="0.8" />
    </svg>
  ),
};

/* ── Section wrapper with fade-in ─────────── */

function EditorialSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const { ref, isInView } = useInView(0.08);
  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Main component ───────────────────────── */

export default function Design3() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Awards', href: '#awards' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-dc-ivory font-sans text-dc-charcoal antialiased">
      {/* ═══════════════════════════════════════
          1. HEADER / NAV
          ═══════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dc-ivory/95 backdrop-blur-sm border-b border-dc-charcoal/10 shadow-[0_1px_0_rgba(0,0,0,0.04)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo / Brand */}
          <a href="#" className="font-serif text-lg md:text-xl tracking-wide text-dc-charcoal">
            {COMPANY.name}
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs tracking-[0.2em] uppercase text-dc-slate hover:text-dc-teal transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`tel:${COMPANY.phone}`}
                className="text-xs tracking-[0.2em] uppercase text-dc-teal hover:text-dc-sage transition-colors duration-300"
              >
                {COMPANY.phone}
              </a>
            </li>
          </ul>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-px bg-dc-charcoal transition-all duration-300 ${
                mobileNavOpen ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-dc-charcoal transition-all duration-300 ${
                mobileNavOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-dc-charcoal transition-all duration-300 ${
                mobileNavOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </button>
        </nav>

        {/* Mobile nav dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 bg-dc-ivory/95 backdrop-blur-sm ${
            mobileNavOpen ? 'max-h-96 border-b border-dc-charcoal/10' : 'max-h-0'
          }`}
        >
          <ul className="px-6 py-6 space-y-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="text-xs tracking-[0.2em] uppercase text-dc-slate hover:text-dc-teal transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`tel:${COMPANY.phone}`}
                className="text-xs tracking-[0.2em] uppercase text-dc-teal"
              >
                {COMPANY.phone}
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* Thin scroll-progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-dc-teal/60 z-[60] transition-none"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* ═══════════════════════════════════════
          2. HERO — Magazine Cover
          ═══════════════════════════════════════ */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-10 max-w-6xl mx-auto">
        <EditorialSection>
          {/* Issue / Volume tagline */}
          <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-dc-slate mb-8 md:mb-12">
            Est. {COMPANY.founded} &nbsp;&middot;&nbsp; {COMPANY.location} &nbsp;&middot;&nbsp; {COMPANY.serviceArea}
          </p>

          {/* Enormous headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[1.05] tracking-tight text-dc-charcoal">
            The Art of
            <br />
            Living in <span className="italic text-dc-teal">Color</span>
          </h1>

          {/* Horizontal rule */}
          <div className="mt-8 md:mt-12 mb-8 md:mb-10 border-t border-dc-charcoal/20 w-full" />

          {/* Deck / subtitle */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <p className="text-sm md:text-base leading-relaxed text-dc-slate max-w-xl">
              {COMPANY.description} We believe every surface tells a story, and every color choice
              shapes the way you experience your home. This is painting elevated to craft.
            </p>
            <a
              href="#contact"
              className="text-xs tracking-[0.2em] uppercase text-dc-teal border-b border-dc-teal pb-1 hover:text-dc-sage hover:border-dc-sage transition-colors duration-300 self-start whitespace-nowrap"
            >
              Begin a Conversation
            </a>
          </div>
        </EditorialSection>

        {/* Editorial illustration */}
        <EditorialSection className="mt-12 md:mt-20">
          <div className="max-w-3xl mx-auto opacity-80">
            <HouseIllustration />
          </div>
        </EditorialSection>
      </section>

      {/* ═══════════════════════════════════════
          3. EDITORIAL INTRO — Two-column spread
          ═══════════════════════════════════════ */}
      <section id="about" className="py-20 md:py-32 px-6 md:px-10 max-w-6xl mx-auto">
        <EditorialSection>
          {/* Section label */}
          <p className="text-[10px] tracking-[0.35em] uppercase text-dc-sage mb-10 md:mb-14">
            Our Story
          </p>

          <div className="flex flex-col md:flex-row gap-10 md:gap-0">
            {/* Left column — the story with drop cap */}
            <div className="md:w-3/5 md:pr-12">
              <p className="text-base md:text-lg leading-[1.85] text-dc-charcoal/85">
                <span className="float-left font-serif text-6xl md:text-7xl leading-[0.8] mr-3 mt-1 text-dc-teal">
                  F
                </span>
                ounded in {COMPANY.founded} by two high school friends,{' '}
                {COMPANY.founders[0]} and {COMPANY.founders[1]}, Dynamic Colors began
                as a small painting operation in the northwest suburbs of Chicago. What
                started as a shared passion for craftsmanship and color has grown into one
                of the region&rsquo;s most respected painting and restoration companies.
              </p>
              <p className="text-base md:text-lg leading-[1.85] text-dc-charcoal/85 mt-6">
                For over two decades, we have served the Chicago and North Shore communities
                with an unwavering commitment to quality, honesty, and professionalism.
                Every project we undertake reflects our belief that painting is not merely a
                trade — it is an art form that transforms the spaces where life happens.
              </p>
              <p className="text-base md:text-lg leading-[1.85] text-dc-charcoal/85 mt-6">
                From historic Evanston bungalows to contemporary commercial spaces, our
                team brings meticulous attention to detail and decades of expertise to
                every surface we touch.
              </p>
            </div>

            {/* Thin vertical divider */}
            <div className="hidden md:block w-px bg-dc-charcoal/15 self-stretch" />

            {/* Right column — key facts sidebar */}
            <div className="md:w-2/5 md:pl-12">
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-dc-slate mb-2">
                    Founded
                  </p>
                  <p className="font-serif text-2xl text-dc-charcoal">
                    {COMPANY.founded}
                  </p>
                </div>
                <div className="border-t border-dc-charcoal/10 pt-8">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-dc-slate mb-2">
                    Location
                  </p>
                  <p className="font-serif text-2xl text-dc-charcoal">
                    {COMPANY.location}
                  </p>
                </div>
                <div className="border-t border-dc-charcoal/10 pt-8">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-dc-slate mb-2">
                    Service Area
                  </p>
                  <p className="font-serif text-2xl text-dc-charcoal">
                    {COMPANY.serviceArea}
                  </p>
                </div>
                <div className="border-t border-dc-charcoal/10 pt-8">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-dc-slate mb-2">
                    Founders
                  </p>
                  <p className="font-serif text-lg text-dc-charcoal leading-relaxed">
                    {COMPANY.founders[0]}
                    <br />
                    {COMPANY.founders[1]}
                  </p>
                </div>
                <div className="border-t border-dc-charcoal/10 pt-8">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-dc-slate mb-2">
                    Recognition
                  </p>
                  <p className="font-serif text-lg text-dc-charcoal">
                    {AWARDS.length} Major Awards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </EditorialSection>
      </section>

      {/* ═══════════════════════════════════════
          4. SERVICES FEATURE
          ═══════════════════════════════════════ */}
      <section
        id="services"
        className="py-20 md:py-32 px-6 md:px-10 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <EditorialSection>
            <p className="text-[10px] tracking-[0.35em] uppercase text-dc-sage mb-4">
              What We Do
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dc-charcoal mb-4">
              Our Services
            </h2>
            <div className="border-t border-dc-charcoal/20 w-24 mb-16 md:mb-20" />
          </EditorialSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14 md:gap-y-20">
            {SERVICES.map((service, i) => (
              <EditorialSection key={service.title}>
                <article className="group">
                  <div className="flex items-start gap-5">
                    {/* Service icon */}
                    <div className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                      {serviceIcons[service.icon] || serviceIcons.interior}
                    </div>
                    <div>
                      {/* Number + Title */}
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-[10px] tracking-[0.2em] text-dc-slate/50 font-mono">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-serif text-xl md:text-2xl text-dc-charcoal group-hover:text-dc-teal transition-colors duration-500">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-dc-slate">
                        {service.description}
                      </p>
                      {/* Thin underline */}
                      <div className="mt-5 border-t border-dc-charcoal/8 w-full" />
                    </div>
                  </div>
                </article>
              </EditorialSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          5. PULL QUOTE
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-dc-ivory">
        <div className="max-w-5xl mx-auto">
          <EditorialSection>
            {/* Top rule */}
            <div className="border-t border-dc-charcoal/20 mb-12 md:mb-16" />

            <blockquote className="text-center">
              <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug md:leading-snug text-dc-charcoal/90 max-w-4xl mx-auto">
                &ldquo;{TESTIMONIALS[0].text}&rdquo;
              </p>
              <footer className="mt-8 md:mt-12">
                <p className="text-xs tracking-[0.25em] uppercase text-dc-sage">
                  {TESTIMONIALS[0].author}
                  <span className="mx-3 text-dc-charcoal/20">&mdash;</span>
                  {TESTIMONIALS[0].location}
                </p>
              </footer>
            </blockquote>

            {/* Bottom rule */}
            <div className="border-t border-dc-charcoal/20 mt-12 md:mt-16" />
          </EditorialSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          6. AWARDS & RECOGNITION
          ═══════════════════════════════════════ */}
      <section id="awards" className="py-20 md:py-32 px-6 md:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <EditorialSection>
            <p className="text-[10px] tracking-[0.35em] uppercase text-dc-sage mb-4">
              Recognition
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-dc-charcoal mb-4">
              Awards &amp; Honors
            </h2>
            <div className="border-t border-dc-charcoal/20 w-24 mb-16 md:mb-20" />
          </EditorialSection>

          <EditorialSection>
            <div className="flex flex-col md:flex-row md:items-stretch">
              {AWARDS.map((award, i) => (
                <div
                  key={award.title}
                  className={`flex-1 py-6 md:py-0 md:px-8 lg:px-12 ${
                    i !== 0
                      ? 'border-t md:border-t-0 md:border-l border-dc-charcoal/15'
                      : ''
                  } ${i === 0 ? 'md:pl-0' : ''} ${
                    i === AWARDS.length - 1 ? 'md:pr-0' : ''
                  }`}
                >
                  <p className="font-serif text-xl md:text-2xl text-dc-charcoal mb-2">
                    {award.title}
                  </p>
                  <p className="text-xs tracking-[0.15em] uppercase text-dc-slate mb-1">
                    {award.source}
                  </p>
                  {award.year && (
                    <p className="text-xs text-dc-sage">{award.year}</p>
                  )}
                </div>
              ))}
            </div>
          </EditorialSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          7. STATISTICS
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-dc-cream">
        <div className="max-w-6xl mx-auto">
          <EditorialSection>
            <p className="text-[10px] tracking-[0.35em] uppercase text-dc-sage mb-4 text-center">
              By the Numbers
            </p>
            <div className="border-t border-dc-charcoal/15 w-12 mx-auto mb-16 md:mb-20" />
          </EditorialSection>

          <EditorialSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 text-center">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-dc-teal leading-none mb-3">
                    {stat.value}
                  </p>
                  <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-dc-slate">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </EditorialSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          8. TESTIMONIALS GRID
          ═══════════════════════════════════════ */}
      <section
        id="testimonials"
        className="py-20 md:py-32 px-6 md:px-10 bg-dc-ivory"
      >
        <div className="max-w-6xl mx-auto">
          <EditorialSection>
            <p className="text-[10px] tracking-[0.35em] uppercase text-dc-sage mb-4">
              Voices
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-dc-charcoal mb-4">
              What Our Clients Say
            </h2>
            <div className="border-t border-dc-charcoal/20 w-24 mb-16 md:mb-20" />
          </EditorialSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {TESTIMONIALS.map((testimonial, i) => (
              <EditorialSection key={i}>
                <article className="border border-dc-charcoal/10 p-8 md:p-10 bg-white/50 hover:bg-white transition-colors duration-500">
                  {/* Open-quote mark */}
                  <p className="font-serif text-5xl text-dc-sage/30 leading-none mb-4 select-none">
                    &ldquo;
                  </p>

                  <p className="font-serif italic text-base md:text-lg leading-[1.8] text-dc-charcoal/85 mb-8">
                    {testimonial.text}
                  </p>

                  <footer className="flex items-center justify-between border-t border-dc-charcoal/8 pt-5">
                    <div>
                      <p className="text-xs tracking-[0.2em] uppercase text-dc-charcoal font-medium">
                        {testimonial.author}
                      </p>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-dc-slate mt-1">
                        {testimonial.location}
                      </p>
                    </div>
                    {/* Star rating */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, s) => (
                        <svg
                          key={s}
                          viewBox="0 0 16 16"
                          fill="none"
                          className="w-3 h-3"
                        >
                          <polygon
                            points="8,1 10,6 15.5,6.5 11.5,10 12.5,15.5 8,12.5 3.5,15.5 4.5,10 0.5,6.5 6,6"
                            stroke="#6b8f71"
                            strokeWidth="0.8"
                            fill="#6b8f71"
                            fillOpacity="0.25"
                          />
                        </svg>
                      ))}
                    </div>
                  </footer>
                </article>
              </EditorialSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          9. VALUES
          ═══════════════════════════════════════ */}
      <section className="py-20 md:py-32 px-6 md:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <EditorialSection>
            <p className="text-[10px] tracking-[0.35em] uppercase text-dc-sage mb-4 text-center">
              Principles
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-dc-charcoal mb-4 text-center">
              Our Values
            </h2>
            <div className="border-t border-dc-charcoal/20 w-24 mx-auto mb-16 md:mb-20" />
          </EditorialSection>

          <EditorialSection>
            <ul>
              {VALUES.map((value, i) => (
                <li key={value}>
                  {i !== 0 && (
                    <div className="border-t border-dc-charcoal/10" />
                  )}
                  <div className="flex items-center justify-between py-6 md:py-8 group">
                    <div className="flex items-baseline gap-4 md:gap-6">
                      <span className="text-[10px] tracking-[0.2em] text-dc-slate/40 font-mono">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-serif text-xl md:text-2xl text-dc-charcoal group-hover:text-dc-teal transition-colors duration-500">
                        {value}
                      </span>
                    </div>
                    {/* Subtle decorative dash */}
                    <div className="w-6 md:w-10 h-px bg-dc-sage/40 group-hover:w-14 group-hover:bg-dc-teal transition-all duration-500" />
                  </div>
                </li>
              ))}
              <li>
                <div className="border-t border-dc-charcoal/10" />
              </li>
            </ul>
          </EditorialSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          10. CONTACT / CTA
          ═══════════════════════════════════════ */}
      <section id="contact" className="py-24 md:py-40 px-6 md:px-10 bg-dc-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <EditorialSection>
            <p className="text-[10px] tracking-[0.35em] uppercase text-dc-sage mb-6">
              Get in Touch
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-dc-charcoal leading-tight mb-6">
              Begin a
              <br />
              <span className="italic text-dc-teal">Conversation</span>
            </h2>

            <div className="border-t border-dc-charcoal/20 w-16 mx-auto mb-10 md:mb-14" />

            <p className="text-sm md:text-base leading-relaxed text-dc-slate max-w-lg mx-auto mb-10 md:mb-14">
              Every great project begins with a conversation. Whether you are
              envisioning a subtle refresh or a complete transformation, we
              would love to hear your story.
            </p>

            {/* Phone number as elegant focal point */}
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-block font-serif text-3xl md:text-4xl text-dc-charcoal hover:text-dc-teal transition-colors duration-500 mb-8"
            >
              {COMPANY.phone}
            </a>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-xs tracking-[0.2em] uppercase">
              <a
                href={`tel:${COMPANY.phone}`}
                className="text-dc-teal border-b border-dc-teal pb-1 hover:text-dc-sage hover:border-dc-sage transition-colors duration-300"
              >
                Call Us
              </a>
              <span className="hidden sm:inline text-dc-charcoal/15">&bull;</span>
              <a
                href="#services"
                className="text-dc-teal border-b border-dc-teal pb-1 hover:text-dc-sage hover:border-dc-sage transition-colors duration-300"
              >
                View Services
              </a>
              <span className="hidden sm:inline text-dc-charcoal/15">&bull;</span>
              <a
                href="#about"
                className="text-dc-teal border-b border-dc-teal pb-1 hover:text-dc-sage hover:border-dc-sage transition-colors duration-300"
              >
                Our Story
              </a>
            </div>
          </EditorialSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          11. FOOTER
          ═══════════════════════════════════════ */}
      <footer className="py-16 md:py-20 px-6 md:px-10 bg-dc-charcoal text-white/70">
        <div className="max-w-6xl mx-auto">
          {/* Three-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
            {/* Column 1 — Brand */}
            <div className="md:pr-12">
              <p className="font-serif text-xl text-white mb-4">
                {COMPANY.name}
              </p>
              <p className="text-xs leading-relaxed text-white/50 mb-6">
                {COMPANY.tagline}
              </p>
              <p className="text-xs leading-relaxed text-white/40">
                {COMPANY.location}
                <br />
                Serving {COMPANY.serviceArea}
                <br />
                Since {COMPANY.founded}
              </p>
            </div>

            {/* Vertical divider */}
            <div className="hidden md:flex justify-center">
              <div className="w-px bg-white/10 self-stretch" />
            </div>
            {/* Mobile horizontal divider */}
            <div className="md:hidden border-t border-white/10" />

            {/* Column 2 — Services */}
            <div className="md:px-12 md:border-l md:border-r md:border-white/10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-5">
                Services
              </p>
              <ul className="space-y-2.5">
                {SERVICES.map((service) => (
                  <li key={service.title}>
                    <a
                      href="#services"
                      className="text-xs text-white/50 hover:text-white transition-colors duration-300"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile horizontal divider */}
            <div className="md:hidden border-t border-white/10" />

            {/* Column 3 — Contact */}
            <div className="md:pl-12">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-5">
                Contact
              </p>
              <a
                href={`tel:${COMPANY.phone}`}
                className="block font-serif text-lg text-white hover:text-dc-sage transition-colors duration-300 mb-6"
              >
                {COMPANY.phone}
              </a>

              <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">
                Navigate
              </p>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xs text-white/50 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] tracking-[0.15em] text-white/30">
              &copy; {new Date().getFullYear()} {COMPANY.fullName} All rights reserved.
            </p>
            <p className="text-[10px] tracking-[0.15em] text-white/30">
              {COMPANY.location} &nbsp;&middot;&nbsp; {COMPANY.phone}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
