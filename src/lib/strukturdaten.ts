// Strukturierte Daten (schema.org), die mehrere Seiten teilen. So wissen
// Suchmaschinen und KI-Systeme, dass Per Schippl, GELD VERSTEHEN und die
// Social-Media-Kanäle zusammengehören. Nur belegte Angaben — nichts geraten.
const SITE = 'https://geldverstehen.de';

export const organisation = {
  '@type': 'Organization',
  '@id': `${SITE}/#organisation`,
  name: 'GELD VERSTEHEN',
  url: `${SITE}/`,
  logo: `${SITE}/favicon.svg`,
  founder: { '@id': `${SITE}/ueber/#person` },
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
};
