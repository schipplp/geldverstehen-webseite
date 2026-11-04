// Podcast-Daten für Podcast-Seite, Folgen-Seiten, Folgen-Archiv und Sitemap.
//
// Quelle der Folgen ist der RSS-Feed (Host: letscast.fm). Er wird beim Build
// genau einmal geladen und dann von allen Seiten geteilt. Ein täglicher
// Rebuild (siehe .github/workflows/deploy.yml, cron) holt neue Folgen ohne
// Code-Änderung auf die Seite.
//
// Ist der Feed beim Build auf GitHub nicht erreichbar, bricht der Build ab:
// Dann bleibt die zuletzt veröffentlichte Fassung online, statt dass alle
// Folgen-Seiten verschwinden. Lokal (ohne Netz) greift eine kurze
// Fallback-Liste, damit man trotzdem entwickeln kann.
//
// Transkripte liegen als Markdown in src/content/transkripte/NNN.md
// (bereinigte Fassung von Pers Rohtranskripten). Sie werden über den Titel
// einer Folge zugeordnet, nicht über die Nummer – Pers Folgennummern und die
// Reihenfolge im Feed weichen an einzelnen Stellen voneinander ab.

export const RSS_URL =
  'https://letscast.fm/podcasts/geld-verstehen-struktur-und-ordnung-in-deinen-finanzen-4d31713a/feed';
export const ALLE_PLATTFORMEN = 'https://geldverstehen.letscast.fm';
export const SPOTIFY = 'https://open.spotify.com/show/4eydcBTI1cYTk6LZndehWU';
export const APPLE =
  'https://podcasts.apple.com/de/podcast/geld-verstehen-struktur-und-ordnung-in-deinen-finanzen/id1798477013';
export const PODCAST_NAME = 'GELD VERSTEHEN – Struktur und Ordnung in deinen Finanzen';

export interface Transkript {
  folge: number;
  titel: string;
  datei: string;
  // Astro-Komponente, die das Transkript als HTML rendert
  Content: any;
  // reiner Text (für Beschreibung und Wortzahl)
  text: string;
}

export interface Folge {
  /** „#74" oder '' */
  no: string;
  nummer: number | null;
  title: string;
  /** „11 Min" oder '' */
  dur: string;
  sekunden: number;
  /** „9. Juli 2026" */
  date: string;
  /** „2026-07-09" */
  iso: string;
  mp3: string;
  /** Seite der Folge bei letscast */
  link: string;
  /** URL-Teil auf geldverstehen.de: /podcast/<slug>/ */
  slug: string;
  /** Folgenbeschreibung aus dem Feed als Absätze (reiner Text) */
  beschreibung: string[];
  transkript: Transkript | null;
}

// ---------- Feed lesen ----------

function decodeEntities(s = '') {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0*39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, '&')
    .trim();
}
function pickTag(block: string, name: string) {
  const m = block.match(new RegExp('<' + name + '[^>]*>([\\s\\S]*?)</' + name + '>', 'i'));
  return m ? decodeEntities(m[1]) : '';
}
function pickAttr(block: string, tagName: string, attrName: string) {
  const m = block.match(new RegExp('<' + tagName + '\\b[^>]*\\b' + attrName + '="([^"]*)"', 'i'));
  return m ? m[1] : '';
}
function fmtDate(pub: string) {
  const d = new Date(pub);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Berlin' });
}
function isoDate(pub: string) {
  const d = new Date(pub);
  return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}
function sekundenAus(raw: string) {
  if (!raw) return 0;
  const secs = /^\d+$/.test(raw)
    ? parseInt(raw, 10)
    : raw.split(':').map(Number).reduce((a, b) => a * 60 + b, 0);
  return secs && !isNaN(secs) ? secs : 0;
}
function fmtDur(secs: number) {
  return secs ? Math.max(1, Math.round(secs / 60)) + ' Min' : '';
}

