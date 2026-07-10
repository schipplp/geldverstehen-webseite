// @ts-check
import { defineConfig } from 'astro/config';

// GitHub-Pages-Deployment.
// Projektseite läuft unter https://<user>.github.io/geldverstehen-webseite/
// -> deshalb `base`. Sobald die Custom-Domain geldverstehen.de aktiv ist
//    (CNAME + Pages-Setting), auf `site: 'https://geldverstehen.de'` und
//    `base: '/'` umstellen (siehe README.md).
export default defineConfig({
  site: 'https://schipplp.github.io',
  base: '/geldverstehen-webseite',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
