// Sitemap für Suchmaschinen. Bewusst von Hand gepflegt statt per Plugin:
// Die Seite ist klein, und so ist sichtbar, was drinsteht. Nicht enthalten
// sind 404 und /willkommen (Bestätigungsseite nach der Anmeldung).
//
// <lastmod> ist das Datum des letzten Commits, der die Seitendatei geändert
// hat (braucht die volle Git-Historie, siehe fetch-depth in deploy.yml).
// Beim Podcast zählt zusätzlich die neueste Folge aus dem RSS-Feed.
import type { APIRoute } from 'astro';
import { execFileSync } from 'node:child_process';
import { RSS_URL } from '../lib/podcast';

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

function gitDatum(pfad: string): Date | null {
  const datei = pfad === '/' ? 'src/pages/index.astro' : `src/pages${pfad.slice(0, -1)}.astro`;
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', datei], { encoding: 'utf8' }).trim();
    return iso ? new Date(iso) : null;
  } catch {
    return null;
  }
}

async function neuesteFolge(): Promise<Date | null> {
  try {
    const res = await fetch(RSS_URL, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return null;
    const m = (await res.text()).match(/<item[\s\S]*?<pubDate>([^<]+)<\/pubDate>/i);
    const d = m ? new Date(m[1]) : null;
    return d && !isNaN(d.getTime()) ? d : null;
  } catch {
    return null;
  }
}

export const GET: APIRoute = async ({ site }) => {
  const folge = await neuesteFolge();
  const urls = seiten
    .map((p) => {
      const daten = [gitDatum(p), p === '/podcast/' ? folge : null].filter((d): d is Date => d !== null);
      const lastmod = daten.length
        ? `<lastmod>${new Date(Math.max(...daten.map((d) => d.getTime()))).toISOString().slice(0, 10)}</lastmod>`
        : '';
      return `  <url><loc>${new URL(p, site).href}</loc>${lastmod}</url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
