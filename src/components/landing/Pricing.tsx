"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check, X } from "lucide-react";
import { PricingContent } from "@/lib/types";

interface PricingProps {
  content: PricingContent;
}

export default function Pricing({ content }: PricingProps) {
  const [annual, setAnnual] = useState(true);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="pricing"
      className="py-20 md:py-28"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
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
              className={`text-lg max-w-2xl mx-auto mb-8 transition-all duration-600 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ color: "var(--color-text-muted)" }}
            >
              {content.subheadline}
            </p>
          )}

          {/* Toggle */}
          <div
            className={`inline-flex items-center gap-3 p-1 rounded-full border transition-all duration-600 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <button
              onClick={() => setAnnual(false)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: !annual ? "var(--color-bg)" : "transparent",
                color: !annual
                  ? "var(--color-text)"
                  : "var(--color-text-muted)",
                boxShadow: !annual ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: annual ? "var(--color-bg)" : "transparent",
                color: annual
                  ? "var(--color-text)"
                  : "var(--color-text-muted)",
                boxShadow: annual ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              Annual{" "}
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {content.plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-6 md:p-7 transition-all duration-600 ${
                plan.recommended
                  ? "shadow-lg md:-mt-2 md:mb-0 md:scale-[1.03]"
                  : ""
              } ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                borderColor: plan.recommended
                  ? "var(--color-primary)"
                  : "var(--color-border)",
                backgroundColor: "var(--color-bg)",
                transitionDelay: `${(i + 1) * 100}ms`,
              }}
            >
              {plan.recommended && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-text-inverse)",
                  }}
                >
                  Most Popular
                </div>
              )}
              <h3
                className="text-lg font-semibold mb-1"
                style={{ color: "var(--color-text)" }}
              >
                {plan.name}
              </h3>
              <p
                className="text-sm mb-5"
                style={{ color: "var(--color-text-muted)" }}
              >
                {plan.description}
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span
                  className="text-4xl font-bold"
                  style={{ color: "var(--color-text)" }}
                >
                  ${annual ? plan.priceAnnual : plan.priceMonthly}
                </span>
                {(annual ? plan.priceAnnual : plan.priceMonthly) > 0 && (
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    /mo
                  </span>
                )}
                {(annual ? plan.priceAnnual : plan.priceMonthly) === 0 && (
                  <span
                    className="text-sm ml-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    forever
                  </span>
                )}
              </div>
              <a
                href="#cta"
                className="block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-all mb-6"
                style={
                  plan.recommended
                    ? {
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-text-inverse)",
                      }
                    : {
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text)",
                      }
                }
              >
                {plan.cta}
              </a>
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5 text-sm">
                    {f.included ? (
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--color-accent)" }}
                      />
                    ) : (
                      <X
                        size={16}
                        className="mt-0.5 shrink-0 opacity-30"
                        style={{ color: "var(--color-text-muted)" }}
                      />
                    )}
                    <span
                      style={{
                        color: f.included
                          ? "var(--color-text)"
                          : "var(--color-text-muted)",
                        opacity: f.included ? 1 : 0.5,
                      }}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
