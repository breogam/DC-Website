"use client";

import { FooterContent } from "@/lib/types";

interface FooterProps {
  content: FooterContent;
}

export default function Footer({ content }: FooterProps) {
  return (
    <footer
      className="py-14 border-t"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="#"
              className="text-lg font-bold tracking-tight"
              style={{ color: "var(--color-primary)" }}
            >
              {content.logo}
            </a>
            <p
              className="text-sm mt-3 max-w-xs leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Build conversion-optimized landing pages without code.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {content.social.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-colors hover:bg-[var(--color-surface-alt)]"
                  style={{ color: "var(--color-text-muted)" }}
                  aria-label={s.platform}
                >
                  {s.platform.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {content.columns.map((col) => (
            <div key={col.heading}>
              <h4
                className="text-sm font-semibold mb-3"
                style={{ color: "var(--color-text)" }}
              >
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-[var(--color-primary)]"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-8 border-t text-sm text-center"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-muted)",
          }}
        >
          {content.legal}
        </div>
      </div>
    </footer>
  );
}
