---
description: "Task list for Rizza @ 60 — Digital Invitation & RSVP System"
---

# Tasks: Rizza @ 60 — Digital Invitation & RSVP System

**Input**: Design documents from `specs/001-rizza-60-invitation-rsvp/`

**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ ✅

**Tests**: Not requested — manual verification per quickstart.md checklist.

**Organization**: Tasks are grouped by user story to enable independent implementation
and testing of each story. Backend and frontend foundational setup is completed first
as a shared blocking prerequisite.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are included in all descriptions

## Path Conventions

- Frontend SPA: `frontend/src/` at repository root
- Backend API: `backend/src/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize both frontend and backend project structures so that all
subsequent tasks have a working scaffold to build on.

- [x] T001 Initialize Vite + React 18 project in `frontend/` (`npm create vite@latest frontend -- --template react`)
- [x] T002 Initialize Node.js project in `backend/` (`npm init -y` then install express mongoose cors dotenv)
- [x] T003 [P] Create `frontend/src/components/` directory with `.gitkeep`
- [x] T004 [P] Create `frontend/src/pages/` directory with `.gitkeep`
- [x] T005 [P] Create `frontend/src/data/` directory with `.gitkeep`
- [x] T006 [P] Create `frontend/src/services/` directory with `.gitkeep`
- [x] T007 [P] Create `backend/src/models/` directory with `.gitkeep`
- [x] T008 [P] Create `backend/src/routes/` directory with `.gitkeep`
- [x] T009 Install frontend dependencies: `npm install react-router-dom axios sweetalert2` in `frontend/`
- [x] T010 Install Tailwind CSS v3 in `frontend/` (`npm install -D tailwindcss postcss autoprefixer` then `npx tailwindcss init -p`)
- [x] T011 Install Google Fonts (Playfair Display + Inter) via `<link>` in `frontend/index.html`
- [x] T012 Create `frontend/.env.example` with `VITE_API_URL` and `VITE_ADMIN_PIN` (copy to `.env.local` locally)
- [x] T013 Create `backend/.env.example` with `MONGO_URI`, `ALLOWED_ORIGIN`, `PORT`
- [x] T014 Create `frontend/vercel.json` with SPA rewrite rule (all routes → `index.html`)
- [x] T015 Add `frontend/.gitignore` entries for `node_modules`, `dist`, `.env.local`
- [x] T016 Add `backend/.gitignore` entries for `node_modules`, `.env`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before any user story work begins.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T017 Configure Tailwind design tokens in `frontend/tailwind.config.js`
- [x] T018 Replace `frontend/src/index.css` with Tailwind directives and global base styles
- [x] T019 Create Axios singleton in `frontend/src/services/apiClient.js`
- [x] T020 Create Express app entry point in `backend/src/index.js`
- [x] T021 Create Mongoose RSVP model in `backend/src/models/Rsvp.js`
- [x] T022 Add MongoDB connection logic inside `backend/src/index.js`
- [x] T023 Create static event data constants in `frontend/src/data/eventData.js`
- [x] T024 Set up react-router-dom in `frontend/src/App.jsx`
- [x] T025 Update `frontend/src/main.jsx` for React 18

**Checkpoint**: ✅ `npm run build` passes — 86 modules, no errors.

---

## Phase 3: User Story 1 — Guest Views the Digital Invitation (Priority: P1) 🎯 MVP

- [x] T026 [P] [US1] Create `frontend/src/components/HeroSection.jsx`
- [x] T027 [P] [US1] Create `frontend/src/components/EntourageSection.jsx`
- [x] T028 [US1] Create `frontend/src/pages/InvitationPage.jsx`
- [x] T029 [US1] Add CSS transitions and micro-animations to `frontend/src/index.css`

**Checkpoint**: ✅ Build passes. Open locally to verify.

---

## Phase 4: User Story 2 — Guest Submits an RSVP (Priority: P2)

- [x] T030 [P] [US2] Create Express RSVP router `POST /` in `backend/src/routes/rsvp.js`
- [x] T031 [P] [US2] Add `GET /` handler to `backend/src/routes/rsvp.js`
- [x] T032 [US2] Create `frontend/src/components/RsvpForm.jsx`
- [x] T033 [US2] Wire `RsvpForm` into `frontend/src/pages/InvitationPage.jsx`
- [x] T034 [US2] Apply Tailwind responsive styling to `RsvpForm.jsx`

**Checkpoint**: ✅ Build passes.

---

## Phase 5: User Story 3 — Family Tracks Attendance on Admin Dashboard (Priority: P3)

- [x] T035 [P] [US3] Create `frontend/src/components/PinGate.jsx`
- [x] T036 [P] [US3] Create `frontend/src/components/AdminTable.jsx`
- [x] T037 [US3] Create `frontend/src/pages/AdminDashboard.jsx`
- [x] T038 [US3] Apply Tailwind responsive styling to `AdminDashboard.jsx` and `AdminTable.jsx`

**Checkpoint**: ✅ Build passes.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T039 [P] Add `<meta>` SEO tags to `frontend/index.html`
- [x] T040 [P] Add favicon to `frontend/public/favicon.svg`
- [ ] T041 Code cleanup and refactoring — review all components (manual)
- [x] T042 All decorative elements use `aria-hidden="true"`; meaningful images have alt text
- [x] T043 All `<input>` elements have associated `<label>` with correct `htmlFor`/`id`

### Responsive UI Verification Gate (Principles II + III — NON-NEGOTIABLE)

- [ ] T044 [P] Verify all UI at `sm` breakpoint (≥ 480px) — manual browser check
- [ ] T045 [P] Verify all UI at `md` breakpoint (≥ 768px) — manual browser check
- [ ] T046 [P] Verify all UI at `lg` breakpoint (≥ 1024px) — manual browser check
- [ ] T047 [P] Verify all UI at `xl` breakpoint (≥ 1280px) — manual browser check
- [ ] T048 Verify CSS transitions on all interactive state changes — manual browser check

### Accessibility Gate (Principle V — NON-NEGOTIABLE)

- [ ] T049 Run Lighthouse accessibility audit — target ≥ 90
- [ ] T050 Verify keyboard navigation through RSVP form and PIN gate
- [ ] T051 Verify `prefers-reduced-motion` CSS block works

### Deployment Preparation

- [ ] T052 [P] Configure Vercel project (manual — dashboard setup)
- [ ] T053 [P] Configure Render web service (manual — dashboard setup)
- [x] T054 Update `backend/src/index.js` CORS from `process.env.ALLOWED_ORIGIN`
- [ ] T055 Run full production quickstart checklist — end-to-end on production URL

---

## Dependencies & Execution Order

*(unchanged — see original tasks.md for full dependency graph)*

---

## Notes

- [P] tasks = different files, no blocking dependencies — safe to parallelise
- [Story] label maps task to specific user story for traceability
- US1 is the only story with zero backend dependency — demo-able offline
- US2 and US3 share `backend/src/routes/rsvp.js` — T030 and T031 done together ✅
- All 48 entourage names match `spec.md` exactly in `eventData.js` ✅
- `.env.local` / `.env` are gitignored — use `.env.example` as template ✅
- **Remaining manual tasks**: T044–T051 (browser verification), T052–T053 (deployment config), T055 (production checklist)
