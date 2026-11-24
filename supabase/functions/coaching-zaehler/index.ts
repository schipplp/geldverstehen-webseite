// Edge Function „coaching-zaehler" (Supabase-Projekt GELD VERSTEHEN).
//
// Cookielose Zählung der Coaching-Seite: nimmt einzelne Ereignisse entgegen
// (Seitenaufruf, Klick auf „Bewerben", Formular gesehen/begonnen/gesendet) und
// schreibt sie in die Tabelle public.coaching_ereignisse.
//
// Gespeichert werden nur: Zeitpunkt, Ereignis, Kennung aus dem Link (utm_*),
// Host der verweisenden Seite, Handy/Desktop und eine Zufallskennung des
// einzelnen Seitenaufrufs. KEINE IP-Adresse, kein User-Agent, nichts, was im
// Browser gespeichert oder wiedererkannt wird.
//
// Öffentlich aufrufbar (verify_jwt = false); nimmt nur Aufrufe von der eigenen
// Website an und nur die unten aufgeführten Ereignisse.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const ERLAUBTE_ORIGINS = [
  'https://geldverstehen.de',
  'https://www.geldverstehen.de',
  'http://localhost:4321',
];
const EREIGNISSE = ['seitenaufruf', 'formular_gesehen', 'klick_bewerben', 'formular_start', 'bewerbung_gesendet', 'bewerbung_fehler'];
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const BOT_RE = /bot|crawl|spider|slurp|preview|headless|lighthouse|monitor/i;

Deno.serve(async (req: Request) => {
  const origin = req.headers.get('Origin') ?? '';
  const erlaubt = ERLAUBTE_ORIGINS.includes(origin);
  const cors = {
    'Access-Control-Allow-Origin': erlaubt ? origin : ERLAUBTE_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    Vary: 'Origin',
  };
  const antwort = (status: number) => new Response(null, { status, headers: cors });

  if (req.method === 'OPTIONS') return antwort(204);
  if (req.method !== 'POST') return antwort(405);
  if (!erlaubt) return antwort(403);
  // Bots still verwerfen.
  if (BOT_RE.test(req.headers.get('User-Agent') ?? '')) return antwort(204);

  let d: Record<string, unknown>;
  try {
    // Der Browser sendet text/plain (vermeidet eine CORS-Vorabanfrage).
    d = JSON.parse(await req.text());
  } catch {
    return antwort(400);
  }
  const feld = (k: string, max: number) => {
    const v = String(d[k] ?? '').trim().slice(0, max);
    return v || null;
  };
  const ereignis = feld('ereignis', 40);
  if (!ereignis || !EREIGNISSE.includes(ereignis)) return antwort(400);
  const aufruf = feld('aufruf', 36);
  const geraet = feld('geraet', 10);

  const res = await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/coaching_ereignisse`, {
    method: 'POST',
    headers: {
      apikey: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      aufruf: aufruf && UUID_RE.test(aufruf) ? aufruf : null,
      ereignis,
      detail: feld('detail', 60),
      quelle: feld('quelle', 60)?.toLowerCase() ?? null,
      medium: feld('medium', 60)?.toLowerCase() ?? null,
      kampagne: feld('kampagne', 60)?.toLowerCase() ?? null,
      verweis: feld('verweis', 120)?.toLowerCase() ?? null,
      geraet: geraet === 'handy' || geraet === 'desktop' ? geraet : null,
    }),
  });
  if (!res.ok) {
    console.error('Zähler: Speichern fehlgeschlagen', res.status, await res.text());
    return antwort(500);
  }
  return antwort(204);
});
