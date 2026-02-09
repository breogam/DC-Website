"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Palette, MousePointer, Rocket } from "lucide-react";
import { HowItWorksContent } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Palette,
  MousePointer,
  Rocket,
};

interface HowItWorksProps {
  content: HowItWorksContent;
}

export default function HowItWorks({ content }: HowItWorksProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="py-20 md:py-28"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 transition-all duration-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{
              color: "var(--color-text)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {content.headline}
          </h2>
          {content.subheadline && (
            <p
              className={`text-lg max-w-2xl mx-auto transition-all duration-600 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ color: "var(--color-text-muted)" }}
            >
              {content.subheadline}
            </p>
          )}
        </div>

        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-0.5"
            style={{
              background: `linear-gradient(90deg, var(--color-primary), var(--color-secondary))`,
              opacity: 0.2,
            }}
          />

          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {content.steps.map((step, i) => {
              const Icon = iconMap[step.icon];
              return (
                <div
                  key={step.number}
                  className={`text-center relative transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10 shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                      color: "var(--color-text-inverse)",
                    }}
                  >
                    {Icon ? <Icon size={24} /> : <span className="text-lg font-bold">{step.number}</span>}
                  </div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "var(--color-text)" }}
                  >
                    {step.heading}
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-xs mx-auto"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {content.cta && (
          <div
            className={`text-center mt-12 transition-all duration-500 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <a
              href={content.cta.href}
              className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:gap-3"
              style={{ color: "var(--color-primary)" }}
            >
              {content.cta.text}
              <ArrowRight size={16} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
