"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SocialProofBarContent } from "@/lib/types";

interface SocialProofBarProps {
  content: SocialProofBarContent;
}

export default function SocialProofBar({ content }: SocialProofBarProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-12 border-y"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {content.metric && (
          <p
            className={`text-center text-sm font-medium mb-6 transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ color: "var(--color-text-muted)" }}
          >
            {content.metric}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {content.items.map((item, i) => (
            <span
              key={item}
              className={`text-lg font-semibold tracking-tight transition-all duration-500 ${
                isVisible
                  ? "opacity-40 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                color: "var(--color-text)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
