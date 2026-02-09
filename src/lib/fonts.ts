/**
 * Google Fonts loader for DM Serif Display + Source Sans 3.
 * Called once from main.tsx to inject font link tags.
 */
const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap'

export function loadFonts(): void {
  if (document.querySelector(`link[href*="DM+Serif+Display"]`)) return

  const preconnect = document.createElement('link')
  preconnect.rel = 'preconnect'
  preconnect.href = 'https://fonts.googleapis.com'

  const preconnectStatic = document.createElement('link')
  preconnectStatic.rel = 'preconnect'
  preconnectStatic.href = 'https://fonts.gstatic.com'
  preconnectStatic.crossOrigin = 'anonymous'

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = GOOGLE_FONTS_URL

  document.head.append(preconnect, preconnectStatic, link)
}
