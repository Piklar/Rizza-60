<!--
  SYNC IMPACT REPORT
  ==================
  Version change: N/A (initial population) → 1.0.0
  Modified principles: N/A — template placeholders fully replaced for first time
  Added sections:
    - I. Clean Code
    - II. Responsive UI
    - III. Fluid & Adaptive Design
    - IV. Component-Driven Architecture
    - V. Performance & Accessibility
    - UI/UX Standards
    - Development Workflow
    - Governance
  Removed sections: None (template fully satisfied)
  Templates updated:
    - .specify/templates/plan-template.md ✅ — "Constitution Check" gates align with principles
    - .specify/templates/spec-template.md ✅ — Responsive/accessibility requirements reflected in FR guidance
    - .specify/templates/tasks-template.md ✅ — UI polish phase reflects responsive and clean-code tasks
  Deferred TODOs: None
-->

# Speckingking Constitution

## Core Principles

### I. Clean Code (NON-NEGOTIABLE)

Every line of code MUST be readable, intentional, and maintainable by any team member
without prior context. This is the foundational discipline of the project.

- **Naming**: Identifiers MUST be descriptive and unambiguous. Abbreviations are
  forbidden unless they are universally understood (e.g., `id`, `url`, `html`).
- **Single Responsibility**: Each function, component, and module MUST have one
  clearly defined purpose. Functions exceeding 40 lines SHOULD be decomposed.
- **No Dead Code**: Commented-out code blocks, unused imports, and orphaned variables
  MUST NOT be committed. Use version control history instead.
