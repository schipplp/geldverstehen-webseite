// ============================================================================
// brevo.js — Zentrale Anbindungsstelle für Brevo (ehem. Sendinblue)
// ----------------------------------------------------------------------------
// Alle E-Mail-Opt-in-Formulare der Website (Startseite-Crashkurs, Crashkurs-
// Seite, Buch-Benachrichtigung) laufen über subscribeToBrevo({ email, source }).
//
// Es gibt EIN Brevo-Formular / EINE Liste — deshalb wird jede Quelle an
// dieselbe Formular-URL geschickt. Damit du erkennst, über welches Opt-in
// jemand kam, wird die Quelle zusätzlich in ein Brevo-Kontakt-Attribut
// geschrieben (siehe BREVO_CONFIG.sourceField / QUELLE).
//
// ▶ EINMALIG IN BREVO EINRICHTEN, damit die Quelle/das „Tag" ankommt:
//   1. Kontakt-Attribut anlegen:  Kontakte → Einstellungen → Kontakt-
//      Attribute → neues TEXT-Attribut mit Namen „QUELLE".
//   2. Dieses Attribut dem Formular als (verstecktes) Feld hinzufügen
//      (Formular-Editor → Feld „QUELLE" einfügen).
//   Danach steht bei jedem Kontakt QUELLE = "crashkurs" oder "buch".
//   -> In Brevo kannst du daraus ein Segment/„Tag" bauen und filtern.
//
// Ohne Schritt 1+2 funktioniert die Anmeldung trotzdem — nur die Quelle
// wird dann von Brevo ignoriert.
//
// ⚠ Kein API-Key im Frontend nötig: Wir posten direkt an die von Brevo
//   generierte Formular-URL. Double-Opt-in wird in Brevo eingestellt.
// ============================================================================

export const BREVO_CONFIG = {
  // Von Brevo generierte Formular-POST-URL (eine Liste für alle Opt-ins).
  formUrl:
    'https://b59a5efd.sibforms.com/serve/MUIFABxhux1ZvmEyIcFi7f8xKDEe4IPXjLs3rMKWtrnheIg2cL9nEp4Yl58JdV7s0IpfX6D6GrRGrQ52dh0Wy6HL1KP2peKB58kYK1fBO3OiUXb9if8HDz62FTSf9NsFvahAC1WxymSi1EpSR6zmmPQRVGpUmOXwnE-DkG--JPb8P_pJgu5OIkgRPIeJkelUH1vKJ7L6jda5goui',

  // Brevo-Kontakt-Attribut, in das die Opt-in-Quelle geschrieben wird.
  // In Brevo als TEXT-Attribut anlegen und dem Formular als Feld hinzufügen.
  // Leer lassen ('') = keine Quelle mitsenden.
  sourceField: 'QUELLE',

  locale: 'de',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Meldet eine E-Mail-Adresse beim Brevo-Formular an.
 *
 * @param {Object} opts
 * @param {string} opts.email    Eingegebene E-Mailadresse
 * @param {string} opts.source   Opt-in-Quelle: 'crashkurs' | 'buch' | 'newsletter'
 * @returns {Promise<{ok:boolean, error?:string, simulated?:boolean}>}
 */
export async function subscribeToBrevo({ email, source = 'newsletter' } = {}) {
  const clean = (email || '').trim();

  if (!EMAIL_RE.test(clean)) {
    return { ok: false, error: 'Bitte gib eine gültige E-Mailadresse ein.' };
  }

  // ---- PROTOTYP-MODUS (falls keine Formular-URL gesetzt ist) ----------------
  if (!BREVO_CONFIG.formUrl) {
    await new Promise((r) => setTimeout(r, 300));
    return { ok: true, simulated: true };
  }

  // ---- ECHTE ANBINDUNG: direkter POST an das Brevo-Formular -----------------
  try {
    const body = new URLSearchParams();
    body.set('EMAIL', clean);
    body.set('email_address_check', ''); // Brevo-Honeypot (muss leer bleiben)
    body.set('locale', BREVO_CONFIG.locale);
    if (BREVO_CONFIG.sourceField) {
      body.set(BREVO_CONFIG.sourceField, source); // Quelle/„Tag": crashkurs | buch | …
    }

    await fetch(BREVO_CONFIG.formUrl, {
      method: 'POST',
      mode: 'no-cors', // Brevo-Formular-Endpunkt sendet keine CORS-Header
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    // Bei no-cors ist die Antwort "opaque" — wir werten sie als Erfolg.
    // Die eigentliche Bestätigung übernimmt Brevos Double-Opt-in-Mail.
    return { ok: true };
  } catch (err) {
    return { ok: false, error: 'Netzwerkfehler. Bitte versuche es später erneut.' };
  }
}
