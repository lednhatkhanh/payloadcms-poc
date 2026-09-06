---
name: The Dispatch
description: A warm, approachable editorial system for a focused shipping and logistics journal.
colors:
  harbor-rose-50: '#fff1f7'
  harbor-rose-100: '#ffe4f0'
  harbor-rose-200: '#ffc9e0'
  harbor-rose-300: '#ffa1c8'
  harbor-rose-700: '#bd0f72'
  harbor-rose-800: '#9a105e'
  harbor-rose-900: '#7f124f'
  page-paper: '#fcf9fb'
  surface: '#ffffff'
  soft-surface: '#fff1f7'
  rule: '#dfcfd7'
  ink: '#1d1419'
  muted-ink: '#66505c'
  success: '#137a52'
  warning: '#9a6700'
  danger: '#b42318'
  info: '#1769aa'
typography:
  display:
    fontFamily: 'Noto Sans, sans-serif'
    fontSize: 'clamp(3.25rem, 8vw, 7.5rem)'
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: '-0.055em'
  headline:
    fontFamily: 'Noto Sans, sans-serif'
    fontSize: 'clamp(2.5rem, 6vw, 5rem)'
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: '-0.045em'
  title:
    fontFamily: 'Noto Sans, sans-serif'
    fontSize: 'clamp(2rem, 4vw, 3.5rem)'
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: '-0.035em'
  body:
    fontFamily: 'Noto Sans, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: 'Noto Sans, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: '0.11em'
rounded:
  sm: '0.5rem'
  md: '0.875rem'
  lg: '1.25rem'
  pill: '9999px'
spacing:
  space-2xs: '0.25rem'
  space-xs: '0.5rem'
  space-sm: '0.75rem'
  space-md: '1rem'
  space-lg: '1.5rem'
  space-xl: '2rem'
  space-2xl: '3rem'
  space-3xl: '4.5rem'
  space-section: 'clamp(4.5rem, 9vw, 7rem)'
  space-hero: '9rem'
components:
  button-primary:
    backgroundColor: '{colors.harbor-rose-700}'
    textColor: '{colors.surface}'
    rounded: '{rounded.md}'
    padding: '0 1.5rem'
    height: '2.75rem'
  button-secondary:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    padding: '0 1.5rem'
    height: '2.75rem'
  input-default:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    padding: '0.75rem 1rem'
  card-default:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.lg}'
    padding: '1.5rem'
---

# Design System: The Dispatch

## Overview

**Creative North Star: "The Portside Journal"**

The Dispatch is an approachable editorial system with the composure of a well-kept shipping journal: direct, informed, and subtly human. Pale paper surfaces and near-black ink establish a calm reading field; Harbor Rose carries the sense of signal, movement, and editorial intent without turning the interface into a campaign.

The interface is spacious and structured rather than sparse. Large, compact headlines create an assured rhythm, while familiar fields, clear calls to action, and gently raised cards make browsing and form completion feel easy. The visual reference is a simplified public logistics experience, not a literal maritime pastiche.

**Key Characteristics:**

- Warm editorial clarity over corporate severity.
- One vivid signal color, surrounded by paper-like neutrals.
- Quiet depth and calm, buoyant feedback for interactive elements.

## Colors

Harbor Rose is the sole expressive accent; paper, ink, and rules do most of the structural work.

### Primary

- **Harbor Rose** (`harbor-rose-700`): The essential signal for primary actions, focus, active states, small editorial labels, and brand emphasis.
- **Harbor Rose Wash** (`harbor-rose-50` through `harbor-rose-300`): Soft selection, hover, and background layers that keep the accent warm rather than loud.
- **Deep Harbor Rose** (`harbor-rose-800` and `harbor-rose-900`): Hovered and pressed primary controls, plus inline editorial links.

### Neutral

- **Page Paper** (`page-paper`): The persistent page field; it should read as a warm, lightly pinked paper rather than a cool gray app canvas.
- **Clean Surface** (`surface`): Cards, form controls, and navigation surfaces.
- **Soft Surface** (`soft-surface`): Low-emphasis callouts and selected editorial panels.
- **Rule** (`rule`): Dividers and low-emphasis component boundaries.
- **Ink** (`ink`): Primary reading text and the dark newsletter field.
- **Muted Ink** (`muted-ink`): Supporting copy, metadata, and less prominent navigation.

### Named Rules

**The Single Signal Rule.** Harbor Rose communicates priority, status, and editorial provenance. Do not introduce a competing decorative accent.

**The Paper Field Rule.** Keep broad page areas on Page Paper or Clean Surface. Reserve Soft Surface for contained emphasis, never as a full-page wash.

## Typography

**Display Font:** Noto Sans (with system sans-serif fallback)

**Body Font:** Noto Sans (with system sans-serif fallback)

**Character:** A single precise grotesk keeps the product practical and accessible. Its heavy, tightly tracked headlines provide the editorial character; open body leading makes articles and forms feel welcoming.

### Hierarchy

