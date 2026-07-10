# GELD VERSTEHEN — Website (geldverstehen.de)

## Was dieses Repo ist
Die Website der Personal-Finance-Marke **GELD VERSTEHEN** von Per Schippl.
Im Ordner `design/` liegt ein vollständiges High-Fidelity-Designpaket aus Claude Design.
**Die maßgebliche Bauanleitung ist `design/HANDOFF.md` — zuerst vollständig lesen.**

## Auftrag
Aus dem Designpaket die echte, produktive Website bauen und über GitHub Pages veröffentlichen.

1. **Framework:** Astro mit rein statischem Output (`output: 'static'`). Kein CMS, keine Datenbank, kein Server — die Seite muss auf GitHub Pages laufen. Struktur so schlank wie möglich halten.
2. **Design:** Pixelgenau nach `design/HANDOFF.md` nachbauen. Die `.dc.html`-Dateien sind Design-Referenzen (Prototyp-Runtime nicht übernehmen). Design-Tokens aus `design/_ds/.../tokens/*.css` übernehmen. Fonts: Bebas Neue + PT Sans (Google Fonts, mit `font-display: swap`).
3. **Seiten:** Startseite, App (OnePeek), Podcast, Buch, Über, Crashkurs, Impressum, Datenschutz. Navigation und Footer als gemeinsame Layout-Komponenten.
4. **Bilder:** In `design/uploads/` liegen bereits weboptimierte Versionen (max. 1920px). Diese verwenden, sinnvolle deutsche Alt-Texte ergänzen. Keine unoptimierten Originale einchecken.
5. **Deployment:** GitHub Action, die bei jedem Push auf `main` baut und auf GitHub Pages veröffentlicht (offizieller Astro-Pages-Workflow). Später kommt die Domain geldverstehen.de als Custom Domain dazu (CNAME-Datei) — erst auf Zuruf von Per.

## Brevo-Anbindung (E-Mail-Opt-in)
Alle Formulare (Crashkurs auf Startseite + Crashkurs-Seite, Buch-Benachrichtigung) sind im Design bereits angelegt und laufen zentral über `design/brevo.js` (siehe `design/BREVO-SETUP.md`).

- **Kein eigener Server, kein API-Key im Frontend.** Stattdessen: Pro Formular-Quelle ein Formular im Brevo-Konto anlegen und die Formulare der Website per POST an die von Brevo generierte Formular-URL senden (eigenes Layout behalten, nur `action`/Feldnamen von Brevo übernehmen). Double-Opt-in in Brevo aktivieren.
- Die Brevo-Formular-URLs und Listen-IDs liefert Per. **Bis dahin Prototyp-Modus beibehalten und die Stellen mit `TODO(Per)` markieren.**
- Erfolgs- und Fehlerzustände wie im Design beschrieben („Fast geschafft!"-Karte, Inline-Fehler).

## Inhaltliche Regeln (WICHTIG)
- **Nichts erfinden.** Alle Texte stammen ausschließlich aus dem Designpaket bzw. `design/uploads/GELD_VERSTEHEN_Website_Visitenkarte_Texte.docx`. Keine erfundenen Beispiele, Zahlen, Testimonials oder Zitate.
- Bei inhaltlichen Lücken (z.B. fehlende Links, Impressumsangaben): **Per fragen, nicht füllen.**
- Impressum und Datenschutz sind Platzhalter — nur mit echten Angaben von Per befüllen.
- Sprache: Deutsch, informelles „du", Ton: kurz, ruhig, selbstbewusst.

## Offene Punkte (bei Per erfragen, sobald relevant)
- [ ] Podcast-Plattform-Links (Spotify, Apple Podcasts, RSS)
- [ ] App-Store-Links für OnePeek (iOS/Android)
- [ ] Brevo-Formular-URLs + Listen-IDs (crashkurs / buch / newsletter)
- [ ] Impressum: vollständige Anbieterangaben
- [ ] Datenschutz: finaler, geprüfter Text (inkl. Brevo-Passus)

## Marke (Kurzreferenz)
- Blau `#1E73BE` (Flächen), Gelb `#FFD000` (CTAs — nie mit weißem Text), Border `#D9DEE5`
- Display: Bebas Neue · Body: PT Sans 17px / 1.6
- Claim: „Deine Finanzen im Griff. Für immer!"
- Kontakt: mail@geldverstehen.de
