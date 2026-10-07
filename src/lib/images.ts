// Bilder werden direkt aus dem Designpaket (design/uploads, bereits
// weboptimiert) über die Astro/Vite-Asset-Pipeline eingebunden. Sie landen
// beim Build fingerprinted in dist/_astro/ — es müssen keine Kopien im Repo
// gehalten werden ("Keine unoptimierten Originale einchecken").
// `?url` liefert die fertige, basis-korrekte URL als String.
// Freigestellt mit echter Transparenz: Das Original hatte einen weißen
// Aufkleber-Rand und einen eigenen Blauton, der neben dem Marken-Blau stand.
import perHero from '../../design/uploads/per-hero-freisteller.webp?url';
// Web-Fassungen (verkleinert, WebP): Die Originale waren 1920 px breit und
// bremsten die Startseite auf dem Handy.
import podcastCover from '../../design/uploads/podcast-cover-web.webp?url';
import appScreenshot from '../../design/uploads/1de-web.webp?url';
import buchCover from '../../design/uploads/md.jpeg?url';
import perUeberSplit from '../../design/uploads/DSC00065-web.webp?url';
import perUeberHero from '../../design/uploads/DSC00117.JPG?url';
import perStory from '../../design/uploads/DSC00058.JPG?url';
import perCrashkurs from '../../design/uploads/DSC00163.JPG?url';

// App-Seite: Produkt-Screenshots, Presse und stern-TV-Standbild
import appHeroPhones from '../../design/uploads/md2xde.webp?url';
import bildLogo from '../../design/uploads/bild.webp?url';
import appEinkommen from '../../design/uploads/1-einkommen-eintragen.webp?url';
import appFixkosten from '../../design/uploads/2-fixkosten-eintragen.webp?url';
import appFlexkosten from '../../design/uploads/3-flexkosten-betrag.webp?url';
import appDashboard from '../../design/uploads/8-dashboard.webp?url';
import appBilanz from '../../design/uploads/10-balance-sheet.webp?url';
import appHaushaltsbuecher from '../../design/uploads/5-haushaltsbuecher.webp?url';
import appTeilen from '../../design/uploads/6-haushaltsbuch-teilen.webp?url';
import sternTvCover from '../../design/uploads/stern-tv-cover.webp?url';

export const img = {
  perHero,
  podcastCover,
  appScreenshot,
  buchCover,
  perUeberSplit,
  perUeberHero,
  perStory,
  perCrashkurs,
  appHeroPhones,
  bildLogo,
  appEinkommen,
  appFixkosten,
  appFlexkosten,
  appDashboard,
  appBilanz,
  appHaushaltsbuecher,
  appTeilen,
  sternTvCover,
};
