# GELD VERSTEHEN — Design System

A brand-foundations design system for **GELD VERSTEHEN** (geldverstehen.de), the German
personal-finance brand of Per Schippl. The brand helps people get a calm, structured grip
on their money through a podcast, the **OnePeek** budgeting app, and a masterclass.

> **Brand promise:** „Deine Finanzen im Griff. Für immer!" — from chaos to clarity, structure,
> and a relaxed relationship with your money.

## Sources
- **Corporate Identity PDF:** `references/000290_02_CI_geldverstehen.de_V03_LF_Option-02.pdf`
  (V03) — the authoritative brand reference. Confirms colors, fonts, and the graphic motif.
- **Website:** https://geldverstehen.de/ — secondary reference (note: the live site styles some
  hero headlines in a serif, which deviates from the CI; this system follows the CI: Bebas Neue).
- **Reference screenshot:** `references/homepage-hero.png` (homepage hero).
- No codebase or Figma file was provided.

## Colors & fonts (confirmed by CI)
- House colors: **Black** `#000000` + **White** `#FFFFFF` (a contrast pairing first, not
  "colors" in the classic sense).
- Secondary / signature: **Blue** `#1E73BE` + **„Geld“ yellow** `#FFD000` — the unique
  combination that gives the brand its recognition value (Alleinstellungsmerkmal).
- Headline / wordmark font: **Bebas Neue Regular**. Body font: **PT Sans Regular**.
  Both are serifless and on Google Fonts — no substitution.

## Scope of this pass
**Foundations only** — colors, typography, spacing, logo, and specimen cards. Reusable
components, UI kits (marketing website), and slide templates are intended for a later pass.

---

## CONTENT FUNDAMENTALS

- **Language:** German-first. Built for a DE audience.
- **Register:** Informal **„du"** — personal, direct, never „Sie". The reader is addressed
  as a friend who wants help, not a client being sold to.
- **Vibe:** Reassuring and confident. Demystifies money. „Klarheit statt Fachchinesisch."
  Credible (press logos: Handelsblatt, Kölner Stadt-Anzeiger, Augsburger Allgemeine, NWZ).
- **Sentence style:** Short, declarative, verb-forward. Periods used for rhythm:
  „Deine Finanzen im Griff. Für immer!"
- **Casing:** German noun capitalization for headlines (sentence-style, not title-case).
  ALL CAPS reserved for nav and labels (PODCAST · APP · MASTERCLASS).
- **Numbers:** Concrete and confident — used as proof, not decoration.
- **Emoji:** Not used. The brand is clean and typographic.
- **CTAs:** Action-first and low-friction — „Jetzt eintragen", „Jetzt kostenlosen Crashkurs
  sichern", „Mehr erfahren". The first ask is usually an email opt-in, not a purchase.

### Example copy
- Headline: „Deine Finanzen im Griff. Für immer!"
- Sub: „Von Chaos in den Finanzen zu Klarheit, Struktur und einem entspannten Umgang mit deinem Geld."
- Lead-in: „Jetzt kostenlosen Crashkurs sichern:"
- Button: „Jetzt eintragen"

---

## VISUAL FOUNDATIONS

