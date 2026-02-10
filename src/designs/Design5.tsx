import { useState, useEffect } from 'react';
import { COMPANY, SERVICES, AWARDS, VALUES, TESTIMONIALS, STATS } from '../data';
import { useInView, useParallax, useCountUp, useScrollProgress } from '../hooks';

/* ──────────────────────────────────────────────
   HAND-DRAWN SVG HELPERS
   Organic, slightly wobbly paths with round caps
   ────────────────────────────────────────────── */

const handDrawnStyle: React.CSSProperties = {
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  fill: 'none',
};

/* Small paintbrush accent for the header logo */
function BrushAccentSVG({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 24" className={className} width="60" height="24" aria-hidden="true">
      <path
        d="M4 18 C8 16, 12 6, 20 5 C28 4, 30 8, 36 6 C42 4, 48 3, 56 4"
        style={handDrawnStyle}
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M56 4 C54 6, 52 10, 54 13 C56 16, 53 18, 50 17"
        style={handDrawnStyle}
        stroke="currentColor"
        strokeWidth="2"
      />
      <ellipse cx="52" cy="4" rx="5" ry="3" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

/* Hero house illustration – cozy, hand-drawn */
function HouseIllustrationSVG() {
  return (
    <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto" aria-hidden="true">
      {/* Ground line */}
      <path
        d="M20 260 C60 258, 120 262, 200 259 C280 256, 340 261, 380 258"
        stroke="#6b8f71"
        strokeWidth="2.5"
        style={handDrawnStyle}
        opacity="0.5"
      />
      {/* Grass tufts */}
      <path d="M40 260 C42 252, 46 253, 48 260" stroke="#6b8f71" strokeWidth="1.5" style={handDrawnStyle} />
      <path d="M100 259 C103 250, 107 251, 110 259" stroke="#6b8f71" strokeWidth="1.5" style={handDrawnStyle} />
      <path d="M300 259 C303 251, 307 252, 310 259" stroke="#6b8f71" strokeWidth="1.5" style={handDrawnStyle} />
      <path d="M350 258 C352 251, 355 252, 357 258" stroke="#6b8f71" strokeWidth="1.5" style={handDrawnStyle} />

      {/* House body */}
      <path
        d="M100 260 L100 140 L300 140 L300 260"
        stroke="#b87333"
        strokeWidth="3"
        style={handDrawnStyle}
      />
      {/* Slightly wobbly fill for house */}
      <path
        d="M102 142 L102 258 L298 258 L298 142 Z"
        fill="#f5f0e8"
        stroke="none"
      />

      {/* Roof */}
      <path
        d="M80 145 C120 142, 160 60, 200 50 C240 60, 280 142, 320 145"
        stroke="#b87333"
        strokeWidth="3"
        style={handDrawnStyle}
      />
      <path
        d="M82 144 C122 141, 160 62, 200 52 C240 62, 278 141, 318 144 Z"
        fill="#e8c4b8"
        stroke="none"
      />

      {/* Chimney */}
      <path
        d="M250 100 L250 55 L275 55 L275 85"
        stroke="#b87333"
        strokeWidth="2.5"
        style={handDrawnStyle}
      />
      <rect x="252" y="57" width="21" height="43" fill="#d4a373" rx="2" stroke="none" />
      {/* Smoke */}
      <path
        d="M262 52 C260 42, 265 38, 260 28 C258 22, 263 16, 258 8"
        stroke="#636e72"
        strokeWidth="1.5"
        style={handDrawnStyle}
        opacity="0.3"
      />

      {/* Door */}
      <path
        d="M175 260 L175 190 C175 187, 178 185, 180 185 L220 185 C222 185, 225 187, 225 190 L225 260"
        stroke="#b87333"
        strokeWidth="2.5"
        style={handDrawnStyle}
      />
      <rect x="177" y="187" width="46" height="71" rx="4" fill="#b87333" opacity="0.3" stroke="none" />
      {/* Door knob */}
      <circle cx="215" cy="225" r="4" fill="#b87333" stroke="#b87333" strokeWidth="1" />

      {/* Left window */}
      <rect x="118" y="170" width="38" height="38" rx="4" stroke="#b87333" strokeWidth="2.5" fill="#d4e8f0" style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      <line x1="137" y1="170" x2="137" y2="208" stroke="#b87333" strokeWidth="1.5" />
      <line x1="118" y1="189" x2="156" y2="189" stroke="#b87333" strokeWidth="1.5" />

      {/* Right window */}
      <rect x="243" y="170" width="38" height="38" rx="4" stroke="#b87333" strokeWidth="2.5" fill="#d4e8f0" style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      <line x1="262" y1="170" x2="262" y2="208" stroke="#b87333" strokeWidth="1.5" />
      <line x1="243" y1="189" x2="281" y2="189" stroke="#b87333" strokeWidth="1.5" />

      {/* Person painting (right side) */}
      {/* Head */}
      <circle cx="340" cy="180" r="12" stroke="#b87333" strokeWidth="2" style={handDrawnStyle} fill="#f5f0e8" />
      {/* Body */}
      <path d="M340 192 L340 230" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      {/* Legs */}
      <path d="M340 230 L330 258" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      <path d="M340 230 L350 258" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      {/* Arm holding brush, painting the wall */}
      <path d="M340 205 L310 195 L302 190" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      {/* Paint brush */}
      <path d="M302 190 L298 185" stroke="#6b8f71" strokeWidth="3" style={handDrawnStyle} />
      {/* Other arm */}
      <path d="M340 205 L360 220" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      {/* Paint bucket */}
      <path d="M355 220 L350 225 L350 240 L370 240 L370 225 L365 220" stroke="#6b8f71" strokeWidth="2" style={handDrawnStyle} fill="#6b8f71" opacity="0.3" />

      {/* Paint splashes on wall */}
      <circle cx="298" cy="180" r="5" fill="#6b8f71" opacity="0.3" />
      <circle cx="305" cy="172" r="3" fill="#6b8f71" opacity="0.2" />
      <circle cx="295" cy="188" r="4" fill="#6b8f71" opacity="0.25" />

      {/* Tree on left */}
      <path d="M50 260 L50 190" stroke="#8B7355" strokeWidth="3" style={handDrawnStyle} />
      <circle cx="50" cy="175" r="22" fill="#6b8f71" opacity="0.4" stroke="#6b8f71" strokeWidth="2" style={handDrawnStyle} />
      <circle cx="38" cy="185" r="16" fill="#6b8f71" opacity="0.35" stroke="none" />
      <circle cx="62" cy="182" r="18" fill="#6b8f71" opacity="0.35" stroke="none" />

      {/* Flowers */}
      <circle cx="130" cy="255" r="4" fill="#e8c4b8" />
      <circle cx="140" cy="252" r="3" fill="#b87333" opacity="0.5" />
      <circle cx="270" cy="254" r="4" fill="#e8c4b8" />
      <circle cx="278" cy="252" r="3" fill="#b87333" opacity="0.5" />
    </svg>
  );
}

/* Two friends painting together illustration */
function FriendsPaintingSVG() {
  return (
    <svg viewBox="0 0 350 300" className="w-full max-w-sm mx-auto" aria-hidden="true">
      {/* Wall being painted */}
      <rect x="80" y="50" width="190" height="200" rx="6" fill="#f5f0e8" stroke="#b87333" strokeWidth="2" style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }} />
      {/* Painted portion */}
      <rect x="82" y="52" width="120" height="196" rx="4" fill="#6b8f71" opacity="0.25" />

      {/* Paint line edge */}
      <path
        d="M202 52 C200 80, 204 110, 201 140 C198 170, 203 200, 202 248"
        stroke="#6b8f71"
        strokeWidth="2"
        style={handDrawnStyle}
        opacity="0.5"
      />

      {/* Person 1 (left) */}
      <circle cx="120" cy="95" r="16" stroke="#b87333" strokeWidth="2" style={handDrawnStyle} fill="#f5f0e8" />
      {/* Hair */}
      <path d="M106 88 C108 78, 118 72, 128 76 C134 78, 136 86, 134 90" stroke="#8B7355" strokeWidth="2" style={handDrawnStyle} fill="none" />
      {/* Body */}
      <path d="M120 111 L120 180" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      {/* Legs */}
      <path d="M120 180 L105 230" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      <path d="M120 180 L135 230" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      {/* Arm with roller */}
      <path d="M120 130 L155 115 L170 110" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      {/* Roller */}
      <rect x="168" y="100" width="18" height="22" rx="4" fill="#6b8f71" opacity="0.5" stroke="#6b8f71" strokeWidth="1.5" />
      {/* Other arm */}
      <path d="M120 140 L95 160" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      {/* Smile */}
      <path d="M114 100 C116 104, 124 104, 126 100" stroke="#b87333" strokeWidth="1.5" style={handDrawnStyle} />

      {/* Person 2 (right) */}
      <circle cx="240" cy="100" r="16" stroke="#b87333" strokeWidth="2" style={handDrawnStyle} fill="#f5f0e8" />
      {/* Hair */}
      <path d="M226 92 C228 82, 240 76, 250 80 C256 84, 256 92, 254 96" stroke="#5a4030" strokeWidth="2" style={handDrawnStyle} fill="none" />
      {/* Body */}
      <path d="M240 116 L240 185" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      {/* Legs */}
      <path d="M240 185 L225 235" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      <path d="M240 185 L255 235" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      {/* Arm with brush painting trim */}
      <path d="M240 135 L272 120 L278 115" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      {/* Paint brush */}
      <path d="M278 115 L284 110" stroke="#e8c4b8" strokeWidth="3.5" style={handDrawnStyle} />
      {/* Other arm on hip */}
      <path d="M240 145 L265 160 L255 170" stroke="#b87333" strokeWidth="2.5" style={handDrawnStyle} />
      {/* Smile */}
      <path d="M234 105 C236 109, 244 109, 246 105" stroke="#b87333" strokeWidth="1.5" style={handDrawnStyle} />

      {/* Paint cans on floor */}
      <path d="M50 232 L45 237 L45 255 L70 255 L70 237 L65 232" stroke="#6b8f71" strokeWidth="2" style={handDrawnStyle} fill="#6b8f71" opacity="0.25" />
      <path d="M285 235 L280 240 L280 257 L305 257 L305 240 L300 235" stroke="#e8c4b8" strokeWidth="2" style={handDrawnStyle} fill="#e8c4b8" opacity="0.35" />

      {/* Drop cloth */}
      <path
        d="M60 260 C100 258, 140 264, 180 260 C220 256, 260 263, 300 260"
        stroke="#b87333"
        strokeWidth="1.5"
        style={handDrawnStyle}
        opacity="0.3"
      />

      {/* High five sparkle between them */}
      <path d="M175 80 L180 70" stroke="#b87333" strokeWidth="1.5" style={handDrawnStyle} opacity="0.5" />
      <path d="M180 82 L188 76" stroke="#b87333" strokeWidth="1.5" style={handDrawnStyle} opacity="0.5" />
      <path d="M172 76 L168 68" stroke="#b87333" strokeWidth="1.5" style={handDrawnStyle} opacity="0.5" />
    </svg>
  );
}

