// Baut basis-bewusste Pfade für interne Links & Assets.
// Mit der Custom-Domain steht `base` in astro.config.mjs auf '/', d. h. die
// Seite liegt auf der Domain-Wurzel. Der Helfer bleibt trotzdem nützlich:
// Er normalisiert Pfade und zieht `base` automatisch mit, falls es sich je
// wieder ändert (z. B. erneut ein Projekt-Unterpfad).
const BASE = import.meta.env.BASE_URL; // bei Custom-Domain '/'

export function u(path = '/'): string {
  const b = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`.replace(/\/{2,}/g, '/');
}
