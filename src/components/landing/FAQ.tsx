"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronDown } from "lucide-react";
import { FAQContent } from "@/lib/types";

interface FAQProps {
  content: FAQContent;
}

export default function FAQ({ content }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="faq"
      className="py-20 md:py-28"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className={`text-3xl md:text-4xl font-bold tracking-tight mb-10 text-center transition-all duration-600 ${
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

        <div className="space-y-3">
          {content.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className={`rounded-xl border overflow-hidden transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{
                  borderColor: isOpen
                    ? "var(--color-primary)"
                    : "var(--color-border)",
                  backgroundColor: "var(--color-bg)",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span
                    className="text-sm font-semibold pr-4"
                    style={{ color: "var(--color-text)" }}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    style={{ color: "var(--color-text-muted)" }}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <p
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