- **Display** (700, `clamp(3.25rem, 8vw, 7.5rem)`, 0.9): Hero statements and the most consequential landing-page message.
- **Headline** (700, `clamp(2.5rem, 6vw, 5rem)`, 0.98): Primary page headings.
- **Title** (700, `clamp(2rem, 4vw, 3.5rem)`, 1.05): Section headings and longer editorial titles.
- **Body** (400, `1rem`, 1.7): Default reading and interface copy; article body can step up to the lead scale for long-form comfort.
- **Label** (700, `0.75rem`, 1.3, uppercase, `0.11em` tracking): Categories, eyebrows, and small provenance labels.

### Named Rules

**The Tight Headline Rule.** Headlines are dense and decisive; preserve the negative tracking and compressed line-height rather than compensating with extra weight or decorative typefaces.

## Layout

The wide container caps at 80rem, while reading content caps at 48rem. Horizontal gutters begin at 1.5rem and open to 2rem on small screens. Sections use a responsive vertical rhythm from 4.5rem to 7rem; hero sections can extend to 9rem on large screens.

Editorial layouts begin as a single, calm column and become intentional grids: story cards progress from one to two to three columns, stat groups become three columns at the small breakpoint, and paired editorial/form sections move to a weighted split grid at large screens. Use 1.5rem card-grid gaps and 3rem split-layout gaps.

## Elevation & Depth

Depth is restrained and supportive. Most surfaces are defined by tonal contrast and fine rules; cards earn a diffuse ambient lift to become more tactile, and that lift increases slightly on hover. This is enough depth to feel warm and buoyant without producing a dashboard-like stack of panels.

### Shadow Vocabulary

- **Card Rest** (`0 1rem 3rem color-mix(in srgb, var(--color-neutral-950) 8%, transparent)`): The low, diffuse resting shadow for editorial cards.
- **Card Hover** (Tailwind `shadow-lg`): The slightly stronger lift paired with a small upward translation on card hover.

### Named Rules

**The Earned Lift Rule.** Give depth to content that is actionable or browsable, such as story cards. Standard text sections, dividers, and page regions stay flat.

## Shapes

Forms and controls use gently curved medium corners; cards use the more generous large corner. The result is cordial and modern, never bubbly. Borders are quiet, generally using Rule; brand borders identify a focused callout rather than framing every surface.

Small text links and checkboxes use the compact corner to preserve precision. Use the pill radius only where a truly pill-shaped control is needed.

## Components

### Buttons

Warmly confident controls with a clear rectangular footprint.

- **Shape:** Gently curved medium corners (`0.875rem`) and a minimum 2.75rem height; large buttons extend to 3rem.
- **Primary:** Harbor Rose background, Clean Surface text, and 1.5rem horizontal padding at the default size.
- **Hover / Focus:** Hover deepens the rose; press deepens it again. Keyboard focus receives a two-pixel Harbor Rose ring with a paper-colored offset.
- **Secondary / Quiet / Danger:** Secondary is a white bordered surface that blooms to a pale rose on hover. Quiet controls use a transparent background and neutral wash state. Danger uses the semantic danger color rather than Harbor Rose.

### Cards / Containers

Editorial cards are contained stories, not generic app tiles.

- **Corner Style:** Generous large corners (`1.25rem`) with clipped media.
- **Background:** Clean Surface, with Rule borders and an ambient resting shadow.
- **Hover:** Rise by 0.25rem, strengthen the shadow, and change the border to the Harbor Rose wash. Media may scale gently.
- **Internal Padding:** 1.5rem around card content.

### Inputs / Fields

Fields are candid and high-legibility: a white surface, quiet border, semibold label, and generous inner breathing room.

- **Style:** Medium corners, Rule border, 1rem horizontal padding, and 0.75rem vertical padding.
- **Focus:** The border becomes Harbor Rose and a soft Harbor Rose wash ring appears.
- **Error / Disabled:** Errors use the semantic danger color; disabled fields are neutral-washed and reduced in opacity.

### Navigation

Navigation is deliberately modest: small semibold links in Muted Ink, with an unobtrusive underline-free treatment. Hovering shifts the label to Deep Harbor Rose. The header remains a Clean Surface with a subtle Rule border and maintains its two-sided layout across the responsive range.

### Editorial Rules

Single-pixel Rule dividers separate editorial units, never compete with them. Use them to make spacious sections feel intentionally composed.

## Do's and Don'ts

### Do:

- **Do** use Harbor Rose for the visitor's clearest next action, selected state, focus state, or small editorial signal.
- **Do** keep body text on Page Paper or Clean Surface with ample leading for comfortable reading.
- **Do** let cards rise modestly on hover and respect reduced-motion preferences.
- **Do** use responsive section spacing and deliberate grids to preserve editorial breathing room.

### Don't:

- **Don't** introduce a second decorative accent color or a dark-mode variant.
- **Don't** put every block in a bordered, shadowed container; flat page structure is the default.
- **Don't** replace Noto Sans with a serif display face or loosen headline tracking to imitate conventional marketing typography.
- **Don't** use dense dashboard grids, heavy shadows, or overly rounded controls.
