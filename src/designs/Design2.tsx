import { useEffect } from 'react';
import { COMPANY, SERVICES, AWARDS, VALUES, TESTIMONIALS, STATS } from '../data';
import { useInView, useParallax, useCountUp, useScrollProgress } from '../hooks';

/* ------------------------------------------------------------------ */
/*  Geometric SVG icon factory — one per service type                 */
/* ------------------------------------------------------------------ */
function ServiceIcon({ icon, className = '' }: { icon: string; className?: string }) {
  const shared = `w-12 h-12 ${className}`;

  switch (icon) {
    case 'interior':
      return (
        <svg className={shared} viewBox="0 0 48 48" fill="none">
          <rect x="8" y="12" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" />
          <rect x="14" y="18" width="10" height="14" stroke="currentColor" strokeWidth="2" />
          <rect x="28" y="18" width="8" height="8" stroke="currentColor" strokeWidth="2" />
          <line x1="8" y1="12" x2="24" y2="4" stroke="currentColor" strokeWidth="2.5" />
          <line x1="40" y1="12" x2="24" y2="4" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      );
    case 'exterior':
      return (
        <svg className={shared} viewBox="0 0 48 48" fill="none">
          <path d="M6 22L24 6L42 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="10" y="22" width="28" height="20" stroke="currentColor" strokeWidth="2.5" />
          <rect x="18" y="30" width="12" height="12" stroke="currentColor" strokeWidth="2" />
          <circle cx="38" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'cabinet':
      return (
        <svg className={shared} viewBox="0 0 48 48" fill="none">
          <rect x="6" y="8" width="36" height="32" rx="2" stroke="currentColor" strokeWidth="2.5" />
          <line x1="24" y1="8" x2="24" y2="40" stroke="currentColor" strokeWidth="2" />
          <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="2" />
          <circle cx="18" cy="16" r="2" fill="currentColor" />
          <circle cx="30" cy="16" r="2" fill="currentColor" />
          <circle cx="18" cy="32" r="2" fill="currentColor" />
          <circle cx="30" cy="32" r="2" fill="currentColor" />
        </svg>
      );
    case 'restoration':
      return (
        <svg className={shared} viewBox="0 0 48 48" fill="none">
          <path d="M12 40L8 24L16 8H32L40 24L36 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 28C20 28 22 24 24 24C26 24 28 28 28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="34" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'faux':
      return (
        <svg className={shared} viewBox="0 0 48 48" fill="none">
          <path d="M8 40L16 8H24L18 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 40L30 8H38L32 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="24" r="3" stroke="currentColor" strokeWidth="2" />
          <circle cx="34" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'color':
      return (
        <svg className={shared} viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="24" cy="14" r="4" fill="currentColor" opacity="0.6" />
          <circle cx="16" cy="28" r="4" fill="currentColor" opacity="0.4" />
          <circle cx="32" cy="28" r="4" fill="currentColor" opacity="0.8" />
          <circle cx="24" cy="24" r="3" fill="currentColor" />
        </svg>
      );
    case 'deck':
      return (
        <svg className={shared} viewBox="0 0 48 48" fill="none">
          <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="2.5" />
          <line x1="8" y1="24" x2="8" y2="42" stroke="currentColor" strokeWidth="2.5" />
          <line x1="40" y1="24" x2="40" y2="42" stroke="currentColor" strokeWidth="2.5" />
          <line x1="4" y1="30" x2="44" y2="30" stroke="currentColor" strokeWidth="2" />
          <line x1="4" y1="36" x2="44" y2="36" stroke="currentColor" strokeWidth="2" />
          <path d="M16 24V10L24 4L32 10V24" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case 'drywall':
      return (
        <svg className={shared} viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="2" stroke="currentColor" strokeWidth="2.5" />
          <path d="M18 18L30 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14 30C14 30 20 26 24 24C28 22 34 18 34 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg className={shared} viewBox="0 0 48 48" fill="none">
          <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Stat counter component                                             */
/* ------------------------------------------------------------------ */
function StatCounter({ value, label, color }: { value: string; label: string; color: string }) {
  const { ref, isInView } = useInView(0.3);
  const numericMatch = value.match(/[\d,]+/);
  const numericStr = numericMatch ? numericMatch[0].replace(/,/g, '') : '0';
  const numericEnd = parseInt(numericStr, 10);
  const prefix = value.match(/^[^\d]*/)?.[0] || '';
  const suffix = value.match(/[^\d]*$/)?.[0] || '';
  const { count, activate } = useCountUp(numericEnd, 2200, 0);

  useEffect(() => {
    if (isInView) activate();
  }, [isInView, activate]);

  const formatted = numericEnd >= 1000
    ? count.toLocaleString()
    : count.toString();

  return (
    <div ref={ref} className={`${color} flex-1 min-w-[140px] py-12 md:py-16 px-6 flex flex-col items-center justify-center text-center`}>
      <span className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
        {prefix}{formatted}{suffix}
      </span>
      <span className="mt-3 text-sm md:text-base font-bold uppercase tracking-widest text-white/80">
        {label}
      </span>
    </div>
  );
}

/* ================================================================== */
/*  DESIGN 2 — "Color Block"                                          */
/* ================================================================== */
export default function Design2() {
  const scrollProgress = useScrollProgress();
  const parallaxSlow = useParallax(0.15);
  const parallaxMed = useParallax(0.25);

  /* ---------- section refs ---------- */
  const heroRef = useInView(0.05);
  const servicesRef = useInView(0.1);
  const aboutRef = useInView(0.15);
  const awardsRef = useInView(0.1);
  const testimonialsRef0 = useInView(0.15);
  const testimonialsRef1 = useInView(0.15);
  const testimonialsRef2 = useInView(0.15);
  const testimonialsRef3 = useInView(0.15);
  const valuesRef = useInView(0.1);
  const ctaRef = useInView(0.15);
  const footerRef = useInView(0.1);

  const testimonialRefs = [testimonialsRef0, testimonialsRef1, testimonialsRef2, testimonialsRef3];

  /* Color palettes used across sections */
  const blockColors = [
    'bg-dc-rust',
    'bg-dc-teal',
    'bg-dc-gold',
    'bg-dc-navy',
    'bg-dc-sage',
    'bg-dc-copper',
    'bg-dc-deep',
    'bg-dc-charcoal',
  ];

  const blockTextColors = [
    'text-white',
    'text-white',
    'text-dc-navy',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
    'text-white',
  ];

  const valueColors = [
    'bg-dc-rust',
    'bg-dc-teal',
    'bg-dc-gold',
    'bg-dc-navy',
    'bg-dc-sage',
    'bg-dc-copper',
  ];

  const valueTextColors = [
    'text-white',
    'text-white',
    'text-dc-navy',
    'text-white',
    'text-white',
    'text-white',
  ];

  const awardColors = [
    'bg-dc-gold',
    'bg-dc-rust',
    'bg-dc-teal',
    'bg-dc-navy',
  ];

  const awardTextColors = [
    'text-dc-navy',
    'text-white',
    'text-white',
    'text-dc-gold',
  ];

  const testimonialColors = [
    'bg-dc-teal',
    'bg-dc-rust',
    'bg-dc-navy',
    'bg-dc-gold',
  ];

  const testimonialTextColors = [
    'text-white',
    'text-white',
    'text-white',
    'text-dc-navy',
  ];

  const testimonialAccentColors = [
    'bg-dc-gold',
    'bg-dc-teal',
    'bg-dc-rust',
    'bg-dc-teal',
  ];

  const testimonialAccentTextColors = [
    'text-dc-navy',
    'text-white',
    'text-white',
    'text-white',
  ];

  const statColors = [
    'bg-dc-rust',
    'bg-dc-teal',
    'bg-dc-navy',
    'bg-dc-gold',
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* ============================================================ */}
      {/*  SCROLL PROGRESS BAR                                         */}
      {/* ============================================================ */}
      <div
        className="fixed top-0 left-0 h-1.5 bg-dc-rust z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* ============================================================ */}
      {/*  1. HERO — Bold split-screen                                 */}
      {/* ============================================================ */}
      <section ref={heroRef.ref} className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
        {/* Left — Solid rust block with stacked text */}
        <div className="relative lg:w-1/2 min-h-[60vh] lg:min-h-screen bg-dc-rust flex flex-col justify-center px-8 md:px-12 lg:px-16 py-20 lg:py-0">
          {/* Diagonal accent stripe */}
          <div className="absolute top-0 right-0 w-24 h-full bg-dc-navy/10 origin-top-right -skew-x-6 hidden lg:block" />

          <div className={`relative z-10 ${heroRef.isInView ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <span className="inline-block text-white/70 text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-6">
              Est. {COMPANY.founded} &mdash; {COMPANY.location}
            </span>

            <h1 className="text-white leading-[0.85] tracking-tighter">
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] font-black">
                DYN
              </span>
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] font-black">
                AMIC
              </span>
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] font-black">
                COL
              </span>
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] font-black">
                ORS
              </span>
            </h1>

            <p className="mt-6 text-white/80 text-lg md:text-xl font-semibold max-w-md">
              {COMPANY.tagline}
            </p>

            <a
              href={`tel:${COMPANY.phone}`}
              className="group relative inline-flex items-center mt-10 px-10 py-5 bg-white text-dc-rust font-black text-lg uppercase tracking-wider overflow-hidden transition-all duration-300 hover:bg-dc-navy hover:text-white"
            >
              <span className="absolute inset-0 bg-dc-gold translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-dc-navy transition-colors duration-500">
                Get Your Free Quote
              </span>
              <svg className="relative z-10 ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.19l-2.72-2.72a.75.75 0 011.06-1.06l4 4a.75.75 0 010 1.06l-4 4a.75.75 0 11-1.06-1.06l2.72-2.72H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          {/* Small geometric accent — bottom left */}
          <svg className="absolute bottom-8 left-8 w-16 h-16 text-white/20" viewBox="0 0 64 64" fill="none">
            <rect x="4" y="4" width="24" height="24" fill="currentColor" />
            <rect x="36" y="36" width="24" height="24" fill="currentColor" />
          </svg>
        </div>

        {/* Right — Geometric composition */}
        <div className="relative lg:w-1/2 min-h-[40vh] lg:min-h-screen bg-dc-navy flex items-center justify-center overflow-hidden">
          <div
            className={`relative w-full h-full ${heroRef.isInView ? 'animate-scale-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 600 800"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
            >
              {/* Large teal rectangle */}
              <rect
                x="60"
                y="80"
                width="280"
                height="340"
                fill="#2d6a6f"
                style={{ transform: `translateY(${parallaxSlow * 0.3}px)` }}
              />
              {/* Gold circle — large */}
              <circle
                cx="420"
                cy="260"
                r="160"
                fill="#c9a84c"
                style={{ transform: `translateY(${parallaxMed * 0.2}px)` }}
              />
              {/* Small rust square */}
              <rect
                x="300"
                y="500"
                width="200"
                height="200"
                fill="#d35400"
                style={{ transform: `translateY(${parallaxSlow * 0.15}px)` }}
              />
              {/* White circle overlay */}
              <circle cx="200" cy="550" r="100" fill="white" opacity="0.15" />
              {/* Navy rectangle accent */}
              <rect x="80" y="460" width="140" height="80" fill="#1a2332" opacity="0.7" />
              {/* Thin diagonal line */}
              <line x1="0" y1="700" x2="600" y2="100" stroke="white" strokeWidth="1.5" opacity="0.2" />
              <line x1="0" y1="750" x2="600" y2="150" stroke="white" strokeWidth="1" opacity="0.1" />
              {/* Small accent circles */}
              <circle cx="480" cy="600" r="40" fill="#2d6a6f" opacity="0.6" />
              <circle cx="120" cy="160" r="30" fill="white" opacity="0.12" />
              {/* Gold accent bar */}
              <rect x="380" y="80" width="20" height="120" fill="#c9a84c" opacity="0.5" />
              {/* Small white square grid */}
              <rect x="440" y="500" width="16" height="16" fill="white" opacity="0.2" />
              <rect x="464" y="500" width="16" height="16" fill="white" opacity="0.2" />
              <rect x="440" y="524" width="16" height="16" fill="white" opacity="0.2" />
              <rect x="464" y="524" width="16" height="16" fill="white" opacity="0.2" />
            </svg>

            {/* Overlaid text in geometric area */}
            <div className="absolute bottom-12 right-8 md:right-12 text-right z-10">
              <span className="text-white/50 text-sm font-bold uppercase tracking-[0.3em] block">
                Serving
              </span>
              <span className="text-white text-2xl md:text-3xl font-black block">
                {COMPANY.serviceArea}
              </span>
              <span className="text-dc-gold text-sm font-bold uppercase tracking-[0.2em] block mt-1">
                Since {COMPANY.founded}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. SERVICE BLOCKS — Mosaic grid                             */}
      {/* ============================================================ */}
      <section ref={servicesRef.ref} className="relative bg-white py-20 md:py-28 lg:py-36">
        {/* Section heading */}
        <div className="px-6 md:px-12 lg:px-16 mb-12 md:mb-16">
          <div className={`${servicesRef.isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-dc-navy text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter">
              WHAT
              <br />
              WE DO
            </h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="w-20 h-2 bg-dc-rust" />
              <div className="w-10 h-2 bg-dc-teal" />
              <div className="w-6 h-2 bg-dc-gold" />
            </div>
          </div>
        </div>

        {/* Mosaic grid */}
        <div className="px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {SERVICES.map((service, i) => {
              const color = blockColors[i % blockColors.length];
              const textColor = blockTextColors[i % blockTextColors.length];
              /* Make some blocks tall for mosaic effect */
              const isTall = i === 0 || i === 3 || i === 5;

              return (
                <div
                  key={service.title}
                  className={`
                    group relative ${color} ${textColor}
                    ${isTall ? 'sm:row-span-2' : ''}
                    p-8 md:p-10 flex flex-col justify-between
                    min-h-[220px] ${isTall ? 'sm:min-h-[460px]' : 'sm:min-h-[220px]'}
                    cursor-pointer overflow-hidden
                    transition-all duration-500
                    hover:scale-[1.03] hover:z-10 hover:shadow-2xl
                  `}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationFillMode: 'both',
                  }}
                >
                  {/* Geometric hover overlay */}
                  <div className="absolute inset-0 bg-dc-navy/0 group-hover:bg-dc-navy/20 transition-colors duration-500" />

                  {/* Geometric accent shapes */}
                  <svg className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500" viewBox="0 0 128 128" fill="currentColor">
                    <circle cx="128" cy="0" r="80" />
                  </svg>

                  <div className="relative z-10">
                    <ServiceIcon icon={service.icon} className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  <p className="relative z-10 mt-4 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-90 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    {service.description}
                  </p>

                  {/* Bottom geometric bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. ABOUT SECTION — Diagonal split                           */}
      {/* ============================================================ */}
      <section ref={aboutRef.ref} className="relative overflow-hidden">
        {/* Diagonal background split */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-dc-teal" />
          <div
            className="absolute inset-0 bg-dc-navy"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 40% 100%)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text side */}
            <div className={`${aboutRef.isInView ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <span className="text-dc-gold font-black text-sm uppercase tracking-[0.3em]">
                Our Story
              </span>
              <h2 className="mt-4 text-white text-5xl sm:text-6xl md:text-7xl font-black leading-[0.9] tracking-tighter">
                TWO FRIENDS.
                <br />
                ONE VISION.
              </h2>

              <div className="mt-8 pl-6 border-l-4 border-dc-gold">
                <p className="text-white/90 text-lg md:text-xl leading-relaxed font-medium">
                  {COMPANY.story}
                </p>
              </div>

              <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed">
                {COMPANY.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                {COMPANY.founders.map((name) => (
                  <div key={name} className="bg-white/10 backdrop-blur-sm px-6 py-3 border border-white/20">
                    <span className="text-white font-bold text-sm uppercase tracking-wider">{name}</span>
                    <span className="text-dc-gold text-xs block mt-0.5">Co-Founder</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Geometric art side */}
            <div className={`flex justify-center ${aboutRef.isInView ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <svg className="w-full max-w-md" viewBox="0 0 400 500" fill="none">
                {/* Large rust rectangle */}
                <rect x="80" y="20" width="240" height="300" fill="#d35400" />
                {/* Overlapping gold rectangle */}
                <rect x="40" y="140" width="200" height="200" fill="#c9a84c" opacity="0.85" />
                {/* Teal circle */}
                <circle cx="300" cy="360" r="100" fill="#2d6a6f" opacity="0.9" />
                {/* White geometric accent */}
                <rect x="160" y="80" width="80" height="80" fill="white" opacity="0.2" />
                {/* Navy accent bar */}
                <rect x="60" y="400" width="160" height="16" fill="#1a2332" />
                <rect x="60" y="424" width="100" height="16" fill="#1a2332" opacity="0.6" />
                {/* Thin cross lines */}
                <line x1="0" y1="250" x2="400" y2="250" stroke="white" strokeWidth="1" opacity="0.15" />
                <line x1="200" y1="0" x2="200" y2="500" stroke="white" strokeWidth="1" opacity="0.15" />
                {/* Small accent dots */}
                <circle cx="340" cy="60" r="6" fill="white" opacity="0.3" />
                <circle cx="360" cy="60" r="6" fill="white" opacity="0.3" />
                <circle cx="340" cy="80" r="6" fill="white" opacity="0.3" />
                <circle cx="360" cy="80" r="6" fill="white" opacity="0.3" />
                {/* Year text */}
                <text x="100" y="470" fill="white" opacity="0.5" fontFamily="sans-serif" fontWeight="900" fontSize="48">
                  {COMPANY.founded}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. STATS BAR — Color-block dividers                         */}
      {/* ============================================================ */}
      <section className="flex flex-wrap">
        {STATS.map((stat, i) => (
          <StatCounter
            key={stat.label}
            value={stat.value}
            label={stat.label}
            color={statColors[i % statColors.length]}
          />
        ))}
      </section>

      {/* ============================================================ */}
      {/*  5. AWARDS — Scattered color cards                           */}
      {/* ============================================================ */}
      <section ref={awardsRef.ref} className="relative bg-dc-cream py-24 md:py-32 lg:py-40 overflow-hidden">
        {/* Background geometric accents */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.04]" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="200" r="300" fill="#1a2332" />
          <rect x="800" y="400" width="400" height="400" fill="#d35400" />
          <circle cx="1000" cy="200" r="150" fill="#2d6a6f" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className={`mb-16 md:mb-20 ${awardsRef.isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-dc-navy text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter">
              AWARD
              <br />
              WINNING
            </h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="w-20 h-2 bg-dc-gold" />
              <div className="w-10 h-2 bg-dc-rust" />
              <div className="w-6 h-2 bg-dc-teal" />
            </div>
          </div>

          {/* Scattered cards layout */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {AWARDS.map((award, i) => {
              const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
              const offsets = ['lg:mt-0', 'lg:mt-12', 'lg:-mt-4', 'lg:mt-8'];
              return (
                <div
                  key={award.title}
                  className={`
                    group ${awardColors[i % awardColors.length]} ${awardTextColors[i % awardTextColors.length]}
                    p-8 md:p-10
                    ${rotations[i % rotations.length]} ${offsets[i % offsets.length]}
                    hover:rotate-0 hover:scale-105
                    transition-all duration-500 cursor-pointer
                    shadow-lg hover:shadow-2xl
                  `}
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animationFillMode: 'both',
                  }}
                >
                  {/* Trophy geometric icon */}
                  <svg className="w-10 h-10 mb-6 opacity-60" viewBox="0 0 40 40" fill="currentColor">
                    <rect x="12" y="4" width="16" height="20" rx="2" />
                    <rect x="16" y="24" width="8" height="6" />
                    <rect x="10" y="30" width="20" height="4" rx="1" />
                    <rect x="4" y="6" width="8" height="10" rx="4" opacity="0.5" />
                    <rect x="28" y="6" width="8" height="10" rx="4" opacity="0.5" />
                  </svg>

                  <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight">
                    {award.title}
                  </h3>
                  <p className="mt-2 text-lg font-bold opacity-80">
                    {award.source}
                  </p>
                  {award.year && (
                    <span className="inline-block mt-3 px-3 py-1 bg-white/20 text-sm font-bold uppercase tracking-wider">
                      {award.year}
                    </span>
                  )}

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 group-hover:w-12 group-hover:h-12 transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. TESTIMONIALS — Large color blocks                        */}
      {/* ============================================================ */}
      <section>
        {TESTIMONIALS.map((testimonial, i) => {
          const tRef = testimonialRefs[i % testimonialRefs.length];
          const isEven = i % 2 === 0;
          return (
            <div
              key={testimonial.author}
              ref={tRef.ref}
              className={`
                relative ${testimonialColors[i % testimonialColors.length]}
                min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden
              `}
            >
              {/* Geometric background elements */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 600" fill="white" preserveAspectRatio="xMidYMid slice">
                {isEven ? (
                  <>
                    <circle cx="1000" cy="300" r="250" />
                    <rect x="50" y="50" width="200" height="200" />
                  </>
                ) : (
                  <>
                    <circle cx="200" cy="300" r="250" />
                    <rect x="900" y="350" width="250" height="250" />
                  </>
                )}
              </svg>

              <div className={`
                relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28
                ${tRef.isInView ? 'animate-fade-in-up' : 'opacity-0'}
              `}>
                {/* Oversized quote mark */}
                <svg className={`w-20 h-20 md:w-28 md:h-28 ${testimonialTextColors[i % testimonialTextColors.length]} opacity-30 mb-4`} viewBox="0 0 100 100" fill="currentColor">
                  <path d="M20 60C20 44 30 30 48 24L50 30C38 36 34 44 34 50H46V76H20V60ZM56 60C56 44 66 30 84 24L86 30C74 36 70 44 70 50H82V76H56V60Z" />
                </svg>

                <blockquote className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight ${testimonialTextColors[i % testimonialTextColors.length]}`}>
                  {testimonial.text}
                </blockquote>

                {/* Author strip */}
                <div className={`inline-flex items-center mt-10 ${testimonialAccentColors[i % testimonialAccentColors.length]} px-8 py-4`}>
                  <div>
                    <span className={`block text-lg md:text-xl font-black uppercase tracking-wider ${testimonialAccentTextColors[i % testimonialAccentTextColors.length]}`}>
                      {testimonial.author}
                    </span>
                    <span className={`block text-sm font-bold ${testimonialAccentTextColors[i % testimonialAccentTextColors.length]} opacity-70`}>
                      {testimonial.location}
                    </span>
                  </div>
                  {/* Star rating */}
                  <div className="ml-6 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, si) => (
                      <svg key={si} className={`w-5 h-5 ${testimonialAccentTextColors[i % testimonialAccentTextColors.length]}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ============================================================ */}
      {/*  7. VALUES GRID — Interlocking color blocks                  */}
      {/* ============================================================ */}
      <section ref={valuesRef.ref} className="relative bg-white py-24 md:py-32 lg:py-40 overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-dc-cream/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Section title */}
          <div className={`mb-16 md:mb-20 ${valuesRef.isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-dc-navy text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter">
              OUR
              <br />
              VALUES
            </h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="w-20 h-2 bg-dc-teal" />
              <div className="w-10 h-2 bg-dc-gold" />
              <div className="w-6 h-2 bg-dc-rust" />
            </div>
          </div>

          {/* Interlocking grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {VALUES.map((value, i) => {
              const offsets = [
                'lg:translate-x-0 lg:translate-y-0',
                'lg:translate-x-4 lg:-translate-y-4',
                'lg:-translate-x-2 lg:translate-y-2',
                'lg:translate-x-6 lg:translate-y-4',
                'lg:-translate-x-4 lg:-translate-y-2',
                'lg:translate-x-2 lg:translate-y-6',
              ];

              return (
                <div
                  key={value}
                  className={`
                    group relative ${valueColors[i % valueColors.length]} ${valueTextColors[i % valueTextColors.length]}
                    ${offsets[i % offsets.length]}
                    p-10 md:p-12 min-h-[180px] md:min-h-[220px]
                    flex flex-col justify-center
                    cursor-pointer
                    transition-all duration-500
                    hover:scale-105 hover:z-10 hover:shadow-2xl
                    border-2 border-white
                  `}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationFillMode: 'both',
                  }}
                >
                  {/* Geometric border accent — top right */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white/30 group-hover:w-20 group-hover:h-20 transition-all duration-500" />
                  {/* Bottom left */}
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white/30 group-hover:w-20 group-hover:h-20 transition-all duration-500" />

                  <span className="text-5xl md:text-6xl font-black opacity-15 absolute top-4 right-6 leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Geometric icon per value */}
                  <svg className="w-8 h-8 mb-4 opacity-50" viewBox="0 0 32 32" fill="currentColor">
                    {i === 0 && <rect x="4" y="4" width="24" height="24" rx="2" />}
                    {i === 1 && <circle cx="16" cy="16" r="12" />}
                    {i === 2 && <polygon points="16,2 30,28 2,28" />}
                    {i === 3 && <path d="M16 2L20 12H30L22 18L25 28L16 22L7 28L10 18L2 12H12Z" />}
                    {i === 4 && <><rect x="4" y="4" width="10" height="10" /><rect x="18" y="18" width="10" height="10" /><rect x="4" y="18" width="10" height="10" opacity="0.5" /><rect x="18" y="4" width="10" height="10" opacity="0.5" /></>}
                    {i === 5 && <><circle cx="16" cy="10" r="8" /><rect x="4" y="20" width="24" height="10" rx="5" /></>}
                  </svg>

                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                    {value}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. CTA SECTION — Diagonal split, enormous text              */}
      {/* ============================================================ */}
      <section ref={ctaRef.ref} className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
        {/* Diagonal background split */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-dc-rust" />
          <div
            className="absolute inset-0 bg-dc-navy"
            style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 30% 100%)' }}
          />
        </div>

        {/* Geometric accent shapes */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 1200 600" fill="white" preserveAspectRatio="xMidYMid slice">
          <circle cx="300" cy="300" r="200" />
          <rect x="700" y="100" width="300" height="300" />
          <circle cx="900" cy="500" r="120" />
        </svg>

        <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 ${ctaRef.isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.85] tracking-tighter">
            LET&apos;S ADD
            <br />
            SOME
            <br />
            <span className="text-dc-gold">COLOR</span>
          </h2>

          <p className="mt-8 text-white/70 text-xl md:text-2xl font-semibold max-w-xl">
            Ready to transform your space? Get in touch for a free consultation and quote.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-start gap-6">
            {/* Phone block */}
            <div className="bg-dc-gold px-10 py-6">
              <span className="block text-dc-navy text-sm font-bold uppercase tracking-[0.2em]">Call Us Today</span>
              <a href={`tel:${COMPANY.phone}`} className="block text-dc-navy text-3xl md:text-4xl font-black tracking-tight hover:text-dc-rust transition-colors duration-300">
                {COMPANY.phone}
              </a>
            </div>

            {/* CTA Button */}
            <a
              href={`tel:${COMPANY.phone}`}
              className="group relative inline-flex items-center px-12 py-6 bg-white text-dc-navy font-black text-lg uppercase tracking-wider overflow-hidden transition-all duration-300 hover:bg-dc-teal hover:text-white"
            >
              <span className="absolute bottom-0 left-0 w-full h-1 bg-dc-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="relative z-10">Get Your Free Quote</span>
              <svg className="relative z-10 ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  9. FOOTER — Geometric patterned                             */}
      {/* ============================================================ */}
      <footer ref={footerRef.ref} className="relative bg-dc-deep text-white overflow-hidden">
        {/* Geometric pattern background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1200 600" fill="white" preserveAspectRatio="xMidYMid slice">
          {/* Grid of small rectangles */}
          {Array.from({ length: 12 }).map((_, row) =>
            Array.from({ length: 20 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={col * 62}
                y={row * 52}
                width={((row + col) % 3 === 0) ? 40 : 20}
                height={((row + col) % 3 === 0) ? 40 : 20}
                opacity={(row + col) % 2 === 0 ? 1 : 0.4}
              />
            ))
          )}
        </svg>

        <div className="relative z-10">
          {/* Color strip top */}
          <div className="flex h-2">
            <div className="flex-1 bg-dc-rust" />
            <div className="flex-1 bg-dc-gold" />
            <div className="flex-1 bg-dc-teal" />
            <div className="flex-1 bg-dc-sage" />
            <div className="flex-1 bg-dc-copper" />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 ${footerRef.isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
              {/* Brand block */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  {/* Geometric logo mark */}
                  <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
                    <rect x="2" y="2" width="16" height="16" fill="#d35400" />
                    <rect x="22" y="2" width="16" height="16" fill="#c9a84c" />
                    <rect x="2" y="22" width="16" height="16" fill="#2d6a6f" />
                    <rect x="22" y="22" width="16" height="16" fill="#1a2332" />
                  </svg>
                  <span className="text-xl font-black uppercase tracking-tight">{COMPANY.name}</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  {COMPANY.description}
                </p>
              </div>

              {/* Services block */}
              <div className="bg-white/5 p-6 -m-2">
                <h4 className="text-dc-gold font-black text-sm uppercase tracking-[0.2em] mb-5">
                  Services
                </h4>
                <ul className="space-y-2.5">
                  {SERVICES.slice(0, 6).map((service) => (
                    <li key={service.title}>
                      <span className="text-white/60 hover:text-white text-sm font-medium cursor-pointer transition-colors duration-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-dc-rust inline-block flex-shrink-0" />
                        {service.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Awards block */}
              <div className="bg-white/5 p-6 -m-2">
                <h4 className="text-dc-rust font-black text-sm uppercase tracking-[0.2em] mb-5">
                  Awards
                </h4>
                <ul className="space-y-3">
                  {AWARDS.map((award) => (
                    <li key={award.title} className="text-white/60 text-sm">
                      <span className="block font-bold text-white/80">{award.title}</span>
                      <span className="text-xs">{award.source} {award.year && `\u2022 ${award.year}`}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact block */}
              <div className="bg-dc-rust p-6 -m-2">
                <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-5">
                  Get In Touch
                </h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-white/60 text-xs uppercase tracking-wider block mb-1">Phone</span>
                    <a href={`tel:${COMPANY.phone}`} className="text-white font-bold text-lg hover:text-dc-gold transition-colors duration-300">
                      {COMPANY.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-white/60 text-xs uppercase tracking-wider block mb-1">Location</span>
                    <span className="text-white font-bold">{COMPANY.location}</span>
                  </div>
                  <div>
                    <span className="text-white/60 text-xs uppercase tracking-wider block mb-1">Service Area</span>
                    <span className="text-white font-bold">{COMPANY.serviceArea}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm">
                &copy; {new Date().getFullYear()} {COMPANY.fullName} All rights reserved.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-dc-rust" />
                <span className="w-3 h-3 bg-dc-gold" />
                <span className="w-3 h-3 bg-dc-teal" />
                <span className="w-3 h-3 bg-dc-navy" />
                <span className="w-3 h-3 bg-dc-sage" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
