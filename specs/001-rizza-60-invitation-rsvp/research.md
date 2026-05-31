# Research: Rizza @ 60 — Digital Invitation & RSVP System

**Branch**: `001-rizza-60-invitation-rsvp` | **Date**: 2026-05-31
**Spec**: [spec.md](./spec.md)

---

## Phase 0 Research Summary

All technical decisions below were informed by the architecture brief provided and
verified against current best practices for MERN stack SPA applications.

---

## Decision 1: Frontend Framework & Build Tool

**Decision**: React 18 (stable) + Vite 5

**Rationale**:
- React 18 is the current LTS release with a stable concurrent rendering model.
  React 19 introduces experimental features not yet needed for this scope.
- Vite provides sub-second HMR and optimized production output via Rollup. It is
  the de-facto standard for new React projects replacing Create React App.
- Vercel has first-class Vite/React support with zero-config deployments.

**Alternatives Considered**:
- Next.js: Adds SSR/SSG complexity not needed for a pure SPA with a separate API.
- CRA (Create React App): Deprecated; Vite is the recommended successor.

---

## Decision 2: Routing

**Decision**: `react-router-dom` v6

**Rationale**:
- The app has exactly two distinct views (public invitation + admin dashboard).
  react-router-dom v6 handles this with minimal configuration.
- Enables client-side navigation without full page reloads, matching SPA expectations.
- Vercel's SPA fallback (`vercel.json` rewrite rule) must be configured to redirect
  all routes to `index.html` so react-router handles them.

**Alternatives Considered**:
- No router (conditional rendering): Viable for two views but degrades bookmarkability
  and browser history. Rejected to maintain clean `/admin-dashboard` URL.

---

## Decision 3: UI Styling

**Decision**: Tailwind CSS v3 (utility-first) with a custom festive design token layer

**Rationale**:
- The project constitution mandates design tokens for color, spacing, and typography.
  Tailwind's theme configuration (`tailwind.config.js`) maps directly to this requirement.
- Mobile-first responsive utilities (`sm:`, `md:`, `lg:`, `xl:`) align exactly with
  the four breakpoints defined in the constitution.
- Lighter bundle than MUI; no component library opinions that conflict with the
  bespoke, festive visual design required for a 60th birthday celebration.
- MUI ships with Material Design opinions that would work against the elegant, custom
  look the project demands.

**Alternatives Considered**:
- Material-UI (MUI): Heavier, opinionated design system. Feasible but fights the
  premium/festive aesthetic requirement.
- Vanilla CSS + CSS Modules: Maximum control but no responsive utilities. Too slow
  for the scope.

**Token Strategy**:
- Primary palette: warm gold / deep navy (festive, celebratory)
- Typography: Google Fonts — `Playfair Display` (headings, celebrant name) +
  `Inter` (body, form, table text)
- Spacing scale: 4px base unit (rem-based: 1, 2, 3, 4, 6, 8, 12, 16, 24, 32)

---

## Decision 4: HTTP Client

**Decision**: `axios` v1

**Rationale**:
- Axios provides consistent request/response interceptors, making it easy to attach
  a base URL once and handle all error responses uniformly.
- The `baseURL` pattern (`axios.create({ baseURL: import.meta.env.VITE_API_URL })`)
  cleanly separates the Render backend URL from component code.
- Native Fetch is viable but lacks built-in interceptors; for a project this size,
  the added ergonomics of Axios are worth the small bundle cost.

**Environment Variable**:
- `VITE_API_URL` — set to production Render URL in Vercel environment variables.
- `VITE_ADMIN_PIN` — passphrase/PIN for admin dashboard access (stored in Vercel env).

---

## Decision 5: RSVP Submission UX Feedback

**Decision**: `SweetAlert2` for success/error modals + inline HTML5 validation for form errors

**Rationale**:
- SweetAlert2 produces polished, animated confirmation dialogs that match the premium
  aesthetic goal. A plain `alert()` is unacceptable given the constitution's fluid
  design principle.
- Inline HTML5 `required` + custom validation messages handle field-level errors
  without needing a full form library (react-hook-form is overkill for a 3-field form).
- Form is disabled/locked after a successful submission to prevent double-submitting
  (per FR-005 implicit requirement from data flow brief).

---

## Decision 6: Backend Framework

**Decision**: Node.js 20 LTS + Express 4

**Rationale**:
- Express 4 is stable, minimal, and universally understood. Express 5 is in RC.
- Node 20 LTS is the current stable runtime supported by Render's free tier.
- Render's free tier supports Node.js web services with persistent process execution.

---

## Decision 7: Database ODM

**Decision**: Mongoose 8

**Rationale**:
- Mongoose provides schema enforcement, field trimming, and `min` validators that
  map directly to the RSVP schema requirements (name trimmed/required, maxGuests ≥ 1).
- `timestamps: true` option auto-manages `createdAt` without manual `Date.now` defaults.

---

## Decision 8: CORS Configuration

**Decision**: `cors` npm package, whitelist-only approach

**Rationale**:
- The production Vercel frontend URL is the only allowed origin. A wildcard `*`
  origin is rejected as a security violation.
- Local development origin (`http://localhost:5173`) is added for dev environment only.
- The `ALLOWED_ORIGIN` environment variable on Render stores the production URL.

---

## Decision 9: Admin Dashboard Access Control

**Decision**: Client-side PIN gate (PIN stored in `VITE_ADMIN_PIN` env var)

**Rationale**:
- The spec requires "lightweight passphrase" protection. A full JWT auth system
  is out of scope.
- The PIN is stored in a Vercel environment variable (not in the codebase) and
  compared client-side when the admin route mounts.
- Limitation: Client-side PINs are not cryptographically secure; they prevent casual
  access, not determined attackers. Acceptable for a family event RSVP tracker.
- If the PIN check fails, the user is redirected to the public invitation page.

---

## Decision 10: Deployment Configuration

**Decision**:
- **Frontend**: Vercel, auto-deploys from `main` branch. `vercel.json` SPA rewrite.
- **Backend**: Render web service, auto-deploys from `main` branch. Free tier
  (note: Render free tier spins down after 15 min inactivity — acceptable for
  a low-traffic family event site).
- **Database**: MongoDB Atlas M0 free cluster.

**Environment Variables Summary**:

| Service | Variable | Purpose |
|---------|----------|---------|
| Vercel  | `VITE_API_URL` | Render backend base URL |
| Vercel  | `VITE_ADMIN_PIN` | Admin dashboard PIN |
| Render  | `MONGO_URI` | MongoDB Atlas connection string |
| Render  | `ALLOWED_ORIGIN` | Vercel frontend URL for CORS |
| Render  | `PORT` | Express listen port (default 3001) |

---

## Decision 11: Project Repository Structure

**Decision**: Monorepo with `/frontend` and `/backend` subdirectories

**Rationale**:
- Keeps both deployable units in one repository for simplicity at this scale.
- Vercel and Render both support monorepo root overrides (set root directory to
  `frontend/` or `backend/` respectively in their dashboards).
- Avoids managing two separate repositories for a single event application.

---

## Resolved Clarifications

All items from the specification were fully specified or assigned reasonable defaults
above. No NEEDS CLARIFICATION markers remained in the spec. ✅
