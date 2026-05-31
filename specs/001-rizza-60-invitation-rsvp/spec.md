# Feature Specification: Rizza @ 60 — Digital Invitation & RSVP System

**Feature Branch**: `001-rizza-60-invitation-rsvp`

**Created**: 2026-05-31

**Status**: Draft

**Input**: User description: "Build a decoupled, full-stack digital invitation web application for 'Rizza @ 60' (60th Birthday Celebration). Frontend SPA on Vercel; backend API connected to MongoDB on Render."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Guest Views the Digital Invitation (Priority: P1)

A family member or friend receives a link to the digital invitation and opens it on
their phone or desktop. They immediately see a visually rich, elegant hero section
displaying the celebrant's name, the event date, the venue, and the dress code.
Scrolling down, they discover the full programme highlights — the 16 Roses, 16 Blue
Bills, and 16 Gifts — presented in clear, beautiful visual lists. The page feels
festive, personal, and works perfectly on any device.

**Why this priority**: Without a compelling, responsive invitation page, the application
delivers no value. This is the public face of the event.

**Independent Test**: Open the URL on a mobile phone (≤ 480px) and on a desktop
(≥ 1280px). The hero section, event details, dress code notice, and all three entourage
sections MUST render correctly with no horizontal overflow and no missing information.

**Acceptance Scenarios**:

1. **Given** a guest opens the invitation URL, **When** the page loads, **Then** they see
   the celebrant name "Rizza @ 60", date "December 27, 2026 (Sunday)", venue
   "Celandine Balintawak (Event Hall)", and dress code within the first visible screen.
2. **Given** a guest scrolls down, **When** they reach the entourage section, **Then**
   they see three distinct labelled groups — 16 Roses, 16 Blue Bills, 16 Gifts — each
   containing the correct list of names in full.
3. **Given** a guest views the page on a mobile device, **When** the page renders,
   **Then** all content is readable, touch targets are accessible, and no content is
   cut off or requires horizontal scrolling.
4. **Given** a guest views the page on a desktop monitor, **When** the page renders,
   **Then** the layout expands appropriately, using available space without awkward
   stretching.

---

### User Story 2 — Guest Submits an RSVP (Priority: P2)

A guest decides to confirm their attendance. They scroll to the RSVP section on the
same page, enter their full name, confirm they are attending, and indicate how many
people they are bringing (including themselves). They submit the form and receive clear
feedback that their response was recorded successfully. If something goes wrong (e.g.,
missing name), they see a helpful inline validation message.

**Why this priority**: RSVP collection is the primary interactive purpose of the
application. It drives the headcount planning the family needs.

**Independent Test**: Fill in the RSVP form with a name and guest count, submit it,
and verify a success confirmation is displayed. Check the admin dashboard to confirm
the entry appears.

**Acceptance Scenarios**:

1. **Given** a guest is on the invitation page, **When** they fill in their full name
   and set their party size and submit, **Then** a clear success message is shown
   confirming receipt of their RSVP.
2. **Given** a guest submits the form without entering their name, **When** the form
   is submitted, **Then** an inline validation error appears prompting them to enter
   their name, and no data is sent.
3. **Given** a guest enters a party size of 0 or a negative number, **When** the form
   is submitted, **Then** a validation error appears requiring at least 1 (themselves).
4. **Given** the backend is temporarily unavailable, **When** a guest submits the form,
   **Then** a user-friendly error message is shown, and the form data is preserved so
   they can retry.

---

### User Story 3 — Family Tracks Attendance on Admin Dashboard (Priority: P3)

A family member accesses the protected admin dashboard via a dedicated URL. They see
a comprehensive table of all RSVP submissions: each guest's full name, their attendance
status, and their declared party size. At the top of the page, a running total shows
the aggregate expected headcount. The family can use this page throughout the RSVP
period to monitor responses in real time.

**Why this priority**: The admin view is the operational output of the system — it
translates RSVP data into actionable headcount planning for the family.

**Independent Test**: After submitting several test RSVPs via the public form, open
the admin dashboard and verify each submission appears in the table with correct name,
status, and party size. Verify the aggregate total reflects the sum of all party sizes.

**Acceptance Scenarios**:

1. **Given** the family member opens the admin dashboard, **When** the page loads,
   **Then** all previously submitted RSVPs are displayed in a table with columns for
   full name, attendance confirmation, and party size.
2. **Given** RSVPs have been submitted, **When** the admin dashboard displays them,
   **Then** a clearly labelled aggregate headcount total is shown representing the sum
   of all accepted party sizes.
3. **Given** the admin dashboard is open and a new RSVP is submitted by a guest,
   **When** the family refreshes the dashboard, **Then** the new entry and updated
   total appear.
4. **Given** no RSVPs have been submitted yet, **When** the admin opens the dashboard,
   **Then** a friendly empty state message is shown with the total displaying 0.

---

### Edge Cases

- What happens when a guest submits the RSVP form more than once with the same name?
  (Assumption: both entries are recorded; deduplication is out of scope for v1.)
- What happens if the party size field is left blank? (Treat as validation error;
  a party of at least 1 is required.)
- What happens if the guest name contains special characters or emoji? (System records
  as-is; no character restrictions unless they break storage.)
- What happens if the admin dashboard is accessed by an unauthenticated user? (A simple
  access control mechanism — passphrase or basic auth — prevents public access.)

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST display the invitation page with the celebrant name
  "Rizza @ 60", event date "December 27, 2026 (Sunday)", venue "Celandine Balintawak
  (Event Hall)", and dress code (Dress for Women, Polo for Men; all colours except Red)
  prominently in the hero section.
