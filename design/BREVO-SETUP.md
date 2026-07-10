# Brevo-Anbindung — Vorbereitung

Alle E-Mail-Opt-in-Formulare laufen bereits über **eine** zentrale Stelle:
`brevo.js` → Funktion `subscribeToBrevo({ email, source })`.

Aktuell ist der **Prototyp-Modus** aktiv: Eingaben werden validiert und die
Erfolgsmeldung erscheint, es wird aber noch nichts verschickt.

## Wo die Formulare hängen
| Seite | Formular-Quelle (`source`) |
|-------|----------------------------|
| `Startseite.dc.html` (Hero + Abschluss-Band) | `crashkurs` |
| `Crashkurs.dc.html` | `crashkurs` |
| `Buch.dc.html` (Benachrichtigung) | `buch` |

## So wird Brevo später scharf geschaltet (in Claude Code / echtem Projekt)
1. Serverseitige Route bauen (z.B. `/api/brevo/subscribe`), die den
   **Brevo-API-Key geheim** hält und die Brevo-API mit Double-Opt-In aufruft.
2. In `brevo.js` → `BREVO_CONFIG.endpoint` die URL dieser Route eintragen.
3. In `BREVO_CONFIG.lists` die Brevo-Listen-IDs pro `source` eintragen.

Sobald `endpoint` gesetzt ist, nutzt `subscribeToBrevo()` automatisch den
echten Aufruf statt der Simulation — an den Seiten selbst muss nichts geändert
werden.

⚠ Den Brevo-API-Key **nie** ins Frontend (also nicht in `brevo.js`) schreiben.

## Ohne eigenes Backend
Alternativ Brevos fertiges **Embed-Formular** (iframe/Snippet) an der jeweiligen
Stelle einsetzen — dann wird `brevo.js` nicht benötigt.
