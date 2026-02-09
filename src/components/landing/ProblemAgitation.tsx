"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AlertTriangle } from "lucide-react";
import { ProblemAgitationContent } from "@/lib/types";

interface ProblemAgitationProps {
  content: ProblemAgitationContent;
}

export default function ProblemAgitation({ content }: ProblemAgitationProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="problem"
      className="py-20 md:py-28"
      style={{ backgroundColor: "var(--color-bg)" }}
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
          <p
            className={`text-lg max-w-2xl mx-auto transition-all duration-600 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ color: "var(--color-text-muted)" }}
          >
            {content.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {content.painPoints.map((point, i) => (
            <div
              key={point.heading}
              className={`group relative p-6 rounded-xl border transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg)",
                transitionDelay: `${(i + 1) * 120}ms`,
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{
                  backgroundColor: "#fef2f2",
                  color: "#ef4444",
                }}
              >
                <AlertTriangle size={20} />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--color-text)" }}
              >
                {point.heading}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
