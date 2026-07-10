// Bilder werden direkt aus dem Designpaket (design/uploads, bereits
// weboptimiert) über die Astro/Vite-Asset-Pipeline eingebunden. Sie landen
// beim Build fingerprinted in dist/_astro/ — es müssen keine Kopien im Repo
// gehalten werden ("Keine unoptimierten Originale einchecken").
// `?url` liefert die fertige, basis-korrekte URL als String.
import perHero from '../../design/uploads/DSC00023.jpg?url';
import podcastCover from '../../design/uploads/new podcast cover_v5.jpg?url';
import onepeekApp from '../../design/uploads/1de.webp?url';
import buchCover from '../../design/uploads/md.jpeg?url';
import perUeberSplit from '../../design/uploads/DSC00065.JPG?url';
import perAppHero from '../../design/uploads/DSC00142.JPG?url';
import perUeberHero from '../../design/uploads/DSC00117.JPG?url';
import perStory from '../../design/uploads/DSC00058.JPG?url';
import perCrashkurs from '../../design/uploads/DSC00163.JPG?url';

export const img = {
  perHero,
  podcastCover,
  onepeekApp,
  buchCover,
  perUeberSplit,
  perAppHero,
  perUeberHero,
  perStory,
  perCrashkurs,
};
