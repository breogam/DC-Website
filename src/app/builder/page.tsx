"use client";

import { useState, useCallback } from "react";
import { defaultLandingPageConfig } from "@/lib/default-content";
import { LandingPageConfig, SectionConfig } from "@/lib/types";
import BuilderSidebar from "@/components/builder/BuilderSidebar";
import LandingPagePreview from "@/components/landing/LandingPagePreview";
import { Monitor, Smartphone, Tablet, ArrowLeft, Code } from "lucide-react";

const initialSections: SectionConfig[] = [
  { id: "navigation", name: "Navigation", enabled: true, required: true },
  { id: "hero", name: "Hero", enabled: true, required: true },
  { id: "socialProofBar", name: "Social Proof Bar", enabled: true, required: false },
  { id: "problemAgitation", name: "Problem Agitation", enabled: true, required: false },
  { id: "howItWorks", name: "How It Works", enabled: true, required: true },
  { id: "features", name: "Features / Benefits", enabled: true, required: true },
  { id: "testimonials", name: "Testimonials", enabled: true, required: true },
  { id: "pricing", name: "Pricing", enabled: true, required: false },
  { id: "faq", name: "FAQ", enabled: true, required: false },
  { id: "finalCTA", name: "Final CTA", enabled: true, required: true },
  { id: "footer", name: "Footer", enabled: true, required: true },
];

type Viewport = "desktop" | "tablet" | "mobile";

export default function BuilderPage() {
  const [config, setConfig] = useState<LandingPageConfig>(
    defaultLandingPageConfig
  );
  const [sections, setSections] = useState<SectionConfig[]>(initialSections);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [showCode, setShowCode] = useState(false);

  const handleToggleSection = useCallback((id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  }, []);

  const sectionVisibility = sections.reduce(
    (acc, s) => ({ ...acc, [s.id]: s.enabled }),
    {} as Record<string, boolean>
  );

  const viewportWidths: Record<Viewport, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: "var(--color-surface-alt)" }}>
      {/* Top bar */}
      <header
        className="h-12 flex items-center justify-between px-4 border-b shrink-0"
        style={{
          backgroundColor: "var(--color-bg)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[var(--color-primary)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <ArrowLeft size={14} />
            Back
          </a>
          <div
            className="w-px h-5"
            style={{ backgroundColor: "var(--color-border)" }}
          />
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            {config.navigation.logo}
          </span>
        </div>

        {/* Viewport controls */}
        <div className="flex items-center gap-1">
          {[
            { id: "desktop" as Viewport, icon: Monitor },
            { id: "tablet" as Viewport, icon: Tablet },
            { id: "mobile" as Viewport, icon: Smartphone },
          ].map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setViewport(id)}
              className="p-1.5 rounded-md transition-colors"
              style={{
                backgroundColor:
                  viewport === id ? "var(--color-surface)" : "transparent",
                color:
                  viewport === id
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
              }}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors"
            style={{
              borderColor: "var(--color-border)",
              color: showCode
                ? "var(--color-primary)"
                : "var(--color-text-muted)",
              backgroundColor: showCode
                ? "var(--color-surface)"
                : "transparent",
            }}
          >
            <Code size={12} />
            Code
          </button>
          <button
            className="px-4 py-1.5 text-xs font-semibold rounded-md text-white transition-colors"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Publish
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <BuilderSidebar
          config={config}
          onConfigChange={setConfig}
          sections={sections}
          onToggleSection={handleToggleSection}
        />

        {/* Preview area */}
        <main className="flex-1 overflow-hidden p-4">
          {showCode ? (
            <div
              className="h-full rounded-xl border overflow-auto p-6"
              style={{
                backgroundColor: "var(--color-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <pre
                className="text-xs font-mono leading-relaxed whitespace-pre-wrap"
                style={{ color: "var(--color-text-muted)" }}
              >
                {JSON.stringify(config, null, 2)}
              </pre>
            </div>
          ) : (
            <div
              className="h-full mx-auto rounded-xl border overflow-auto shadow-sm transition-all duration-300"
              style={{
                maxWidth: viewportWidths[viewport],
                backgroundColor: "var(--color-bg)",
                borderColor: "var(--color-border)",
              }}
            >
              <LandingPagePreview
                config={config}
                sections={sectionVisibility}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
