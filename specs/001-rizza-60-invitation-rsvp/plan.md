# Implementation Plan: Rizza @ 60 — Digital Invitation & RSVP System

**Branch**: `001-rizza-60-invitation-rsvp` | **Date**: 2026-05-31 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-rizza-60-invitation-rsvp/spec.md`

---

## Summary

Build a decoupled MERN stack digital invitation and RSVP web application for "Rizza @ 60"
(60th Birthday Celebration). A React + Vite SPA (hosted on Vercel) serves a visually
festive public invitation page displaying event details and all entourage lists, plus an
interactive RSVP form. A Node.js/Express API (hosted on Render) persists submissions to
MongoDB Atlas. A PIN-protected admin dashboard allows the family to track confirmed
attendance and aggregate headcount.

---

## Technical Context

**Language/Version**: JavaScript — Node.js 20 LTS (backend), ES2022+ (frontend)

**Primary Dependencies**:
- Frontend: React 18, Vite 5, react-router-dom v6, Tailwind CSS v3, Axios v1, SweetAlert2
- Backend: Express 4, Mongoose 8, cors, dotenv

**Storage**: MongoDB Atlas M0 (free tier) — `rizza60` database, `rsvps` collection

**Testing**: Manual verification per quickstart checklist (automated tests out of scope for v1)

**Target Platform**: Web — Vercel (frontend SPA), Render (backend API)

**Project Type**: Decoupled web application (frontend SPA + RESTful API)

**Performance Goals**: Page visible within 3s on mobile connection; RSVP submission
round-trip under 5s on standard connectivity

**Constraints**: Render free tier cold-start latency (~30s after inactivity);
MongoDB Atlas M0 storage limit (512 MB — vastly sufficient at event scale)

**Scale/Scope**: Single event; expected max ~200 RSVP submissions; no concurrency concerns

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify the following against `.specify/memory/constitution.md` before proceeding:

| Principle | Gate Question | Status |
|-----------|---------------|--------|
| I. Clean Code | Are all new functions/components single-purpose and less than 40 lines? | ✅ |
| II. Responsive UI | Is every UI element designed mobile-first with defined breakpoints (sm/md/lg/xl)? | ✅ |
| III. Fluid & Adaptive Design | Do all state transitions use CSS transitions? Are design tokens used for spacing/color/type? | ✅ |
| IV. Component-Driven Architecture | Is the feature decomposed into isolated, reusable components with documented props? | ✅ |
| V. Performance & Accessibility | Are Core Web Vitals targets planned? Is WCAG 2.1 AA compliance planned? | ✅ |

**Constitution Check**: All 5 gates cleared — proceed.

**Notes**:
- Tailwind `tailwind.config.js` theme extension serves as the design token layer (Principle III).
- Breakpoints `sm/md/lg/xl` are configured to match constitution values 480/768/1024/1280px (Principle II).
- Each React component has one clearly scoped responsibility (Principle IV).
- All images will include `alt` text; all inputs will have `<label>` associations (Principle V).

---

## Project Structure

### Documentation (this feature)

```text
specs/001-rizza-60-invitation-rsvp/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 technical decisions
├── data-model.md        # Entity schema + state transitions
├── quickstart.md        # Local setup + deployment guide
├── contracts/
│   ├── post-rsvp.md     # POST /api/rsvp contract
│   └── get-rsvp.md      # GET /api/rsvp contract
├── checklists/
│   └── requirements.md  # Specification quality checklist
└── tasks.md             # Phase 2 output (/speckit-tasks command)
```

### Source Code (repository root)

```text
frontend/                        # React + Vite SPA → Vercel
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx      # Celebrant name, date, venue, dress code
│   │   ├── EntourageSection.jsx # Reusable card for one entourage group
│   │   ├── RsvpForm.jsx         # RSVP form with validation + SweetAlert2
│   │   ├── AdminTable.jsx       # RSVP records table + aggregate total
│   │   └── PinGate.jsx          # Admin PIN prompt + redirect guard
│   ├── pages/
│   │   ├── InvitationPage.jsx   # Public invitation page (US1 + US2)
│   │   └── AdminDashboard.jsx   # Protected admin view (US3)
│   ├── data/
│   │   └── eventData.js         # Static event details + entourage arrays
│   ├── services/
│   │   └── apiClient.js         # Axios instance (baseURL from VITE_API_URL)
│   ├── App.jsx                  # Router: two routes
│   ├── main.jsx                 # React 18 entry point
│   └── index.css                # Tailwind directives + global base styles
├── index.html
├── vite.config.js
├── tailwind.config.js           # Design tokens: palette, fonts, breakpoints
├── postcss.config.js
└── vercel.json                  # SPA rewrite: all routes → index.html

