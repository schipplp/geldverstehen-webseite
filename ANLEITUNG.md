# Anleitung: Von diesem Paket zur Live-Website

Alles läuft im Browser (Chrome reicht). Kein lokaler Rechner nötig.

## Schritt 1: GitHub-Konto (einmalig, ~10 Min)
1. Auf **github.com** ein Konto anlegen (falls noch nicht vorhanden).
2. Zwei-Faktor-Authentifizierung aktivieren (Settings → Password and authentication).

## Schritt 2: Repo anlegen (~5 Min)
1. Oben rechts **+ → New repository**.
2. Name: **geldverstehen-website**
3. Sichtbarkeit: **Public** (nötig für kostenloses GitHub Pages).
4. Haken bei **„Add a README file"** setzen → **Create repository**.

## Schritt 3: Dieses Paket hochladen (~10 Min)
1. Diese ZIP auf deinem Gerät **entpacken** (nicht die ZIP selbst hochladen).
2. Im Repo: **Add file → Upload files**.
3. Den **Inhalt** des entpackten Ordners (CLAUDE.md, ANLEITUNG.md und den Ordner `design/`)
   per Drag & Drop in das Upload-Feld ziehen. Chrome übernimmt die Ordnerstruktur.
4. Unten grün bestätigen: **Commit changes**.

## Schritt 4: Claude Code verbinden (~5 Min)
1. **claude.ai/code** öffnen (bzw. Claude Code in der Claude-App).
2. GitHub-Konto verknüpfen und das Repo **geldverstehen-website** auswählen.
3. Erster Auftrag an Claude Code:
   > „Lies CLAUDE.md und design/HANDOFF.md und baue die Website wie dort beschrieben.
   > Richte auch das GitHub-Pages-Deployment ein."

## Schritt 5: GitHub Pages aktivieren (~2 Min)
1. Im Repo: **Settings → Pages**.
2. Bei **Source**: **GitHub Actions** auswählen.
3. Nach dem nächsten Build von Claude Code ist die Seite erreichbar unter:
   `https://DEIN-BENUTZERNAME.github.io/geldverstehen-website/`

## Schritt 6: Fertigstellen (mit Claude Code, in Ruhe)
- Brevo: Im Brevo-Konto pro Liste ein Formular anlegen, URLs an Claude Code geben.
- Podcast-Links, App-Store-Links, Impressum, Datenschutz nachliefern.
- Alles auf der Test-Adresse prüfen (auch am Handy).

## Schritt 7: Domain (ganz am Schluss, ~10 Min)
Erst wenn die Seite komplett ist: geldverstehen.de per DNS auf GitHub Pages zeigen
lassen (2 Einträge beim Domain-Anbieter, CNAME-Datei im Repo — Claude Code hilft).
**Wichtig: MX-Einträge (Google-Mail) unverändert lassen.** Danach One Page IO kündigen.

---
**Faustregel ab jetzt:** Jede Änderung an der Website läuft über einen Satz an
Claude Code. Nie Dateien manuell bearbeiten — dann bleibt alles konsistent.
