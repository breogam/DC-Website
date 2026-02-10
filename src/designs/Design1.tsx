import { useState, useEffect, useMemo } from 'react';
import { COMPANY, SERVICES, AWARDS, VALUES, TESTIMONIALS, STATS } from '../data';
import { useInView, useParallax, useCountUp, useScrollProgress } from '../hooks';

/* ------------------------------------------------------------------ */
/*  Helper: parse a stat string like "5,000+" into numeric + suffix    */
/* ------------------------------------------------------------------ */
function parseStat(value: string): { num: number; suffix: string } {
  const cleaned = value.replace(/,/g, '');
  const match = cleaned.match(/^([\d.]+)(.*)$/);
  if (!match) return { num: 0, suffix: '' };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

/* ------------------------------------------------------------------ */
/*  Tiny sub-components for service-card SVG icons                     */
/* ------------------------------------------------------------------ */
function ServiceIcon({ icon }: { icon: string }) {
  const base = 'w-10 h-10 text-dc-gold';
  switch (icon) {
    case 'interior':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="10" width="36" height="28" rx="2" />
          <path d="M6 18h36" />
          <path d="M18 18v20" />
          <circle cx="32" cy="28" r="4" />
        </svg>
      );
    case 'exterior':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 24L24 6l20 18" />
          <rect x="10" y="24" width="28" height="18" />
          <rect x="18" y="30" width="12" height="12" />
          <path d="M24 30v12" />
          <path d="M18 36h12" />
        </svg>
      );
    case 'cabinet':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="6" width="36" height="36" rx="2" />
          <path d="M24 6v36" />
          <path d="M6 24h36" />
          <circle cx="18" cy="15" r="1.5" fill="currentColor" />
          <circle cx="30" cy="15" r="1.5" fill="currentColor" />
          <circle cx="18" cy="33" r="1.5" fill="currentColor" />
          <circle cx="30" cy="33" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'restoration':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 40L8 44" strokeLinecap="round" />
          <path d="M8 28c0-8 6-16 16-20" />
          <path d="M40 20c0 8-6 16-16 20" />
          <path d="M24 8l4-4M24 8l-4-4" strokeLinecap="round" />
          <circle cx="24" cy="24" r="6" />
          <path d="M21 24l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'faux':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 40C12 30 16 22 24 14c4-4 10-6 14-4s2 10-2 14c-8 8-16 12-26 16z" />
          <path d="M30 14l4-10" strokeLinecap="round" />
          <path d="M16 30c4-2 8-6 10-10" strokeLinecap="round" />
        </svg>
      );
    case 'color':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="24" cy="24" r="18" />
          <circle cx="24" cy="14" r="4" />
          <circle cx="15" cy="28" r="4" />
          <circle cx="33" cy="28" r="4" />
          <circle cx="24" cy="24" r="3" fill="currentColor" />
        </svg>
      );
    case 'deck':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 20h40" />
          <path d="M8 20v20" />
          <path d="M40 20v20" />
          <path d="M4 28h40" />
          <path d="M4 36h40" />
          <path d="M16 20v20" />
          <path d="M28 20v20" />
        </svg>
      );
    case 'drywall':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="6" width="36" height="36" rx="1" />
          <path d="M18 6v36" />
          <path d="M30 6v36" />
          <path d="M6 18h36" />
          <path d="M6 30h36" />
          <path d="M26 22l-6 6" strokeLinecap="round" strokeWidth="3" />
        </svg>
      );
    default:
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="24" cy="24" r="18" />
        </svg>
      );
  }
}

/* ================================================================== */
/*  STAT COUNTER (individual)                                          */
/* ================================================================== */
function StatCounter({ value, label }: { value: string; label: string }) {
  const { num, suffix } = parseStat(value);
  const isDecimal = value.includes('.');
  const { ref, isInView } = useInView(0.3);
  const { count, activate } = useCountUp(isDecimal ? num * 10 : num, 2200, 0);

  useEffect(() => {
    if (isInView) activate();
  }, [isInView, activate]);

  const display = isDecimal ? (count / 10).toFixed(1) : count.toLocaleString();

  return (
    <div ref={ref} className="text-center px-6 py-8">
      <span className="font-serif text-5xl md:text-7xl font-bold text-dc-gold tracking-tight">
        {display}
        {suffix}
      </span>
      <p className="mt-3 text-sm md:text-base uppercase tracking-[0.25em] text-dc-slate font-sans">
        {label}
      </p>
    </div>
  );
}

