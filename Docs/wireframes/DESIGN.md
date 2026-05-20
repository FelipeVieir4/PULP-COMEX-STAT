---
name: Foreign Trade Intelligence System
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 32px
  container-max-width: 1440px
---

## Brand & Style
The design system is engineered for the high-density requirements of international trade analytics. It conveys a personality of **precision, institutional authority, and clarity**. The target audience includes economists, government officials, and trade analysts who require rapid cognitive processing of complex data sets.

The visual style is a synthesis of **Minimalism** and **Corporate Modern**. It prioritizes a rigorous data hierarchy through significant whitespace and a modular card-based architecture. Every pixel serves a functional purpose, eliminating decorative elements in favor of structural clarity. The emotional response is one of confidence and reliability, ensuring that the interface remains unobtrusive while highlighting critical statistical fluctuations.

## Colors
This design system utilizes a professional palette rooted in deep maritime blues to reflect the nature of foreign trade. 

- **Primary (Deep Blue):** Used for navigation, primary actions, and authoritative text. It provides the visual anchor for the entire interface.
- **Secondary (Emerald Green):** Reserved exclusively for positive growth indicators, surplus data, and success states to ensure immediate semantic recognition.
- **Tertiary (Slate Gray):** Employed for secondary metadata, borders, and UI scaffolding to minimize visual noise.
- **Status Colors:** Use high-chroma red for trade deficits or negative trends and amber for stagnant or cautionary data points.

The system is designed with a "Dark-First" mentality for high-density monitoring, but defaults to a "Light" mode for report generation and general administrative use. In both modes, text contrast meets WCAG AA standards to ensure accessibility for all users.

## Typography
**Inter** is the foundation of this typography system, chosen for its exceptional legibility in data-heavy environments and its neutral, systematic character.

- **Headlines:** Use tight letter-spacing and semi-bold weights to create a strong visual hierarchy.
- **Data Representation:** For numerical values in tables or charts, use a tabular figures feature (tnum) or the secondary **JetBrains Mono** font to ensure vertical alignment of digits, facilitating easier comparison of trade volumes.
- **Labels:** Small caps or uppercase labels with increased letter-spacing should be used for category headers and axis titles to distinguish them from interactive body text.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop to maintain the integrity of complex dashboard arrangements. A 12-column grid is utilized with a 24px gutter. 

- **Desktop (1280px+):** Elements should align to the 12-column grid. Cards typically span 3, 4, 6, or 12 columns.
- **Tablet (768px - 1279px):** Transition to an 8-column grid. Sidebars may collapse into icons to preserve horizontal space for charts.
- **Mobile (< 767px):** Single-column stack. Horizontal scrolling is permitted only for data tables with a "sticky" first column.

Spacing follows a strict 8px linear scale. Internal card padding is consistently 24px (md) to provide enough "breathing room" for dense statistical figures.

## Elevation & Depth
This design system uses **Tonal Layers** combined with **Ambient Shadows** to create a structured sense of depth without clutter.

1.  **Level 0 (Background):** The lowest surface (`background_light` or `background_dark`).
2.  **Level 1 (Cards/Surface):** The primary container for data. These use a pure white (or deep navy in dark mode) background with a subtle 1px border (`Slate-200`) and a soft, diffused shadow (0px 4px 12px, 5% opacity).
3.  **Level 2 (Popovers/Modals):** Elements that sit above the dashboard. These feature a more pronounced shadow (0px 12px 32px, 10% opacity) to provide clear separation during data entry or filter selection.

Avoid heavy blurs or glassmorphism to ensure maximum performance when rendering multiple real-time SVG charts.

## Shapes
The shape language is defined by **Rounded (12px)** corners for all primary containers and components. This specific radius strikes a balance between the clinical feel of sharp corners and the overly casual nature of pill shapes.

- **Main Cards:** 12px (rounded-lg).
- **Buttons & Inputs:** 8px (standard roundedness) for a more precise, tool-like appearance.
- **Status Indicators:** Use a 4px radius for small tags and 100% (pill) for circular notification badges.

## Components
- **Data Cards:** Every card must include a header section with a title (headline-sm) and an optional "More" menu. The body of the card houses the primary visualization or metric.
- **Statistical Buttons:** Use solid primary blue for "Download Report" or "Export Data." Ghost buttons (borders only) are used for secondary view toggles (e.g., switching between 'Monthly' and 'Yearly').
- **Data Tables:** High-density rows with a 40px height. Hover states should highlight the entire row in a soft gray. Headers must remain sticky.
- **Trend Chips:** Small badges that sit next to numbers. Emerald green for +% growth, Red for -% decline. They should include a directional icon (Up/Down arrow).
- **Input Fields:** Search bars and filter dropdowns use a 1px border and a subtle inner shadow to indicate interactability. Use "Inter" at 14px for all input text.
- **Segmented Controls:** Used for toggling between chart types (Bar, Line, Tree Map). These should feel tactile and clearly indicate the active state using the primary color.