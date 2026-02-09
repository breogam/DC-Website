"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavigationContent } from "@/lib/types";

interface NavigationProps {
  content: NavigationContent;
}

export default function Navigation({ content }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-[var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <a
            href="#"
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--color-primary)" }}
          >
            {content.logo}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {content.items.map((item) =>
              item.isButton ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white transition-all hover:opacity-90 hover:shadow-md"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-[var(--color-surface-alt)]"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[var(--color-surface-alt)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 animate-fade-in">
          <div className="flex flex-col p-6 gap-2">
            {content.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  item.isButton
                    ? "text-white text-center mt-2"
                    : "hover:bg-[var(--color-surface-alt)]"
                }`}
                style={
                  item.isButton
                    ? { backgroundColor: "var(--color-primary)" }
                    : { color: "var(--color-text)" }
                }
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
