// Sitemap für Suchmaschinen. Bewusst von Hand gepflegt statt per Plugin:
// Die Seite ist klein, und so ist sichtbar, was drinsteht. Nicht enthalten
// sind 404 und /willkommen (Bestätigungsseite nach der Anmeldung).
//
// <lastmod> ist das Datum des letzten Commits, der die Seitendatei geändert
// hat (braucht die volle Git-Historie, siehe fetch-depth in deploy.yml).
// Beim Podcast zählt zusätzlich die neueste Folge aus dem RSS-Feed. Jede
// Folge hat eine eigene Seite (Datum: Erscheinen bzw. letzte Änderung am
// Transkript).
import type { APIRoute } from 'astro';
import { execFileSync } from 'node:child_process';
import { alleFolgen } from '../lib/podcast';

const seiten = [
  '/',
  '/haushaltsbuch-fuehren/',
  '/app/',
  '/crashkurs/',
  '/buch/',
  '/podcast/',
  '/podcast/folgen/',
  '/ueber/',
  '/impressum/',
  '/datenschutz/',
  '/privacy-policy-app/',
];

function gitDatum(pfad: string): Date | null {
  const datei =
    pfad === '/' ? 'src/pages/index.astro'
    : pfad === '/podcast/' ? 'src/pages/podcast/index.astro'
    : pfad === '/podcast/folgen/' ? 'src/pages/podcast/folgen.astro'
    : pfad.startsWith('src/') ? pfad
    : `src/pages${pfad.slice(0, -1)}.astro`;
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', datei], { encoding: 'utf8' }).trim();
    return iso ? new Date(iso) : null;
  } catch {
    return null;
  }
}

export const GET: APIRoute = async ({ site }) => {
  const folgen = await alleFolgen();
  const neueste = folgen[0]?.iso ? new Date(folgen[0].iso) : null;
  const tag = (d: Date) => d.toISOString().slice(0, 10);
  const eintrag = (loc: string, daten: (Date | null)[]) => {
    const gueltig = daten.filter((d): d is Date => d !== null && !isNaN(d.getTime()));
    const lastmod = gueltig.length ? `<lastmod>${tag(new Date(Math.max(...gueltig.map((d) => d.getTime()))))}</lastmod>` : '';
    return `  <url><loc>${new URL(loc, site).href}</loc>${lastmod}</url>`;
  };
  const urls = [
    ...seiten.map((p) => eintrag(p, [gitDatum(p), p.startsWith('/podcast/') ? neueste : null])),
    // Folgen-Seiten: Erscheinungsdatum bzw. letzte Änderung am Transkript
    ...folgen.map((f) =>
      eintrag(`/podcast/${f.slug}/`, [
        f.iso ? new Date(f.iso) : null,
        f.transkript ? gitDatum(`src/content/transkripte/${f.transkript.datei}`) : null,
      ]),
    ),
  ].join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
