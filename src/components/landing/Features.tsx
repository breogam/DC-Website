"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  LayoutGrid,
  Sparkles,
  BarChart3,
  Globe,
  Layers,
  Users,
} from "lucide-react";
import { FeaturesContent } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  LayoutGrid,
  Sparkles,
  BarChart3,
  Globe,
  Layers,
  Users,
};

interface FeaturesProps {
  content: FeaturesContent;
}

export default function Features({ content }: FeaturesProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="features"
      className="py-20 md:py-28"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Bento grid layout — deliberately NOT a uniform 3-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
          {content.features.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            // Vary grid sizes for visual interest
            const spans = [
              "md:col-span-4",
              "md:col-span-2",
              "md:col-span-2",
              "md:col-span-4",
              "md:col-span-3",
              "md:col-span-3",
            ];
            const span = spans[i % spans.length];

            return (
              <div
                key={feature.heading}
                className={`${span} group relative p-6 md:p-7 rounded-xl border transition-all duration-500 hover:shadow-md hover:-translate-y-0.5 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-bg)",
                  transitionDelay: `${(i + 1) * 100}ms`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--color-primary) 10%, transparent)`,
                    color: "var(--color-primary)",
                  }}
                >
                  {Icon && <Icon size={20} />}
                </div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {feature.heading}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
