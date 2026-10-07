// Sitemap für Suchmaschinen. Bewusst von Hand gepflegt statt per Plugin:
// Die Seite ist klein, und so ist sichtbar, was drinsteht. Nicht enthalten
// sind 404 und /willkommen (Bestätigungsseite nach der Anmeldung).
import type { APIRoute } from 'astro';

const seiten = [
  '/',
  '/haushaltsbuch-fuehren/',
  '/app/',
  '/crashkurs/',
  '/buch/',
  '/podcast/',
  '/ueber/',
  '/impressum/',
  '/datenschutz/',
  '/privacy-policy-app/',
];

export const GET: APIRoute = ({ site }) => {
  const urls = seiten
    .map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
