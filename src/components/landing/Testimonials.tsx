"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Quote } from "lucide-react";
import { TestimonialsContent } from "@/lib/types";

interface TestimonialsProps {
  content: TestimonialsContent;
}

export default function Testimonials({ content }: TestimonialsProps) {
  const { ref, isVisible } = useScrollAnimation();

  const featured = content.testimonials[0];
  const others = content.testimonials.slice(1);

  return (
    <section
      ref={ref}
      id="testimonials"
      className="py-20 md:py-28"
      style={{ backgroundColor: "var(--color-surface)" }}
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
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Featured testimonial — larger */}
          {featured && (
            <div
              className={`md:col-span-3 relative p-8 rounded-xl border transition-all duration-600 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-bg)",
                transitionDelay: "150ms",
              }}
            >
              <Quote
                size={32}
                className="mb-4 opacity-15"
                style={{ color: "var(--color-primary)" }}
              />
              {featured.highlight && (
                <p
                  className="text-xl md:text-2xl font-semibold leading-snug mb-4"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  &ldquo;{featured.highlight}&rdquo;
                </p>
              )}
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--color-text-muted)" }}
              >
                {featured.quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                    color: "var(--color-text-inverse)",
                  }}
                >
                  {featured.avatarInitials}
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {featured.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {featured.role}, {featured.company}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Side testimonials */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {others.map((t, i) => (
              <div
                key={t.name}
                className={`relative p-6 rounded-xl border flex-1 transition-all duration-600 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-bg)",
                  transitionDelay: `${(i + 2) * 150}ms`,
                }}
              >
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                    style={{
                      background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                      color: "var(--color-text-inverse)",
                    }}
                  >
                    {t.avatarInitials}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
