// Google Analytics 4 — Mess-ID im Format G-XXXXXXXXXX.
//
// Aktiv gesetzt: Es erscheint das Consent-Banner und GA wird ausschließlich
// NACH aktiver Einwilligung geladen (mit IP-Kürzung).
//
// Leer lassen ('') würde Analytics UND Cookie-Banner komplett deaktivieren
// (die Seite setzt dann keinerlei Cookies). Nur GA4-IDs (G-…) verwenden —
// die alte UA-ID (UA-…) wurde von Google zum 1. Juli 2023 abgeschaltet.
export const GA_MEASUREMENT_ID = 'G-34VTD24M2D';

// Meta-Pixel (Retargeting auf Facebook/Instagram). Wird wie Google Analytics
// ausschließlich NACH Einwilligung geladen (components/Consent.astro).
// Leer lassen (''), um das Pixel komplett abzuschalten.
export const META_PIXEL_ID = '1715026423379746';
