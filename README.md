# GELD VERSTEHEN — Website

Die Website der Personal-Finance-Marke **GELD VERSTEHEN** von Per Schippl
([geldverstehen.de](https://geldverstehen.de)). Gebaut aus dem Designpaket in
`design/` (siehe `design/HANDOFF.md`).

- **Framework:** [Astro](https://astro.build) mit rein statischem Output (`output: 'static'`)
- **Hosting:** GitHub Pages (automatisches Deployment via GitHub Actions)
- **Fonts:** Bebas Neue (Überschriften) + Manrope (Fließtext), selbst gehostet über `@fontsource` (kein Nachladen von Google)
- **Kein CMS, keine Datenbank, kein Server.**

## Lokal entwickeln

```bash
npm ci           # Abhängigkeiten exakt nach package-lock.json installieren
npm run dev      # Dev-Server (http://localhost:4321/)
npm run build    # Produktions-Build nach dist/
npm run preview  # gebaute Seite lokal ansehen
```

**Abhängigkeiten:** `package-lock.json` ist eingecheckt und der Build nutzt
`npm ci`. So baut GitHub immer mit genau den getesteten Versionen. Wer ein
Paket hinzufügt oder aktualisiert (`npm install …`), checkt die geänderte
`package-lock.json` mit ein.

## Projektstruktur

```
design/                     Original-Designpaket (Referenz, nicht Teil des Builds)
public/
  og/                       Vorschaubilder für Social Media (Open Graph)
  favicon.svg · apple-touch-icon.png · robots.txt · CNAME
src/
  layouts/Base.astro        HTML-Grundgerüst, Fonts, SEO, Nav + Footer
  components/
    SiteNav.astro           blaue Navigationsleiste (mit Burger-Menü mobil)
    SiteFooter.astro        blauer Footer
    EmailOptIn.astro        E-Mail-Opt-in (Crashkurs/Buch/Newsletter)
    Consent.astro           Cookie-Banner (Google Analytics nur nach Einwilligung)
    YouTubeEmbed.astro      YouTube als 2-Klick-Lösung
    *Grafik.astro           Grafiken für den Haushaltsbuch-Artikel
  lib/
    brevo.js                zentrale Brevo-Anbindung (live)
    analytics.ts            GA4-Einbindung
    images.ts               zentrale Bildverwaltung (Astro-optimiert)
    podcast.ts              Podcast-Folgen aus dem RSS-Feed + Transkripte
    strukturdaten.ts        strukturierte Daten (JSON-LD) für Suchmaschinen
    url.ts                  basis-bewusste Pfad-Helferfunktion
  transkripte/              Podcast-Transkripte (siehe TRANSKRIPTE.md)
  styles/
    tokens.css              Design-Tokens (Farben, Fonts, Spacing, Radien)
    global.css              globale Styles & wiederverwendbare Utilities
  pages/                    index, app, podcast (+ Folgen-Seiten), buch, ueber,
                            crashkurs, haushaltsbuch-fuehren, willkommen,
                            impressum, datenschutz, privacy-policy-app, 404,
                            sitemap.xml, llms.txt
.github/workflows/deploy.yml  Build + Deployment auf GitHub Pages
```

## Deployment (GitHub Pages)

Jeder Push auf `main` startet den Workflow `.github/workflows/deploy.yml`,
baut die Seite (Node 24) und veröffentlicht sie. Zusätzlich baut der Workflow
täglich neu, damit neue Podcast-Folgen aus dem RSS-Feed automatisch erscheinen.

Die Seite läuft unter **https://geldverstehen.de** (Custom Domain, HTTPS
erzwungen). `public/CNAME` sorgt dafür, dass die Domain bei jedem Deploy
erhalten bleibt. **Wichtig:** Beim Domain-Anbieter die MX-Einträge
(Google-Mail) unverändert lassen.

## E-Mail-Formulare (Brevo)

Alle Opt-in-Formulare laufen über `src/lib/brevo.js` → `subscribeToBrevo()`
und posten direkt an das von Brevo generierte Formular. Kein API-Key im
Frontend, Double-Opt-in ist in Brevo eingestellt. **Status: live.**

**Quelle je Anmeldung (optional):** Die Opt-in-Quelle (`crashkurs` / `buch`)
kann im Kontakt-Attribut **`QUELLE`** mitgeschickt werden. Dafür einmalig:
1. In Brevo ein **Text-Attribut `QUELLE`** anlegen (Kontakte → Einstellungen → Kontakt-Attribute).
2. Dieses Attribut dem Formular als (verstecktes) Feld hinzufügen.
3. In `src/lib/brevo.js` das Quell-Feld aktivieren (siehe Kommentar dort).

Ohne diese Schritte funktioniert die Anmeldung trotzdem — nur die Quelle
wird nicht gespeichert.

## Google Analytics

GA4 ist eingebunden und lädt erst nach Einwilligung im Cookie-Banner
(`src/components/Consent.astro`). Die Datenschutzerklärung ist entsprechend
angepasst.

## Offene Punkte

Siehe `LAUNCH-CHECKLIST.md`. Im Code sind offene Stellen mit `TODO(Per)` markiert.
