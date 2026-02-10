/**
 * SEO Metadata Generator
 *
 * Generates complete HTML <head> SEO metadata from page configuration.
 * Supports core meta, Open Graph, Twitter Cards, and JSON-LD structured data.
 *
 * Usage:
 *   import { generateSeoHead } from './seo.js';
 *   const headHtml = generateSeoHead({
 *     url: 'https://dc-website.com/about',
 *     title: 'About Us | DC Website',
 *     description: 'Learn about DC Website...',
 *     pageType: 'about',
 *     brand: 'DC Website'
 *   });
 */

const DEFAULT_CONFIG = {
  themeColor: '#0a0a0a',
  favicon: '/favicon.ico',
  ogImage: '/images/og-default.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ]
};

/**
 * Generate complete SEO <head> content for a page.
 * @param {Object} options
 * @param {string} options.url - Canonical page URL
 * @param {string} options.title - Page title (50-60 chars recommended, brand after pipe)
 * @param {string} options.description - Meta description (150-160 chars with CTA)
 * @param {string} options.pageType - One of: home, product, pricing, about, blog-post, contact
 * @param {string} options.brand - Brand/site name
 * @param {string} [options.ogImage] - Open Graph image URL (defaults to site default)
 * @param {Object} [options.productData] - Product schema data (for product pages)
 * @param {Array}  [options.faqData] - FAQ items [{question, answer}] (for pages with FAQs)
 * @param {Array}  [options.breadcrumbs] - Breadcrumb items [{name, url}]
 * @returns {string} HTML string for inside <head>
 */
export function generateSeoHead(options) {
  const {
    url,
    title,
    description,
    pageType,
    brand,
    ogImage,
    productData,
    faqData,
    breadcrumbs
  } = options;

  const origin = new URL(url).origin;
  const resolvedOgImage = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${origin}${ogImage}`)
    : `${origin}${DEFAULT_CONFIG.ogImage}`;

  const parts = [];

  // 1. CORE META
  parts.push(`  <meta charset="UTF-8">`);
  parts.push(`  <meta name="viewport" content="width=device-width, initial-scale=1.0">`);
  parts.push(`  <title>${escapeHtml(title)}</title>`);
  parts.push(`  <meta name="description" content="${escapeAttr(description)}">`);
  parts.push(`  <link rel="canonical" href="${escapeAttr(url)}">`);
  parts.push(`  <meta name="robots" content="index, follow">`);

  // THEME & FAVICON
  parts.push(`  <meta name="theme-color" content="${DEFAULT_CONFIG.themeColor}">`);
  parts.push(`  <link rel="icon" href="${DEFAULT_CONFIG.favicon}" type="image/x-icon">`);

  // PRECONNECT HINTS
  for (const origin of DEFAULT_CONFIG.preconnect) {
    const crossorigin = origin.includes('gstatic') ? ' crossorigin' : '';
    parts.push(`  <link rel="preconnect" href="${origin}"${crossorigin}>`);
  }

  // 2. OPEN GRAPH
  const ogType = pageType === 'blog-post' ? 'article' : 'website';
  parts.push(`  <meta property="og:title" content="${escapeAttr(title)}">`);
  parts.push(`  <meta property="og:description" content="${escapeAttr(description)}">`);
  parts.push(`  <meta property="og:image" content="${escapeAttr(resolvedOgImage)}">`);
  parts.push(`  <meta property="og:image:width" content="${DEFAULT_CONFIG.ogImageWidth}">`);
  parts.push(`  <meta property="og:image:height" content="${DEFAULT_CONFIG.ogImageHeight}">`);
  parts.push(`  <meta property="og:url" content="${escapeAttr(url)}">`);
  parts.push(`  <meta property="og:type" content="${ogType}">`);
  parts.push(`  <meta property="og:site_name" content="${escapeAttr(brand)}">`);

  // TWITTER CARD
  parts.push(`  <meta name="twitter:card" content="summary_large_image">`);
  parts.push(`  <meta name="twitter:title" content="${escapeAttr(title)}">`);
  parts.push(`  <meta name="twitter:description" content="${escapeAttr(description)}">`);
  parts.push(`  <meta name="twitter:image" content="${escapeAttr(resolvedOgImage)}">`);

  // 3. STRUCTURED DATA (JSON-LD)

  // Organization schema for home page
  if (pageType === 'home') {
    parts.push(jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: brand,
      url: new URL(url).origin,
      logo: `${new URL(url).origin}/images/logo.png`,
      sameAs: []
    }));

    parts.push(jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: brand,
      url: new URL(url).origin,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${new URL(url).origin}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }));
  }

  // Product schema for product pages
  if (pageType === 'product' && productData) {
    parts.push(jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: productData.name,
      description: productData.description,
      image: productData.image,
      brand: {
        '@type': 'Brand',
        name: brand
      },
      ...(productData.price && {
        offers: {
          '@type': 'Offer',
          price: productData.price,
          priceCurrency: productData.currency || 'USD',
          availability: 'https://schema.org/InStock'
        }
      })
    }));
  }

  // FAQ schema for pages with FAQ sections
  if (faqData && faqData.length > 0) {
    parts.push(jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }));
  }

  // BreadcrumbList for all pages
  const breadcrumbItems = breadcrumbs || buildDefaultBreadcrumbs(url, brand);
  parts.push(jsonLdScript({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }));

  return parts.join('\n');
}

/**
 * Build default breadcrumbs from URL path.
 */
function buildDefaultBreadcrumbs(url, brand) {
  const parsed = new URL(url);
  const crumbs = [{ name: 'Home', url: `${parsed.origin}/` }];
  const segments = parsed.pathname.split('/').filter(Boolean);

  segments.forEach((segment, i) => {
    const path = '/' + segments.slice(0, i + 1).join('/');
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    crumbs.push({ name, url: `${parsed.origin}${path}` });
  });

  return crumbs;
}

/**
 * Wrap a JSON-LD object in a script tag.
 */
function jsonLdScript(data) {
  return `  <script type="application/ld+json">\n  ${JSON.stringify(data, null, 2).split('\n').join('\n  ')}\n  </script>`;
}

/**
 * Escape HTML entities in text content.
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Escape for use inside HTML attribute values.
 */
function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