backend/                         # Node.js + Express → Render
├── src/
│   ├── models/
│   │   └── Rsvp.js              # Mongoose schema + model
│   ├── routes/
│   │   └── rsvp.js              # Express router: POST + GET /api/rsvp
│   └── index.js                 # Entry point, CORS, DB connect, routes
└── package.json
```

**Structure Decision**: Option 2 — `frontend/` and `backend/` subdirectories at
repository root. Vercel root directory override set to `frontend/`; Render root
directory override set to `backend/`.

---

## Phase 0: Research

See [research.md](./research.md) for all technical decisions, rationale, and alternatives.

**Key decisions summary**:

| Concern | Decision |
|---------|----------|
| Frontend build | React 18 + Vite 5 |
| Routing | react-router-dom v6 |
| Styling | Tailwind CSS v3 with custom festive design tokens |
| HTTP client | Axios v1 with `VITE_API_URL` env var |
| RSVP feedback | SweetAlert2 success/error modals + HTML5 inline validation |
| Backend | Node.js 20 LTS + Express 4 |
| ODM | Mongoose 8 (`timestamps: true`) |
| CORS | Whitelist-only via `ALLOWED_ORIGIN` env var |
| Admin access | Client-side PIN gate via `VITE_ADMIN_PIN` env var |
| Deployment | Vercel (frontend) + Render (backend) + MongoDB Atlas M0 |

---

## Phase 1: Design & Contracts

### Data Model

See [data-model.md](./data-model.md) for complete entity definitions and state transitions.

**RSVP Mongoose Schema**:

```
name       String   required, trim: true, minlength: 1
accepted   Boolean  default: true
maxGuests  Number   required, min: 1
createdAt  Date     auto via timestamps: true
updatedAt  Date     auto via timestamps: true
```

### API Contracts

See [contracts/post-rsvp.md](./contracts/post-rsvp.md) and [contracts/get-rsvp.md](./contracts/get-rsvp.md).

| Method | Path | Purpose | Returns |
|--------|------|---------|---------|
| `POST` | `/api/rsvp` | Create RSVP record | 201 + saved record |
| `GET` | `/api/rsvp` | All RSVPs + aggregate total | 200 + array + totalHeadcount |

### Design Token System (Tailwind theme extension)

```js
// tailwind.config.js
colors: {
  gold:  { 400: '#F5C842', 600: '#C9A227' },
  navy:  { 800: '#1A2744', 900: '#0F1929' },
  cream: { 50: '#FDF8EE', 100: '#FAF0D7' },
  rose:  { 400: '#E88DA0' },
},
fontFamily: {
  display: ['Playfair Display', 'serif'],  // headings, hero, celebrant name
  body:    ['Inter', 'sans-serif'],         // body text, form, table
},
screens: {
  sm: '480px', md: '768px', lg: '1024px', xl: '1280px',
},
```

### Component Architecture

```
App.jsx
├── Route "/"                → InvitationPage.jsx
│   ├── HeroSection.jsx          celebrant, date, venue, dress code
│   ├── EntourageSection.jsx     16 Roses   (title + names array prop)
│   ├── EntourageSection.jsx     16 Blue Bills
│   ├── EntourageSection.jsx     16 Gifts
│   └── RsvpForm.jsx             form + validation + SweetAlert2 trigger
└── Route "/admin-dashboard" → AdminDashboard.jsx
    ├── PinGate.jsx              PIN prompt, redirect if wrong
    └── AdminTable.jsx           GET /api/rsvp → table + aggregate total
```

### Environment Variables

| Service | Variable | Purpose |
|---------|----------|---------|
| Vercel  | `VITE_API_URL` | Render backend base URL |
| Vercel  | `VITE_ADMIN_PIN` | Admin dashboard PIN |
| Render  | `MONGO_URI` | MongoDB Atlas connection string |
| Render  | `ALLOWED_ORIGIN` | Vercel frontend URL for CORS whitelist |

---

## Complexity Tracking

No constitution violations. The two-subdirectory monorepo structure is the minimum
viable layout for a decoupled SPA + API deployment. No additional abstraction layers
are introduced beyond what the feature requires.