- **DRY (Don't Repeat Yourself)**: Logic duplicated across three or more locations
  MUST be extracted into a shared utility, hook, or service.
- **Explicit over implicit**: Configuration, data flow, and side effects MUST be
  visible and traceable — no magic globals or hidden mutations.

**Rationale**: A codebase that is easy to read is easy to debug, extend, and hand off.
Clean code reduces onboarding time and prevents technical debt compounding over time.

### II. Responsive UI (NON-NEGOTIABLE)

Every UI surface MUST render correctly and remain fully usable across the full device
spectrum — from small mobile screens (320px) to wide desktop monitors (2560px+).

- **Mobile-First**: All layout and component styles MUST be authored from the smallest
  viewport upward. Desktop enhancements are progressive additions, not the baseline.
- **Fluid Grids**: Layouts MUST use relative units (`%`, `vw`, `fr`, `em`, `rem`)
  over fixed pixel values for structural elements.
- **Breakpoints**: A consistent set of breakpoints MUST be defined in the design token
  layer and used uniformly:
  - `sm`: ≥ 480px (large phones, landscape)
  - `md`: ≥ 768px (tablets)
  - `lg`: ≥ 1024px (laptops)
  - `xl`: ≥ 1280px (desktops)
- **Touch Targets**: Interactive elements MUST have a minimum tap/click area of
  44×44px on mobile to meet WCAG touch target guidelines.
- **No Horizontal Scroll**: Content MUST NOT cause unintentional horizontal overflow
  at any standard viewport width.

**Rationale**: Users access the application from a variety of devices. A non-responsive
UI alienates mobile users and is considered a critical defect, not a cosmetic issue.

### III. Fluid & Adaptive Design (NON-NEGOTIABLE)

The interface MUST feel alive, smooth, and intentional at every interaction point —
regardless of the device rendering it.

- **Transitions**: All state changes with visual impact (hover, focus, open/close,
  route changes) MUST use smooth CSS transitions. Abrupt jumps are prohibited.
- **Animation Discipline**: Animations MUST serve a purpose (guide attention, signal
  state, provide feedback). Purely decorative animations that impede usability are
  forbidden. Respect `prefers-reduced-motion` media query.
- **Adaptive Layout Shifts**: UI components MUST adjust layout gracefully when
  transitioning between breakpoints — no abrupt reflows or flash-of-unstyled-content.
- **Consistent Spacing**: Spacing MUST follow a defined scale (e.g., 4px base unit
  multiples) rather than arbitrary pixel values.
- **Design Token Compliance**: Colors, typography, spacing, border radii, and shadows
  MUST reference design tokens. Raw hex codes or magic pixel values in component
  styles are not permitted.

**Rationale**: Fluid design creates the perception of quality and intentionality.
A polished interface builds user trust and encourages engagement.

### IV. Component-Driven Architecture

UI MUST be decomposed into self-contained, reusable components with clearly defined
inputs (props/attributes) and outputs (events/callbacks).

- **Encapsulation**: A component MUST own its own styles and logic. Styles MUST NOT
  bleed outside the component boundary unless explicitly designed as global tokens.
- **Composition over Inheritance**: Complex UI MUST be built by composing smaller
  components, not by extending or patching existing ones.
- **Documented Props**: Every component MUST document its accepted inputs, their types,
  defaults, and whether they are required.
- **Isolation Testing**: Each component MUST be independently testable without
  requiring a full application context.

**Rationale**: Component-driven development accelerates parallel work, simplifies
debugging, and enables consistent design at scale.

### V. Performance & Accessibility

Performance and accessibility are non-negotiable quality gates, not optional enhancements.

- **Core Web Vitals**: LCP MUST be < 2.5s, CLS MUST be < 0.1, FID/INP MUST be < 200ms
  under typical network conditions.
- **Image Optimization**: All images MUST use modern formats (WebP, AVIF) with
  responsive `srcset` and explicit `width`/`height` attributes to prevent layout shift.
- **WCAG 2.1 AA Compliance**: All UI MUST meet WCAG 2.1 Level AA standards:
  - Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text.
  - All interactive elements MUST be keyboard-navigable.
  - All images MUST have descriptive `alt` text (or `alt=""` if decorative).
  - Forms MUST have explicit `<label>` elements associated with inputs.
- **Semantic HTML**: HTML MUST use the most semantically appropriate elements
  (`<nav>`, `<main>`, `<section>`, `<article>`, `<button>`, etc.).

**Rationale**: Performance directly impacts retention and conversions. Accessibility
ensures the application is inclusive and avoids legal/ethical risk.

## UI/UX Standards

The following non-negotiable standards govern visual design output across all features:

- **Typography**: A defined type scale MUST be used (e.g., based on a 1.25 modular
  scale). Body text MUST be ≥ 16px on mobile. Line height MUST be ≥ 1.5 for body copy.
- **Color System**: A primary, secondary, neutral, semantic (success/warning/error/info),
  and surface color palette MUST be defined and enforced via tokens.
- **Dark Mode**: The application SHOULD support `prefers-color-scheme: dark` with
  appropriate token overrides. If not yet implemented, it MUST be architecturally planned.
- **Iconography**: Icons MUST be from a single consistent icon library per project.
  Mixed icon styles are prohibited.
- **Loading States**: Every async operation MUST provide a loading indicator appropriate
  to the context (skeleton loaders for content, spinners for actions).
- **Empty States**: Every list, table, or data view MUST have a meaningful empty state
  with guidance on next steps.
- **Error States**: All error conditions (network failure, validation, 404, etc.) MUST
  surface a clear, human-readable message with a recovery action where possible.

## Development Workflow

- **Branch naming**: Feature branches MUST follow the spec-kit convention:
  `###-feature-name` (e.g., `001-auth-login`).
- **Commit messages**: MUST follow Conventional Commits:
  `type(scope): description` (e.g., `feat(auth): add login form`).
- **Responsive review gate**: Before any feature is marked complete, it MUST be
  visually verified at `sm`, `md`, `lg`, and `xl` breakpoints.
- **Constitution check**: Every implementation plan MUST include a Constitution Check
  section that maps planned work to each applicable principle above.
- **No untested UI**: Any UI component shipped to production MUST have been rendered
  and manually verified at minimum on a mobile viewport (≤ 480px) and a desktop
  viewport (≥ 1280px).

## Governance

This constitution supersedes all other project practices and conventions. In cases
of conflict, the constitution takes precedence.

- **Amendment process**: Changes MUST be proposed as a PR updating this file with:
  1. A clear rationale for the change.
  2. An updated Sync Impact Report comment at the top.
  3. An incremented version number following semantic versioning rules.
  4. Review and approval before merging.
- **Versioning policy**:
  - MAJOR: Removal or backward-incompatible redefinition of any principle.
  - MINOR: Addition of new principles or materially expanded guidance.
  - PATCH: Wording clarifications, typo fixes, non-semantic refinements.
- **Compliance review**: All PRs MUST verify compliance with applicable principles.
  A failing Constitution Check is a blocking review comment.
- **Agent guidance**: Coding agents MUST read this constitution before planning any
  feature. The current spec-kit plan is the authoritative source of runtime context.
  Refer to `AGENTS.md` for the location of the current plan.

**Version**: 1.0.0 | **Ratified**: 2026-05-31 | **Last Amended**: 2026-05-31
