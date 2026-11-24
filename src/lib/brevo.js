// ============================================================================
// brevo.js — Konfiguration der Brevo-Anbindung (ehem. Sendinblue)
// ----------------------------------------------------------------------------
// Alle E-Mail-Opt-in-Formulare (components/EmailOptIn.astro) senden per fetch
// an diese von Brevo generierte Formular-URL (serve). Kein eigener Server,
// kein API-Key im Frontend nötig.
//
// Damit du erkennst, über welches Opt-in jemand kam, wird die Quelle als
// Kontakt-Attribut „QUELLE" (crashkurs / buch) mitgeschickt.
//
// ▶ EINMALIG IN BREVO EINRICHTEN, damit die Quelle ankommt:
//   1. Kontakt-Attribut anlegen: Kontakte → Einstellungen → Kontakt-Attribute
//      → neues TEXT-Attribut „QUELLE".
//   2. Dieses Attribut dem Formular als (verstecktes) Feld hinzufügen.
//   Ohne diese Schritte funktioniert die Anmeldung trotzdem — nur die Quelle
//   wird dann von Brevo ignoriert.
//
// ▶ Double-Opt-in im Brevo-Formular aktivieren (Bestätigungsmail).
//
// ⚠ Kein API-Key im Frontend — es wird nur an die öffentliche Formular-URL
//   gepostet, die Brevo generiert hat.
// ============================================================================

export const BREVO_CONFIG = {
  // Von Brevo generierte Formular-POST-URL (eine Liste für alle Opt-ins).
  // Stand: neues Brevo-Konto, Formular „Newsletter" (Felder: EMAIL, locale,
  // Honeypot email_address_check). Alle Opt-ins der Website posten hierauf.
  formUrl:
    'https://d05bc432.sibforms.com/serve/MUIFAOmqaZ-fM2uxa36TeP0JFSj9ZCaPLdQDC7N0oBBA6InXYR7qRLnD-19UihClc_iX2Wj0lm4vSwgDdAjBnw_yRVBGxkbNqz39tLk-MXA3AOvMpGOW-PgjhEeYHnfPCZJ0KSUE2NOfRo5P3r3QlynW14iI1zczxBORCXoyEgvMw7QTvPVxOMXD2qWRhU3nLgL90fFI0MBn-rjBEw==',

  // Brevo-Kontakt-Attribut, in das die Opt-in-Quelle geschrieben wird.
  // WICHTIG: Ein Feld mitzusenden, das im Brevo-Formular NICHT existiert, kann
  // dazu führen, dass Brevo die ganze Anmeldung verwirft. Deshalb ist das
  // Quelle-Feld vorerst DEAKTIVIERT ('').
  // ▶ Zum Aktivieren: in Brevo ein TEXT-Attribut „QUELLE" anlegen UND dem
  //   Formular als (verstecktes) Feld hinzufügen, dann hier auf 'QUELLE' setzen.
  sourceField: '',

  locale: 'de',
};

// Für die clientseitige Validierung (vor dem Absenden).
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
