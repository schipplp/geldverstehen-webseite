# Launch-Checkliste — geldverstehen.de

Diese Liste zeigt, was vor dem endgültigen Go-live noch offen ist.
Legende: 🔴 Blocker · 🟡 Entscheidung/Bestätigung nötig · 🟢 nice-to-have (kann auch nach Live) · ✅ erledigt

_Stand: 2026-07-19_

---

## 🔴 Muss vor Live erledigt sein

**Keine offenen Blocker mehr — die Seite ist technisch startklar.** 🎉
Es fehlt nur noch die bewusst zurückgestellte Domain-Entscheidung (siehe unten).

## 🟡 Entscheidung / Bestätigung

- [ ] **Domain-Entscheidung** (Per) — _zurückgestellt_
  Aktuell live unter der Projekt-URL `schipplp.github.io/geldverstehen-webseite`.
  Domain liegt bei DomainFactory; Provider-Wechsel noch offen, daher nach hinten gestellt.
  Für **geldverstehen.de** brauche ich dein „Los": dann CNAME + DNS +
  Pages-Einstellung + Umstellung `site`/`base` in der Astro-Config.
  (Unabhängig vom Rest – blockiert nichts, kann jederzeit dazukommen.)

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
