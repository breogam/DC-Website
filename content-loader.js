/* ==========================================================================
   DC Website — Content Loader
   Fetches page content from JSON files (managed by Decap CMS) and injects
   it into the page. The static HTML serves as the fallback for SEO and
   first-paint, so if the fetch fails, everything still works.
   ========================================================================== */

(function () {
  'use strict';

  /**
   * Detect which page we're on from the URL path.
   */
  function getPageName() {
    var path = window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '');
    if (path === '' || path === '/index') return 'home';
    return path.replace(/^\//, '');
  }

  /**
   * Convert markdown-style *bold* to <em> tags for highlighted words.
   */
  function formatTitle(text) {
    if (!text) return '';
    return text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }

  /**
   * Set the text content of an element found by selector.
   */
  function setText(selector, text) {
    var el = document.querySelector(selector);
    if (el && text !== undefined) el.textContent = text;
  }

  /**
   * Set the innerHTML of an element found by selector.
   */
  function setHtml(selector, html) {
    var el = document.querySelector(selector);
    if (el && html !== undefined) el.innerHTML = html;
  }

  /**
   * Apply home page content.
   */
  function applyHome(data) {
    setText('[data-cms="hero-badge"]', data.hero_badge);
    setHtml('[data-cms="hero-title"]', formatTitle(data.hero_title));
    setText('[data-cms="hero-subtitle"]', data.hero_subtitle);
    setText('[data-cms="hero-cta-primary"]', data.hero_cta_primary);
    setText('[data-cms="hero-cta-secondary"]', data.hero_cta_secondary);

    applyStats(data.stats);
    applyCards('[data-cms="features"] .card', data.features);

    setText('[data-cms="features-label"]', data.features_label);
    setHtml('[data-cms="features-title"]', data.features_title);
    setText('[data-cms="features-subtitle"]', data.features_subtitle);

    setText('[data-cms="cta-title"]', data.cta_title);
    setText('[data-cms="cta-text"]', data.cta_text);
    setText('[data-cms="cta-button"]', data.cta_button);
  }

  /**
   * Apply about page content.
   */
  function applyAbout(data) {
    setText('[data-cms="hero-badge"]', data.hero_badge);
    setHtml('[data-cms="hero-title"]', formatTitle(data.hero_title));
    setText('[data-cms="hero-subtitle"]', data.hero_subtitle);

    setText('[data-cms="values-label"]', data.values_label);
    setText('[data-cms="values-title"]', data.values_title);
    setText('[data-cms="values-subtitle"]', data.values_subtitle);
    applyCards('[data-cms="values"] .card', data.values);

    applyStats(data.stats);

    setText('[data-cms="cta-title"]', data.cta_title);
    setText('[data-cms="cta-text"]', data.cta_text);
    setText('[data-cms="cta-button"]', data.cta_button);
  }

  /**
   * Apply products page content.
   */
  function applyProducts(data) {
    setText('[data-cms="hero-badge"]', data.hero_badge);
    setHtml('[data-cms="hero-title"]', formatTitle(data.hero_title));
    setText('[data-cms="hero-subtitle"]', data.hero_subtitle);

    applyCards('[data-cms="products"] .card', data.products);

    setText('[data-cms="why-label"]', data.why_label);
    setText('[data-cms="why-title"]', data.why_title);
    applyCards('[data-cms="reasons"] .card', data.reasons);

    setText('[data-cms="cta-title"]', data.cta_title);
    setText('[data-cms="cta-text"]', data.cta_text);
    setText('[data-cms="cta-button"]', data.cta_button);
  }

  /**
   * Apply pricing page content.
   */
  function applyPricing(data) {
    setText('[data-cms="hero-badge"]', data.hero_badge);
    setHtml('[data-cms="hero-title"]', formatTitle(data.hero_title));
    setText('[data-cms="hero-subtitle"]', data.hero_subtitle);

    // Pricing cards
    var cards = document.querySelectorAll('[data-cms="plans"] .pricing-card');
    if (data.plans && cards.length) {
      data.plans.forEach(function (plan, i) {
        if (!cards[i]) return;
        var card = cards[i];
        var nameEl = card.querySelector('.pricing-card__name');
        var priceEl = card.querySelector('.pricing-card__price');
        var descEl = card.querySelector('.pricing-card__desc');
        var btnEl = card.querySelector('.btn');
        var listEl = card.querySelector('.pricing-card__features');

        if (nameEl) nameEl.textContent = plan.name;
        if (priceEl) priceEl.innerHTML = plan.price + (plan.period ? '<span>' + plan.period + '</span>' : '');
        if (descEl) descEl.textContent = plan.description;
        if (btnEl) {
          btnEl.textContent = plan.button_text;
          btnEl.href = plan.button_link;
        }
        if (listEl && plan.features) {
          listEl.innerHTML = plan.features.map(function (f) { return '<li>' + f + '</li>'; }).join('');
        }
      });
    }

    // FAQ
    setText('[data-cms="faq-title"]', data.faq_title);
    var faqCards = document.querySelectorAll('[data-cms="faq"] .card');
    if (data.faq && faqCards.length) {
      data.faq.forEach(function (item, i) {
        if (!faqCards[i]) return;
        var title = faqCards[i].querySelector('.card__title');
        var text = faqCards[i].querySelector('.card__text');
        if (title) title.textContent = item.question;
        if (text) text.textContent = item.answer;
      });
    }
  }

  /**
   * Apply contact page content.
   */
  function applyContact(data) {
    setHtml('[data-cms="hero-title"]', formatTitle(data.hero_title));
    setText('[data-cms="hero-subtitle"]', data.hero_subtitle);

    var cards = document.querySelectorAll('[data-cms="contacts"] .card');
    if (data.contacts && cards.length) {
      data.contacts.forEach(function (contact, i) {
        if (!cards[i]) return;
        var title = cards[i].querySelector('.card__title');
        var text = cards[i].querySelector('.card__text');
        var email = cards[i].querySelector('[data-cms="email"]');
        if (title) title.textContent = contact.title;
        if (text) text.textContent = contact.text;
        if (email) email.textContent = contact.email;
      });
    }
  }

  /**
   * Update stat elements with data.
   */
  function applyStats(stats) {
    var statEls = document.querySelectorAll('[data-cms="stats"] .stat');
    if (!stats || !statEls.length) return;
    stats.forEach(function (stat, i) {
      if (!statEls[i]) return;
      var num = statEls[i].querySelector('.stat__number');
      var label = statEls[i].querySelector('.stat__label');
      if (num) num.textContent = stat.number;
      if (label) label.textContent = stat.label;
    });
  }

  /**
   * Update card elements with data (icon, title, text).
   */
  function applyCards(selector, items) {
    var cards = document.querySelectorAll(selector);
    if (!items || !cards.length) return;
    items.forEach(function (item, i) {
      if (!cards[i]) return;
      var icon = cards[i].querySelector('.card__icon');
      var title = cards[i].querySelector('.card__title');
      var text = cards[i].querySelector('.card__text');
      if (icon && item.icon) icon.textContent = item.icon;
      if (title) title.textContent = item.title;
      if (text) text.textContent = item.text;
    });
  }

  /**
   * Page-specific apply functions.
   */
  var appliers = {
    home: applyHome,
    about: applyAbout,
    products: applyProducts,
    pricing: applyPricing,
    contact: applyContact
  };

  /**
   * Apply global site settings (nav CTA, etc.).
   */
  function applySettings(data) {
    setText('[data-cms="nav-cta"]', data.nav_cta);
  }

  /**
   * Load and apply content.
   */
  function loadContent() {
    var page = getPageName();
    var applier = appliers[page];

    // Load global settings (nav CTA text, etc.)
    fetch('/content/settings.json')
      .then(function (res) {
        if (!res.ok) throw new Error('No settings file');
        return res.json();
      })
      .then(function (data) {
        applySettings(data);
      })
      .catch(function () {});

    // Load page-specific content
    if (!applier) return;
    fetch('/content/pages/' + page + '.json')
      .then(function (res) {
        if (!res.ok) throw new Error('No content file');
        return res.json();
      })
      .then(function (data) {
        applier(data);
      })
      .catch(function () {
        // Silently fail — static HTML content is the fallback
      });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContent);
  } else {
    loadContent();
  }
})();
