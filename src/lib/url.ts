// Baut basis-bewusste Pfade für interne Links & Assets.
// Nötig, weil die Seite als GitHub-Projektseite unter einem Unterpfad
// (/geldverstehen-webseite/) läuft. Sobald die Custom-Domain aktiv ist und
// `base` in astro.config.mjs auf '/' steht, funktioniert das unverändert weiter.
const BASE = import.meta.env.BASE_URL; // z. B. '/geldverstehen-webseite/'

export function u(path = '/'): string {
  const b = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`.replace(/\/{2,}/g, '/');
}
