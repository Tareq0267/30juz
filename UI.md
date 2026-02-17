# 🎨 AI UI Color Manifesto

### A Deterministic Color System for Intelligent Interface Generation

*For Claude Code & Autonomous UI Agents*

------------------------------------------------------------------------

## 0. Core Principle

Color is not decoration.\
Color is hierarchy, function, and meaning.

AI must not invent arbitrary colors.\
AI must generate color through structured layers.

Every interface must be constructed using:

1.  Neutral Foundation\
2.  Functional Accent Ramp\
3.  Semantic Color System\
4.  OKLCH-Based Theming

No exceptions.

------------------------------------------------------------------------

# 1. Layer One --- Neutral Foundation (Mandatory Base Layer)

## 1.1 Neutrals Define Hierarchy

AI must build the entire UI on a structured neutral system before
applying any brand color.

### Minimum Requirements (Product UI)

-   4 background layers
-   1--2 stroke layers
-   3 text tiers

------------------------------------------------------------------------

## 1.2 Light Mode Neutral System

### Background Layers

  Layer   Usage                    Lightness Target
  ------- ------------------------ ------------------
  BG-0    App Background           98--100% white
  BG-1    Cards                    96--98% white
  BG-2    Elevated                 94--96% white
  BG-3    Sidebar / Deep Surface   92--94% white

Difference between layers:\
\~2% lightness delta

Never use pure black borders.

### Borders

-   Use \~85% white equivalent
-   Borders must be subtle
-   Avoid high-contrast edges

------------------------------------------------------------------------

## 1.3 Text Hierarchy (Light Mode)

  Tier           Usage          Lightness
  -------------- -------------- -------------
  Text-Primary   Headings       \~11% white
  Text-Body      Main content   15--20%
  Text-Subtle    Metadata       30--40%

AI must enforce text contrast ratios.

------------------------------------------------------------------------

## 1.4 Dark Mode Neutral Rules

Dark mode is not inverted light mode.

### Key Adjustments

-   Differences must double (4--6% lightness delta between layers)
-   Elevated surfaces become lighter (not darker)
-   Borders brighten slightly to define edges

------------------------------------------------------------------------

## 1.5 Dark Mode Background System

  Layer   Description
  ------- ----------------------------------
  BG-0    Deep app background
  BG-1    Card surface (lighter than BG-0)
  BG-2    Elevated modal surface
  BG-3    Sidebar contrast surface

Never flatten surfaces. Elevation must be perceptible.

------------------------------------------------------------------------

# 2. Layer Two --- Functional Accent Color

Accent colors are not single hex values. They are ramps.

AI must generate a 10-step ramp (50--900 scale).

------------------------------------------------------------------------

## 2.1 Ramp Rules

  Usage            Light Mode   Dark Mode
  ---------------- ------------ -----------
  Primary Button   500--600     300--400
  Hover            600--700     400--500
  Links            400--500     300
  Focus Ring       300          200--300

Dark mode brand colors shift lighter.

------------------------------------------------------------------------

## 2.2 Accent Discipline

-   Only one primary accent per interface
-   Do not mix multiple brand colors for core actions
-   Accent is for action, not decoration

If everything is colored, nothing is important.

------------------------------------------------------------------------

# 3. Layer Three --- Semantic Color System

Semantic colors are mandatory.

Brand color does not replace semantic meaning.

------------------------------------------------------------------------

## 3.1 Required Semantic Tokens

  Token     Color Rule
  --------- --------------------------------
  Success   Green
  Warning   Amber / Yellow
  Error     Red
  Info      Blue (if different from brand)

Destructive actions MUST be red.

------------------------------------------------------------------------

## 3.2 Charts & Data Visualization

Charts must use a full hue spectrum.

Rules:

-   Use OKLCH
-   Keep Lightness constant
-   Keep Chroma consistent
-   Increment Hue by 25--30°

Example: Hue: 0 → 30 → 60 → 90 → 120 → 150 → 180...

Do not generate arbitrary random colors.

------------------------------------------------------------------------

# 4. Layer Four --- OKLCH Theming System

AI must use OKLCH for theme transformation.

Never theme by manually tweaking hex.

------------------------------------------------------------------------

## 4.1 Theming Algorithm

For each neutral token:

New Lightness = Original - 0.03\
New Chroma = Original + 0.02\
New Hue = Target Theme Hue

Apply consistently across all neutrals.

------------------------------------------------------------------------

## 4.2 Dark Mode Theming

Ensure:

-   Elevation is preserved
-   Contrast ratios remain compliant
-   Semantic colors remain distinct

------------------------------------------------------------------------

# 5. Button Importance Logic

Button weight correlates with darkness.

Light Mode: - Most important → Darkest fill - Secondary → Outline -
Tertiary → Ghost

Dark Mode: - Same structure, adjusted ramp index

White text only on darkest buttons.

------------------------------------------------------------------------

# 6. Elevation Rules

Elevation must be communicated via:

-   Lightness shifts
-   Subtle borders
-   Shadow only when necessary

Never rely purely on shadow in dark mode.

------------------------------------------------------------------------

# 7. Anti-Patterns (AI Must Avoid)

-   Pure black borders
-   Pure white cards on pure white background
-   Random accent usage
-   Multiple competing brand colors
-   Charts using only brand shades
-   Dark mode as simple inversion

------------------------------------------------------------------------

# 8. Accessibility Constraints

AI must enforce:

-   WCAG AA minimum contrast
-   Text contrast validated against background
-   Semantic color distinguishability
-   Color + icon redundancy for critical states

Color alone must not convey meaning.

------------------------------------------------------------------------

# 9. Token-Based Output Format (Required for Claude Code)

AI must output color system as structured tokens.

------------------------------------------------------------------------

# 10. Design Order of Operations

1.  Define neutral foundation\
2.  Generate accent ramp\
3.  Define semantic palette\
4.  Apply OKLCH theming adjustments\
5.  Validate accessibility

Order matters. Color is layered.

------------------------------------------------------------------------

# 11. Intelligence Through Restraint

AI should prefer:

-   Neutral dominance
-   Minimal accent exposure
-   Clear semantic mapping
-   Structured token systems

Restraint signals maturity.

------------------------------------------------------------------------

# 12. Final Doctrine

An AI-generated interface must:

-   Feel layered
-   Feel intentional
-   Feel consistent across light/dark
-   Be mathematically coherent in OKLCH
-   Be semantically explicit
-   Avoid aesthetic guesswork

If color decisions are arbitrary, the system has failed.
