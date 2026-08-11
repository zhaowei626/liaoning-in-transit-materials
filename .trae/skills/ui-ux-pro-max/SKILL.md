---
name: "ui-ux-pro-max"
description: "UI/UX design intelligence for web and mobile. Use when designing, building, or reviewing UI: pages, components, color schemes, typography, layout, accessibility, animation, or data visualization."
---

# UI/UX Pro Max - Design Intelligence

Searchable database of UI/UX design rules with priority-based recommendations: 84 styles, 192 color palettes, 74 font pairings, 192 product types with reasoning rules, 98 UX guidelines, 104 icon entries, 16 GSAP motion presets, and 25 chart types across 22 technology stacks.

## When to Apply

Use this Skill when the task involves **UI structure, visual design decisions, interaction patterns, or user experience quality control**: designing new pages, creating/refactoring UI components, choosing color/typography/spacing/layout systems, reviewing UI for UX/accessibility/consistency, implementing navigation/animation/responsive behavior, or improving perceived quality and usability.

Skip it for pure backend logic, API/database design, non-visual performance work, infrastructure/DevOps, or non-visual scripts — unless the task changes how something **looks, feels, moves, or is interacted with**.

## Rule Categories by Priority

*Follow priority 1→10 to decide which category to focus on first; use `--domain <Domain>` to query full details. The full rule text for every category lives in `references/quick-reference.md` — read it on demand rather than loading it every time.*

| Priority | Category | Impact | Domain | Key Checks (Must Have) | Anti-Patterns (Avoid) |
|----------|----------|--------|--------|------------------------|-----------------------|
| 1 | **UX Core** | Utility | `UX` | Mental models, Fitts's Law, Scannability, Jakob's Law | Cognitive overload, Mystery meat nav |
| 2 | **Accessibility** | Inclusion | `A11y` | Contrast (4.5:1), Tab order, Screen readers, Touch targets | Color-only cues, Trapped focus |
| 3 | **Layout** | Structure | `Layout` | Grids (8pt), Spacing (Hick's), Z-Pattern, Visual Hierarchy | Cramped elements, Random margins |
| 4 | **Typography** | Readability | `Typo` | Scale (1.25), Line-height (1.5), Tracking, Optical sizing | Centered body text, Over-tracking |
| 5 | **Color** | Emotion | `Color` | 60-30-10 rule, Meaning, Palettes, Harmony | Vibrating colors, Inconsistent state colors |
| 6 | **Components** | UI Units | `Comp` | State (Hover/Focus/Active), Feedback, Size consistency | Non-interactive cues, Missing empty states |
| 7 | **Motion** | Physics | `Motion` | Easing (Out), Duration (200-500ms), Continuity, Intent | Distracting loops, Linear easing |
| 8 | **Data Viz** | Clarity | `Data` | Tufte principles, Chart choice, Data ink ratio | 3D charts, Over-labeling, Color misuse |
| 9 | **Icons** | Metaphor | `Icon` | Style consistency, Weight, Recognizability | Mixed stroke styles, Cryptic icons |
| 10 | **Styling** | Polish | `Style` | Materials, Shadows, Borders, Micro-interactions | Harsh shadows, Clashing styles |

## Technical Implementation Guide

### 1. Framework-Specific UI Implementation
When building components, always follow the best practices for the target stack:
- **Next.js/React**: Use Server Components for layout, Client Components for interactivity. Leverage `tailwind-merge` and `clsx` for dynamic styling.
- **Tailwind CSS**: Use the 8pt grid system. Define custom colors in `tailwind.config.ts`. Use utility classes for responsive design (`sm:`, `md:`, `lg:`, `xl:`).
- **GSAP**: Use for complex timeline-based animations. Prefer CSS transitions for simple state changes.

### 2. Design Tokens & Consistency
Ensure all UI elements adhere to the project's design system:
- **Spacing**: Multiples of 4px or 8px.
- **Typography**: Define a clear scale (e.g., Minor Third or Perfect Fourth).
- **Colors**: Use functional names (primary, secondary, success, danger, warning) rather than literal color names.

### 3. Responsive & Adaptive UI
- **Mobile-First**: Design for small screens first, then scale up.
- **Touch Targets**: Minimum 44x44px for interactive elements on mobile.
- **Fluid Layouts**: Use percentage-based widths or `flex`/`grid` with `clamp()` for fluid typography and spacing.

## Verification Checklist
- [ ] **Contrast**: Do all text/background combinations meet WCAG AA standards?
- [ ] **Responsiveness**: Does the UI work across all breakpoints (320px to 1920px)?
- [ ] **Interaction**: Are hover, focus, and active states clearly defined and visible?
- [ ] **Hierarchy**: Is the primary action the most visually prominent element?
- [ ] **Performance**: Are images optimized and animations smooth (60fps)?
