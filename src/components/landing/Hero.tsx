"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { HeroContent } from "@/lib/types";

interface HeroProps {
  content: HeroContent;
}

export default function Hero({ content }: HeroProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-primary) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, var(--color-secondary) 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, var(--color-primary-light) 0%, transparent 25%)`,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundSize: "60px 60px",
          backgroundImage: `linear-gradient(to right, var(--color-text) 1px, transparent 1px),
                           linear-gradient(to bottom, var(--color-text) 1px, transparent 1px)`,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
        {/* Social proof badge */}
        {content.socialProof && (
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border ${
              loaded ? "animate-fade-up stagger-1" : "opacity-0-initial"
            }`}
            style={{
              backgroundColor: "var(--color-surface)",
              color: "var(--color-primary)",
              borderColor: "var(--color-border)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            {content.socialProof}
          </div>
        )}

        {/* Headline */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 ${
            loaded ? "animate-fade-up stagger-2" : "opacity-0-initial"
          }`}
          style={{ color: "var(--color-text)", fontFamily: "var(--font-heading)" }}
        >
          {content.headline.split(" ").map((word, i) => {
            const highlightWords = ["Convert", "Actually", "Better", "Fast"];
            if (highlightWords.some((hw) => word.includes(hw))) {
              return (
                <span key={i}>
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                    }}
                  >
                    {word}
                  </span>{" "}
                </span>
              );
            }
            return <span key={i}>{word} </span>;
          })}
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${
            loaded ? "animate-fade-up stagger-3" : "opacity-0-initial"
          }`}
          style={{ color: "var(--color-text-muted)" }}
        >
          {content.subheadline}
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${
            loaded ? "animate-fade-up stagger-4" : "opacity-0-initial"
          }`}
        >
          <a
            href={content.primaryCTA.href}
            className="group inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold rounded-lg text-white transition-all hover:shadow-lg hover:shadow-[var(--color-primary)]/25 hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--color-primary)",
            }}
          >
            {content.primaryCTA.text}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
          {content.secondaryCTA && (
            <a
              href={content.secondaryCTA.href}
              className="group inline-flex items-center gap-2 px-6 py-3.5 text-base font-medium rounded-lg border transition-all hover:bg-[var(--color-surface)]"
              style={{
                color: "var(--color-text)",
                borderColor: "var(--color-border)",
              }}
            >
              <Play size={16} style={{ color: "var(--color-primary)" }} />
              {content.secondaryCTA.text}
            </a>
          )}
        </div>

        {/* Visual element: abstract gradient orbs */}
        <div
          className={`mt-16 relative ${
            loaded ? "animate-scale-in stagger-5" : "opacity-0-initial"
          }`}
        >
          <div className="relative mx-auto max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-[var(--color-border)]">
            <div
              className="aspect-[16/9] w-full"
              style={{
                background: `linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-alt) 100%)`,
              }}
            >
              {/* Mock app interface */}
              <div className="p-4 md:p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div
                    className="ml-4 flex-1 h-6 rounded-md"
                    style={{ backgroundColor: "var(--color-surface-alt)" }}
                  />
                </div>
                <div className="flex-1 grid grid-cols-4 gap-3">
                  <div
                    className="col-span-1 rounded-lg"
                    style={{ backgroundColor: "var(--color-surface-alt)" }}
                  />
                  <div className="col-span-3 flex flex-col gap-3">
                    <div
                      className="h-1/3 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                        opacity: 0.15,
                      }}
                    />
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="rounded-lg"
                          style={{
                            backgroundColor: "var(--color-surface-alt)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow effect behind the mock */}
          <div
            className="absolute -inset-4 -z-10 rounded-2xl opacity-20 blur-3xl"
            style={{
              background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
