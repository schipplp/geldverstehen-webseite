// ============================================================================
// brevo.js — Zentrale Anbindungsstelle für Brevo (ehem. Sendinblue)
// ----------------------------------------------------------------------------
// Alle E-Mail-Opt-in-Formulare der Website (Startseite-Crashkurs, Crashkurs-
// Seite, Buch-Benachrichtigung) laufen über die Funktion subscribeToBrevo().
// Solange BREVO_CONFIG.endpoint LEER ist, läuft alles im Prototyp-Modus
// (Erfolg wird simuliert, es wird nichts verschickt).
//
// ▶ SPÄTER ANBINDEN (in Claude Code / im echten Projekt):
//   1. Eine serverseitige Route/Function bauen, die den Brevo-API-Key
//      GEHEIM hält und die Brevo-API mit Double-Opt-In aufruft.
//   2. Deren öffentliche URL unten in BREVO_CONFIG.endpoint eintragen.
//   3. Die Brevo-Listen-IDs unter BREVO_CONFIG.lists eintragen.
//
// ⚠ WICHTIG: Den Brevo-API-Key NIEMALS in diese Datei schreiben — er würde
//   im Browser sichtbar. Immer über die serverseitige Route aufrufen.
//   (Alternativ Brevos fertiges Embed-Formular verwenden — dann wird diese
//   Datei nicht gebraucht.)
// ============================================================================

export const BREVO_CONFIG = {
  // Öffentliche URL der serverseitigen Route, die an Brevo weiterleitet.
  // Beispiel: '/api/brevo/subscribe'  (leer lassen = Prototyp-Modus)
  endpoint: '',

  // Brevo-Listen-IDs je nach Formular-Quelle (Zahlen aus dem Brevo-Konto):
  lists: {
    crashkurs: null,   // Anmeldungen über den kostenlosen Crashkurs
    newsletter: null,  // allgemeiner Newsletter
    buch: null,        // Benachrichtigung, sobald das Buch erscheint
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

  // ---- PROTOTYP-MODUS (noch keine Anbindung): Erfolg simulieren ------------
  await new Promise((r) => setTimeout(r, 300));
  return { ok: true, simulated: true };
}
