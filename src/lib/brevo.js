// ============================================================================
// brevo.js — Zentrale Anbindungsstelle für Brevo (ehem. Sendinblue)
// ----------------------------------------------------------------------------
// Alle E-Mail-Opt-in-Formulare der Website (Startseite-Crashkurs, Crashkurs-
// Seite, Buch-Benachrichtigung) laufen über die Funktion subscribeToBrevo().
// Solange BREVO_CONFIG.endpoint LEER ist, läuft alles im Prototyp-Modus
// (Erfolg wird simuliert, es wird nichts verschickt).
//
// ▶ SCHARFSCHALTEN (sobald Per die Daten liefert):
//   Empfohlener Weg ohne eigenen Server (passend zu GitHub Pages):
//   Pro Formular-Quelle in Brevo ein Formular anlegen und dessen generierte
//   POST-URL unten unter BREVO_CONFIG.formActions eintragen. Das eigene Layout
//   bleibt erhalten, es wird nur an Brevo gepostet. Double-Opt-in in Brevo
//   aktivieren. Siehe design/BREVO-SETUP.md.
//
//   Alternativer Weg mit eigenem Backend: BREVO_CONFIG.endpoint auf eine
//   serverseitige Route setzen, die den API-Key GEHEIM hält.
//
// ⚠ WICHTIG: Den Brevo-API-Key NIEMALS in diese Datei schreiben — er würde
//   im Browser sichtbar. Immer über eine Brevo-Formular-URL oder eine
//   serverseitige Route arbeiten.
// ============================================================================

export const BREVO_CONFIG = {
  // TODO(Per): Öffentliche URL einer serverseitigen Route (optional, nur bei
  // eigenem Backend). Leer lassen = Prototyp-Modus (bzw. formActions nutzen).
  endpoint: '',

  // TODO(Per): Von Brevo generierte Formular-POST-URLs je Quelle eintragen.
  // Sobald hier eine URL steht, wird das Formular als klassischer POST an
  // Brevo abgeschickt (kein eigener Server nötig).
  formActions: {
    crashkurs: '',   // Anmeldungen über den kostenlosen Crashkurs
    newsletter: '',  // allgemeiner Newsletter
    buch: '',        // Benachrichtigung, sobald das Buch erscheint
  },

  // TODO(Per): Brevo-Listen-IDs je nach Formular-Quelle (Zahlen aus Brevo):
  lists: {
    crashkurs: null,
    newsletter: null,
    buch: null,
  },

  // Optional: Double-Opt-In-Konfiguration (in der Server-Route genutzt)
  doubleOptInTemplateId: null,
  redirectionUrl: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Meldet eine E-Mail-Adresse bei Brevo an.
 *
 * @param {Object} opts
 * @param {string} opts.email       Eingegebene E-Mailadresse
 * @param {string} opts.source      Formular-Quelle: 'crashkurs' | 'newsletter' | 'buch'
 * @param {number} [opts.listId]    Optional: Listen-ID überschreiben
 * @param {Object} [opts.attributes] Optional: zusätzliche Brevo-Attribute (VORNAME, …)
 * @returns {Promise<{ok:boolean, error?:string, simulated?:boolean}>}
 */
export async function subscribeToBrevo({ email, source = 'newsletter', listId, attributes } = {}) {
  const clean = (email || '').trim();

  if (!EMAIL_RE.test(clean)) {
    return { ok: false, error: 'Bitte gib eine gültige E-Mailadresse ein.' };
  }

  // ---- ECHTE ANBINDUNG (aktiv, sobald endpoint gesetzt ist) ----------------
  if (BREVO_CONFIG.endpoint) {
    try {
      const res = await fetch(BREVO_CONFIG.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: clean,
          source,
          listId: listId ?? BREVO_CONFIG.lists[source] ?? null,
          attributes: attributes || {},
        }),
      });
      if (!res.ok) {
        return { ok: false, error: 'Es hat leider nicht geklappt. Bitte versuche es später erneut.' };
      }
      return { ok: true };
    } catch (err) {
      return { ok: false, error: 'Netzwerkfehler. Bitte versuche es später erneut.' };
    }
  }

  // ---- BREVO-FORMULAR-POST (aktiv, sobald formActions[source] gesetzt ist) --
  const action = BREVO_CONFIG.formActions[source] || BREVO_CONFIG.formActions.newsletter;
  if (action) {
    try {
      const body = new URLSearchParams();
      body.set('EMAIL', clean);
      const res = await fetch(action, {
        method: 'POST',
        mode: 'no-cors', // Brevo-Formular-Endpunkt erlaubt kein CORS-Lesen
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      // Bei no-cors ist die Antwort "opaque" — wir werten sie als Erfolg,
      // die eigentliche Bestätigung übernimmt Brevos Double-Opt-in-Mail.
      return { ok: true };
    } catch (err) {
      return { ok: false, error: 'Netzwerkfehler. Bitte versuche es später erneut.' };
    }
  }

  // ---- PROTOTYP-MODUS (noch keine Anbindung): Erfolg simulieren ------------
  await new Promise((r) => setTimeout(r, 300));
  return { ok: true, simulated: true };
}
