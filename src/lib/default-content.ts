import { LandingPageConfig } from "./types";
import { defaultTokens } from "./design-tokens";

export const defaultLandingPageConfig: LandingPageConfig = {
  tokens: defaultTokens,
  navigation: {
    logo: "PageCraft",
    items: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Get Started", href: "#cta", isButton: true },
    ],
  },
  hero: {
    headline: "Build Landing Pages That Actually Convert",
    subheadline:
      "Stop wasting weeks on landing pages that don't perform. PageCraft gives you conversion-optimized templates, a visual builder, and AI-powered copy suggestions — so you can launch in hours, not months.",
    primaryCTA: { text: "Start Building Free", href: "#cta" },
    secondaryCTA: { text: "Watch Demo", href: "#demo" },
    socialProof: "Trusted by 10,000+ teams worldwide",
    variant: "stacked-center",
  },
  socialProofBar: {
    items: ["TechCrunch", "Forbes", "ProductHunt", "Y Combinator", "Wired"],
    metric: "#1 on Product Hunt",
  },
  problemAgitation: {
    headline: "Building Landing Pages Shouldn't Be This Hard",
    description:
      "You know you need a high-converting landing page. But the process is painful.",
    painPoints: [
      {
        heading: "Design Paralysis",
        description:
          "You spend hours picking layouts, colors, and fonts — only to end up with something that looks like every other template out there.",
      },
      {
        heading: "Developer Bottleneck",
        description:
          "Every change requires a developer. A simple headline tweak turns into a week-long sprint ticket.",
      },
      {
        heading: "No Idea What Works",
        description:
          "You launch, get traffic, but conversions are flat. No data on what's working and what's killing your funnel.",
      },
    ],
  },
  howItWorks: {
    headline: "Launch in 3 Simple Steps",
    subheadline:
      "From blank canvas to live landing page — no design or dev skills required.",
    steps: [
      {
        number: 1,
        icon: "Palette",
        heading: "Choose Your Foundation",
        description:
          "Pick from 50+ conversion-tested templates or start from scratch. Customize your design system with one click.",
      },
      {
        number: 2,
        icon: "MousePointer",
        heading: "Build Visually",
        description:
          "Drag, drop, and customize every section. Real-time preview shows exactly what your visitors will see.",
      },
      {
        number: 3,
        icon: "Rocket",
        heading: "Launch & Optimize",
        description:
          "Publish to your domain instantly. Built-in analytics show you what's converting and what needs work.",
      },
    ],
    cta: { text: "Start Building Free", href: "#cta" },
  },
  features: {
    headline: "Everything You Need to Convert",
    subheadline:
      "Built for marketers, founders, and product teams who want results — not another design tool to learn.",
    features: [
      {
        heading: "Visual Drag & Drop Builder",
        description:
          "Build pixel-perfect landing pages without writing a single line of code. Our intuitive builder gives you full creative control with a live preview that updates as you design.",
        icon: "LayoutGrid",
      },
      {
        heading: "AI Copy Assistant",
        description:
          "Stuck on your headline? Our AI analyzes your product, audience, and competitors to generate high-converting copy options that speak directly to your customer's pain points.",
        icon: "Sparkles",
      },
      {
        heading: "Conversion Analytics",
        description:
          "Know exactly what's working. Heatmaps, scroll depth tracking, and A/B testing built right in. Make data-driven decisions to continuously improve your conversion rate.",
        icon: "BarChart3",
      },
      {
        heading: "One-Click Publish",
        description:
          "Connect your domain and go live in seconds. Automatic SSL, CDN delivery, and mobile optimization mean your page loads fast everywhere in the world.",
        icon: "Globe",
      },
      {
        heading: "Component Library",
        description:
          "Access 200+ pre-built sections — heroes, pricing tables, testimonials, FAQs, and more. Each one designed by conversion experts and tested across millions of visitors.",
        icon: "Layers",
      },
      {
        heading: "Team Collaboration",
        description:
          "Invite your team, leave comments, request reviews, and manage versions. Built-in approval workflows keep everyone aligned without endless email chains.",
        icon: "Users",
      },
    ],
  },
  testimonials: {
    headline: "Loved by Teams Who Ship Fast",
    testimonials: [
      {
        quote:
          "We went from spending 3 weeks per landing page to launching in a single afternoon. Our conversion rate jumped 340% in the first month.",
        highlight: "conversion rate jumped 340%",
        name: "Sarah Chen",
        role: "Head of Growth",
        company: "Streamline",
        avatarInitials: "SC",
      },
      {
        quote:
          "The AI copy suggestions are genuinely useful. It's not generic filler — it actually understands our audience and writes headlines that perform.",
        highlight: "actually understands our audience",
        name: "Marcus Johnson",
        role: "Founder & CEO",
        company: "LaunchPad",
        avatarInitials: "MJ",
      },
      {
        quote:
          "I cancelled our expensive design agency contract. PageCraft gives our marketing team complete independence. We test 10x more ideas now.",
        highlight: "We test 10x more ideas now",
        name: "Anya Patel",
        role: "VP of Marketing",
        company: "NovaTech",
        avatarInitials: "AP",
      },
    ],
  },
  pricing: {
    headline: "Simple, Transparent Pricing",
    subheadline:
      "Start free. Upgrade when you're ready. No surprises, no hidden fees.",
    plans: [
      {
        name: "Starter",
        description: "For individuals and side projects",
        priceMonthly: 0,
        priceAnnual: 0,
        features: [
          { text: "3 landing pages", included: true },
          { text: "Basic templates", included: true },
          { text: "PageCraft subdomain", included: true },
          { text: "Community support", included: true },
          { text: "Custom domains", included: false },
          { text: "AI copy assistant", included: false },
          { text: "Analytics dashboard", included: false },
          { text: "Team collaboration", included: false },
        ],
        cta: "Get Started Free",
      },
      {
        name: "Pro",
        description: "For growing teams and businesses",
        priceMonthly: 29,
        priceAnnual: 24,
        features: [
          { text: "Unlimited landing pages", included: true },
          { text: "All premium templates", included: true },
          { text: "Custom domains", included: true },
          { text: "AI copy assistant", included: true },
          { text: "Analytics dashboard", included: true },
          { text: "A/B testing", included: true },
          { text: "Priority support", included: true },
          { text: "Team collaboration (5 seats)", included: true },
        ],
        cta: "Start Free Trial",
        recommended: true,
      },
      {
        name: "Enterprise",
        description: "For large teams with custom needs",
        priceMonthly: 99,
        priceAnnual: 79,
        features: [
          { text: "Everything in Pro", included: true },
          { text: "Unlimited team seats", included: true },
          { text: "Custom integrations", included: true },
          { text: "Dedicated account manager", included: true },
          { text: "SSO & advanced security", included: true },
          { text: "SLA guarantee", included: true },
          { text: "Custom template design", included: true },
          { text: "API access", included: true },
        ],
        cta: "Contact Sales",
      },
    ],
  },
  faq: {
    headline: "Frequently Asked Questions",
    items: [
      {
        question: "Is PageCraft really free to start?",
        answer:
          "Yes, the Starter plan is completely free with no credit card required. You can create up to 3 landing pages and publish them on a PageCraft subdomain. Upgrade anytime when you need more features.",
      },
      {
        question: "Can I use my own custom domain?",
        answer:
          "Custom domains are available on the Pro plan and above. Simply connect your domain in the settings, and we handle SSL certificates and DNS configuration automatically.",
      },
      {
        question: "Do I need coding skills?",
        answer:
          "Not at all. PageCraft is designed for non-technical users. Our visual builder lets you create professional landing pages by dragging, dropping, and customizing — no code required. If you do want to add custom code, that option is available too.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer:
          "Absolutely. There are no long-term contracts or cancellation fees. You can upgrade, downgrade, or cancel your plan at any time from your account settings. Your pages will remain live until the end of your billing period.",
      },
      {
        question: "How does the AI copy assistant work?",
        answer:
          "Our AI analyzes your product description, target audience, and industry to generate headline and body copy options. It's trained on millions of high-converting landing pages. You can generate multiple versions and pick the one that resonates best.",
      },
      {
        question: "What kind of analytics do you provide?",
        answer:
          "The Pro plan includes a full analytics dashboard with page views, conversion rates, scroll depth heatmaps, click tracking, and A/B test results. You can see exactly how visitors interact with every section of your page.",
      },
    ],
  },
  finalCTA: {
    headline: "Ready to Build Pages That Convert?",
    description:
      "Join 10,000+ teams who launch faster and convert better with PageCraft. Your first page is free — no credit card required.",
    cta: { text: "Start Building Free", href: "#cta" },
    trustElement: "Free forever plan available. No credit card required.",
  },
  footer: {
    logo: "PageCraft",
    columns: [
      {
        heading: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Templates", href: "#" },
          { label: "Pricing", href: "#pricing" },
          { label: "Integrations", href: "#" },
          { label: "Changelog", href: "#" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Documentation", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Guides", href: "#" },
          { label: "Help Center", href: "#" },
          { label: "API Reference", href: "#" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Contact", href: "#" },
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
        ],
      },
    ],
    social: [
      { platform: "Twitter", href: "#" },
      { platform: "GitHub", href: "#" },
      { platform: "LinkedIn", href: "#" },
    ],
    legal: `\u00a9 ${new Date().getFullYear()} PageCraft. All rights reserved.`,
  },
};
