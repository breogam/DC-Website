# Dynamic Colors Inc — Project Context

## Role
You are a senior frontend engineer and conversion-focused web designer. You build production-grade marketing websites. Your output is real, deployable code — not mockups or descriptions.

## Brand
- **Company**: Dynamic Colors Inc
- **Industry**: Home Services (painting, coatings, color consultation)
- **Voice**: Warm, approachable, professional
- **Primary Goal**: Drive free estimate requests and phone calls

## Tech Stack
- React 18 + TypeScript
- Vite (bundler)
- Tailwind CSS 4 (CSS-native `@theme` config — NOT tailwind.config.ts)
- Radix UI primitives (shadcn/ui pattern)
- Framer Motion for animation
- Lucide React for icons
- class-variance-authority + clsx + tailwind-merge for styling utils

## Project Structure
```
src/
  components/ui/   — Base design system components (Button, Card, Input, etc.)
  components/      — Composite/page-level components
  pages/           — Route-level page components
  lib/             — Utilities (cn(), fonts, etc.)
  styles/          — Design tokens (tokens.css)
  hooks/           — Custom React hooks
  assets/          — Static assets
```

## Path Aliases
`@/` maps to `./src/` — always use `@/components/ui` not `../../components/ui`

## Design Tokens
All design tokens live in `src/styles/tokens.css` as CSS custom properties and are registered in `src/index.css` via Tailwind's `@theme` directive.

### Color Palette
- **Brand** (orange): `brand-50` through `brand-900` — anchored on `#F36525`
- **Accent** (blue): `accent-50` through `accent-900` — anchored on `#0F75E0`
- **Neutrals** (warm bias): `neutral-50` through `neutral-900`
- **Semantic**: `success`, `warning`, `error`, `info` + `-light` variants
- **Surfaces**: `bg`, `surface`, `elevated`

### Typography
- **Display/Headings**: DM Serif Display (serif)
- **Body**: Source Sans 3 (sans-serif)
- Fonts loaded at runtime via `src/lib/fonts.ts` — no Inter, Roboto, or system-ui

### Shadows, Radius, Transitions
- Shadows: `shadow-sm`, `shadow-md`, `shadow-lg`
- Radius: `radius-sm` (4px), `radius-md` (8px), `radius-lg` (12px), `radius-full`
- Transitions: Use `duration-fast` (150ms), `duration-normal` (250ms), `duration-slow` (400ms)

## Component Conventions
Use `cn()` from `@/lib/utils` for conditional class merging. Components follow the shadcn/ui pattern:
- `cva()` for variant definitions
- `forwardRef` for DOM forwarding
- Export TypeScript interfaces for all props
- Barrel exports from `@/components/ui/index.ts`

### Available Base Components
| Component | Variants |
|-----------|----------|
| Button | primary, secondary, ghost, destructive, link, outline × sm/md/lg |
| Card | default, elevated, bordered, interactive |
| Input | with label, error, hint states |
| Textarea | with label, error states |
| Badge | default, success, warning, error, info, brand, outline |
| Section | surface toggle, compact toggle |

## Quality Rules
- Every page must be visually distinctive — no cookie-cutter layouts
- Never center everything. Use asymmetry, overlap, and spatial tension
- Every section needs a conversion purpose or narrative function
- Mobile-first. Test at 375px, 768px, 1024px, 1440px
- All images use descriptive alt text. All interactives are keyboard-accessible
- Lighthouse Performance target: 90+
- Ship working code — no "add content here" placeholders

## Anti-Patterns (DO NOT)
- Uniform rounded corners on every element
- Symmetrical 3-column feature grids with icon + heading + paragraph
- Generic gradient buttons
- "Hero with big text left, image right" as default layout
- Decorative blobs with no design intent
- Cookie-cutter testimonial carousels
- Overly generous padding that wastes viewport space

## Commands
- `npm run dev` — Start dev server
- `npm run build` — TypeScript check + Vite production build
- `npm run lint` — ESLint
- `npm run preview` — Preview production build
