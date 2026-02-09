"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Palette,
  Type,
  Layout,
  Settings,
} from "lucide-react";
import { LandingPageConfig, SectionConfig } from "@/lib/types";

interface BuilderSidebarProps {
  config: LandingPageConfig;
  onConfigChange: (config: LandingPageConfig) => void;
  sections: SectionConfig[];
  onToggleSection: (id: string) => void;
}

export default function BuilderSidebar({
  config,
  onConfigChange,
  sections,
  onToggleSection,
}: BuilderSidebarProps) {
  const [activeTab, setActiveTab] = useState<"sections" | "design" | "content">(
    "sections"
  );
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "hero"
  );

  const tabs = [
    { id: "sections" as const, label: "Sections", icon: Layout },
    { id: "design" as const, label: "Design", icon: Palette },
    { id: "content" as const, label: "Content", icon: Type },
  ];

  const updateColor = (key: string, value: string) => {
    onConfigChange({
      ...config,
      tokens: {
        ...config.tokens,
        colors: {
          ...config.tokens.colors,
          [key]: value,
        },
      },
    });
  };

  const updateHero = (updates: Partial<typeof config.hero>) => {
    onConfigChange({
      ...config,
      hero: { ...config.hero, ...updates },
    });
  };

  const updateNavigation = (
    updates: Partial<typeof config.navigation>
  ) => {
    onConfigChange({
      ...config,
      navigation: { ...config.navigation, ...updates },
    });
  };

  return (
    <aside
      className="w-80 h-full flex flex-col border-r overflow-hidden"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-bg)",
      }}
    >
      {/* Header */}
      <div
        className="p-4 border-b flex items-center gap-2"
        style={{ borderColor: "var(--color-border)" }}
      >
        <Settings size={16} style={{ color: "var(--color-primary)" }} />
        <span className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
          Page Builder
        </span>
      </div>

      {/* Tab bar */}
      <div
        className="flex border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors border-b-2"
              style={{
                borderColor:
                  activeTab === tab.id
                    ? "var(--color-primary)"
                    : "transparent",
                color:
                  activeTab === tab.id
                    ? "var(--color-primary)"
                    : "var(--color-text-muted)",
              }}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "sections" && (
          <div className="space-y-1.5">
            <p
              className="text-xs font-medium mb-3 uppercase tracking-wider"
              style={{ color: "var(--color-text-muted)" }}
            >
              Toggle sections
            </p>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => !section.required && onToggleSection(section.id)}
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-sm transition-colors hover:bg-[var(--color-surface)]"
                style={{
                  color: section.enabled
                    ? "var(--color-text)"
                    : "var(--color-text-muted)",
                }}
              >
                <span className="font-medium">{section.name}</span>
                <div className="flex items-center gap-2">
                  {section.required && (
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: "var(--color-surface-alt)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Required
                    </span>
                  )}
                  {section.enabled ? (
                    <Eye
                      size={14}
                      style={{ color: "var(--color-primary)" }}
                    />
                  ) : (
                    <EyeOff size={14} />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === "design" && (
          <div className="space-y-5">
            <p
              className="text-xs font-medium mb-3 uppercase tracking-wider"
              style={{ color: "var(--color-text-muted)" }}
            >
              Color palette
            </p>
            {[
              { key: "primary", label: "Primary" },
              { key: "primaryLight", label: "Primary Light" },
              { key: "primaryDark", label: "Primary Dark" },
              { key: "secondary", label: "Secondary" },
              { key: "accent", label: "Accent" },
              { key: "background", label: "Background" },
              { key: "surface", label: "Surface" },
              { key: "text", label: "Text" },
              { key: "textMuted", label: "Text Muted" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3">
                <input
                  type="color"
                  value={
                    config.tokens.colors[
                      key as keyof typeof config.tokens.colors
                    ]
                  }
                  onChange={(e) => updateColor(key, e.target.value)}
                  className="w-8 h-8 rounded-lg border cursor-pointer"
                  style={{ borderColor: "var(--color-border)" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "var(--color-text)" }}
                >
                  {label}
                </span>
                <span
                  className="text-xs ml-auto font-mono"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {config.tokens.colors[
                    key as keyof typeof config.tokens.colors
                  ]}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-3">
            <p
              className="text-xs font-medium mb-3 uppercase tracking-wider"
              style={{ color: "var(--color-text-muted)" }}
            >
              Edit content
            </p>

            {/* Brand */}
            <div>
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === "brand" ? null : "brand"
                  )
                }
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium hover:bg-[var(--color-surface)] transition-colors"
                style={{ color: "var(--color-text)" }}
              >
                Brand
                {expandedSection === "brand" ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
              {expandedSection === "brand" && (
                <div className="pl-2.5 mt-2 space-y-3">
                  <FieldInput
                    label="Logo Text"
                    value={config.navigation.logo}
                    onChange={(v) => updateNavigation({ logo: v })}
                  />
                </div>
              )}
            </div>

            {/* Hero */}
            <div>
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === "hero" ? null : "hero"
                  )
                }
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium hover:bg-[var(--color-surface)] transition-colors"
                style={{ color: "var(--color-text)" }}
              >
                Hero Section
                {expandedSection === "hero" ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
              {expandedSection === "hero" && (
                <div className="pl-2.5 mt-2 space-y-3">
                  <FieldInput
                    label="Headline"
                    value={config.hero.headline}
                    onChange={(v) => updateHero({ headline: v })}
                  />
                  <FieldTextarea
                    label="Subheadline"
                    value={config.hero.subheadline}
                    onChange={(v) => updateHero({ subheadline: v })}
                  />
                  <FieldInput
                    label="Primary CTA"
                    value={config.hero.primaryCTA.text}
                    onChange={(v) =>
                      updateHero({
                        primaryCTA: { ...config.hero.primaryCTA, text: v },
                      })
                    }
                  />
                  <FieldInput
                    label="Social Proof"
                    value={config.hero.socialProof || ""}
                    onChange={(v) => updateHero({ socialProof: v })}
                  />
                </div>
              )}
            </div>

            {/* Final CTA */}
            <div>
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === "finalCTA" ? null : "finalCTA"
                  )
                }
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium hover:bg-[var(--color-surface)] transition-colors"
                style={{ color: "var(--color-text)" }}
              >
                Final CTA
                {expandedSection === "finalCTA" ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
              {expandedSection === "finalCTA" && (
                <div className="pl-2.5 mt-2 space-y-3">
                  <FieldInput
                    label="Headline"
                    value={config.finalCTA.headline}
                    onChange={(v) =>
                      onConfigChange({
                        ...config,
                        finalCTA: { ...config.finalCTA, headline: v },
                      })
                    }
                  />
                  <FieldTextarea
                    label="Description"
                    value={config.finalCTA.description}
                    onChange={(v) =>
                      onConfigChange({
                        ...config,
                        finalCTA: { ...config.finalCTA, description: v },
                      })
                    }
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function FieldInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        className="block text-xs font-medium mb-1"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-lg border outline-none transition-colors focus:border-[var(--color-primary)]"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text)",
        }}
      />
    </div>
  );
}

function FieldTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        className="block text-xs font-medium mb-1"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 text-sm rounded-lg border outline-none transition-colors focus:border-[var(--color-primary)] resize-none"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text)",
        }}
      />
    </div>
  );
}
