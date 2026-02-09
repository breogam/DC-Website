"use client";

import { LandingPageConfig } from "@/lib/types";
import { tokensToCSS } from "@/lib/design-tokens";
import Navigation from "./Navigation";
import Hero from "./Hero";
import SocialProofBar from "./SocialProofBar";
import ProblemAgitation from "./ProblemAgitation";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";

interface LandingPagePreviewProps {
  config: LandingPageConfig;
  sections?: Record<string, boolean>;
}

export default function LandingPagePreview({
  config,
  sections,
}: LandingPagePreviewProps) {
  const cssVars = tokensToCSS(config.tokens);
  const isEnabled = (name: string, fallback: boolean = true) =>
    sections ? sections[name] ?? fallback : fallback;

  return (
    <div style={cssVars as React.CSSProperties}>
      {isEnabled("navigation") && <Navigation content={config.navigation} />}
      {isEnabled("hero") && <Hero content={config.hero} />}
      {isEnabled("socialProofBar") && config.socialProofBar && (
        <SocialProofBar content={config.socialProofBar} />
      )}
      {isEnabled("problemAgitation") && config.problemAgitation && (
        <ProblemAgitation content={config.problemAgitation} />
      )}
      {isEnabled("howItWorks") && (
        <HowItWorks content={config.howItWorks} />
      )}
      {isEnabled("features") && <Features content={config.features} />}
      {isEnabled("testimonials") && (
        <Testimonials content={config.testimonials} />
      )}
      {isEnabled("pricing") && config.pricing && (
        <Pricing content={config.pricing} />
      )}
      {isEnabled("faq") && config.faq && <FAQ content={config.faq} />}
      {isEnabled("finalCTA") && <FinalCTA content={config.finalCTA} />}
      {isEnabled("footer") && <Footer content={config.footer} />}
    </div>
  );
}
