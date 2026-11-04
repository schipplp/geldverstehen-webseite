// Baut basis-bewusste Pfade für interne Links & Assets.
// Mit der Custom-Domain steht `base` in astro.config.mjs auf '/', d. h. die
// Seite liegt auf der Domain-Wurzel. Der Helfer bleibt trotzdem nützlich:
// Er normalisiert Pfade und zieht `base` automatisch mit, falls es sich je
// wieder ändert (z. B. erneut ein Projekt-Unterpfad).
//
// Seitenpfade bekommen einen abschließenden Schrägstrich (/app → /app/).
// GitHub Pages liefert jede Seite unter /app/ aus und leitet /app per 301
// dorthin um — ohne Schrägstrich kostet jeder interne Klick eine Umleitung,
// und Suchmaschinen sehen intern eine andere Adresse als die kanonische.
// Dateien (Pfade mit Endung, z. B. /favicon.svg) bleiben unverändert.
const BASE = import.meta.env.BASE_URL; // bei Custom-Domain '/'

export function u(path = '/'): string {
  const b = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  const m = p.match(/^([^?#]*)(.*)$/)!;
  let pfad = m[1];
  const letzterTeil = pfad.split('/').pop() ?? '';
  if (!pfad.endsWith('/') && !letzterTeil.includes('.')) pfad += '/';
  return `${b}${pfad}${m[2]}`.replace(/\/{2,}/g, '/');
}
