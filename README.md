# Dynamic Colors Inc — Website

Marketing website for Dynamic Colors Inc, a professional painting and home services company.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS 4 with custom design tokens
- **Components**: Radix UI primitives (shadcn/ui pattern)
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Getting Started

```bash
npm install
npm run dev
```

## Design System

The design token system lives in `src/styles/tokens.css` and is registered via Tailwind's `@theme` directive in `src/index.css`.

- **Brand color**: `#F36525` (orange)
- **Accent color**: `#0F75E0` (blue)
- **Display font**: DM Serif Display
- **Body font**: Source Sans 3

Base UI components are in `src/components/ui/` and follow the shadcn/ui composition pattern.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
