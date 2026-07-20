// @ts-check
import { defineConfig } from 'astro/config';

// GitHub-Pages-Deployment mit Custom-Domain.
// Die Seite läuft unter https://geldverstehen.de (Apex-Domain).
// Die Datei public/CNAME sorgt dafür, dass die Custom-Domain bei jedem
// Deploy erhalten bleibt. base ist '/', weil die Seite direkt auf der
// Domain-Wurzel liegt (nicht mehr in einem Projekt-Unterpfad).
export default defineConfig({
  site: 'https://geldverstehen.de',
  base: '/',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