- **Colors:** A single confident **brand blue (#1E73BE)** carries hero sections and surfaces;
  a high-energy **yellow (#FFD000)** is the action color (CTA buttons, the „OO"-style logo
  accent). White text on blue; **dark ink text on yellow** (yellow never carries white text).
  Neutrals are a cool navy-tinted gray scale. No purple, no rainbow — two brand colors, used
  decisively.
- **Backgrounds:** Flat color blocks — full-bleed brand blue for the hero, clean white for
  proof/content sections. No gradients in backgrounds, no photographic textures. Photography
  is a cut-out portrait of the founder placed over the blue (people-first, trustworthy).
- **Type:** Two confirmed faces, both serifless —
  - *Wordmark / headlines / labels:* **Bebas Neue Regular** — tall, condensed, all-caps. The
    wordmark, hero headlines, nav and labels are all set in it. Renders uppercase by nature.
  - *Body / running text:* **PT Sans Regular**, 17px, line-height 1.6.
- **The CTA glow:** The yellow primary button sits on a soft yellow drop-glow
  (`--shadow-cta: 0 12px 34px rgba(255,208,0,.45)`) — the one signature elevation effect.
- **Shadows:** Otherwise minimal and navy-tinted; elevation comes from color contrast
  (white card on `--surface`), not heavy shadows.
- **Corner radii:** Tags 4px, buttons/inputs 8px, cards 14px, pills/avatars full-round.
- **Borders:** 1px `#D9DEE5` for inputs, dividers, and card strokes.
- **Layout:** Strict, grid-based, generous whitespace. Max content width ~1200px. Hero is a
  two-column split (copy left, portrait right).
- **Animation:** None observed. Recommended: ease-out, 200–300ms fades/slides; a slight
  scale-down (0.97) on press. No bounces.
- **Hover/press:** Hover = one step darker (`--gv-yellow-600`, `--gv-blue-600`). Press =
  darker + 0.97 scale. Disabled = reduced opacity / gray.
- **Imagery vibe:** Bright, warm, natural-light portraits on the cool blue — human and honest.

---

## ICONOGRAPHY

- No proprietary icon font or custom SVG icon set was found.
- Proprietary graphic element: the **typographic wordmark** (GELD + VERSTEHEN in Bebas Neue).
  There is no separate logo artwork — the wordmark set in Bebas Neue *is* the logo. Use
  `assets/logo-on-blue.svg` (white + yellow on blue, primary) and `assets/logo-color.svg`
  (black + blue on light).
- **Recommended UI icon set:** [Lucide](https://lucide.dev) (CDN: `https://unpkg.com/lucide@latest`)
  — thin, modern strokes that match the clean, typographic feel.
- **Emoji / Unicode icons:** Not used.

> The logo is purely the wordmark — `GELD` + `VERSTEHEN` in Bebas Neue, GELD in white/black
> and VERSTEHEN in the brand yellow/blue. The SVGs here are the canonical definition.

---

## FONTS — confirmed

Both faces are confirmed by the Corporate Identity and linked from Google Fonts in
`tokens/fonts.css` — no substitution required:

| Role | Font |
|---|---|
| Wordmark / headlines / labels | **Bebas Neue** Regular |
| Body / UI | **PT Sans** Regular |

The `@import` uses Google Fonts. If you have licensed font binaries, swap it for local
`@font-face` rules.

---

## INDEX / MANIFEST

```
styles.css                      Global entry point (@import list — link this one file)
tokens/
  colors.css                    Brand, neutral, semantic + alias tokens
  typography.css                Fonts (Bebas Neue, PT Sans), type scale, tracking
  spacing.css                   Spacing scale, radii, elevation, container
  fonts.css                     Webfont @import (Bebas Neue + PT Sans, Google Fonts)
assets/
  logo-on-blue.svg              Wordmark, white + yellow on blue (primary)
  logo-color.svg                Wordmark, black + blue for light backgrounds
guidelines/                     Foundation specimen cards (Design System tab)
  colors-brand.html · colors-neutrals.html · colors-semantic.html
  type-display.html · type-headings.html · type-body.html
  spacing-scale.html · radii-elevation.html · brand-logo.html
components/                     Reusable React primitives (.jsx + .d.ts + .prompt.md + *.card.html)
  core/                         Button · Input · Card · Badge
  forms/                        Select · Checkbox · Switch
  navigation/                   SiteHeader · Footer
templates/
  homepage/                     Marketing-Startseite template (Homepage.dc.html + ds-base.js)
Component Library.dc.html       Living, interactive reference — all components, live from the bundle
references/                     Source material (CI PDF V03, homepage hero screenshot)
SKILL.md                        Agent-skill manifest
readme.md                       This file
```

## COMPONENTS

Reusable, brand-styled React primitives. Each is styled with the CSS tokens (`var(--gv-*)`).
The files use the host runtime's global `React` (no `import React`) and use a named ESM
`export function <Name>`, so the compiler bundles them into `_ds_bundle.js`. Consumers (and
the living library + templates here) mount them via `window.GELDVERSTEHEN_cb9890.<Name>` after
loading the bundle — e.g. `<x-import component-from-global-scope="GELDVERSTEHEN_cb9890.Button">`
in a Design Component, or `const { Button } = window.GELDVERSTEHEN_cb9890` in a card.

> **Living library:** `Component Library.dc.html` is the consolidated, interactive reference —
> every component below is mounted live from these exact source files (not re-implemented), so
> the showcase can never drift from the code. It replaces the former static `overview.html` and
> per-group `*.card.html` specimens (removed). Tweakable: preview-panel background + accent color.

- **Button** — `primary` (yellow CTA + glow), `secondary` (blue), `ghost` (outlined); sizes
  sm/md/lg; `block`, `disabled`.
- **Input** — labelled field (Bebas caps label, PT Sans field), focus ring, `error`/`hint`.
- **Card** — white surface, soft border + shadow, optional Bebas `title` and `footer`.
- **Badge** — small label; tones default/blue/yellow/success/error/warning.
- **Select** — dropdown matching Input; options as strings or `{value,label}`.
- **Checkbox** — labelled, blue fill + checkmark when on.
- **Switch** — on/off toggle, blue track when on.
- **SiteHeader** — brand-blue bar: wordmark (always GELD white + VERSTEHEN yellow) + uppercase nav + optional yellow CTA.
- **Footer** — brand-blue footer (`--gv-blue`, matches the hero) with wordmark, tagline, and link columns; yellow accents.

### Coming in later passes (not yet built)
- More components as needed (Tabs, Dialog, Toast, Tooltip, Avatar…).
- UI kit: geldverstehen.de marketing website screens (needs more screenshots).
- Slide templates.
