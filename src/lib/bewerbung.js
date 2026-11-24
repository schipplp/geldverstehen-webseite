// ============================================================================
// bewerbung.js — Versand des Coaching-Bewerbungsformulars
// (components/BewerbungForm.astro)
// ----------------------------------------------------------------------------
// Die statische Seite kann selbst keine E-Mails senden. Das Formular postet
// deshalb an eine kleine Supabase Edge Function (Projekt GELD VERSTEHEN,
// Quelltext: supabase/functions/coaching-bewerbung/index.ts). Die schickt die
// Angaben über Resend als E-Mail weiter. Empfänger und Resend-Schlüssel
// liegen dort als Secrets, nicht im Frontend.
//
// Leerer endpoint = Prototyp-Modus, es wird nichts versendet.
// ============================================================================

export const BEWERBUNG_CONFIG = {
  endpoint: 'https://fivtdlrrhzjeanlpuuyb.supabase.co/functions/v1/coaching-bewerbung',
};