- **FR-002**: The system MUST display three labelled entourage sections — 16 Roses,
  16 Blue Bills, and 16 Gifts — each listing the exact names provided in the project
  brief, in the correct grouping.
- **FR-003**: The system MUST provide an RSVP form on the public page collecting:
  full name (required, non-empty text), attendance status (confirmed accepting), and
  party size (required integer ≥ 1, representing total attendees including the guest).
- **FR-004**: The system MUST validate the RSVP form client-side before submission,
  blocking submission and showing inline error messages when required fields are
  missing or invalid.
- **FR-005**: Upon successful form submission, the system MUST send the RSVP data to
  the backend and display a clear success confirmation to the guest.
- **FR-006**: Upon form submission failure (network error or server error), the system
  MUST display a user-friendly error message and preserve the guest's entered data.
- **FR-007**: The backend MUST expose a `POST /api/rsvp` endpoint that validates and
  persists an RSVP record containing: name (required string), accepted (boolean, default
  true), maxGuests (required integer ≥ 1), and a server-generated creation timestamp.
- **FR-008**: The backend MUST expose a `GET /api/rsvp` endpoint that returns all
  stored RSVP records for the admin dashboard.
- **FR-009**: The system MUST provide a protected admin dashboard at a dedicated route
  displaying a table of all RSVP records with columns: full name, attendance status,
  and party size.
- **FR-010**: The admin dashboard MUST display a running aggregate total of expected
  headcount, calculated as the sum of all `maxGuests` values across accepted RSVPs.
- **FR-011**: The admin dashboard MUST be protected from public access (simple access
  control — passphrase, route-level PIN, or equivalent mechanism).

### UI Requirements *(mandatory per project constitution)*

All UI requirements MUST align with the [project constitution](../../.specify/memory/constitution.md):

- **UI-001**: All UI components MUST render correctly at sm (≥ 480px), md (≥ 768px),
  lg (≥ 1024px), and xl (≥ 1280px) breakpoints with no horizontal overflow.
- **UI-002**: All interactive elements (form inputs, buttons, links) MUST meet WCAG 2.1
  AA colour contrast (≥ 4.5:1 for text).
- **UI-003**: All state transitions — hover effects, form focus states, submission
  loading, success/error feedback — MUST use smooth CSS transitions.
- **UI-004**: All colours, spacing, typography, and border radii MUST reference design
  tokens; no raw hex codes or magic pixel values in component styles.
- **UI-005**: The RSVP form, submission states (loading, success, error), the
  entourage sections, and the admin table MUST each have defined empty/loading/error
  states.
- **UI-006**: The invitation page MUST feel visually festive and elegant — a premium
  experience worthy of a 60th birthday celebration, not a generic form page.

### Key Entities *(data involved)*

- **RSVP Record**: Represents a single guest's attendance confirmation.
  - `name` — full name of the responding guest (string, required)
  - `accepted` — whether the guest is attending (boolean, default `true`)
  - `maxGuests` — total number of people in the guest's party including themselves
    (integer, required, ≥ 1)
  - `createdAt` — server-generated timestamp of submission

- **Event Details** (static): Celebrant name, date, venue, dress code — embedded as
  static content in the frontend; no dynamic retrieval required.

- **Entourage Lists** (static): Three named lists (16 Roses, 16 Blue Bills, 16 Gifts)
  with fixed membership — embedded as static data in the frontend.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A guest can open the invitation page and visually confirm all event
  details (name, date, venue, dress code) within 5 seconds of page load on a standard
  mobile connection.
- **SC-002**: A guest can complete the RSVP form and receive a success confirmation
  within 30 seconds of arriving at the form, assuming a stable connection.
- **SC-003**: 100% of the named entourage members (48 names across three groups) are
  correctly displayed on the invitation page with no omissions or misspellings.
- **SC-004**: All submitted RSVP records appear in the admin dashboard on the next
  page refresh, with the aggregate headcount total accurately reflecting all accepted
  party sizes.
- **SC-005**: The invitation page passes basic accessibility review — all images have
  alt text, all inputs have labels, and primary content is navigable by keyboard.
- **SC-006**: The invitation page renders without layout defects (overflow, broken
  grid, unreadable text) on a mobile device (≤ 480px wide) and a desktop (≥ 1280px
  wide).
- **SC-007**: The admin dashboard requires a passphrase or equivalent access control;
  an unauthenticated visitor cannot view RSVP data by navigating directly to the route.

---

## Assumptions

- **Attendance is opt-in confirmed only**: The RSVP form is designed for guests who
  intend to attend. A "Decline" flow is out of scope for v1; the `accepted` field
  defaults to `true`.
- **No guest account system**: Guests do not create accounts. Submissions are anonymous
  beyond the name they enter.
- **Single submission per guest is expected but not enforced**: Duplicate name submissions
  are allowed in v1; deduplication or editing is out of scope.
- **Party size minimum is 1**: The responding guest always counts themselves (e.g.,
  a solo guest enters 1; a guest bringing one companion enters 2).
- **Admin access control is lightweight**: A simple passphrase or route-level PIN is
  sufficient for v1; full authentication (OAuth, session management) is not required.
- **Static event data is hardcoded**: Event details and entourage lists are embedded
  directly in the frontend and do not require a CMS or admin editing capability.
- **Deployment targets are fixed**: Frontend on Vercel, backend API on Render, database
  on MongoDB Atlas. Infrastructure configuration is out of scope for this specification.
- **No email/SMS confirmations**: The system does not send confirmation messages to
  guests after submission in v1.
- **Browser support**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge).
  Internet Explorer is not supported.
