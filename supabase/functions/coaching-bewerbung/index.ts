// Edge Function „coaching-bewerbung" (Supabase-Projekt GELD VERSTEHEN).
//
// Nimmt das Bewerbungsformular der Coaching-Seite entgegen
// (src/components/BewerbungForm.astro) und schickt die Angaben über Resend
// als E-Mail weiter. Der Resend-Schlüssel liegt nur hier als Secret, nie im
// Frontend.
//
// Secrets (Supabase → Edge Functions → Secrets):
//   RESEND_API_KEY        Pflicht. API-Schlüssel aus dem Resend-Konto.
//   BEWERBUNG_EMPFAENGER  optional, Standard: info@swoo-digital.de
//   BEWERBUNG_ABSENDER    optional, Standard: siehe unten. Die Domain muss in
//                         Resend verifiziert sein.
//
// Öffentlich aufrufbar (verify_jwt = false) — ein Website-Formular hat keinen
// Login. Schutz: nur Aufrufe von der eigenen Website (Origin), Honeypot,
// Längenbegrenzung, fester Empfänger.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

const ERLAUBTE_ORIGINS = [
  'https://geldverstehen.de',
  'https://www.geldverstehen.de',
  'http://localhost:4321',
];
const EMPFAENGER = Deno.env.get('BEWERBUNG_EMPFAENGER') ?? 'info@swoo-digital.de';
const ABSENDER = Deno.env.get('BEWERBUNG_ABSENDER') ?? 'GELD VERSTEHEN Website <mail@geldverstehen.de>';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

Deno.serve(async (req: Request) => {
  const origin = req.headers.get('Origin') ?? '';
  const erlaubt = ERLAUBTE_ORIGINS.includes(origin);
  const cors = {
    'Access-Control-Allow-Origin': erlaubt ? origin : ERLAUBTE_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    Vary: 'Origin',
  };
  const antwort = (status: number, body: Record<string, unknown>) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (req.method !== 'POST') return antwort(405, { success: false, error: 'method' });
  if (!erlaubt) return antwort(403, { success: false, error: 'origin' });

  let d: Record<string, unknown>;
  try {
    d = await req.json();
  } catch {
    return antwort(400, { success: false, error: 'json' });
  }
  const feld = (k: string, max: number) => String(d[k] ?? '').trim().slice(0, max);

  // Honeypot: Bots füllen das versteckte Feld aus — still „Erfolg" melden.
  if (d.botcheck) return antwort(200, { success: true });

  const vorname = feld('vorname', 100);
  const telefon = feld('telefon', 50);
  const email = feld('email', 200);
  const erreichbar = feld('erreichbar', 300);
  const nachricht = feld('nachricht', 5000);
  if (!vorname || !telefon || !EMAIL_RE.test(email)) return antwort(400, { success: false, error: 'felder' });

  const key = Deno.env.get('RESEND_API_KEY');
  if (!key) return antwort(503, { success: false, error: 'nicht-eingerichtet' });

  const zeilen: [string, string][] = [
    ['Vorname', vorname],
    ['Telefon', telefon],
    ['E-Mail', email],
    ['Erreichbar', erreichbar || '–'],
    ['Nachricht', nachricht || '–'],
  ];
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: ABSENDER,
      to: [EMPFAENGER],
      reply_to: email,
      subject: `Bewerbung Coaching: ${vorname}`,
      text: zeilen.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `<table cellpadding="6" style="font-family:sans-serif;font-size:15px">${zeilen
        .map(([k, v]) => `<tr><td valign="top"><strong>${k}</strong></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`)
        .join('')}</table>`,
    }),
  });
  if (!res.ok) {
    console.error('Resend-Fehler', res.status, await res.text());
    return antwort(502, { success: false, error: 'versand' });
  }
  return antwort(200, { success: true });
});
