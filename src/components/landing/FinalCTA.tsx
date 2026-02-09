"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { FinalCTAContent } from "@/lib/types";

interface FinalCTAProps {
  content: FinalCTAContent;
}

export default function FinalCTA({ content }: FinalCTAProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="cta"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--color-primary-dark), var(--color-primary), var(--color-secondary))`,
      }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: `radial-gradient(circle, var(--color-text-inverse) 1px, transparent 1px)`,
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 transition-all duration-600 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{
            color: "var(--color-text-inverse)",
            fontFamily: "var(--font-heading)",
          }}
        >
          {content.headline}
        </h2>
        <p
          className={`text-lg mb-8 max-w-xl mx-auto transition-all duration-600 delay-100 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ color: "rgba(255, 255, 255, 0.85)" }}
        >
          {content.description}
        </p>
        <div
          className={`transition-all duration-600 delay-200 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href={content.cta.href}
            className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--color-text-inverse)",
              color: "var(--color-primary)",
            }}
          >
            {content.cta.text}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>
        {content.trustElement && (
          <p
            className={`text-sm mt-5 transition-all duration-600 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
          >
            {content.trustElement}
          </p>
        )}
      </div>
    </section>
  );
}
