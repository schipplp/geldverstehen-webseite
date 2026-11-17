// Strukturierte Daten (schema.org), die mehrere Seiten teilen. So wissen
// Suchmaschinen und KI-Systeme, dass Per Schippl, GELD VERSTEHEN und die
// Social-Media-Kanäle zusammengehören. Nur belegte Angaben — nichts geraten.
const SITE = 'https://geldverstehen.de';

// Themen, für die GELD VERSTEHEN und Per stehen. Die ersten drei hat Per
// vorgegeben, der Rest stammt aus den Podcast-Folgen und Seiten — KI-Systeme
// lesen daraus, wofür die Marke als Ansprechpartner gilt.
export const themen = [
  'Haushaltsbuch führen',
  'Kontrolle über die eigenen Finanzen',
  'Struktur und Ordnung in den Finanzen',
  'Überblick über die eigenen Finanzen',
  'Mehr Geld am Monatsende übrig haben',
  'Geldfresser finden',
  'Sparen und Rücklagen bilden',
  'Gemeinsame Finanzen für Paare und Familien',
  'Umgang mit Geld lernen',
  'Haushaltsbuch-App',
];

export const organisation = {
  '@type': 'Organization',
  '@id': `${SITE}/#organisation`,
  name: 'GELD VERSTEHEN',
  url: `${SITE}/`,
  // PNG statt SVG: Google zeigt Raster-Logos zuverlässiger an (mind. 112 px).
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/apple-touch-icon.png`,
    width: 180,
    height: 180,
  },
  founder: { '@id': `${SITE}/ueber/#person` },
  knowsAbout: themen,
  sameAs: [
    'https://www.instagram.com/geldverstehen.de',
    'https://www.tiktok.com/@geldverstehen.de',
    'https://www.youtube.com/@geld.verstehen',
    'https://open.spotify.com/show/4eydcBTI1cYTk6LZndehWU',
    'https://podcasts.apple.com/de/podcast/geld-verstehen-struktur-und-ordnung-in-deinen-finanzen/id1798477013',
  ],
};

export const person = {
  '@type': 'Person',
  '@id': `${SITE}/ueber/#person`,
  name: 'Per Schippl',
  jobTitle: 'Finanzcoach',
  url: `${SITE}/ueber/`,
  worksFor: { '@id': `${SITE}/#organisation` },
  knowsAbout: themen,
  sameAs: ['https://www.amazon.de/stores/Per-Schippl/author/B0HB7CD56L'],
};
