# Home Services Ladder — Design Spec

**Date:** 2026-06-24 · **Status:** Approved → build · **Branch:** `feat/home-services-ladder`

## Goal
Make the home page surface all four offerings without diluting the converting
"get found by AI" wedge. Additive + one swap — not a reposition.

## Approach (approved)
Visibility-led hero (unchanged hook) + one light hero nudge line + a new
"What we do" value-ladder section that **replaces** the lone Done-for-you band
(absorbing it, so no redundancy). Everything else on the home stays.

## Changes
1. **New `web/components/home/what-we-do.tsx`** (server component) — a 4-card
   value ladder, journey order:

   | Card | One-liner | Entry | href |
   |---|---|---|---|
   | Free AI Check | See what AI says about you | Free | `/check/` |
   | Done-for-you | We keep you on the shortlist, always on | from A$490/mo | `/done-for-you/` |
   | Websites | A site AI can read and recommend | from A$849 | `/websites/` |
   | iOAgent | Your own AI agent for the busywork | from A$999/mo | `/ioagent/` |

   - Prices derived from the source constants (`DONE_FOR_YOU.priceFrom`,
     `WEBSITE_PACKAGES[0].priceFrom`, `IOAGENT_PLANS[0].pricePerMonth`) so they
     never drift; formatted `A$` (en-US AUD), matching the pricing cards.
   - Built from existing `Section` + `MonoLabel` + card patterns and tokens.
     `tone="paper-warm"` with a top hairline (matches the band it replaces, keeps
     the dark/light rhythm). 4-up grid: `sm:grid-cols-2 lg:grid-cols-4`.
   - The Free AI Check card carries a subtle "Start here" marker (entry point).
   - Each card links to its page; uses `.reveal` (ScrollReveal) like the rest.

2. **`web/app/page.tsx`** — replace `<DoneForYouCta />` (import + usage) with
   `<WhatWeDo />`, in the same slot (after `HowItWorksGrid`).

3. **Delete `web/components/home/done-for-you-cta.tsx`** — absorbed into the ladder.

4. **`web/components/home/hero.tsx`** — keep the hook/lede/CTA; add one short line
   under the lede hinting at the ladder: "And when you're ready, we build the
   AI-readable website and the agents that run your busywork." (en-AU, no em-dash.)

## Out of scope
Nav, positioning copy elsewhere, the other home sections (The Shift, Why-tradies,
Check CTA, How-it-works, Credibility, Forward, Articles, FAQ, Final CTA) — all unchanged.

## Verification
tsc · eslint · build · Playwright (home "no console errors" + route smoke) ·
nextjs16-reviewer · mobile + desktop screenshot polish.
