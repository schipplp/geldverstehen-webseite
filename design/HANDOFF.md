# Handoff: GELD VERSTEHEN — Website (Neuaufbau)

## Überblick
Vollständige Marketing-Website für die Personal-Finance-Marke **GELD VERSTEHEN**
(geldverstehen.de) von Per Schippl. Ziel: aus „Chaos in den Finanzen" zu Klarheit,
Struktur und einem entspannten Umgang mit Geld. Die Website führt Besucher auf drei
Angebote (Podcast, App „OnePeek", Buch) und sammelt als erste Handlung eine
**E-Mail-Anmeldung** für einen kostenlosen Crashkurs ein.

Deutschsprachig, informelles „du", Marken-Ton: kurz, ruhig, selbstbewusst.

## Über die Design-Dateien (WICHTIG)
Die Dateien in diesem Paket sind **Design-Referenzen, in HTML erstellt** — Prototypen,
die Aussehen und Verhalten festlegen. Sie sind **kein Produktionscode zum
1:1-Übernehmen**. Die Aufgabe ist, diese Designs im **Zielprojekt in dessen etablierter
Umgebung nachzubauen** (empfohlen: ein modernes Web-Framework wie **Next.js**, **Astro**
oder **SvelteKit** — die Marke braucht SEO-freundliche, statisch/serverseitig gerenderte
Seiten plus eine kleine Server-Route für das E-Mail-Opt-in).

Technischer Hinweis zum Prototyp: Die `.dc.html`-Dateien sind „Design Components" eines
internen Runtimes (`support.js`, Tags wie `<x-dc>`, `<dc-import>`, `<x-import>`,
`<sc-if>`). **Diese Runtime nicht mitnehmen** — sie dient nur der Vorschau. Nachbauen mit
den nativen Komponenten des Ziel-Frameworks.

## Fidelity
**High-fidelity (hifi).** Finale Farben, Typografie, Abstände, Copy und Interaktionen sind
gesetzt. Pixelgenau nachbauen mit dem gebundenen Designsystem (Tokens siehe unten).

## Seiten
Alle Seiten teilen sich **Navigation** (`SiteNav.dc.html`) und **Footer**
(`SiteFooter.dc.html`) und laufen ~1120px Content-Breite, zentriert, `padding:0 40px`
(mobil 22px). Marken-Blau-Hero oben, weiße Content-Sektionen darunter.

| Seite (Datei) | Zweck |
|---|---|
| **Startseite** (`Startseite.dc.html`) | Hero mit Portrait + Crashkurs-Opt-in, „Bekannt aus"-Band, „Worum es geht", drei Produkt-Tiles (Podcast/App/Buch), Über-Per-Split, Abschluss-Newsletter-Band. |
| **App / OnePeek** (`App.dc.html`) | Produktseite der App: Hero, 4 Feature-Punkte mit App-Screenshot, „In 3 Minuten eingerichtet" (3 Schritte), Store-CTA. |
| **Podcast** (`Podcast.dc.html`) | Podcast-Landingpage: Hero, Cover, Folgenübersicht/Plattform-Links. |
| **Buch** (`Buch.dc.html`) | Buch-Seite mit „Benachrichtigen"-Opt-in (erscheint bald in Neuauflage). |
| **Über** (`Ueber.dc.html`) | Über Per Schippl, Werdegang seit 2016. |
| **Crashkurs** (`Crashkurs.dc.html`) | Dedizierte Opt-in-Landingpage für den kostenlosen E-Mail-Crashkurs. |
| **Impressum** (`Impressum.dc.html`) | Rechtstext (Platzhalter — vor Livegang mit echten Angaben füllen). |
| **Datenschutz** (`Datenschutz.dc.html`) | Datenschutzerklärung (Platzhalter — juristisch prüfen/ergänzen). |
| **Mobil-Vorschau** (`Mobil-Vorschau.dc.html`) | Nur Vorschau-Hilfe, **nicht Teil der Website** — beim Nachbau ignorieren. |

### Navigation (`SiteNav.dc.html`)
Blaue Leiste. Links: Wordmark (GELD weiß + VERSTEHEN gelb, führt zur Startseite). Rechts:
Nav-Links PODCAST · APP · BUCH · ÜBER (Bebas Neue, Caps). Aktiver Link = gelb. Unter 860px:
Burger-Menü, das die Links als vertikales Panel unter der Leiste ausklappt.
Prop `active` = `""` | `"podcast"` | `"app"` | `"buch"` | `"ueber"`.

### Footer (`SiteFooter.dc.html`)
Blauer Footer. Wordmark + Tagline „Deine Finanzen im Griff. Für immer!", drei Link-Spalten
(WEGE / MEHR / RECHTLICHES), Copyright-Zeile. Kontakt: `mailto:mail@geldverstehen.de`.

## Interaktionen & Verhalten
- **E-Mail-Opt-in** (Startseite Hero + Abschlussband, Crashkurs, Buch): Input + gelber
  Button. Bei Absenden → Client-Validierung der E-Mail → Button zeigt „Wird gesendet…" →
  Erfolgszustand ersetzt das Formular durch eine weiße „Fast geschafft!"-Karte
  (Double-Opt-In-Hinweis). Fehler erscheint als `error` am Input.
- **Navigation:** Standard-Links zwischen Seiten. Burger-Toggle mobil.
- **Reveal-on-scroll** (nur Startseite): Sektionen unterhalb des Folds faden von 14px
  unten ein (opacity + translateY, 0.8s ease). `prefers-reduced-motion` deaktiviert das.
- **Hover:** Tiles heben sich (`translateY(-4px)` + Schatten). Buttons eine Stufe dunkler.
  Press = `scale(.98)`.
- **Responsive Breakpoint:** 860px — Hero-/Split-Grids werden einspaltig, Portrait rückt
  nach oben, 3-Spalten-Grids werden einspaltig.

## E-Mail-Anbindung (Brevo) — Kern-TODO für die Umsetzung
Alle Formulare laufen über **eine** zentrale Funktion: `brevo.js` →
`subscribeToBrevo({ email, source })`. Quellen: `crashkurs` (Startseite + Crashkurs),
`buch` (Buch), `newsletter` (allgemein).

Aktuell **Prototyp-Modus**: E-Mail wird validiert und Erfolg simuliert, es wird nichts
verschickt. Scharfschalten im echten Projekt:
1. Serverseitige Route bauen (z.B. `/api/brevo/subscribe`), die den **Brevo-API-Key
   geheim** hält und die Brevo-API mit **Double-Opt-In** aufruft.
2. `BREVO_CONFIG.endpoint` in `brevo.js` auf die URL dieser Route setzen.
3. `BREVO_CONFIG.lists` mit den echten Brevo-Listen-IDs pro `source` füllen.

⚠ Den API-Key **nie** ins Frontend schreiben. Details in `BREVO-SETUP.md`.
Alternative ohne eigenes Backend: Brevos fertiges Embed-Formular einsetzen.

## Designsystem & Tokens
Gebunden unter `_ds/geld-verstehen-cb9890e3-c9d6-46fe-bfb7-737cb9ea462c/`. CSS-Custom-
Properties in `tokens/*.css`, wiederverwendbare React-Primitive (Button, Input, Card,
Badge, SiteHeader, Footer …) unter `components/`.

**Farben**
- Blau (Marke, Flächen): `#1E73BE` · Hover `--gv-blue-600`
- Gelb (Action/CTA): `#FFD000` · Hover `--gv-yellow-600` (`#e6bd00`)
- Schwarz `#000000` / Weiß `#FFFFFF`; Text-Ink `--gv-ink`, weicher `--gv-ink-soft`,
  gedämpft `--gv-muted`; Flächen `--gv-surface`; Rahmen `--gv-border` (`#D9DEE5`)
- Regel: Weißer Text auf Blau; **dunkler Text auf Gelb** (Gelb nie mit weißem Text).

**Typografie**
- Display/Headlines/Labels/Wordmark: **Bebas Neue** Regular (`--font-display`) — schmal,
  Caps. Body/UI: **PT Sans** Regular (`--font-body`), 17px, line-height 1.6.
- (Presse-Band „Bekannt aus" nutzt Playfair Display als generisches Zeitungs-Look-Zitat —
  optional, kein Marken-Font.)

**Radien:** Tags 4px · Buttons/Inputs 8px · Cards 14px · Pills/Avatare voll-rund.
**Signatur-Elevation:** gelber CTA-Button mit `--shadow-cta:0 12px 34px rgba(255,208,0,.45)`.
Sonstige Schatten navy-getönt und dezent. **Borders:** 1px `#D9DEE5`.
**Animation:** ease-out, 200–300ms; Press-Scale 0.97. Keine Bounces.

## Assets
Im Ordner `uploads/`:
- Portraits Per Schippl: `DSC00023.jpg` (Hero, wird per `scaleX(-1)` gespiegelt),
  `DSC00065.JPG` (Über-Split), `DSC00142.JPG` (App-Hero) u.a.
- Podcast-Cover: `new podcast cover_v5.jpg`
- App-Screenshot OnePeek: `1de.webp`
- Buch-Cover: `md.jpeg`
- Original-Texte (Referenz): `GELD_VERSTEHEN_Website_Visitenkarte_Texte.docx`

Logo/Wordmark: rein typografisch (kein Bild-Logo) — `_ds/.../assets/logo-on-blue.svg`
und `logo-color.svg`.

## Dateien in diesem Paket
- Seiten: `Startseite.dc.html`, `App.dc.html`, `Podcast.dc.html`, `Buch.dc.html`,
  `Ueber.dc.html`, `Crashkurs.dc.html`, `Impressum.dc.html`, `Datenschutz.dc.html`
- Geteilte Bausteine: `SiteNav.dc.html`, `SiteFooter.dc.html`
- Logik/Anbindung: `brevo.js`, `BREVO-SETUP.md`
- Designsystem: `_ds/geld-verstehen-…/` (Tokens, Komponenten, Assets)
- Bilder/Texte: `uploads/`
- (Ignorieren: `support.js` = Prototyp-Runtime; `Mobil-Vorschau.dc.html` = Vorschau-Hilfe)

## Empfohlene nächste Schritte in Claude Code
1. Framework wählen (Next.js/Astro empfohlen) und Projekt aufsetzen.
2. Design-Tokens aus `_ds/.../tokens/*.css` als CSS-Variablen/Theme übernehmen; Bebas Neue
   + PT Sans einbinden (Google Fonts).
3. `SiteNav` + `SiteFooter` als Layout-Komponenten, dann Seiten nachbauen.
4. Serverseitige Brevo-Route bauen und `subscribeToBrevo` daran anbinden (API-Key als Env-Var).
5. Impressum + Datenschutz mit echten, juristisch geprüften Inhalten füllen.
6. Bilder optimieren (WebP/AVIF, responsive) und Alt-Texte prüfen.
