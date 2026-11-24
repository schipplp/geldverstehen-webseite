// Rendert die Werbemittel aus vorlage.html. Aufruf: node render.cjs
const { chromium } = require('playwright');
const FORMATE = [
  ['app-werbeflaeche', 1284, 711],   // Werbefläche in der App (428 × 237 pt, dreifach)
  ['push', 1024, 512],               // Bild in der Push-Nachricht (2:1)
  ['anzeige-quer', 1200, 628],
  ['anzeige-quadrat', 1080, 1080],
  ['story-hoch', 1080, 1920],
];
(async () => {
  const b = await chromium.launch();
  for (const [name, w, h] of FORMATE) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(`file://${__dirname}/vorlage.html?w=${w}&h=${h}`);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.locator('.g').screenshot({ path: `${__dirname}/coaching-${name}.png` });
    await p.close();
  }
  await b.close();
})();
