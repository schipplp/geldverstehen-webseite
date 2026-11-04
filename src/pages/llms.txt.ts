// llms.txt: Übersicht für KI-Systeme (Format: https://llmstxt.org).
// Der feste Teil steht in src/lib/llms-vorlage.md; die Podcast-Folgen werden
// beim Build aus dem RSS-Feed ergänzt, damit neue Folgen automatisch
// auftauchen.
import type { APIRoute } from 'astro';
import vorlage from '../lib/llms-vorlage.md?raw';
import { alleFolgen, kurzbeschreibung } from '../lib/podcast';

export const GET: APIRoute = async ({ site }) => {
  const folgen = await alleFolgen();
  const liste = folgen
    .map((f) => {
      const zusatz = f.transkript ? ' (mit Transkript)' : '';
      return `- [${f.title}](${new URL(`/podcast/${f.slug}/`, site).href})${zusatz}: ${kurzbeschreibung(f)}`;
    })
    .join('\n');
  const abschnitt = `## Podcast-Folgen\n\nAlle Folgen: ${new URL('/podcast/folgen/', site).href}\n\n${liste}\n`;
  // Folgen-Abschnitt vor „## Optional" einfügen (Optional gehört laut Format ans Ende).
  const text = vorlage.includes('## Optional')
    ? vorlage.replace('## Optional', `${abschnitt}\n## Optional`)
    : `${vorlage.trimEnd()}\n\n${abschnitt}`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