/* Badge/seal SVG for awards */
function BadgeSealSVG({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} width="48" height="48" aria-hidden="true">
      <path
        d="M30 4 L35 18 L50 14 L42 26 L54 34 L40 36 L42 50 L30 42 L18 50 L20 36 L6 34 L18 26 L10 14 L25 18 Z"
        fill="currentColor"
        opacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
        style={handDrawnStyle}
      />
      <circle cx="30" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" style={handDrawnStyle} />
      <path d="M23 30 L28 35 L38 25" stroke="currentColor" strokeWidth="2" style={handDrawnStyle} />
    </svg>
  );
}

/* Pin/tack SVG for testimonials */
function PinSVG() {
  return (
    <svg viewBox="0 0 24 30" width="20" height="26" className="mx-auto" aria-hidden="true">
      <circle cx="12" cy="10" r="8" fill="#b87333" stroke="#8B5E3C" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="4" fill="#d4956a" />
      <path d="M12 18 L12 28" stroke="#636e72" strokeWidth="1.5" style={handDrawnStyle} />
    </svg>
  );
}

/* Hand-drawn phone icon */
function PhoneIconSVG({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} width="28" height="28" aria-hidden="true">
      <path
        d="M8 4 C8 4, 6 4, 6 7 L6 10 C6 12, 7 16, 11 20 C15 24, 19 26, 22 26 L25 26 C27 26, 28 24, 28 24 L28 21 C28 20, 27 19, 26 19 L22 18 C21 18, 20 19, 20 19 L18 21 C16 20, 13 17, 12 14 L14 12 C14 12, 15 11, 14 10 L13 6 C13 5, 12 4, 11 4 Z"
        stroke="currentColor"
        strokeWidth="2"
        style={handDrawnStyle}
        fill="currentColor"
        opacity="0.2"
      />
    </svg>
  );
}

