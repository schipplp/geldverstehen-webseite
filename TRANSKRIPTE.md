# Podcast-Transkripte auf geldverstehen.de

Jede Podcast-Folge hat eine eigene Seite unter `geldverstehen.de/podcast/<slug>/`.
Die Seiten entstehen beim Build automatisch aus dem RSS-Feed (`src/lib/podcast.ts`).
Liegt zu einer Folge ein bereinigtes Transkript in `src/transkripte/NNN.md`, erscheint es
auf der Folgen-Seite – zusammen mit „Kurz gesagt" und „Passende Folgen".

Diese Datei ist die Arbeitsanleitung für neue Transkripte – für Menschen und für die
wöchentliche Claude-Aufgabe, die neue Transkripte automatisch übernimmt.

## Quelle

- Google-Drive-Ordner mit Pers Rohtranskripten: Ordner-ID `1Thg77jjy_zlTeAihyuopFSEOVGf_D7oq`
  (Dateien wie `093.docx`, gelegentlich Google Docs wie `084 – … – Transkript`; daneben die MP3s).
- Folgenkatalog mit allen Titeln: Google Doc „GELD VERSTEHEN – Themen-Playbook",
  ID `1CBIf-Ofm8m0bkktKQ28UKJJNSoE_KGIuQ1-FWWZoTzE`, Abschnitt 7 „Vollständige Katalogliste".

## Ablauf für ein neues Transkript

1. Datei im Drive-Ordner finden, die noch nicht übernommen ist (Abgleich über das Feld
   `quelle` in `src/transkripte/*.md`). MP3s und Bilder ignorieren.
2. Lesen und prüfen, ob es ein gesprochenes Transkript ist (beginnt meist mit
   „Willkommen bei Geldverstehen …"). Skripte, Stichpunkte o. Ä. nicht übernehmen.
3. **Dublettencheck:** Ist der Text weitgehend gleich mit einem schon vorhandenen
   Transkript (z. B. falsche Datei hochgeladen), nicht übernehmen und melden.
   Bekannte Fälle: Drive-„060" = Text von Folge 17, `068.docx` = Text von Folge 33.
4. **Noch nicht erschienene Folgen:** Per legt Transkripte oft schon vor der
   Veröffentlichung ab. Ist die Folge noch nicht erschienen, Transkript trotzdem
   vollständig bereinigen und mit `titel: ""` speichern. Solche Dateien gelten als
   „wartend": Bei jedem Lauf prüfen, ob die Folge inzwischen erschienen ist
   (Katalog im Themen-Playbook bzw. Folgenliste auf geldverstehen.de/podcast/folgen/),
   und dann den exakten Titel eintragen.
5. **Titel zuordnen** – über den INHALT, exakt mit dem Titel aus dem Katalog (ohne Datum,
   ohne Klammerzusätze wie „(Special)"). Die Dateinummer ist nur ein Hinweis: Pers
   Nummern weichen teils ab (080 = „Blick aufs Konto", 081 = „Cash Stuffing",
   086/087 vertauscht). Passt kein Titel eindeutig → nicht übernehmen, melden.
6. Bereinigen (Regeln unten) und speichern als `src/transkripte/NNN.md`.
7. `kurz` und `themen` ergänzen (Regeln unten).
8. `npm run build` muss fehlerfrei laufen.

## Dateiformat

```
---
folge: 93
titel: "Exakter Titel aus dem Katalog"
quelle: "093.docx"
themen: ["haushaltsbuch", "mindset"]
kurz:
  - "Kernaussage der Folge als ganzer Satz."
  - "Zweiter Punkt."
  - "Dritter Punkt."
---

Erster Absatz …

Zweiter Absatz …
```

YAML-Strings in geraden doppelten Anführungszeichen; innerhalb der Texte nie gerade `"`,
sondern „…".

## Bereinigungs-Regeln (streng)

- **Intro weg:** der feste Vorspann „Willkommen bei Geldverstehen, dem Podcast rund um das
  Thema private Finanzen … findest du unter Geld verstehen.de."
- **Outro weg:** der feste Abspann „Das war Geld verstehen. Der Podcast rund um das Thema
  private Finanzen … Schreib uns gerne." Was Per vorher selbst sagt (Verabschiedung,
  Crashkurs-Hinweis, „schreibt mir"), bleibt.
- **Erkennungsfehler korrigieren:** „Peer Zippel" → „Per Schippl"; Marke → „GELD VERSTEHEN";
  „Geld verstehen.de" → „geldverstehen.de"; „ohne Peak"/„One Piece" → „OnePeek" (alter
  App-Name; seit Herbst 2026 heißt die App „GELD VERSTEHEN"); „Fixkosten und Fixkosten" bei
  den drei Kategorien → „Einnahmen, Fixkosten und Flexkosten"; Rechtschreibung, Kommas,
  Fragezeichen, Getrennt-/Zusammenschreibung.
- **Erlaubt:** Stotterer und wörtliche Doppelungen entfernen, abgebrochene Satzanfänge glätten,
  Satzgrenzen setzen, Wortstellung minimal reparieren.
- **Verboten:** nichts hinzuerfinden, nichts inhaltlich umformulieren, nichts kürzen (außer
  Doppelungen/Intro/Outro), keine Zwischenüberschriften, Listen, Fettdruck oder Links. Der Ton
  bleibt gesprochen.
- **Unklare Stellen:** Wortlaut stehen lassen, nicht raten, im Bericht nennen.
- **Absätze:** bei Gedankenwechsel, etwa alle 3–7 Sätze.

## „Kurz gesagt" (`kurz`)

- 3–4 Punkte, je ein Satz, höchstens ca. 25 Wörter. Punkt 1 = zentrale Aussage der Folge,
  danach die wichtigsten Gründe, Schritte oder Regeln.
- Nur was Per in diesem Transkript sagt, nah an seinen Formulierungen. Keine eigenen Tipps,
  keine Zahlen, die nicht im Text stehen. Du-Ansprache, ruhig, keine Ausrufezeichen.
- Keine Verweise auf App/Crashkurs/Buch, außer die Folge handelt genau davon.

## Themen (`themen`) – 1–2 aus dieser Liste, erstes = Hauptthema

- `haushaltsbuch` – Haushaltsbuch führen, Erfassen, Kategorien
- `ausgaben` – zu viel ausgeben, Geldfresser, Konsum, Spontankäufe
- `sparen` – Sparen, Rücklagen, Puffer, Vermögensaufbau
- `mindset` – Motivation, Gewohnheiten, Frust/Scham, Denkfehler, dranbleiben
- `system` – Struktur, Konten, Regeln, Planung, Monatsbilanz, Überblick
- `paare` – Geld in Beziehung/Familie

## Nach dem Veröffentlichen prüfen

Im Log des GitHub-Actions-Builds („Build with Astro") darf keine Zeile
`[podcast] Transkripte ohne passende Folge im Feed` stehen. Steht sie dort, passt der Titel
im Transkript nicht zum Feed-Titel: Titel im Frontmatter an den Feed-Titel angleichen.
Die Zeile `[podcast] Transkripte warten auf ihre Folge` ist dagegen normal (Folgen mit
leerem Titel, noch nicht erschienen).
Die Zeile `[podcast] Feed: … Folgen, … mit <podcast:transcript>` zeigt außerdem, ob letscast
selbst Transkripte im Feed mitliefert.
