/* ==========================================================================
   DC Website — Main JavaScript
   Dark mode toggle + theme persistence + scroll reveal animations
   ========================================================================== */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     1. DARK MODE — Toggle, persistence, system preference
     ----------------------------------------------------------------------- */

  const STORAGE_KEY = 'dc-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update meta theme-color to match
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#1b1d24' : '#0a0a0a');
    }
  }

  function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });

    // Respond to system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /* -----------------------------------------------------------------------
     2. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ----------------------------------------------------------------------- */

  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate once only
          }
        });
      },
      { threshold: 0.2 }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* -----------------------------------------------------------------------
     3. NAV ANIMATION
     ----------------------------------------------------------------------- */

  function initNavAnimation() {
    var header = document.querySelector('.site-header');
    if (header) {
      header.classList.add('nav-animate');
    }
  }

  /* -----------------------------------------------------------------------
     4. HERO STAGGER ANIMATION
     ----------------------------------------------------------------------- */

  function initHeroAnimation() {
    var hero = document.querySelector('.hero');
    if (hero) {
      hero.classList.add('hero-animate');
    }
  }

  /* -----------------------------------------------------------------------
     5. FORM INTERACTION — focus glow
     ----------------------------------------------------------------------- */

  function initFormInteractions() {
    var inputs = document.querySelectorAll('.form__input, .form__textarea');
    inputs.forEach(function (input) {
      input.addEventListener('focus', function () {
        this.parentElement.classList.add('form__group--focused');
      });
      input.addEventListener('blur', function () {
        this.parentElement.classList.remove('form__group--focused');
      });
    });
  }

  /* -----------------------------------------------------------------------
     INIT
     ----------------------------------------------------------------------- */

  // Theme is already set by blocking script in <head>, just wire up toggle
  initThemeToggle();

  document.addEventListener('DOMContentLoaded', function () {
    initNavAnimation();
    initHeroAnimation();
    initScrollReveal();
    initFormInteractions();
  });
})();
