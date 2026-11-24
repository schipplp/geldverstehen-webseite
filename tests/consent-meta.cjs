// Aufruf: npm run build && npx astro preview --port 4399 &  dann: node tests/consent-meta.cjs
// Prüfung a) bis e) am lokalen Build. Fremde Server sind aus dieser Umgebung
// nicht erreichbar: Alle Anfragen an Google/Meta werden abgefangen und
// mitgeschrieben. fbevents.js wird durch einen Platzhalter ersetzt, der sich
// wie das echte Pixel verhält, soweit es hier zählt: Er arbeitet die fbq-
// Warteschlange ab, setzt _fbp und ruft für jedes Ereignis facebook.com/tr auf.
const { chromium } = require('playwright');
const BASE = 'http://localhost:4399';
const STUB = `(function(){var f=window.fbq,ids=[],revoked=false;
  function run(a){a=[].slice.call(a);
    if(a[0]==='init'){ids.push(a[1]);document.cookie='_fbp=fb.1.'+Date.now()+'.1; path=/; max-age=7776000';}
    else if(a[0]==='consent'){revoked=a[1]==='revoke';}
    else if(a[0]==='track'&&!revoked){ids.forEach(function(id){new Image().src='https://www.facebook.com/tr?id='+id+'&ev='+a[1]+'&dl='+encodeURIComponent(location.href);});}}
  f.callMethod=function(){run(arguments)};var q=f.queue.splice(0);q.forEach(run);})();`;
async function seite(ctx, log) {
  const p = await ctx.newPage();
  await p.route(/facebook\.(com|net)|googletagmanager\.com|google-analytics\.com|doubleclick\.net/, (r) => {
    const url = r.request().url(); log.push(url);
    if (url.includes('fbevents.js')) return r.fulfill({ status: 200, contentType: 'text/javascript', body: STUB });
    if (url.includes('gtag/js')) return r.fulfill({ status: 200, contentType: 'text/javascript', body: '' });
    return r.fulfill({ status: 200, contentType: 'image/gif', body: '' });
  });
  await p.route('**/functions/v1/**', (r) => r.fulfill({ status: 204 }));
  return p;
}
const meta = (l) => l.filter((u) => /facebook\.(com|net)/.test(u));
const ga = (l) => l.filter((u) => /googletagmanager|google-analytics|doubleclick/.test(u));
const tr = (l) => l.filter((u) => u.includes('facebook.com/tr'));
const kurz = (l) => l.map((u) => u.replace(/&dl=.*/, '') + (u.includes('&dl=') ? ' [Seite: ' + decodeURIComponent(u.split('&dl=')[1]).replace(BASE, '') + ']' : ''));
(async () => {
  const b = await chromium.launch(); const erg = {};
  // a) Erstbesuch ohne Klick
  { const log = []; const ctx = await b.newContext(); const p = await seite(ctx, log);
    await p.goto(BASE + '/coaching/'); await p.waitForTimeout(1500);
    erg.a = { bannerSichtbar: await p.isVisible('#gv-consent'), schalterVorausgewaehlt: await p.$$eval('[data-wahl]', (e) => e.filter((x) => x.checked).length), meta: meta(log).length, google: ga(log).length };
    await ctx.close(); }
  // b) nur Google Analytics
  { const log = []; const ctx = await b.newContext(); const p = await seite(ctx, log);
    await p.goto(BASE + '/'); await p.click('[data-consent-einstellungen]'); await p.check('[data-wahl="ga"]'); await p.click('[data-consent-speichern]'); await p.waitForTimeout(1200);
    await p.goto(BASE + '/coaching/'); await p.waitForTimeout(1200);
    erg.b = { google: ga(log), meta: meta(log).length, gespeichert: await p.evaluate(() => localStorage.getItem('gv-consent-v2')), bannerNochmal: await p.isVisible('#gv-consent') };
    await ctx.close(); }
  // c) d) e) Meta akzeptiert, Seitenwechsel, Widerruf
  { const log = []; const ctx = await b.newContext(); const p = await seite(ctx, log);
    await p.goto(BASE + '/coaching/'); await p.click('[data-consent="granted"]'); await p.waitForTimeout(1500);
    erg.c = { anfragen: kurz(meta(log)), fbp: (await ctx.cookies()).some((c) => c.name === '_fbp'), fbqAufrufe: await p.evaluate(() => 'fbq' in window) };
    const vor = tr(log).length;
    await p.click('footer a[href*="datenschutz"]'); await p.waitForLoadState('load'); await p.waitForTimeout(1500);
    erg.d = { weiterePageViews: tr(log).length - vor, anfragen: kurz(tr(log).slice(vor)) };
    // Bewerbungsformular: darf nichts an Meta schicken
    await p.goto(BASE + '/coaching/'); await p.waitForTimeout(800); const vorForm = meta(log).length;
    await p.fill('#bw-vorname', 'Test'); await p.fill('#bw-telefon', '0123'); await p.fill('#bw-email', 'test@example.com'); await p.click('.bw-btn'); await p.waitForTimeout(1000);
    erg.formular = { metaAnfragenBeimAbsenden: meta(log).length - vorForm - 0, abgesendet: await p.isVisible('.bw-erfolg') };
    // e) Widerruf über Cookie-Einstellungen
    const vorWiderruf = meta(log).length;
    await p.click('[data-gv-consent-open]'); await p.uncheck('[data-wahl="meta"]');
    await Promise.all([p.waitForNavigation(), p.click('[data-consent-speichern]')]); await p.waitForTimeout(1500);
    await p.goto(BASE + '/'); await p.waitForTimeout(1200);
    const ck = (await ctx.cookies()).map((c) => c.name);
    erg.e = { neueMetaAnfragen: meta(log).length - vorWiderruf, fbpGeloescht: !ck.includes('_fbp'), fbcVorhanden: ck.includes('_fbc'), gaLaeuftWeiter: await p.evaluate(() => !!window.gtag), gespeichert: await p.evaluate(() => localStorage.getItem('gv-consent-v2')) };
    await ctx.close(); }
  // Altbestand: früher nur GA akzeptiert -> GA bleibt, einmal Frage nach Meta
  { const log = []; const ctx = await b.newContext(); const p = await seite(ctx, log);
    await p.addInitScript(() => { if (!localStorage.getItem('gv-consent')) localStorage.setItem('gv-consent', 'granted'); });
    await p.goto(BASE + '/'); await p.waitForTimeout(1200);
    const r = { gaLaedtSofort: ga(log).length > 0, metaVorKlick: meta(log).length, bannerFragtNurMeta: await p.isVisible('[data-text="meta"]') && !(await p.isVisible('[data-text="alle"]')) };
    await p.click('[data-consent="denied"]'); await p.waitForTimeout(800);
    r.nachAblehnen = await p.evaluate(() => localStorage.getItem('gv-consent-v2')); r.metaNachAblehnen = meta(log).length;
    await p.goto(BASE + '/app/'); await p.waitForTimeout(800); r.bannerKommtNichtWieder = !(await p.isVisible('#gv-consent'));
    erg.altbestand = r; await ctx.close(); }
  console.log(JSON.stringify(erg, null, 1));
  await b.close();
})();
