# GELD VERSTEHEN — Website

Die Website der Personal-Finance-Marke **GELD VERSTEHEN** von Per Schippl
([geldverstehen.de](https://geldverstehen.de)). Gebaut aus dem Designpaket in
`design/` (siehe `design/HANDOFF.md`).

- **Framework:** [Astro](https://astro.build) mit rein statischem Output (`output: 'static'`)
- **Hosting:** GitHub Pages (automatisches Deployment via GitHub Actions)
- **Fonts:** Bebas Neue + PT Sans (Google Fonts, `font-display: swap`)
- **Kein CMS, keine Datenbank, kein Server.**

## Lokal entwickeln

```bash
npm install      # Abhängigkeiten installieren
npm run dev      # Dev-Server (http://localhost:4321/geldverstehen-webseite/)
npm run build    # Produktions-Build nach dist/
npm run preview  # gebaute Seite lokal ansehen
```

## Projektstruktur

```
design/                     Original-Designpaket (Referenz, nicht Teil des Builds)
public/
  uploads/                  weboptimierte Bilder (aus design/uploads übernommen)
  favicon.svg · robots.txt · .nojekyll
src/
  layouts/Base.astro        HTML-Grundgerüst, Fonts, SEO, Nav + Footer
  components/
    SiteNav.astro           blaue Navigationsleiste (mit Burger-Menü mobil)
    SiteFooter.astro        blauer Footer
    EmailOptIn.astro        E-Mail-Opt-in (Crashkurs/Buch/Newsletter)
  lib/
    brevo.js                zentrale Brevo-Anbindung (aktuell Prototyp-Modus)
    url.ts                  basis-bewusste Pfad-Helferfunktion
  styles/
    tokens.css              Design-Tokens (Farben, Fonts, Spacing, Radien)
    global.css              globale Styles & wiederverwendbare Utilities
  pages/                    index, app, podcast, buch, ueber, crashkurs,
                            impressum, datenschutz, 404
.github/workflows/deploy.yml  Build + Deployment auf GitHub Pages
```

## Deployment (GitHub Pages)

Jeder Push auf `main` startet den Workflow `.github/workflows/deploy.yml`,
baut die Seite und veröffentlicht sie. **Einmalig aktivieren:**
Repo → **Settings → Pages → Source: „GitHub Actions"**.

Danach erreichbar unter:
`https://<benutzername>.github.io/geldverstehen-webseite/`

### Später: Custom Domain geldverstehen.de

Erst auf Zuruf von Per (siehe `CLAUDE.md`). Dann:

1. In `astro.config.mjs`: `site: 'https://geldverstehen.de'` und `base: '/'`.
2. Datei `public/CNAME` mit dem Inhalt `geldverstehen.de` anlegen.
3. Beim Domain-Anbieter die DNS-Einträge auf GitHub Pages zeigen lassen.
   **Wichtig:** MX-Einträge (Google-Mail) unverändert lassen.
4. Repo → Settings → Pages → Custom domain eintragen, „Enforce HTTPS" aktivieren.

## E-Mail-Formulare (Brevo)

Alle Opt-in-Formulare laufen über `src/lib/brevo.js` → `subscribeToBrevo()`.
Aktuell **Prototyp-Modus**: Eingaben werden validiert und die Erfolgsmeldung
erscheint, es wird aber noch nichts verschickt.

**Scharfschalten** (sobald Per die Daten liefert), Details in
`design/BREVO-SETUP.md`:
- Ohne eigenen Server: pro Quelle ein Brevo-Formular anlegen und dessen POST-URL
  in `BREVO_CONFIG.formActions` eintragen (Double-Opt-in in Brevo aktivieren).
- Mit eigenem Backend: `BREVO_CONFIG.endpoint` auf eine serverseitige Route setzen,
  die den API-Key **geheim** hält.

Der Brevo-API-Key gehört **nie** ins Frontend.

## Offene Punkte (bei Per erfragen)

Im Code mit `TODO(Per)` markiert:

- Podcast-Plattform-Links (Spotify, Apple Podcasts) — aktuell auf die
  letscast-Übersicht verlinkt
- App-Store-Links für OnePeek (iOS/Android)
- Brevo-Formular-URLs + Listen-IDs (crashkurs / buch / newsletter)
- Impressum: vollständige Anbieterangaben
- Datenschutz: finaler, geprüfter Text (inkl. Brevo-Passus)
- Crashkurs-Seite: echte Testimonials (aktuell Platzhalter)
