// ============================================================================
// bewerbung.js — Versand des Coaching-Bewerbungsformulars
// (components/BewerbungForm.astro)
// ----------------------------------------------------------------------------
// Die statische Seite kann selbst keine E-Mails senden. Das Formular postet
// deshalb an den Formular-zu-E-Mail-Dienst Web3Forms, der die Angaben als
// E-Mail an die beim Schlüssel hinterlegte Adresse weiterleitet.
//
// TODO(Per): Auf https://web3forms.com einen Access Key für
// mail@geldverstehen.de erzeugen und unten eintragen. Der Schlüssel ist für
// den Einsatz im Frontend gedacht und darf öffentlich im Code stehen.
// Solange er leer ist: Prototyp-Modus, es wird nichts versendet.
// ============================================================================

export const BEWERBUNG_CONFIG = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '',
  // Betreff und Absendername der E-Mail, die bei Per ankommt.
  subject: 'Bewerbung Coaching',
  fromName: 'geldverstehen.de',
};
