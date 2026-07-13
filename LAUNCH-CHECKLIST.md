# Launch-Checkliste — geldverstehen.de

Diese Liste zeigt, was vor dem endgültigen Go-live noch offen ist.
Legende: 🔴 Blocker · 🟡 Entscheidung/Bestätigung nötig · 🟢 nice-to-have (kann auch nach Live) · ✅ erledigt

_Stand: 2026-07-13_

---

## 🔴 Muss vor Live erledigt sein

- [ ] **Brevo-Zustellung testen & sicherstellen** (Per)
  Alle Opt-in-Formulare (Startseite, Crashkurs-Seite, Buch-Seite, Haushaltsbuch-Artikel)
  sind technisch angebunden, aber in bisherigen Tests kam nichts in Brevo an.
  Bitte prüfen:
  1. Die Brevo-Formular-URL direkt im Browser testen (trägt sich ein Kontakt ein?).
  2. Double-Opt-in im Brevo-Formular aktiviert?
  3. In Brevo unter *Kontakte* nachsehen — auch bei Status **„nicht bestätigt"**.
  4. Ist die richtige Liste dem Formular zugeordnet?
  → Ohne funktionierende Zustellung läuft die zentrale Anmelde-Funktion ins Leere.

- [ ] **Datenschutzerklärung final prüfen (lassen)** (Per)
  Text ist eingebaut inkl. Google Analytics, YouTube (2-Klick) und Brevo.
  Vor Live idealerweise anwaltlich / final freigeben.

- [ ] **Impressum bestätigen** (Per)
  Aktuell hinterlegt: Per Schippl · Mutzenbecherstraße 9 · 26131 Oldenburg · mail@geldverstehen.de.
  Bitte bestätigen, dass vollständig & korrekt (z. B. USt-IdNr./Telefon nötig?).

## 🟡 Entscheidung / Bestätigung

- [ ] **Domain-Entscheidung** (Per)
  Aktuell live unter der Projekt-URL `schipplp.github.io/geldverstehen-webseite`.
  Für **geldverstehen.de** brauche ich dein „Los": dann CNAME + DNS +
  Pages-Einstellung + Umstellung `site`/`base` in der Astro-Config.

- [ ] **Google-Analytics-Property bestätigen** (Per)
  Eingebaut ist `G-34VTD24M2D` (lädt erst nach Cookie-Einwilligung).
  Bitte bestätigen, dass das die richtige GA4-Property ist.

## 🟢 Nice-to-have (auch nach Live möglich)

- [ ] **Offizielle App-Store-/Play-Store-Badges** (Per liefert nach)
- [ ] **Offizielle Spotify-/Apple-Podcasts-Badges** (Icons sind bereits gesetzt)
- [ ] **Exaktes Favicon** als PNG (aktuell sauberer SVG-Nachbau des Sprout-Coin-Logos)
- [ ] **Grafiken für den Haushaltsbuch-Artikel** (Per liefert nach)
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
