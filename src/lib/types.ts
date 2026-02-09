export interface DesignTokens {
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    textInverse: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

export interface NavigationContent {
  logo: string;
  items: NavItem[];
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  socialProof?: string;
  variant:
    | "split-diagonal"
    | "full-bleed"
    | "stacked-center"
    | "editorial-asymmetric"
    | "typographic-impact"
    | "bento-grid";
}

export interface SocialProofBarContent {
  items: string[];
  metric?: string;
}

export interface PainPoint {
  heading: string;
  description: string;
}

export interface ProblemAgitationContent {
  headline: string;
  description: string;
  painPoints: PainPoint[];
}

export interface Step {
  number: number;
  icon: string;
  heading: string;
  description: string;
}

export interface HowItWorksContent {
  headline: string;
  subheadline?: string;
  steps: Step[];
  cta?: { text: string; href: string };
}

export interface Feature {
  heading: string;
  description: string;
  icon: string;
}

export interface FeaturesContent {
  headline: string;
  subheadline?: string;
  features: Feature[];
}

export interface Testimonial {
  quote: string;
  highlight?: string;
  name: string;
  role: string;
  company: string;
  avatarInitials: string;
}

export interface TestimonialsContent {
  headline: string;
  testimonials: Testimonial[];
}

export interface PricingPlan {
  name: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  features: { text: string; included: boolean }[];
  cta: string;
  recommended?: boolean;
}

export interface PricingContent {
  headline: string;
  subheadline?: string;
  plans: PricingPlan[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  headline: string;
  items: FAQItem[];
}

export interface FinalCTAContent {
  headline: string;
  description: string;
  cta: { text: string; href: string };
  trustElement?: string;
}

export interface FooterContent {
  logo: string;
  columns: {
    heading: string;
    links: { label: string; href: string }[];
  }[];
  social: { platform: string; href: string }[];
  legal: string;
}

export interface LandingPageConfig {
  tokens: DesignTokens;
  navigation: NavigationContent;
  hero: HeroContent;
  socialProofBar?: SocialProofBarContent;
  problemAgitation?: ProblemAgitationContent;
  howItWorks: HowItWorksContent;
  features: FeaturesContent;
  testimonials: TestimonialsContent;
  pricing?: PricingContent;
  faq?: FAQContent;
  finalCTA: FinalCTAContent;
  footer: FooterContent;
}

export interface SectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  required: boolean;
}
