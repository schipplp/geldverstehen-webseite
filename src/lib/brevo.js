// ============================================================================
// brevo.js — Konfiguration der Brevo-Anbindung (ehem. Sendinblue)
// ----------------------------------------------------------------------------
// Alle E-Mail-Opt-in-Formulare posten direkt an DAS Brevo-Formular (eine Liste).
// Das Absenden läuft über ein klassisches HTML-Formular-POST in ein verstecktes
// Iframe (siehe components/EmailOptIn.astro) — das ist der zuverlässigste Weg
// ohne eigenen Server und ohne CORS-Probleme.
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
  formUrl:
    'https://b59a5efd.sibforms.com/serve/MUIFABxhux1ZvmEyIcFi7f8xKDEe4IPXjLs3rMKWtrnheIg2cL9nEp4Yl58JdV7s0IpfX6D6GrRGrQ52dh0Wy6HL1KP2peKB58kYK1fBO3OiUXb9if8HDz62FTSf9NsFvahAC1WxymSi1EpSR6zmmPQRVGpUmOXwnE-DkG--JPb8P_pJgu5OIkgRPIeJkelUH1vKJ7L6jda5goui',

  // Brevo-Kontakt-Attribut, in das die Opt-in-Quelle geschrieben wird.
  // In Brevo als TEXT-Attribut anlegen und dem Formular als Feld hinzufügen.
  // Leer lassen ('') = keine Quelle mitsenden.
  sourceField: 'QUELLE',

  locale: 'de',
};

// Für die clientseitige Validierung (vor dem Absenden).
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
