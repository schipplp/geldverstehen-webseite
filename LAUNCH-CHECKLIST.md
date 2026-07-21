# Launch-Checkliste — geldverstehen.de

Diese Liste zeigt, was vor dem endgültigen Go-live noch offen ist.
Legende: 🔴 Blocker · 🟡 Entscheidung/Bestätigung nötig · 🟢 nice-to-have (kann auch nach Live) · ✅ erledigt

_Stand: 2026-07-21 — Seite vollständig live_

---

## 🔴 / 🟡 Offene Punkte

**Keine offenen Blocker mehr — die Seite ist vollständig live unter
https://geldverstehen.de (mit erzwungenem HTTPS).** 🎉🚀

## 🟢 Nice-to-have (auch nach Live möglich)

- [ ] **Datenschutz: formaler Rechts-Check** (optional) — inhaltlich vollständig
  (alle genutzten Dienste sind erklärt, siehe unten); ein anwaltlicher Blick ist
  reine Absicherung, kein Blocker.
- [ ] **Offizielle App-Store-/Play-Store-Badges** (Per liefert nach)
- [ ] **Offizielle Spotify-/Apple-Podcasts-Badges** (Icons sind bereits gesetzt)
- [ ] **Exaktes Favicon** als PNG (aktuell sauberer SVG-Nachbau des Sprout-Coin-Logos)
- [ ] **Podcast-RSS-Feed-Link** — falls zusätzlich zu Spotify/Apple gewünscht

---

## ✅ Bereits erledigt

- ✅ Komplette Website aus dem Designpaket gebaut (Start, App/OnePeek, Podcast, Buch, Über, Crashkurs, Impressum, Datenschutz, 404, Haushaltsbuch-Artikel)
- ✅ GitHub-Pages-Deployment läuft (Push auf `main` → automatischer Build & Deploy)
- ✅ Echte Links: App Store (iOS), Google Play, Spotify, Apple Podcasts
- ✅ Google Analytics 4 mit Cookie-Consent-Banner (lädt nur nach Einwilligung, IP-Kürzung)
- ✅ YouTube-Videos als DSGVO-konforme 2-Klick-Lösung
- ✅ Schriften selbst gehostet (kein Google-Fonts-Nachladen)
- ✅ Impressum & Datenschutz mit echten Angaben (Freigabe siehe oben)
- ✅ Social-Icons in Footer (Instagram, YouTube, TikTok)
- ✅ Haushaltsbuch-Artikel mit Autoren-Foto, aufklappbaren FAQ und integriertem Opt-in
- ✅ Haushaltsbuch-Artikel mit 5 Grafiken illustriert (Spiralen, 3 Kategorien, Monatsbilanz-Formel, Happy-Balance-Kacheln, Kreislauf)
- ✅ **GA4-Property bestätigt** (`G-34VTD24M2D`, Daten kommen an — Per, 15.07.2026)
- ✅ **Impressum bestätigt** (Angaben vollständig — Per, 15.07.2026)
- ✅ **Datenschutz-Vollständigkeit geprüft**: alle genutzten Dienste (GitHub Pages, Brevo, GA4, YouTube, Fonts, Links) sind erklärt
- ✅ **Brevo E-Mail-Anmeldung angebunden & live getestet** (neues Konto, Formular `d05bc432`, Double-Opt-in kommt an, Kontakt landet in der Liste — Per, 19.07.2026). Alle vier Opt-in-Stellen (Startseite, Crashkurs, Buch, Artikel) laufen darüber.
- ✅ **Custom-Domain geldverstehen.de live mit erzwungenem HTTPS** (CNAME im Build, `site`/`base` umgestellt, DNS-Check erfolgreich, „Enforce HTTPS" aktiv — Per, 21.07.2026).
- ✅ **Über-Seite inhaltlich ausgebaut (v7)**: neuer Abschnitt „Kennst du das?", zwei Story-Blöcke (WER DAHINTER STECKT / DER WEG), vier Überzeugungen im 2×2-Grid.