/* ================================================================== */
/*  MAIN DESIGN COMPONENT                                              */
/* ================================================================== */
export default function Design1() {
  const scrollProgress = useScrollProgress();
  const parallaxSlow = useParallax(0.15);
  const parallaxMedium = useParallax(0.25);

  /* -- Section in-view hooks -- */
  const hero = useInView(0.05);
  const about = useInView(0.15);
  const servicesSection = useInView(0.1);
  const testimonials = useInView(0.1);
  const valuesSection = useInView(0.15);
  const ctaSection = useInView(0.15);

  /* -- Testimonial carousel state -- */
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  /* -- Background particle dots (memoised for perf) -- */
  const particles = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
        delay: Math.random() * 5,
      })),
    [],
  );

  /* ================================================================ */
  return (
    <div className="bg-dc-deep text-dc-cream font-sans min-h-screen overflow-x-hidden">
      {/* ============================================================ */}
      {/*  1. SCROLL PROGRESS BAR                                      */}
      {/* ============================================================ */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100]">
        <div
          className="h-full bg-gradient-to-r from-dc-gold via-dc-gold-light to-dc-gold transition-none"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* ============================================================ */}
      {/*  2. HERO                                                      */}
      {/* ============================================================ */}
      <section
        ref={hero.ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* -- Dark gradient overlay -- */}
        <div className="absolute inset-0 bg-gradient-to-b from-dc-deep via-dc-navy/80 to-dc-deep" />

        {/* -- Subtle radial light -- */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(201,168,76,0.12) 0%, transparent 70%)',
          }}
        />

        {/* -- Particle dot pattern -- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full bg-dc-gold animate-float"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                animationDelay: `${p.delay}s`,
                animationDuration: `${6 + p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* -- Paint drip SVG (left side) -- */}
        <div
          className="absolute left-0 top-0 h-full w-32 md:w-48 lg:w-64 pointer-events-none opacity-20 md:opacity-30"
          style={{ transform: `translateY(${parallaxSlow * 0.3}px)` }}
        >
          <svg
            viewBox="0 0 200 1000"
            fill="none"
            className="h-full w-full"
            preserveAspectRatio="xMinYMin slice"
          >
            <defs>
              <linearGradient id="dripGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 0 H60 V180 Q60 220 40 260 Q20 300 30 380 Q40 440 20 520 Q0 600 10 700 Q20 800 0 900 Z"
              fill="url(#dripGrad)"
            />
            <path
              d="M80 0 H130 V120 Q130 170 110 220 Q90 270 100 340 Q110 400 90 480 Q70 560 80 650 Q90 720 70 800 Q50 880 60 1000 H80 Z"
              fill="url(#dripGrad)"
              opacity="0.5"
            />
            <path
              d="M150 0 H190 V80 Q190 140 170 190 Q150 240 160 310 Q170 370 155 440 Q140 510 150 600 V1000 H150 Z"
              fill="url(#dripGrad)"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* -- Paint drip SVG (right side, mirrored) -- */}
        <div
          className="absolute right-0 top-0 h-full w-32 md:w-48 lg:w-64 pointer-events-none opacity-20 md:opacity-30"
          style={{ transform: `translateY(${parallaxSlow * 0.2}px) scaleX(-1)` }}
        >
          <svg
            viewBox="0 0 200 1000"
            fill="none"
            className="h-full w-full"
            preserveAspectRatio="xMinYMin slice"
          >
            <path
              d="M0 0 H50 V200 Q50 260 30 320 Q10 380 20 460 Q30 540 10 620 Q-10 700 10 800 Q30 900 0 1000 Z"
              fill="url(#dripGrad)"
            />
            <path
              d="M100 0 H140 V100 Q140 160 125 220 Q110 280 120 360 Q130 420 115 500 Q100 580 110 660 Q120 740 100 820 Z"
              fill="url(#dripGrad)"
              opacity="0.45"
            />
          </svg>
        </div>

        {/* -- Hero content -- */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div
            className={`transition-all duration-1000 ${
              hero.isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            {/* Company name in gold */}
            <p className="uppercase tracking-[0.35em] text-dc-gold text-sm md:text-base mb-6 font-sans font-medium">
              {COMPANY.fullName}
            </p>

            {/* Big headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6">
              Where{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-dc-gold via-dc-gold-light to-dc-gold">
                Artistry
              </span>
              <br />
              Meets Craftsmanship
            </h1>

            {/* Subtext */}
            <p
              className="text-dc-slate text-lg md:text-xl max-w-2xl mx-auto mb-10 font-sans leading-relaxed"
              style={{ animationDelay: '0.3s' }}
            >
              {COMPANY.description}
            </p>

            {/* CTA button */}
            <a
              href={`tel:${COMPANY.phone}`}
              className="
                group relative inline-flex items-center gap-3
                px-10 py-4 rounded-full
                bg-gradient-to-r from-dc-gold to-dc-gold-light
                text-dc-deep font-semibold text-lg
                transition-all duration-500
                hover:scale-105 hover:shadow-[0_0_40px_rgba(201,168,76,0.45)]
                animate-pulse-glow
              "
            >
              <span>Begin Your Transformation</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none" className="text-dc-gold">
              <rect x="1" y="1" width="22" height="34" rx="11" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="10" r="2" fill="currentColor">
                <animate
                  attributeName="cy"
                  values="10;22;10"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. AWARDS MARQUEE                                            */}
      {/* ============================================================ */}
      <section className="relative bg-dc-navy/60 border-y border-dc-gold/10 py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...AWARDS, ...AWARDS, ...AWARDS, ...AWARDS].map((award, i) => (
            <span key={i} className="inline-flex items-center mx-10 shrink-0">
              {/* Gold diamond separator */}
              <svg className="w-3 h-3 text-dc-gold mr-6" viewBox="0 0 12 12" fill="currentColor">
                <rect x="3" y="3" width="6" height="6" transform="rotate(45 6 6)" />
              </svg>
              <span className="text-dc-gold font-serif text-sm md:text-base tracking-wide">
                {award.title}
              </span>
              <span className="text-dc-slate mx-2 text-xs">|</span>
              <span className="text-dc-slate text-xs md:text-sm tracking-wider uppercase">
                {award.source}
                {award.year ? ` \u2022 ${award.year}` : ''}
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. ABOUT / STORY SECTION                                     */}
      {/* ============================================================ */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        {/* Background accent */}
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-[0.04] pointer-events-none"
          style={{ transform: `translateY(${parallaxMedium * 0.15}px)` }}
        >
          <svg viewBox="0 0 600 800" fill="none" className="w-full h-full">
            <circle cx="400" cy="300" r="250" stroke="#c9a84c" strokeWidth="0.5" />
            <circle cx="350" cy="400" r="300" stroke="#c9a84c" strokeWidth="0.5" />
            <circle cx="300" cy="350" r="200" stroke="#c9a84c" strokeWidth="0.5" />
          </svg>
        </div>

        <div ref={about.ref} className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Story */}
            <div
              className={`transition-all duration-1000 ${
                about.isInView ? 'animate-slide-in-left' : 'opacity-0'
              }`}
            >
              <p className="uppercase tracking-[0.3em] text-dc-gold text-xs mb-4 font-sans">
                Est. {COMPANY.founded} &bull; {COMPANY.location}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                Two Friends.
                <br />
                <span className="text-dc-gold">One Vision.</span>
              </h2>
              <div className="w-20 h-[2px] bg-gradient-to-r from-dc-gold to-transparent mb-8" />
              <p className="text-dc-slate text-lg leading-relaxed mb-6 font-sans">
                {COMPANY.story}
              </p>
              <p className="text-dc-slate/80 text-base leading-relaxed font-sans">
                What began as a partnership between {COMPANY.founders[0]} and{' '}
                {COMPANY.founders[1]} &mdash; two high school friends with a shared passion for
                craftsmanship &mdash; has become the North Shore&apos;s premier painting and
                restoration firm. Over {new Date().getFullYear() - COMPANY.founded} years later,
                that founding commitment to excellence remains at the heart of every project we
                undertake.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-dc-gold/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-dc-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-dc-slate mb-0.5">
                    Get in Touch
                  </p>
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="text-dc-gold font-serif text-xl hover:text-dc-gold-light transition-colors"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Abstract SVG composition */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                about.isInView ? 'animate-slide-in-right' : 'opacity-0'
              }`}
            >
              <div
                className="relative w-full aspect-square max-w-lg mx-auto"
                style={{ transform: `translateY(${parallaxMedium * -0.1}px)` }}
              >
                <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="brushGrad1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#e0c56e" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="brushGrad2" x1="1" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e0c56e" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.05" />
                    </linearGradient>
                    <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Background glow */}
                  <circle cx="250" cy="250" r="220" fill="url(#glow1)" />

                  {/* Brushstroke 1 - large sweeping curve */}
                  <path
                    d="M80 380 Q140 200 250 180 Q360 160 400 100"
                    stroke="url(#brushGrad1)"
                    strokeWidth="40"
                    strokeLinecap="round"
                    opacity="0.7"
                  />

                  {/* Brushstroke 2 */}
                  <path
                    d="M120 420 Q200 280 320 250 Q440 220 460 140"
                    stroke="url(#brushGrad2)"
                    strokeWidth="24"
                    strokeLinecap="round"
                    opacity="0.5"
                  />

                  {/* Brushstroke 3 - tight swirl */}
                  <path
                    d="M200 350 Q220 280 280 260 Q340 240 330 180 Q320 120 260 130 Q200 140 210 200"
                    stroke="#c9a84c"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.4"
                  />

                  {/* Decorative circles */}
                  <circle
                    cx="250"
                    cy="250"
                    r="160"
                    stroke="#c9a84c"
                    strokeWidth="0.5"
                    opacity="0.25"
                  />
                  <circle
                    cx="250"
                    cy="250"
                    r="120"
                    stroke="#c9a84c"
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                  <circle
                    cx="250"
                    cy="250"
                    r="80"
                    stroke="#e0c56e"
                    strokeWidth="0.5"
                    opacity="0.15"
                  />

                  {/* Paint splash dots */}
                  <circle cx="150" cy="150" r="6" fill="#c9a84c" opacity="0.35" />
                  <circle cx="350" cy="120" r="4" fill="#e0c56e" opacity="0.3" />
                  <circle cx="380" cy="320" r="8" fill="#c9a84c" opacity="0.2" />
                  <circle cx="130" cy="300" r="5" fill="#e0c56e" opacity="0.25" />
                  <circle cx="300" cy="400" r="3" fill="#c9a84c" opacity="0.4" />
                  <circle cx="200" cy="100" r="3" fill="#c9a84c" opacity="0.3" />

                  {/* Central decorative mark */}
                  <path
                    d="M240 230 Q250 210 260 230 Q270 250 250 260 Q230 250 240 230Z"
                    fill="#c9a84c"
                    opacity="0.4"
                  />

                  {/* Fine accent lines */}
                  <line
                    x1="100"
                    y1="200"
                    x2="180"
                    y2="180"
                    stroke="#c9a84c"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                  <line
                    x1="320"
                    y1="380"
                    x2="420"
                    y2="350"
                    stroke="#c9a84c"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                </svg>

                {/* Floating "Since 2001" badge */}
                <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full border border-dc-gold/30 flex flex-col items-center justify-center bg-dc-deep/80 backdrop-blur-sm animate-float">
                  <span className="text-[10px] uppercase tracking-widest text-dc-gold/70">
                    Since
                  </span>
                  <span className="font-serif text-2xl text-dc-gold font-bold">
                    {COMPANY.founded}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. SERVICES GRID                                             */}
      {/* ============================================================ */}
      <section className="relative py-28 md:py-40">
        {/* Section bg accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-dc-deep via-dc-navy/40 to-dc-deep pointer-events-none" />

        <div ref={servicesSection.ref} className="relative max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              servicesSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <p className="uppercase tracking-[0.3em] text-dc-gold text-xs mb-4 font-sans">
              What We Do
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-dc-gold">Craft</span>
            </h2>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-dc-gold to-transparent mx-auto" />
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`
                  group relative p-8 rounded-lg
                  bg-dc-navy/40 border border-dc-gold/10
                  transition-all duration-500
                  hover:border-dc-gold/40 hover:bg-dc-navy/60
                  hover:shadow-[0_0_30px_rgba(201,168,76,0.1)]
                  hover:-translate-y-1
                  ${servicesSection.isInView ? 'animate-fade-in-up' : 'opacity-0'}
                `}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Top gold accent line */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-dc-gold/30 to-transparent group-hover:via-dc-gold/60 transition-all duration-500" />

                <div className="mb-5 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <ServiceIcon icon={service.icon} />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-3 text-dc-cream group-hover:text-dc-gold-light transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-dc-slate text-sm leading-relaxed font-sans">
                  {service.description}
                </p>

                {/* Corner accent */}
                <div className="absolute bottom-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <svg viewBox="0 0 16 16" fill="none" stroke="#c9a84c" strokeWidth="1">
                    <path d="M16 0v16H0" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. STATS COUNTER                                             */}
      {/* ============================================================ */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-dc-navy/30 pointer-events-none" />

        {/* Decorative top/bottom borders */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dc-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dc-gold/20 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="relative">
                <StatCounter value={stat.value} label={stat.label} />
                {/* Vertical separator (not on last) */}
                {i < STATS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 w-[1px] h-16 bg-gradient-to-b from-transparent via-dc-gold/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. TESTIMONIALS                                              */}
      {/* ============================================================ */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dc-deep via-dc-navy/20 to-dc-deep pointer-events-none" />

        {/* Background decorative quote marks */}
        <div className="absolute top-20 left-10 opacity-[0.03] pointer-events-none">
          <svg width="300" height="250" viewBox="0 0 300 250" fill="#c9a84c">
            <text fontFamily="Georgia, serif" fontSize="300" y="220" x="0">
              &#x201C;
            </text>
          </svg>
        </div>

        <div ref={testimonials.ref} className="relative max-w-5xl mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              testimonials.isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <p className="uppercase tracking-[0.3em] text-dc-gold text-xs mb-4 font-sans">
              Client Voices
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">
              Words of <span className="text-dc-gold">Trust</span>
            </h2>
          </div>

          {/* Testimonial cards */}
          <div className="relative">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`
                  transition-all duration-700 ease-in-out
                  ${i === activeTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute inset-0 pointer-events-none'}
                `}
              >
                <div className="bg-dc-navy/30 border border-dc-gold/10 rounded-xl p-10 md:p-14 text-center relative">
                  {/* Gold quote mark */}
                  <div className="mb-6">
                    <svg
                      className="w-10 h-10 mx-auto text-dc-gold opacity-50"
                      viewBox="0 0 40 40"
                      fill="currentColor"
                    >
                      <path d="M10 25c-3 0-6-3-6-6 0-7 5-14 12-16l1 3c-5 2-8 6-8 9 0 0 1-1 3-1 3 0 5 2 5 5s-3 6-7 6zm18 0c-3 0-6-3-6-6 0-7 5-14 12-16l1 3c-5 2-8 6-8 9 0 0 1-1 3-1 3 0 5 2 5 5s-3 6-7 6z" />
                    </svg>
                  </div>

                  <blockquote className="font-serif text-xl md:text-2xl italic leading-relaxed text-dc-cream/90 mb-8">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>

                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <svg
                        key={s}
                        className="w-4 h-4 text-dc-gold"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-dc-gold font-semibold text-base font-sans">{t.author}</p>
                  <p className="text-dc-slate text-sm font-sans">{t.location}</p>

                  {/* Decorative corners */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-dc-gold/20 rounded-tl" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-dc-gold/20 rounded-tr" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-dc-gold/20 rounded-bl" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-dc-gold/20 rounded-br" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`
                  transition-all duration-300 rounded-full
                  ${
                    i === activeTestimonial
                      ? 'w-10 h-2.5 bg-dc-gold'
                      : 'w-2.5 h-2.5 bg-dc-gold/30 hover:bg-dc-gold/50'
                  }
                `}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. VALUES SECTION                                            */}
      {/* ============================================================ */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-dc-navy/20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dc-gold/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-dc-gold/15 to-transparent" />

        <div ref={valuesSection.ref} className="relative max-w-6xl mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              valuesSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <p className="uppercase tracking-[0.3em] text-dc-gold text-xs mb-4 font-sans">
              What Drives Us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              Our <span className="text-dc-gold">Foundation</span>
            </h2>
          </div>

          {/* Values row */}
          <div
            className={`flex flex-wrap items-center justify-center gap-y-6 transition-all duration-1000 delay-200 ${
              valuesSection.isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {VALUES.map((value, i) => (
              <div key={value} className="flex items-center">
                <span className="text-dc-cream/90 font-serif text-lg md:text-xl lg:text-2xl tracking-wide px-5 md:px-8 hover:text-dc-gold transition-colors duration-300 cursor-default">
                  {value}
                </span>
                {i < VALUES.length - 1 && (
                  <span className="text-dc-gold/30">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                      <rect
                        x="2"
                        y="2"
                        width="4"
                        height="4"
                        transform="rotate(45 4 4)"
                      />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Subtle decorative line below */}
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-dc-gold/30" />
            <svg
              className="w-4 h-4 text-dc-gold/30"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <rect x="4" y="4" width="8" height="8" transform="rotate(45 8 8)" />
            </svg>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-dc-gold/30" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  9. CTA SECTION                                               */}
      {/* ============================================================ */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        {/* Dramatic radial background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Decorative SVG rings */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]"
          style={{ transform: `translateY(${parallaxSlow * -0.2}px)` }}
        >
          <svg width="800" height="800" viewBox="0 0 800 800" fill="none">
            <circle cx="400" cy="400" r="300" stroke="#c9a84c" strokeWidth="0.5" />
            <circle cx="400" cy="400" r="250" stroke="#c9a84c" strokeWidth="0.5" />
            <circle cx="400" cy="400" r="200" stroke="#c9a84c" strokeWidth="0.5" />
            <circle cx="400" cy="400" r="150" stroke="#c9a84c" strokeWidth="0.5" />
          </svg>
        </div>

        <div ref={ctaSection.ref} className="relative max-w-4xl mx-auto px-6 text-center">
          <div
            className={`transition-all duration-1000 ${
              ctaSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <p className="uppercase tracking-[0.3em] text-dc-gold text-xs mb-6 font-sans">
              Let&apos;s Create Together
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              Ready to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-dc-gold via-dc-gold-light to-dc-gold">
                Transform
              </span>
              <br />
              Your Space?
            </h2>
            <p className="text-dc-slate text-lg md:text-xl max-w-2xl mx-auto mb-12 font-sans leading-relaxed">
              From the first brushstroke to the final reveal, we bring artistry, precision, and
              passion to every project. Contact us today for a complimentary consultation.
            </p>

            {/* Phone number display */}
            <a
              href={`tel:${COMPANY.phone}`}
              className="inline-block font-serif text-3xl md:text-4xl text-dc-gold hover:text-dc-gold-light transition-colors duration-300 mb-10"
            >
              {COMPANY.phone}
            </a>

            <br />

            {/* CTA Button */}
            <a
              href={`tel:${COMPANY.phone}`}
              className="
                group relative inline-flex items-center gap-3
                px-12 py-5 rounded-full
                bg-gradient-to-r from-dc-gold to-dc-gold-light
                text-dc-deep font-bold text-lg
                transition-all duration-500
                hover:scale-105 hover:shadow-[0_0_60px_rgba(201,168,76,0.4)]
                animate-pulse-glow
              "
            >
              <span>Schedule a Consultation</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {/* Trust signals */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-dc-slate text-xs uppercase tracking-widest">
              <span>Free Estimates</span>
              <span className="text-dc-gold/30">&bull;</span>
              <span>Licensed &amp; Insured</span>
              <span className="text-dc-gold/30">&bull;</span>
              <span>EPA Lead-Safe Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  10. FOOTER                                                   */}
      {/* ============================================================ */}
      <footer className="relative bg-dc-navy/40 border-t border-dc-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20">
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {/* Column 1: Company info */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-dc-cream mb-4">
                <span className="text-dc-gold">Dynamic</span> Colors
              </h3>
              <p className="text-dc-slate text-sm leading-relaxed mb-6 font-sans">
                {COMPANY.tagline}
                <br />
                Serving {COMPANY.serviceArea} since {COMPANY.founded}.
              </p>
              <a
                href={`tel:${COMPANY.phone}`}
                className="text-dc-gold hover:text-dc-gold-light transition-colors text-sm font-sans"
              >
                {COMPANY.phone}
              </a>
            </div>

            {/* Column 2: Quick links / Services */}
            <div>
              <h4 className="uppercase tracking-[0.2em] text-dc-gold text-xs font-sans mb-5">
                Services
              </h4>
              <ul className="space-y-2.5">
                {SERVICES.slice(0, 6).map((s) => (
                  <li key={s.title}>
                    <span className="text-dc-slate hover:text-dc-cream transition-colors text-sm cursor-pointer font-sans">
                      {s.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Awards & location */}
            <div>
              <h4 className="uppercase tracking-[0.2em] text-dc-gold text-xs font-sans mb-5">
                Recognition
              </h4>
              <ul className="space-y-2.5">
                {AWARDS.map((a) => (
                  <li key={a.title} className="text-dc-slate text-sm font-sans">
                    {a.title}{' '}
                    <span className="text-dc-slate/50">&mdash; {a.source}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <h4 className="uppercase tracking-[0.2em] text-dc-gold text-xs font-sans mb-3">
                  Location
                </h4>
                <p className="text-dc-slate text-sm font-sans">
                  {COMPANY.location}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-dc-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-dc-slate/60 text-xs font-sans">
              &copy; {new Date().getFullYear()} {COMPANY.fullName} All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-dc-gold/20" />
              <p className="text-dc-slate/40 text-xs font-sans uppercase tracking-widest">
                Evanston, Illinois
              </p>
              <div className="w-8 h-[1px] bg-dc-gold/20" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