/* Service card hand-drawn icons */
function ServiceIcon({ icon, className = '' }: { icon: string; className?: string }) {
  const stroke = 'currentColor';
  const sw = '2';
  const style = handDrawnStyle;

  const icons: Record<string, React.ReactNode> = {
    interior: (
      <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <path d="M8 40 L8 16 L24 6 L40 16 L40 40 Z" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <rect x="18" y="26" width="12" height="14" rx="2" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <path d="M14 20 L20 18 L22 14" stroke={stroke} strokeWidth={sw} style={style} />
        <circle cx="20" cy="12" r="3" fill={stroke} opacity="0.2" />
      </svg>
    ),
    exterior: (
      <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <path d="M6 42 L6 20 L24 6 L42 20 L42 42" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <path d="M2 22 L24 4 L46 22" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <rect x="14" y="28" width="8" height="8" rx="1" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <rect x="26" y="28" width="8" height="8" rx="1" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <circle cx="38" cy="14" r="5" stroke={stroke} strokeWidth="1.5" style={style} fill="none" />
        <path d="M36 12 L38 10 L40 14" stroke={stroke} strokeWidth="1.5" style={style} />
      </svg>
    ),
    cabinet: (
      <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <rect x="6" y="8" width="36" height="32" rx="3" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <line x1="24" y1="8" x2="24" y2="40" stroke={stroke} strokeWidth={sw} style={style} />
        <line x1="6" y1="24" x2="42" y2="24" stroke={stroke} strokeWidth={sw} style={style} />
        <circle cx="18" cy="16" r="2" fill={stroke} />
        <circle cx="30" cy="16" r="2" fill={stroke} />
        <circle cx="18" cy="32" r="2" fill={stroke} />
        <circle cx="30" cy="32" r="2" fill={stroke} />
      </svg>
    ),
    restoration: (
      <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <path d="M10 40 L10 14 C10 10, 14 8, 18 8 L30 8 C34 8, 38 10, 38 14 L38 40" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <path d="M16 40 L16 30 C16 28, 18 26, 20 26 L28 26 C30 26, 32 28, 32 30 L32 40" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <path d="M6 40 L42 40" stroke={stroke} strokeWidth={sw} style={style} />
        <path d="M20 18 L28 18" stroke={stroke} strokeWidth={sw} style={style} />
        <path d="M20 14 L28 14" stroke={stroke} strokeWidth={sw} style={style} />
        <path d="M24 10 L24 8" stroke={stroke} strokeWidth="1.5" style={style} />
      </svg>
    ),
    faux: (
      <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <rect x="8" y="8" width="32" height="32" rx="4" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <path d="M12 28 C16 20, 22 18, 28 22 C34 26, 38 20, 40 16" stroke={stroke} strokeWidth={sw} style={style} />
        <path d="M8 34 C14 30, 22 32, 30 28 C36 26, 40 28, 40 30" stroke={stroke} strokeWidth="1.5" style={style} opacity="0.5" />
        <circle cx="16" cy="16" r="3" fill={stroke} opacity="0.2" stroke={stroke} strokeWidth="1" style={style} />
        <circle cx="32" cy="14" r="2" fill={stroke} opacity="0.15" stroke={stroke} strokeWidth="1" style={style} />
      </svg>
    ),
    color: (
      <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <circle cx="24" cy="24" r="16" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <circle cx="24" cy="14" r="5" fill="#e8c4b8" stroke={stroke} strokeWidth="1" style={style} />
        <circle cx="16" cy="22" r="5" fill="#6b8f71" opacity="0.6" stroke={stroke} strokeWidth="1" style={style} />
        <circle cx="32" cy="22" r="5" fill="#b87333" opacity="0.6" stroke={stroke} strokeWidth="1" style={style} />
        <circle cx="20" cy="30" r="5" fill="#f5f0e8" stroke={stroke} strokeWidth="1" style={style} />
        <circle cx="28" cy="30" r="5" fill="#d4a373" opacity="0.6" stroke={stroke} strokeWidth="1" style={style} />
      </svg>
    ),
    deck: (
      <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <path d="M4 26 L44 26" stroke={stroke} strokeWidth={sw} style={style} />
        <path d="M6 26 L6 42" stroke={stroke} strokeWidth={sw} style={style} />
        <path d="M42 26 L42 42" stroke={stroke} strokeWidth={sw} style={style} />
        <path d="M8 30 L8 42" stroke={stroke} strokeWidth="1.5" style={style} />
        <path d="M40 30 L40 42" stroke={stroke} strokeWidth="1.5" style={style} />
        <path d="M4 26 L6 20 L18 20" stroke={stroke} strokeWidth={sw} style={style} />
        <path d="M44 26 L42 20 L30 20" stroke={stroke} strokeWidth={sw} style={style} />
        <path d="M18 20 L18 26" stroke={stroke} strokeWidth="1.5" style={style} />
        <path d="M30 20 L30 26" stroke={stroke} strokeWidth="1.5" style={style} />
        <path d="M8 26 L44 26" stroke={stroke} strokeWidth="1" style={style} opacity="0.4" />
        <path d="M14 26 L14 42" stroke={stroke} strokeWidth="1" style={style} opacity="0.3" />
        <path d="M24 26 L24 42" stroke={stroke} strokeWidth="1" style={style} opacity="0.3" />
        <path d="M34 26 L34 42" stroke={stroke} strokeWidth="1" style={style} opacity="0.3" />
      </svg>
    ),
    drywall: (
      <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
        <rect x="8" y="8" width="32" height="32" rx="2" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <path d="M18 18 C20 16, 28 22, 30 20 C32 18, 28 28, 30 30" stroke={stroke} strokeWidth="1.5" style={style} opacity="0.4" />
        <path d="M14 34 L22 28 L34 34" stroke={stroke} strokeWidth={sw} style={style} />
        <path d="M22 28 L22 22" stroke={stroke} strokeWidth="1.5" style={style} />
        <circle cx="22" cy="20" r="3" fill={stroke} opacity="0.15" stroke={stroke} strokeWidth="1.5" style={style} />
      </svg>
    ),
  };

  return <>{icons[icon] || icons.interior}</>;
}

