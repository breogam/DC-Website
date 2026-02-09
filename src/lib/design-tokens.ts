import { DesignTokens } from "./types";

export const defaultTokens: DesignTokens = {
  colors: {
    primary: "#6366f1",
    primaryLight: "#818cf8",
    primaryDark: "#4f46e5",
    secondary: "#a855f7",
    accent: "#06b6d4",
    background: "#ffffff",
    surface: "#f8fafc",
    surfaceAlt: "#f1f5f9",
    text: "#0f172a",
    textMuted: "#64748b",
    textInverse: "#ffffff",
    border: "#e2e8f0",
  },
  fonts: {
    heading: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  borderRadius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    full: "9999px",
  },
};

export function tokensToCSS(tokens: DesignTokens): Record<string, string> {
  return {
    "--color-primary": tokens.colors.primary,
    "--color-primary-light": tokens.colors.primaryLight,
    "--color-primary-dark": tokens.colors.primaryDark,
    "--color-secondary": tokens.colors.secondary,
    "--color-accent": tokens.colors.accent,
    "--color-bg": tokens.colors.background,
    "--color-surface": tokens.colors.surface,
    "--color-surface-alt": tokens.colors.surfaceAlt,
    "--color-text": tokens.colors.text,
    "--color-text-muted": tokens.colors.textMuted,
    "--color-text-inverse": tokens.colors.textInverse,
    "--color-border": tokens.colors.border,
    "--font-heading": tokens.fonts.heading,
    "--font-body": tokens.fonts.body,
    "--radius-sm": tokens.borderRadius.sm,
    "--radius-md": tokens.borderRadius.md,
    "--radius-lg": tokens.borderRadius.lg,
    "--radius-full": tokens.borderRadius.full,
  };
}
