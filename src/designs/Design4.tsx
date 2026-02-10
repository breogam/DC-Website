import { useState, useEffect, useRef } from 'react';
import { COMPANY, SERVICES, AWARDS, VALUES, TESTIMONIALS, STATS } from '../data';
import { useInView, useParallax, useCountUp, useScrollProgress } from '../hooks';

/* ------------------------------------------------------------------ */
/*  SVG Icon helper for services                                       */
/* ------------------------------------------------------------------ */
function ServiceIcon({ icon, className = '' }: { icon: string; className?: string }) {
  const base = `w-12 h-12 ${className}`;
  switch (icon) {
    case 'interior':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="6" width="36" height="36" rx="3" />
          <path d="M6 18h36" />
          <path d="M18 18v24" />
          <circle cx="30" cy="30" r="5" />
        </svg>
      );
    case 'exterior':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 24L24 6l20 18" />
          <rect x="10" y="24" width="28" height="18" />
          <rect x="18" y="30" width="12" height="12" />
          <path d="M24 24v-6" />
        </svg>
      );
    case 'cabinet':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="8" width="36" height="32" rx="2" />
          <path d="M24 8v32" />
          <path d="M6 24h36" />
          <circle cx="18" cy="16" r="1.5" fill="currentColor" />
          <circle cx="30" cy="16" r="1.5" fill="currentColor" />
          <circle cx="18" cy="32" r="1.5" fill="currentColor" />
          <circle cx="30" cy="32" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'restoration':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 38V14l12-8 12 8v24" />
          <path d="M8 42h32" />
          <rect x="18" y="22" width="12" height="16" rx="1" />
          <path d="M20 18h8" />
          <path d="M16 14h16" />
        </svg>
      );
    case 'faux':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 40L20 8h8l12 32" />
          <path d="M14 28h20" />
          <circle cx="24" cy="18" r="3" />
          <path d="M10 36h28" strokeDasharray="4 3" />
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
          <path d="M4 22h40" />
          <path d="M8 22v18" />
          <path d="M40 22v18" />
          <path d="M4 28h40" />
          <path d="M4 34h40" />
          <path d="M16 22V8" />
          <path d="M32 22V8" />
          <path d="M12 8h24" />
        </svg>
      );
    case 'drywall':
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="6" width="36" height="36" rx="2" />
          <path d="M6 24h14l4-4 4 4h14" />
          <path d="M16 16l4 4" />
          <path d="M28 16l-4 4" />
          <path d="M22 34h4" />
        </svg>
      );
    default:
      return (
        <svg className={base} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="24" cy="24" r="18" />
          <path d="M24 14v20M14 24h20" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Helper: parse the numeric portion of a stat value                  */
/* ------------------------------------------------------------------ */
function parseStatNumber(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

function formatStatValue(original: string, count: number): string {
  if (original.includes(',')) {
    const formatted = count.toLocaleString();
    if (original.endsWith('+')) return formatted + '+';
    if (original.endsWith('%')) return formatted + '%';
    return formatted;
  }
  if (original.endsWith('+')) return count + '+';
  if (original.endsWith('%')) return count + '%';
  if (original.includes('.')) return count.toFixed(1);
  return String(count);
}

/* ------------------------------------------------------------------ */
/*  Stat Item with counting animation                                  */
/* ------------------------------------------------------------------ */
function StatItem({ value, label, inView }: { value: string; label: string; inView: boolean }) {
  const numericEnd = parseStatNumber(value);
  const isDecimal = value.includes('.');
  const { count, activate } = useCountUp(
    isDecimal ? Math.round(numericEnd * 10) : numericEnd,
    2200,
    0
  );

  useEffect(() => {
    if (inView) activate();
  }, [inView, activate]);

  const display = isDecimal
    ? (count / 10).toFixed(1) + (value.endsWith('+') ? '+' : '')
    : formatStatValue(value, count);

  return (
    <div className="text-center">
      <div className="text-5xl md:text-7xl font-bold mb-2">{display}</div>
      <div className="text-lg md:text-xl opacity-80">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Design4: "Immersive"                                               */
/* ------------------------------------------------------------------ */
export default function Design4() {
  /* ---- hooks ---- */
  const parallaxSlow = useParallax(0.08);
  const parallaxMed = useParallax(0.15);
  const parallaxFast = useParallax(0.25);
  const scrollProgress = useScrollProgress();

  const heroView = useInView(0.1);
  const storyView = useInView(0.15);
  const servicesView = useInView(0.1);
  const statsView = useInView(0.2);
  const testimonialsView = useInView(0.1);
  const awardsView = useInView(0.15);
  const valuesView = useInView(0.15);
  const ctaView = useInView(0.1);

  /* ---- testimonial carousel ---- */
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialFade, setTestimonialFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialFade(false);
      setTimeout(() => {
        setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
        setTestimonialFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ---- services horizontal scroll ---- */
  const servicesScrollRef = useRef<HTMLDivElement>(null);

  const handleServicesWheel = (e: React.WheelEvent) => {
    if (servicesScrollRef.current) {
      e.preventDefault();
      servicesScrollRef.current.scrollLeft += e.deltaY;
    }
  };

  /* ---- progress bar ---- */
  const progressWidth = `${scrollProgress * 100}%`;

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */
  return (
    <div className="relative bg-dc-charcoal text-white overflow-x-hidden">
      {/* ---- Scroll progress bar ---- */}
      <div className="fixed top-0 left-0 z-50 h-[3px] bg-gradient-to-r from-dc-copper to-dc-rust transition-all duration-100" style={{ width: progressWidth }} />

      {/* ============================================================ */}
      {/*  1. HERO                                                      */}
      {/* ============================================================ */}
      <section
        ref={heroView.ref}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #2d3436 0%, #1a1e1f 50%, #2d3436 100%)' }}
      >
        {/* Animated background lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-dc-copper/5"
              style={{
                width: '1px',
                height: '120%',
                left: `${5 + i * 5}%`,
                top: '-10%',
                transform: `translateY(${parallaxSlow * (i % 3 === 0 ? 1 : -0.5)}px) rotate(${2 + i * 0.3}deg)`,
                transition: 'transform 0.1s linear',
              }}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute bg-dc-rust/[0.03]"
              style={{
                height: '1px',
                width: '120%',
                top: `${8 + i * 8}%`,
                left: '-10%',
                transform: `translateX(${parallaxSlow * (i % 2 === 0 ? 0.5 : -0.3)}px)`,
                transition: 'transform 0.1s linear',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${heroView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Tagline */}
          <p className="text-dc-copper tracking-[0.35em] uppercase text-sm md:text-base mb-8 font-medium animate-fade-in">
            {COMPANY.fullName}
          </p>

          {/* Massive headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-[0.9] mb-8">
            <span className="bg-gradient-to-r from-dc-copper via-dc-rust to-dc-copper bg-clip-text text-transparent">
              Every Surface
            </span>
            <br />
            <span className="text-white/90">Tells a Story</span>
          </h1>

          {/* Animated brush stroke SVG */}
          <div className="my-10 flex justify-center">
            <svg width="320" height="32" viewBox="0 0 320 32" fill="none" className="opacity-60">
              <path
                d="M4 20C40 8 80 26 120 16C160 6 200 28 240 14C280 2 310 22 316 16"
                stroke="url(#brushGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="400"
                strokeDashoffset="0"
                className="animate-fade-in"
                style={{ animationDelay: '0.5s' }}
              />
              <path
                d="M8 24C48 12 88 28 128 20C168 10 208 30 248 18C288 6 312 24 318 20"
                stroke="url(#brushGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.4"
              />
              <defs>
                <linearGradient id="brushGrad" x1="0" y1="0" x2="320" y2="0">
                  <stop offset="0%" stopColor="#b87333" />
                  <stop offset="50%" stopColor="#d35400" />
                  <stop offset="100%" stopColor="#b87333" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            {COMPANY.description}
          </p>

          {/* CTA button */}
          <a
            href={`tel:${COMPANY.phone}`}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-dc-copper to-dc-rust text-white font-semibold text-lg rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(184,115,51,0.4)] animate-pulse-glow"
          >
            <span className="relative z-10">Start Your Transformation</span>
            <svg className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-dc-rust to-dc-copper opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-float">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="10" cy="9" r="2" fill="currentColor" className="animate-float" />
          </svg>
        </div>
      </section>

      {/* ---- Brush stroke divider ---- */}
      <div className="relative h-16 md:h-24 bg-dc-cream -mb-1">
        <svg className="absolute bottom-full left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,80 C180,20 360,60 540,30 C720,0 900,50 1080,20 C1260,-10 1350,40 1440,30 L1440,80 Z" fill="#f5f0e8" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/*  2. STORY SECTION                                             */}
      {/* ============================================================ */}
      <section
        ref={storyView.ref}
        className="relative min-h-screen flex items-center bg-dc-cream overflow-hidden"
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className={`transition-all duration-1000 delay-200 ${storyView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <p className="text-dc-copper tracking-[0.3em] uppercase text-sm font-semibold mb-4">Our Story</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dc-charcoal leading-tight mb-8">
              Two Friends,<br />
              <span className="bg-gradient-to-r from-dc-copper to-dc-rust bg-clip-text text-transparent">
                One Vision
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-dc-charcoal/70 leading-relaxed mb-6">
              {COMPANY.story}
            </p>
            <div className="flex flex-wrap gap-8 mt-10">
              <div>
                <div className="text-3xl font-bold text-dc-copper">Est. {COMPANY.founded}</div>
                <div className="text-dc-charcoal/60 text-sm mt-1">{COMPANY.location}</div>
              </div>
              <div className="w-px bg-dc-copper/30" />
              <div>
                <div className="text-lg font-semibold text-dc-charcoal">Founded by</div>
                <div className="text-dc-charcoal/70 text-sm mt-1">
                  {COMPANY.founders.join(' & ')}
                </div>
              </div>
              <div className="w-px bg-dc-copper/30" />
              <div>
                <div className="text-lg font-semibold text-dc-charcoal">Serving</div>
                <div className="text-dc-charcoal/70 text-sm mt-1">{COMPANY.serviceArea}</div>
              </div>
            </div>
          </div>

          {/* Right: Artistic SVG composition with parallax */}
          <div className={`relative flex items-center justify-center min-h-[400px] lg:min-h-[500px] transition-all duration-1000 delay-500 ${storyView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            {/* Large paint brush */}
            <svg
              className="absolute w-64 h-64 md:w-80 md:h-80 text-dc-copper/20"
              viewBox="0 0 200 200"
              fill="currentColor"
              style={{ transform: `translateY(${parallaxMed * -0.5}px)` }}
            >
              <path d="M60 180c0-10 10-20 20-30l40-60c10-15 30-50 40-65 5-8 15-15 20-10 6 6 0 16-8 22l-60 45-35 55c-10 15-17 30-17 43z" />
              <ellipse cx="68" cy="185" rx="20" ry="8" opacity="0.3" />
            </svg>

            {/* Color swatches */}
            <div
              className="absolute top-8 right-8 md:top-12 md:right-12"
              style={{ transform: `translateY(${parallaxFast * -0.3}px)` }}
            >
              <div className="flex gap-2 rotate-12">
                <div className="w-12 h-16 rounded-md bg-dc-copper shadow-lg" />
                <div className="w-12 h-16 rounded-md bg-dc-rust shadow-lg -mt-2" />
                <div className="w-12 h-16 rounded-md bg-dc-charcoal shadow-lg -mt-4" />
              </div>
            </div>

            {/* Paint roller SVG */}
            <svg
              className="absolute bottom-12 left-4 md:left-12 w-40 h-40 text-dc-rust/25"
              viewBox="0 0 120 120"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              style={{ transform: `translateY(${parallaxSlow * 0.4}px) rotate(-15deg)` }}
            >
              <rect x="10" y="20" width="60" height="24" rx="12" />
              <line x1="70" y1="32" x2="100" y2="32" />
              <line x1="100" y1="32" x2="100" y2="80" />
              <rect x="90" y="80" width="20" height="30" rx="4" />
            </svg>

            {/* Decorative circles */}
            <svg
              className="absolute w-full h-full"
              viewBox="0 0 400 400"
              fill="none"
              style={{ transform: `translateY(${parallaxSlow * -0.2}px)` }}
            >
              <circle cx="200" cy="200" r="140" stroke="#b87333" strokeWidth="1" opacity="0.15" strokeDasharray="8 6" />
              <circle cx="200" cy="200" r="100" stroke="#d35400" strokeWidth="1" opacity="0.12" strokeDasharray="4 8" />
              <circle cx="200" cy="200" r="60" stroke="#b87333" strokeWidth="1.5" opacity="0.1" />
            </svg>

            {/* Paint drip accent */}
            <svg
              className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-32 text-dc-copper/15"
              viewBox="0 0 60 80"
              fill="currentColor"
              style={{ transform: `translateY(${parallaxFast * -0.15}px) translateX(-50%)` }}
            >
              <path d="M10 0h40v40c0 0-5 15-10 25-3 6-8 12-10 15-2-3-7-9-10-15C15 55 10 40 10 40V0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* ---- Brush stroke divider ---- */}
      <div className="relative h-16 md:h-24 bg-dc-charcoal -mb-1">
        <svg className="absolute bottom-full left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,80 C120,50 240,10 480,40 C720,70 960,10 1200,40 C1320,55 1380,30 1440,50 L1440,80 Z" fill="#2d3436" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/*  3. SERVICES SHOWCASE                                         */}
      {/* ============================================================ */}
      <section
        ref={servicesView.ref}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #2d3436 0%, #1a1e1f 100%)' }}
      >
        <div className="px-6 md:px-12 py-20">
          <div className={`max-w-7xl mx-auto mb-12 transition-all duration-1000 ${servicesView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-dc-copper tracking-[0.3em] uppercase text-sm font-semibold mb-4">What We Do</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Craftsmanship in
              <span className="bg-gradient-to-r from-dc-copper to-dc-rust bg-clip-text text-transparent"> Every Stroke</span>
            </h2>
            <p className="mt-4 text-white/40 text-sm tracking-wider">Scroll horizontally to explore our services</p>
          </div>

          {/* Horizontal scroll container */}
          <div
            ref={servicesScrollRef}
            onWheel={handleServicesWheel}
            className="flex gap-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`group flex-shrink-0 w-72 md:w-80 snap-center rounded-2xl p-8 transition-all duration-700 cursor-pointer hover:scale-[1.03] hover:-translate-y-2 ${
                  servicesView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  background: `linear-gradient(135deg, rgba(184,115,51,${0.12 + i * 0.02}) 0%, rgba(211,84,0,${0.08 + i * 0.015}) 100%)`,
                  border: '1px solid rgba(184,115,51,0.15)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="mb-6 text-dc-copper transition-colors duration-300 group-hover:text-dc-rust">
                  <ServiceIcon icon={service.icon} className="w-14 h-14" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-dc-copper transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/50 leading-relaxed text-sm group-hover:text-white/70 transition-colors duration-300">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-dc-copper/60 group-hover:text-dc-copper transition-all duration-300 group-hover:gap-3">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. STATS SECTION  (Split screen)                             */}
      {/* ============================================================ */}
      <section
        ref={statsView.ref}
        className="relative min-h-screen flex items-stretch overflow-hidden"
      >
        {/* Left half: copper */}
        <div className="hidden md:flex w-1/2 bg-dc-copper items-center justify-center relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 400 800" fill="none">
              {Array.from({ length: 8 }).map((_, i) => (
                <circle
                  key={i}
                  cx={200 + (i % 3 - 1) * 80}
                  cy={100 + i * 90}
                  r={30 + i * 5}
                  stroke="white"
                  strokeWidth="1"
                  opacity={0.3 + i * 0.05}
                />
              ))}
            </svg>
          </div>

          <div className={`relative z-10 p-12 space-y-16 transition-all duration-1000 ${statsView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {STATS.slice(0, 2).map((stat) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} inView={statsView.isInView} />
            ))}
          </div>
        </div>

        {/* Right half: cream */}
        <div className="w-full md:w-1/2 bg-dc-cream flex items-center justify-center relative overflow-hidden">
          {/* Decorative dots */}
          <div className="absolute inset-0 opacity-[0.04]">
            <svg className="w-full h-full" viewBox="0 0 400 800">
              {Array.from({ length: 200 }).map((_, i) => (
                <circle
                  key={i}
                  cx={(i % 20) * 22 + 10}
                  cy={Math.floor(i / 20) * 22 + 10}
                  r="2"
                  fill="#2d3436"
                />
              ))}
            </svg>
          </div>

          <div className={`relative z-10 p-12 transition-all duration-1000 delay-300 ${statsView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {/* Mobile: show all stats, Desktop: show remaining */}
            <div className="space-y-16">
              <div className="md:hidden space-y-16">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-dc-charcoal">
                    <StatItem value={stat.value} label={stat.label} inView={statsView.isInView} />
                  </div>
                ))}
              </div>
              <div className="hidden md:block space-y-16 text-dc-charcoal">
                {STATS.slice(2).map((stat) => (
                  <StatItem key={stat.label} value={stat.value} label={stat.label} inView={statsView.isInView} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center divider accent */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-20 h-20 rounded-full bg-dc-charcoal flex items-center justify-center shadow-2xl">
            <svg className="w-8 h-8 text-dc-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
        </div>
      </section>

      {/* ---- Brush stroke divider ---- */}
      <div className="relative h-16 md:h-24 bg-dc-charcoal -mb-1">
        <svg className="absolute bottom-full left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,80 C200,40 400,70 600,30 C800,0 1000,60 1200,30 C1350,10 1400,50 1440,40 L1440,80 Z" fill="#2d3436" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/*  5. TESTIMONIALS                                              */}
      {/* ============================================================ */}
      <section
        ref={testimonialsView.ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a1e1f 0%, #2d3436 40%, #1a1e1f 100%)' }}
      >
        {/* Background decorative quotes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute top-12 left-8 w-48 h-48 md:w-72 md:h-72 text-dc-copper/[0.04]"
            viewBox="0 0 100 100"
            fill="currentColor"
            style={{ transform: `translateY(${parallaxSlow * 0.2}px)` }}
          >
            <path d="M20 65c0-15 12-35 30-45l5 8c-12 8-18 18-18 28h15v25H20V65zm40 0c0-15 12-35 30-45l5 8c-12 8-18 18-18 28h15v25H60V65z" />
          </svg>
          <svg
            className="absolute bottom-12 right-8 w-48 h-48 md:w-72 md:h-72 text-dc-rust/[0.04] rotate-180"
            viewBox="0 0 100 100"
            fill="currentColor"
            style={{ transform: `translateY(${parallaxSlow * -0.15}px)` }}
          >
            <path d="M20 65c0-15 12-35 30-45l5 8c-12 8-18 18-18 28h15v25H20V65zm40 0c0-15 12-35 30-45l5 8c-12 8-18 18-18 28h15v25H60V65z" />
          </svg>
        </div>

        <div className={`relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center transition-all duration-1000 ${testimonialsView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-dc-copper tracking-[0.3em] uppercase text-sm font-semibold mb-12">Testimonials</p>

          {/* Testimonial content */}
          <div className="min-h-[280px] flex flex-col items-center justify-center">
            <div
              className="transition-all duration-500"
              style={{
                opacity: testimonialFade ? 1 : 0,
                transform: testimonialFade ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
              }}
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-dc-copper" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-white/90 leading-snug mb-10">
                &ldquo;{TESTIMONIALS[activeTestimonial].text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-dc-copper font-semibold text-lg">
                  {TESTIMONIALS[activeTestimonial].author}
                </span>
                <span className="text-white/40 text-sm">
                  {TESTIMONIALS[activeTestimonial].location}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setTestimonialFade(false);
                  setTimeout(() => {
                    setActiveTestimonial(i);
                    setTestimonialFade(true);
                  }, 400);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === activeTestimonial
                    ? 'bg-dc-copper w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---- Brush stroke divider ---- */}
      <div className="relative h-16 md:h-24 -mb-1" style={{ background: 'linear-gradient(135deg, #b87333 0%, #d35400 50%, #b87333 100%)' }}>
        <svg className="absolute bottom-full left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,80 C160,30 320,70 480,40 C640,10 800,60 960,30 C1120,0 1280,50 1440,30 L1440,80 Z" fill="#b87333" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/*  6. AWARDS                                                    */}
      {/* ============================================================ */}
      <section
        ref={awardsView.ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #b87333 0%, #d35400 50%, #b87333 100%)' }}
      >
        {/* Soft overlay pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 800" fill="none">
            {Array.from({ length: 6 }).map((_, i) => (
              <circle
                key={i}
                cx={400 + Math.cos((i / 6) * Math.PI * 2) * 250}
                cy={400 + Math.sin((i / 6) * Math.PI * 2) * 250}
                r="120"
                stroke="white"
                strokeWidth="0.5"
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20 text-center">
          <p className={`tracking-[0.3em] uppercase text-sm font-semibold mb-4 text-white/80 transition-all duration-700 ${awardsView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Recognition
          </p>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-16 transition-all duration-1000 ${awardsView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Award-Winning<br />Excellence
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {AWARDS.map((award, i) => (
              <div
                key={award.title}
                className={`group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-700 hover:bg-white/20 hover:-translate-y-3 hover:shadow-2xl hover:rotate-1 cursor-default ${
                  awardsView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
                style={{ transitionDelay: `${300 + i * 150}ms` }}
              >
                {/* Trophy icon */}
                <div className="mx-auto w-16 h-16 mb-6 relative">
                  <svg className="w-16 h-16 text-white/90 group-hover:text-white transition-colors duration-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8h28v4c0 12-6 24-14 28-8-4-14-16-14-28V8z" />
                    <path d="M18 14H10c0 8 4 14 8 16" />
                    <path d="M46 14h8c0 8-4 14-8 16" />
                    <rect x="26" y="40" width="12" height="6" rx="1" />
                    <rect x="22" y="46" width="20" height="4" rx="2" />
                    <circle cx="32" cy="22" r="5" strokeWidth="1.5" />
                  </svg>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 blur-xl transition-all duration-500" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                  {award.title}
                </h3>
                <p className="text-white/70 font-medium mb-1">{award.source}</p>
                {award.year && (
                  <p className="text-white/50 text-sm">{award.year}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Brush stroke divider ---- */}
      <div className="relative h-16 md:h-24 bg-dc-cream -mb-1">
        <svg className="absolute bottom-full left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,80 C240,20 480,70 720,30 C960,-10 1200,50 1440,30 L1440,80 Z" fill="#f5f0e8" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/*  7. VALUES  (Radial arrangement)                              */}
      {/* ============================================================ */}
      <section
        ref={valuesView.ref}
        className="relative min-h-screen flex items-center justify-center bg-dc-cream overflow-hidden"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className={`text-center mb-16 transition-all duration-1000 ${valuesView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-dc-copper tracking-[0.3em] uppercase text-sm font-semibold mb-4">Our Foundation</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dc-charcoal leading-tight">
              Values That
              <span className="bg-gradient-to-r from-dc-copper to-dc-rust bg-clip-text text-transparent"> Define Us</span>
            </h2>
          </div>

          {/* Radial layout: desktop */}
          <div className="hidden md:block relative" style={{ height: '500px' }}>
            {/* Center decorative element */}
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 delay-300 ${valuesView.isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <div className="relative">
                {/* Outer ring */}
                <svg className="w-32 h-32" viewBox="0 0 128 128" fill="none">
                  <circle cx="64" cy="64" r="60" stroke="#b87333" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
                  <circle cx="64" cy="64" r="48" stroke="#d35400" strokeWidth="1" opacity="0.25" />
                  <circle cx="64" cy="64" r="24" fill="#b87333" opacity="0.15" />
                </svg>
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-10 h-10 text-dc-copper" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 4l4 8h8l-6 5 2 8-8-5-8 5 2-8-6-5h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Connecting lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 500" fill="none">
              {VALUES.map((_, i) => {
                const angle = (i / VALUES.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 200;
                const cx = 450;
                const cy = 250;
                const endX = cx + Math.cos(angle) * radius;
                const endY = cy + Math.sin(angle) * radius;
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={endX}
                    y2={endY}
                    stroke="#b87333"
                    strokeWidth="1"
                    opacity={valuesView.isInView ? 0.25 : 0}
                    strokeDasharray="4 4"
                    className="transition-opacity duration-1000"
                    style={{ transitionDelay: `${500 + i * 100}ms` }}
                  />
                );
              })}
            </svg>

            {/* Value items in circle */}
            {VALUES.map((value, i) => {
              const angle = (i / VALUES.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 44;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;

              return (
                <div
                  key={value}
                  className={`absolute transition-all duration-700 ${valuesView.isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    transitionDelay: `${500 + i * 120}ms`,
                  }}
                >
                  <div className="group bg-white rounded-2xl px-6 py-5 shadow-lg shadow-dc-copper/5 border border-dc-copper/10 hover:border-dc-copper/30 hover:shadow-xl hover:shadow-dc-copper/10 transition-all duration-300 hover:-translate-y-1 cursor-default text-center min-w-[140px]">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br from-dc-copper/15 to-dc-rust/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-dc-copper" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-dc-charcoal font-bold text-sm whitespace-nowrap">{value}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: grid fallback */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {VALUES.map((value, i) => (
              <div
                key={value}
                className={`bg-white rounded-xl p-5 shadow-lg shadow-dc-copper/5 border border-dc-copper/10 text-center transition-all duration-700 ${valuesView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br from-dc-copper/15 to-dc-rust/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-dc-copper" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-dc-charcoal font-bold text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Brush stroke divider ---- */}
      <div className="relative h-16 md:h-24 -mb-1" style={{ background: 'linear-gradient(180deg, #1a1e1f 0%, #2d3436 100%)' }}>
        <svg className="absolute bottom-full left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,80 C300,30 600,60 900,20 C1100,0 1300,50 1440,30 L1440,80 Z" fill="#1a1e1f" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/*  8. CTA / CONTACT                                             */}
      {/* ============================================================ */}
      <section
        ref={ctaView.ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #1a1e1f 0%, #2d3436 50%, #1a1e1f 100%)' }}
      >
        {/* Paint drip SVGs at top */}
        <div className="absolute top-0 left-0 w-full pointer-events-none">
          <svg className="w-full" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path d="M120 0v40c0 20-10 35-10 55s8 25 10 25 10-5 10-25S120 60 120 40V0z" fill="#b87333" opacity="0.15" />
            <path d="M360 0v55c0 15-8 28-8 42s6 18 8 18 8-4 8-18-8-27-8-42V0z" fill="#d35400" opacity="0.12" />
            <path d="M600 0v30c0 25-12 40-12 65s10 30 12 30 12-5 12-30-12-40-12-65V0z" fill="#b87333" opacity="0.1" />
            <path d="M840 0v45c0 18-9 32-9 48s7 22 9 22 9-6 9-22-9-30-9-48V0z" fill="#d35400" opacity="0.13" />
            <path d="M1080 0v35c0 22-11 38-11 58s9 26 11 26 11-6 11-26-11-36-11-58V0z" fill="#b87333" opacity="0.11" />
            <path d="M1320 0v50c0 16-8 30-8 44s6 20 8 20 8-6 8-20-8-28-8-44V0z" fill="#d35400" opacity="0.14" />
          </svg>
        </div>

        {/* Copper gradient accents */}
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-dc-copper/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-dc-rust/5 blur-[120px] pointer-events-none" />

        <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${ctaView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Decorative line */}
          <div className="flex justify-center mb-10">
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-dc-copper to-transparent" />
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-8">
            <span className="text-white/90">Your Vision,</span>
            <br />
            <span className="bg-gradient-to-r from-dc-copper via-dc-rust to-dc-copper bg-clip-text text-transparent">
              Our Expertise
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
            From color consultation to final brushstroke, we bring {COMPANY.founded ? `over ${new Date().getFullYear() - COMPANY.founded} years of` : ''} craftsmanship to every project.
          </p>

          {/* Phone number */}
          <a
            href={`tel:${COMPANY.phone}`}
            className="inline-block text-3xl md:text-4xl font-bold text-dc-copper hover:text-dc-rust transition-colors duration-300 mb-12 tracking-wide"
          >
            {COMPANY.phone}
          </a>

          <br />

          {/* Glowing CTA */}
          <a
            href={`tel:${COMPANY.phone}`}
            className="group relative inline-flex items-center gap-4 px-14 py-6 mt-4 rounded-full font-bold text-xl text-white overflow-hidden transition-all duration-500 hover:scale-105 animate-pulse-glow"
            style={{
              background: 'linear-gradient(135deg, #b87333 0%, #d35400 50%, #b87333 100%)',
              boxShadow: '0 0 40px rgba(184,115,51,0.3), 0 0 80px rgba(184,115,51,0.15)',
            }}
          >
            <span className="relative z-10">Get Your Free Estimate</span>
            <svg className="relative z-10 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-dc-rust to-dc-copper opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>

          {/* Trust indicators */}
          <div className={`mt-16 flex flex-wrap justify-center gap-8 text-white/30 text-sm transition-all duration-1000 delay-500 ${ctaView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Free Estimates</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>EPA Lead-Safe Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  9. FOOTER                                                    */}
      {/* ============================================================ */}
      <footer className="bg-dc-charcoal border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-dc-copper" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 28V12l8-6 8 6v16" />
                  <rect x="13" y="18" width="6" height="10" rx="1" />
                  <path d="M4 28h24" strokeLinecap="round" />
                </svg>
                <span className="text-xl font-bold bg-gradient-to-r from-dc-copper to-dc-rust bg-clip-text text-transparent">
                  {COMPANY.name}
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                {COMPANY.tagline}. Serving {COMPANY.serviceArea} since {COMPANY.founded}.
              </p>
            </div>

            {/* Services quick list */}
            <div>
              <h4 className="text-dc-copper font-semibold text-sm tracking-wider uppercase mb-4">Services</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {SERVICES.map((s) => (
                  <span key={s.title} className="text-white/40 text-sm hover:text-dc-copper transition-colors duration-200 cursor-pointer">
                    {s.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-dc-copper font-semibold text-sm tracking-wider uppercase mb-4">Contact</h4>
              <div className="space-y-3">
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-white/60 hover:text-dc-copper transition-colors duration-200">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">{COMPANY.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-white/60">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{COMPANY.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/25 text-xs">
              &copy; {new Date().getFullYear()} {COMPANY.fullName} All rights reserved.
            </p>
            <div className="flex gap-6">
              <span className="text-white/25 text-xs hover:text-white/50 transition-colors cursor-pointer">Privacy Policy</span>
              <span className="text-white/25 text-xs hover:text-white/50 transition-colors cursor-pointer">Terms of Service</span>
              <span className="text-white/25 text-xs hover:text-white/50 transition-colors cursor-pointer">Sitemap</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