/* Decorative dot pattern overlay for hero */
function DotPatternSVG() {
  return (
    <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id="artisan-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="14" cy="14" r="1.2" fill="#b87333" opacity="0.08" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#artisan-dots)" />
    </svg>
  );
}

/* Crosshatch texture overlay */
function CrosshatchPatternSVG({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <defs>
        <pattern id="artisan-crosshatch" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 8 L16 8" stroke="#b87333" strokeWidth="0.5" opacity={opacity} />
          <path d="M8 0 L8 16" stroke="#b87333" strokeWidth="0.5" opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#artisan-crosshatch)" />
    </svg>
  );
}

/* Hand-drawn wavy border SVG */
function WavyBorderSVG({ color = '#b87333', flip = false }: { color?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 30"
      preserveAspectRatio="none"
      className={`w-full h-6 block ${flip ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <path
        d="M0 15 C50 5, 100 25, 150 15 C200 5, 250 25, 300 15 C350 5, 400 25, 450 15 C500 5, 550 25, 600 15 C650 5, 700 25, 750 15 C800 5, 850 25, 900 15 C950 5, 1000 25, 1050 15 C1100 5, 1150 25, 1200 15"
        stroke={color}
        strokeWidth="2"
        style={handDrawnStyle}
        fill="none"
      />
    </svg>
  );
}

/* Star SVG for ratings */
function StarSVG() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" className="inline-block" aria-hidden="true">
      <path
        d="M10 2 L12.5 7.5 L18 8 L14 12.5 L15 18 L10 15 L5 18 L6 12.5 L2 8 L7.5 7.5 Z"
        fill="#b87333"
        stroke="#b87333"
        strokeWidth="0.8"
        style={handDrawnStyle}
      />
    </svg>
  );
}

/* Social media icons – hand-drawn style */
function SocialIcon({ type }: { type: 'facebook' | 'instagram' | 'yelp' }) {
  const stroke = 'currentColor';
  const sw = '2';
  const style = handDrawnStyle;

  if (type === 'facebook') {
    return (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="13" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <path d="M18 8 L18 12 L20 12 L20 16 L18 16 L18 28" stroke={stroke} strokeWidth={sw} style={style} />
        <path d="M13 16 L22 16" stroke={stroke} strokeWidth={sw} style={style} />
      </svg>
    );
  }

  if (type === 'instagram') {
    return (
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <rect x="4" y="4" width="24" height="24" rx="6" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <circle cx="16" cy="16" r="6" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
        <circle cx="24" cy="8" r="2" fill={stroke} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <circle cx="16" cy="16" r="13" stroke={stroke} strokeWidth={sw} style={style} fill="none" />
      <path d="M10 12 L16 20 L22 12" stroke={stroke} strokeWidth={sw} style={style} />
      <path d="M12 22 C14 18, 18 18, 20 22" stroke={stroke} strokeWidth="1.5" style={style} />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   STAT COUNTER COMPONENT
   ────────────────────────────────────────────── */

function StatCounter({ stat, index }: { stat: typeof STATS[number]; index: number }) {
  const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
  const { count, activate } = useCountUp(numericValue, 2200, 0);
  const { ref, isInView } = useInView(0.3);

  useEffect(() => {
    if (isInView) activate();
  }, [isInView, activate]);

  const prefix = '';
  const suffix = stat.value.replace(/[0-9.]/g, '');

  const bgColors = [
    'bg-dc-blush/40',
    'bg-dc-cream',
    'bg-dc-sage/20',
    'bg-dc-copper/15',
  ];

  return (
    <div
      ref={ref}
      className={`${bgColors[index % 4]} rounded-3xl p-8 text-center shadow-md transition-transform duration-300 hover:-translate-y-1 ${
        isInView ? 'animate-scale-in' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="text-4xl md:text-5xl font-serif font-bold text-dc-copper mb-2">
        {prefix}
        {stat.value.includes('.') ? count.toFixed(1) : count}
        {suffix}
      </div>
      <div className="text-dc-charcoal/70 font-medium">{stat.label}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN DESIGN COMPONENT
   ────────────────────────────────────────────── */

export default function Design5() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const parallaxOffset = useParallax(0.15);
  const scrollProgress = useScrollProgress();

  // Scroll-triggered section hooks
  const heroSection = useInView(0.1);
  const trustSection = useInView(0.15);
  const aboutSection = useInView(0.15);
  const servicesSection = useInView(0.1);
  const testimonialsSection = useInView(0.1);
  const valuesSection = useInView(0.15);
  const processSection = useInView(0.15);
  const ctaSection = useInView(0.15);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Services', href: '#services' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Our Values', href: '#values' },
    { label: 'Contact', href: '#contact' },
  ];

  const serviceCardColors = [
    'bg-dc-blush/50',
    'bg-dc-cream',
    'bg-dc-sage/15',
    'bg-dc-copper/10',
    'bg-dc-blush/30',
    'bg-dc-ivory',
    'bg-dc-sage/20',
    'bg-dc-copper/15',
  ];

  const serviceIconColors = [
    'text-dc-copper',
    'text-dc-sage',
    'text-dc-copper',
    'text-dc-sage',
    'text-dc-copper',
    'text-dc-sage',
    'text-dc-copper',
    'text-dc-sage',
  ];

  const valueColors = [
    { bg: 'bg-dc-blush/60', text: 'text-dc-charcoal', border: 'border-dc-copper/40' },
    { bg: 'bg-dc-sage/25', text: 'text-dc-charcoal', border: 'border-dc-sage/50' },
    { bg: 'bg-dc-copper/15', text: 'text-dc-charcoal', border: 'border-dc-copper/30' },
    { bg: 'bg-dc-cream', text: 'text-dc-charcoal', border: 'border-dc-copper/30' },
    { bg: 'bg-dc-blush/40', text: 'text-dc-charcoal', border: 'border-dc-blush' },
    { bg: 'bg-dc-sage/30', text: 'text-dc-charcoal', border: 'border-dc-sage/40' },
  ];

  const testimonialRotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];

  const processSteps = [
    {
      number: '1',
      title: 'Consultation',
      description: 'We listen to your vision, explore colors together, and craft a plan tailored to your home and budget.',
    },
    {
      number: '2',
      title: 'Preparation',
      description: 'Meticulous prep work ensures a flawless finish -- surfaces cleaned, primed, and protected with care.',
    },
    {
      number: '3',
      title: 'Transformation',
      description: 'Expert application brings your space to life, with a final walkthrough to ensure your complete satisfaction.',
    },
  ];

  return (
    <div className="min-h-screen font-sans text-dc-charcoal bg-dc-cream overflow-x-hidden">
      {/* ═══════ SCROLL PROGRESS BAR ═══════ */}
      <div
        className="fixed top-0 left-0 h-1 bg-dc-copper z-[60] transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* ═══════ 1. HEADER ═══════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          headerScrolled
            ? 'bg-dc-cream/95 backdrop-blur-md shadow-md py-3'
            : 'bg-dc-cream/80 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <BrushAccentSVG className="text-dc-copper transition-transform duration-300 group-hover:rotate-6" />
            <span className="font-serif text-xl md:text-2xl font-bold text-dc-charcoal tracking-tight">
              {COMPANY.name}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-dc-charcoal/75 hover:text-dc-copper transition-colors duration-200 text-sm font-medium group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-dc-copper rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="tel:8478690584"
              className="bg-dc-sage text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-dc-sage/90 transition-colors duration-200 shadow-sm"
            >
              {COMPANY.phone}
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-dc-charcoal hover:text-dc-copper transition-colors"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
              {menuOpen ? (
                <>
                  <path d="M7 7 L21 21" stroke="currentColor" strokeWidth="2.5" style={handDrawnStyle} />
                  <path d="M21 7 L7 21" stroke="currentColor" strokeWidth="2.5" style={handDrawnStyle} />
                </>
              ) : (
                <>
                  <path d="M4 8 L24 8" stroke="currentColor" strokeWidth="2.5" style={handDrawnStyle} />
                  <path d="M4 14 L24 14" stroke="currentColor" strokeWidth="2.5" style={handDrawnStyle} />
                  <path d="M4 20 L24 20" stroke="currentColor" strokeWidth="2.5" style={handDrawnStyle} />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-dc-cream/98 backdrop-blur-md border-t border-dc-copper/10 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-dc-charcoal/80 hover:text-dc-copper py-2 text-base font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:8478690584"
                className="bg-dc-sage text-white px-5 py-3 rounded-full text-center font-semibold mt-2"
              >
                {COMPANY.phone}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ═══════ 2. HERO ═══════ */}
      <section
        ref={heroSection.ref}
        className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-4"
        style={{
          background: 'linear-gradient(175deg, #f5f0e8 0%, #e8c4b8 40%, #f5f0e8 100%)',
        }}
      >
        <DotPatternSVG />

        {/* Floating decorative elements */}
        <div
          className="absolute top-32 left-8 w-16 h-16 rounded-full bg-dc-sage/10 animate-float"
          style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
        />
        <div
          className="absolute top-48 right-12 w-10 h-10 rounded-full bg-dc-copper/10 animate-float"
          style={{ animationDelay: '2s', transform: `translateY(${parallaxOffset * 0.3}px)` }}
        />
        <div
          className="absolute bottom-40 left-16 w-12 h-12 rounded-full bg-dc-blush/30 animate-float"
          style={{ animationDelay: '4s', transform: `translateY(${parallaxOffset * 0.4}px)` }}
        />

        <div
          className={`relative z-10 text-center max-w-4xl mx-auto ${
            heroSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          {/* Small tagline */}
          <p className="text-dc-copper font-medium text-sm md:text-base tracking-widest uppercase mb-6">
            {COMPANY.tagline}
          </p>

          {/* Main headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-dc-charcoal leading-tight mb-6">
            Crafted with Care,
            <br />
            <span className="text-dc-copper">Painted with Pride</span>
          </h1>

          {/* Subtitle */}
          <p className="text-dc-charcoal/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            For over {new Date().getFullYear() - COMPANY.founded} years, two friends have been transforming
            Chicago homes with artisan craftsmanship and heartfelt care.
          </p>

          {/* CTA Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-dc-sage text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-dc-sage/90 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 shadow-md"
          >
            Let's Talk About Your Project
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M5 12 L19 12 M13 6 L19 12 L13 18" stroke="currentColor" strokeWidth="2.5" style={handDrawnStyle} />
            </svg>
          </a>

          {/* Location info */}
          <p className="mt-6 text-dc-charcoal/50 text-sm">
            Serving {COMPANY.serviceArea} since {COMPANY.founded}
          </p>
        </div>

        {/* House Illustration */}
        <div
          className={`relative z-10 mt-10 w-full max-w-lg ${
            heroSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.4s' }}
        >
          <HouseIllustrationSVG />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <svg viewBox="0 0 24 36" width="24" height="36" aria-hidden="true">
            <rect x="4" y="2" width="16" height="26" rx="8" stroke="#b87333" strokeWidth="2" style={handDrawnStyle} fill="none" />
            <circle cx="12" cy="10" r="2.5" fill="#b87333" opacity="0.6">
              <animate attributeName="cy" values="10;18;10" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </section>

      {/* ═══════ 3. TRUST BADGES ═══════ */}
      <section
        ref={trustSection.ref}
        className="relative bg-dc-ivory py-10 overflow-hidden"
      >
        <CrosshatchPatternSVG opacity={0.03} />
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 ${
              trustSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            {AWARDS.map((award, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl hover:bg-dc-blush/20 transition-colors duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <BadgeSealSVG className="text-dc-copper" />
                <h3 className="font-serif font-bold text-sm md:text-base text-dc-charcoal">
                  {award.title}
                </h3>
                <p className="text-dc-slate text-xs md:text-sm">{award.source}</p>
                {award.year && (
                  <p className="text-dc-copper text-xs font-medium">{award.year}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 4. ABOUT / OUR STORY ═══════ */}
      <section
        id="story"
        ref={aboutSection.ref}
        className="relative py-20 md:py-28"
        style={{
          background: 'linear-gradient(180deg, #f5f0e8 0%, #faf8f5 100%)',
        }}
      >
        <CrosshatchPatternSVG opacity={0.025} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div
            className={`text-center mb-14 ${
              aboutSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dc-charcoal mb-3">
              Our Story
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="h-px w-12 bg-dc-copper/40" />
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                <path d="M10 3 C5 3, 2 8, 2 12 C2 16, 6 18, 10 14 C14 18, 18 16, 18 12 C18 8, 15 3, 10 3" fill="#b87333" opacity="0.3" />
              </svg>
              <span className="h-px w-12 bg-dc-copper/40" />
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: Story text */}
            <div
              className={`${
                aboutSection.isInView ? 'animate-slide-in-left' : 'opacity-0'
              }`}
            >
              <p className="text-lg md:text-xl text-dc-charcoal/80 leading-relaxed mb-6">
                {COMPANY.story}
              </p>
              <p className="text-base md:text-lg text-dc-charcoal/70 leading-relaxed mb-6">
                {COMPANY.description}
              </p>
              <p className="text-base md:text-lg text-dc-charcoal/70 leading-relaxed mb-8">
                What started as a shared passion between two high school friends,{' '}
                <span className="text-dc-copper font-semibold">{COMPANY.founders[0]}</span> and{' '}
                <span className="text-dc-copper font-semibold">{COMPANY.founders[1]}</span>,
                has grown into one of the most trusted painting companies on the North Shore.
                Every project is personal to us -- because your home is personal to you.
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="bg-dc-blush/50 text-dc-charcoal px-4 py-2 rounded-full text-sm font-medium border border-dc-copper/20">
                  Est. {COMPANY.founded}
                </span>
                <span className="bg-dc-sage/20 text-dc-charcoal px-4 py-2 rounded-full text-sm font-medium border border-dc-sage/30">
                  {COMPANY.location}
                </span>
                <span className="bg-dc-copper/10 text-dc-charcoal px-4 py-2 rounded-full text-sm font-medium border border-dc-copper/20">
                  {COMPANY.serviceArea}
                </span>
              </div>
            </div>

            {/* Right: Illustration */}
            <div
              className={`${
                aboutSection.isInView ? 'animate-slide-in-right' : 'opacity-0'
              }`}
            >
              <div className="bg-dc-blush/20 rounded-3xl p-8 border border-dc-copper/10 shadow-lg">
                <FriendsPaintingSVG />
                <p className="text-center mt-4 text-dc-copper/70 font-serif italic text-sm">
                  Two friends, one shared dream -- painting Chicago beautiful since {COMPANY.founded}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 5. SERVICES ═══════ */}
      <section
        id="services"
        ref={servicesSection.ref}
        className="relative py-20 md:py-28 bg-dc-ivory"
      >
        <DotPatternSVG />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Heading */}
          <div
            className={`text-center mb-14 ${
              servicesSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dc-charcoal mb-3">
              What We Love to Do
            </h2>
            <p className="text-dc-charcoal/60 text-lg max-w-xl mx-auto mt-4">
              Every project is an opportunity to create something beautiful. Here's how we can help.
            </p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <span className="h-px w-12 bg-dc-copper/40" />
              <BrushAccentSVG className="text-dc-copper w-10 h-5" />
              <span className="h-px w-12 bg-dc-copper/40" />
            </div>
          </div>

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`break-inside-avoid ${serviceCardColors[i % serviceCardColors.length]} rounded-2xl p-6 md:p-8 shadow-md border border-dc-copper/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${
                  servicesSection.isInView ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-14 h-14 mb-4 ${serviceIconColors[i % serviceIconColors.length]} group-hover:scale-110 transition-transform duration-300`}>
                  <ServiceIcon icon={service.icon} className="w-full h-full" />
                </div>
                <h3 className="font-serif text-xl font-bold text-dc-charcoal mb-2 group-hover:text-dc-copper transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-dc-charcoal/65 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 6. TESTIMONIALS ═══════ */}
      <section
        id="testimonials"
        ref={testimonialsSection.ref}
        className="relative py-20 md:py-28"
        style={{
          background: 'linear-gradient(180deg, #e8c4b8 0%, #f5f0e8 100%)',
        }}
      >
        <CrosshatchPatternSVG opacity={0.03} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Heading */}
          <div
            className={`text-center mb-14 ${
              testimonialsSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dc-charcoal mb-3">
              Kind Words
            </h2>
            <p className="text-dc-charcoal/60 text-lg max-w-xl mx-auto mt-4">
              Our clients are the heart of everything we do. Here's what they have to say.
            </p>
          </div>

          {/* Testimonial cards - "pinned notes" look */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <div
                key={i}
                className={`relative ${testimonialRotations[i % testimonialRotations.length]} hover:rotate-0 transition-all duration-300 hover:-translate-y-2 ${
                  testimonialsSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Paper texture card */}
                <div
                  className="bg-dc-ivory rounded-xl p-6 shadow-lg border border-dc-copper/10 relative"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 20% 80%, rgba(184,115,51,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(107,143,113,0.03) 0%, transparent 50%)',
                  }}
                >
                  {/* Pin */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <PinSVG />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mt-2 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <StarSVG key={j} />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-dc-charcoal/75 text-sm leading-relaxed mb-4 italic">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="border-t border-dc-copper/10 pt-3">
                    <p className="font-serif font-semibold text-dc-charcoal text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-dc-slate text-xs">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 7. STATS ═══════ */}
      <section className="relative py-16 md:py-24 bg-dc-cream">
        <DotPatternSVG />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 8. VALUES ═══════ */}
      <section
        id="values"
        ref={valuesSection.ref}
        className="relative py-20 md:py-28 bg-dc-ivory"
      >
        <CrosshatchPatternSVG opacity={0.025} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Heading */}
          <div
            className={`text-center mb-14 ${
              valuesSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dc-charcoal mb-3">
              What Drives Us
            </h2>
            <p className="text-dc-charcoal/60 text-lg max-w-xl mx-auto mt-4">
              These aren't just words on a wall -- they're the foundation of every brushstroke.
            </p>
          </div>

          {/* Values as organic badges */}
          <div
            className={`flex flex-wrap justify-center gap-4 md:gap-6 ${
              valuesSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            {VALUES.map((value, i) => {
              const colors = valueColors[i % valueColors.length];
              // Vary sizes for organic feel
              const sizes = [
                'px-7 py-4 text-base md:text-lg',
                'px-6 py-3.5 text-sm md:text-base',
                'px-8 py-4 text-lg md:text-xl',
                'px-6 py-3 text-sm md:text-base',
                'px-7 py-4 text-base md:text-lg',
                'px-8 py-3.5 text-base md:text-lg',
              ];
              const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-1', 'rotate-1'];
              return (
                <div
                  key={value}
                  className={`${colors.bg} ${colors.text} ${sizes[i % sizes.length]} rounded-2xl font-serif font-bold border-2 ${colors.border} shadow-md ${rotations[i % rotations.length]} hover:rotate-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default`}
                  style={{
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  {/* Hand-drawn circle accent */}
                  <span className="relative">
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ 9. PROCESS ═══════ */}
      <section
        ref={processSection.ref}
        className="relative py-20 md:py-28"
        style={{
          background: 'linear-gradient(180deg, #f5f0e8 0%, #e8c4b8 50%, #f5f0e8 100%)',
        }}
      >
        <DotPatternSVG />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Heading */}
          <div
            className={`text-center mb-16 ${
              processSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-dc-charcoal mb-3">
              How We Work
            </h2>
            <p className="text-dc-charcoal/60 text-lg max-w-xl mx-auto mt-4">
              A simple, thoughtful process that puts you at ease from day one.
            </p>
          </div>

          {/* Steps with connecting dotted line */}
          <div className="relative">
            {/* Hand-drawn dotted connecting line (desktop) */}
            <svg
              className="hidden md:block absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 pointer-events-none"
              viewBox="0 0 1000 80"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M120 40 C200 35, 280 50, 380 40 C480 30, 520 50, 620 40 C720 30, 800 48, 880 40"
                stroke="#b87333"
                strokeWidth="3"
                strokeDasharray="10 8"
                style={handDrawnStyle}
                fill="none"
                opacity="0.4"
              />
              {/* Arrow tips */}
              <path d="M370 36 L382 40 L370 44" stroke="#b87333" strokeWidth="2" style={handDrawnStyle} fill="none" opacity="0.4" />
              <path d="M610 36 L622 40 L610 44" stroke="#b87333" strokeWidth="2" style={handDrawnStyle} fill="none" opacity="0.4" />
            </svg>

            {/* Mobile dotted connecting line */}
            <svg
              className="md:hidden absolute left-1/2 top-0 h-full w-12 -translate-x-1/2 pointer-events-none"
              viewBox="0 0 20 600"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M10 60 C8 120, 12 180, 10 260 C8 340, 12 400, 10 480"
                stroke="#b87333"
                strokeWidth="2"
                strokeDasharray="8 6"
                style={handDrawnStyle}
                fill="none"
                opacity="0.35"
              />
            </svg>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative z-10">
              {processSteps.map((step, i) => {
                const circleColors = ['bg-dc-sage', 'bg-dc-copper', 'bg-dc-blush'];
                const circleShadows = [
                  'shadow-dc-sage/30',
                  'shadow-dc-copper/30',
                  'shadow-dc-blush/30',
                ];
                return (
                  <div
                    key={step.number}
                    className={`flex flex-col items-center text-center ${
                      processSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    {/* Circle with number */}
                    <div
                      className={`w-20 h-20 md:w-24 md:h-24 ${circleColors[i]} rounded-full flex items-center justify-center shadow-lg ${circleShadows[i]} mb-6 relative`}
                    >
                      {/* Hand-drawn circle outline */}
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 100"
                        aria-hidden="true"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="46"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          opacity="0.3"
                          strokeDasharray="4 3"
                          style={handDrawnStyle}
                        />
                      </svg>
                      <span className="text-white font-serif text-2xl md:text-3xl font-bold relative z-10">
                        {step.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-dc-charcoal mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-dc-charcoal/65 leading-relaxed text-sm md:text-base max-w-xs">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 10. CTA SECTION ═══════ */}
      <section
        id="contact"
        ref={ctaSection.ref}
        className="relative py-20 md:py-28 bg-dc-sage overflow-hidden"
      >
        {/* Decorative background shapes */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-white/3" />
          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            <defs>
              <pattern id="cta-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="16" cy="16" r="1" fill="white" opacity="0.06" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-dots)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div
            className={`${
              ctaSection.isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            {/* Decorative brush accent */}
            <BrushAccentSVG className="text-white/50 mx-auto mb-6 w-16 h-8" />

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Fall in Love
              <br />
              with Your Home Again?
            </h2>

            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Let's chat about your project over a cup of coffee (or a phone call).
              We'd love to hear your ideas and share how we can bring them to life.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="tel:8478690584"
                className="inline-flex items-center gap-3 bg-white text-dc-sage px-8 py-4 rounded-full text-lg font-bold hover:bg-dc-cream hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
              >
                <PhoneIconSVG className="text-dc-sage" />
                {COMPANY.phone}
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 bg-transparent text-white border-2 border-white/40 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 hover:border-white/60 transition-all duration-300"
              >
                Explore Our Services
              </a>
            </div>

            {/* Friendly note */}
            <p className="text-white/60 text-sm italic">
              Free estimates, always. No pressure, just good conversation.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ 11. FOOTER ═══════ */}
      <footer className="bg-dc-cream relative">
        {/* Hand-drawn decorative border at top */}
        <WavyBorderSVG color="#b87333" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Column 1: Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BrushAccentSVG className="text-dc-copper" />
                <span className="font-serif text-xl font-bold text-dc-charcoal">
                  {COMPANY.name}
                </span>
              </div>
              <p className="text-dc-charcoal/60 text-sm leading-relaxed mb-4">
                {COMPANY.tagline}. Proudly serving {COMPANY.serviceArea} since {COMPANY.founded}.
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                {(['facebook', 'instagram', 'yelp'] as const).map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-dc-copper/70 hover:text-dc-copper transition-colors duration-200"
                    aria-label={social}
                  >
                    <SocialIcon type={social} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <h4 className="font-serif font-bold text-dc-charcoal mb-4">Services</h4>
              <ul className="space-y-2">
                {SERVICES.slice(0, 5).map((service) => (
                  <li key={service.title}>
                    <a
                      href="#services"
                      className="text-dc-charcoal/60 hover:text-dc-copper transition-colors duration-200 text-sm"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: More Services */}
            <div>
              <h4 className="font-serif font-bold text-dc-charcoal mb-4">More Services</h4>
              <ul className="space-y-2">
                {SERVICES.slice(5).map((service) => (
                  <li key={service.title}>
                    <a
                      href="#services"
                      className="text-dc-charcoal/60 hover:text-dc-copper transition-colors duration-200 text-sm"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="font-serif font-bold text-dc-charcoal mb-4">Get in Touch</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:8478690584"
                    className="flex items-center gap-2 text-dc-charcoal/70 hover:text-dc-copper transition-colors duration-200 text-sm"
                  >
                    <PhoneIconSVG className="text-dc-copper/60 w-5 h-5" />
                    {COMPANY.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2 text-dc-charcoal/60 text-sm">
                  <svg viewBox="0 0 20 20" width="18" height="18" className="mt-0.5 text-dc-copper/60 flex-shrink-0" aria-hidden="true">
                    <path d="M10 2 C6 2, 3 5, 3 9 C3 14, 10 19, 10 19 C10 19, 17 14, 17 9 C17 5, 14 2, 10 2" stroke="currentColor" strokeWidth="1.5" style={handDrawnStyle} fill="none" />
                    <circle cx="10" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" style={handDrawnStyle} fill="none" />
                  </svg>
                  <span>{COMPANY.location}<br />Serving {COMPANY.serviceArea}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-dc-copper/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-dc-charcoal/50 text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()} {COMPANY.fullName} All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-dc-charcoal/50 hover:text-dc-copper text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-dc-charcoal/50 hover:text-dc-copper text-sm transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom decorative wave */}
        <WavyBorderSVG color="#6b8f71" flip />
      </footer>
    </div>
  );
}