/** HTML der Folgenbeschreibung → Absätze aus reinem Text. */
function absaetze(html: string): string[] {
  const text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h\d)>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '– ')
    .replace(/<[^>]+>/g, '');
  return decodeEntities(text)
    .split(/\n\s*\n/)
    .map((p) => p.replace(/[ \t]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim())
    .filter(Boolean);
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function slugAusLink(link: string, title: string) {
  const m = link.match(/\/episode\/([a-z0-9-]+)\/?$/i);
  return m ? m[1].toLowerCase() : slugify(title);
}

interface Roh {
  no: string;
  title: string;
  dur: string;
  sekunden: number;
  date: string;
  iso: string;
  mp3: string;
  link: string;
  beschreibung: string[];
}

function parseFeed(xml: string): Roh[] {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  const out: Roh[] = [];
  for (const b of blocks) {
    const title = pickTag(b, 'title');
    const mp3 = pickAttr(b, 'enclosure', 'url');
    if (!title || !mp3) continue;
    const num = pickTag(b, 'itunes:episode');
    const sekunden = sekundenAus(pickTag(b, 'itunes:duration'));
    const pub = pickTag(b, 'pubDate');
    const beschreibungHtml = pickTag(b, 'content:encoded') || pickTag(b, 'description') || pickTag(b, 'itunes:summary');
    out.push({
      no: num ? '#' + num : '',
      title,
      dur: fmtDur(sekunden),
      sekunden,
      date: fmtDate(pub),
      iso: isoDate(pub),
      mp3,
      link: pickTag(b, 'link') || mp3,
      beschreibung: absaetze(beschreibungHtml),
    });
  }
  return out;
}

// Nur für lokale Entwicklung ohne Netz (auf GitHub bricht der Build stattdessen ab).
const fallback: Roh[] = [
  { no: '#74', title: 'Warum Geld in Beziehungen so oft für Streit sorgt – und wie ihr das löst', dur: '11 Min', sekunden: 660, date: '9. Juli 2026', iso: '2026-07-09', mp3: 'https://lcdn.letscast.fm/media/podcast/4d31713a/episode/e0cf9878.mp3', link: 'https://geldverstehen.letscast.fm/episode/warum-geld-in-beziehungen-so-oft-fuer-streit-sorgt-und-wie-ihr-das-loest', beschreibung: [] },
  { no: '#73', title: '5 Finanzregeln, die du nie brechen solltest', dur: '12 Min', sekunden: 720, date: '2. Juli 2026', iso: '2026-07-02', mp3: 'https://lcdn.letscast.fm/media/podcast/4d31713a/episode/741915e4.mp3', link: 'https://geldverstehen.letscast.fm/episode/5-finanzregeln-die-du-nie-brechen-solltest', beschreibung: [] },
  { no: '#72', title: 'Warum ich keine Budgetplanung empfehle', dur: '8 Min', sekunden: 480, date: '25. Juni 2026', iso: '2026-06-25', mp3: 'https://lcdn.letscast.fm/media/podcast/4d31713a/episode/b57e030b.mp3', link: 'https://geldverstehen.letscast.fm/episode/warum-ich-keine-budgetplanung-empfehle', beschreibung: [] },
  { no: '#71', title: 'Was finanziell erfolgreiche Menschen anders machen', dur: '9 Min', sekunden: 540, date: '18. Juni 2026', iso: '2026-06-18', mp3: 'https://lcdn.letscast.fm/media/podcast/4d31713a/episode/8d3113f0.mp3', link: 'https://geldverstehen.letscast.fm/episode/was-finanziell-erfolgreiche-menschen-anders-machen-3-kleine-stellschrauben', beschreibung: [] },
  { no: '#70', title: 'Du machst vieles richtig – und gibst trotzdem immer wieder auf?', dur: '9 Min', sekunden: 540, date: '11. Juni 2026', iso: '2026-06-11', mp3: 'https://lcdn.letscast.fm/media/podcast/4d31713a/episode/2cfa6c19.mp3', link: 'https://geldverstehen.letscast.fm/episode/du-machst-vieles-richtig-und-gibst-trotzdem-immer-wieder-auf', beschreibung: [] },
  { no: '#69', title: 'Du kennst deine Geldfresser – und änderst trotzdem nichts. Warum?', dur: '6 Min', sekunden: 360, date: '4. Juni 2026', iso: '2026-06-04', mp3: 'https://lcdn.letscast.fm/media/podcast/4d31713a/episode/d546b58f.mp3', link: 'https://geldverstehen.letscast.fm/episode/du-kennst-deine-geldfresser-und-aenderst-trotzdem-nichts-warum', beschreibung: [] },
];

async function ladeFeed(): Promise<Roh[]> {
  try {
    const res = await fetch(RSS_URL, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const folgen = parseFeed(await res.text());
    if (!folgen.length) throw new Error('Feed enthielt keine Folgen');
    return folgen;
  } catch (err) {
    const grund = err instanceof Error ? err.message : String(err);
    if (process.env.GITHUB_ACTIONS) {
      throw new Error(`[podcast] RSS-Feed nicht ladbar (${grund}) – Build abgebrochen, die veröffentlichte Fassung bleibt online.`);
    }
    console.warn('[podcast] RSS-Feed nicht ladbar – nutze lokale Fallback-Liste:', grund);
    return fallback;
  }
}

// ---------- Transkripte ----------

/** Für den Titelvergleich: nur Buchstaben und Ziffern, klein. */
function norm(s: string) {
  return slugify(s).replace(/-/g, '');
}

function ladeTranskripte(): Transkript[] {
  const module = import.meta.glob('../content/transkripte/*.md', { eager: true }) as Record<string, any>;
  return Object.entries(module).map(([pfad, mod]) => {
    // rawContent() = Markdown-Quelltext (ohne Frontmatter); die Transkripte sind reiner Fließtext.
    const roh: string = typeof mod.rawContent === 'function' ? mod.rawContent() : '';
    return {
      folge: Number(mod.frontmatter?.folge),
      titel: String(mod.frontmatter?.titel ?? ''),
      datei: pfad.split('/').pop() ?? pfad,
      Content: mod.Content,
      text: roh.replace(/\s+/g, ' ').trim(),
    };
  });
}

function passt(feedTitel: string, transkriptTitel: string) {
  const a = norm(feedTitel);
  const b = norm(transkriptTitel);
  if (!a || !b) return false;
  if (a === b) return true;
  // Feed- und Katalogtitel weichen manchmal am Ende ab (z. B. Zusatz in Klammern).
  const kurz = a.length < b.length ? a : b;
  const lang = a.length < b.length ? b : a;
  return kurz.length >= 20 && lang.startsWith(kurz);
}

// ---------- Öffentliche API ----------

let cache: Promise<Folge[]> | null = null;

/** Alle Folgen, neueste zuerst, mit zugeordnetem Transkript (falls vorhanden). */
export function alleFolgen(): Promise<Folge[]> {
  cache ??= (async () => {
    const roh = await ladeFeed();
    const transkripte = ladeTranskripte();
    const vergeben = new Set<Transkript>();
    const slugs = new Set<string>();

    const folgen: Folge[] = roh.map((r) => {
      let slug = slugAusLink(r.link, r.title);
      while (slugs.has(slug)) slug += '-2';
      slugs.add(slug);
      const nummer = r.no ? parseInt(r.no.slice(1), 10) : NaN;
      const t = transkripte.find((t) => !vergeben.has(t) && passt(r.title, t.titel)) ?? null;
      if (t) vergeben.add(t);
      return { ...r, nummer: isNaN(nummer) ? null : nummer, slug, transkript: t };
    });

    const ohne = transkripte.filter((t) => !vergeben.has(t));
    if (ohne.length && roh !== fallback) {
      console.warn(
        '[podcast] Transkripte ohne passende Folge im Feed (Titel prüfen): ' +
          ohne.map((t) => `${t.datei} „${t.titel}"`).join(', '),
      );
    }
    return folgen;
  })();
  return cache;
}

/** Kurzbeschreibung (max. ~155 Zeichen) für meta description. */
export function kurzbeschreibung(f: Folge): string {
  const quelle = f.beschreibung.join(' ') || f.transkript?.text || '';
  const text = quelle.replace(/\s+/g, ' ').trim();
  if (!text) return `${f.title} – eine Folge des GELD VERSTEHEN Podcasts von Per Schippl.`;
  if (text.length <= 155) return text;
  const schnitt = text.slice(0, 152);
  return schnitt.slice(0, schnitt.lastIndexOf(' ')) + ' …';
}
