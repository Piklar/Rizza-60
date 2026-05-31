# Data Model: Rizza @ 60 — Digital Invitation & RSVP System

**Branch**: `001-rizza-60-invitation-rsvp` | **Date**: 2026-05-31

---

## Entities

### 1. RSVP Record

The only persisted entity in the system. Represents a single guest's attendance
confirmation submitted via the public RSVP form.

**MongoDB Collection**: `rsvps`
**Mongoose Model Name**: `Rsvp`

| Field | Type | Required | Default | Validation | Notes |
|-------|------|----------|---------|------------|-------|
| `_id` | ObjectId | Auto | Auto-generated | — | MongoDB primary key |
| `name` | String | ✅ | — | Non-empty after trim; min length 1 | Guest's full name, trimmed |
| `accepted` | Boolean | — | `true` | — | Always true in v1 (decline flow out of scope) |
| `maxGuests` | Number | ✅ | — | Integer; min value 1 | Total party size including the respondent |
| `createdAt` | Date | Auto | `Date.now` | — | Server timestamp via Mongoose `timestamps: true` |
| `updatedAt` | Date | Auto | Auto | — | Auto-managed by Mongoose `timestamps: true` |

**Mongoose Schema (reference)**:

```js
const rsvpSchema = new mongoose.Schema(
  {
    name:      { type: String,  required: true, trim: true, minlength: 1 },
    accepted:  { type: Boolean, default: true },
    maxGuests: { type: Number,  required: true, min: 1 },
  },
  { timestamps: true }
);
```

---

### 2. Event Details (Static — Frontend Only)

Not persisted in the database. Embedded as constants in the frontend source.

| Field | Value |
|-------|-------|
| `celebrantName` | `"Rizza"` |
| `eventTitle` | `"Rizza @ 60"` |
| `date` | `"December 27, 2026 (Sunday)"` |
| `venue` | `"Celandine Balintawak (Event Hall)"` |
| `dressCodeWomen` | `"Dress (all colours except Red)"` |
| `dressCodeMen` | `"Polo (all colours except Red)"` |

---

### 3. Entourage Lists (Static — Frontend Only)

Not persisted. Embedded as static arrays in the frontend source.

#### 16 Roses

```
Daniel Gonzales, David Kyle Gonzales, Lemuel Jules Vinluan, Christian Urbano,
Rick Budomo, Jhomel Reyes, Kian Reyes, Joed Pamintuan, Joshua Pamintuan,
Maxuelle Lobo, Intel Joseph Urbano, Ramon Lobo, Jhun Urbano, Jess Urbano,
Albert Urbano, Danny Roque
```

#### 16 Blue Bills

```
Felina Urbano, Hilda Yambao, Melba Urbano, Dang Yumul, Leth Jastiva,
Joy Dimayuga, Ernie Simbul, Nico Bondoc, Ellen Reyes, Roselee Acosta,
Jim Aaron Ochoa, Chiqui Padua, Dra. Josephine Sabando, Dra. Josie Carlos,
Flor Urbano, Dra Becky Sison
```

#### 16 Gifts

```
Cely Budomo, Lucia Lobo, Leticia Lobrio, Marivic Golez, Marianne Golez,
Harriet Urbano, Amerie Vitacion, Hilyn Tablada, Jenny Reyes, Maybel Bondoc,
Rose Budomo, Marejo Budomo, Eden Vergara, Justine Urbano, Rose Ann Elinzano,
Abegail Pamintuan
```

---

## State Transitions

### RSVP Submission Flow

```
[Guest on Form] → fills name + maxGuests
      ↓
[Client Validation] → passes? → [POST /api/rsvp]
      ↓ fails                         ↓
[Inline error shown]          [Server validates]
                                      ↓ fails → 400 Bad Request → error modal
                                      ↓ passes → Mongoose .save()
                                              → 201 Created + record JSON
                                              → Success modal shown
                                              → Form locked (disabled)
```

### Admin Dashboard Load Flow

```
[/admin-dashboard route mounts]
      ↓
[PIN gate check] → PIN incorrect → redirect to /
      ↓ PIN correct
[GET /api/rsvp]
      ↓ success → render table + compute aggregate total
      ↓ error   → error state shown with retry option
```

---

## Relationships

The system has no inter-entity relationships. RSVP records are independent documents.
There is no user account system or relational linking.

---

## Validation Rules Summary

| Rule | Enforced At |
|------|------------|
| `name` non-empty | Client (HTML5 `required`) + Server (Mongoose `minlength: 1`) |
| `name` trimmed | Server (Mongoose `trim: true`) |
| `maxGuests` ≥ 1 | Client (HTML5 `min="1"`) + Server (Mongoose `min: 1`) |
| `maxGuests` integer | Client (HTML5 `type="number" step="1"`) + Server (Number type) |
| `accepted` always true | Server default; not user-editable in v1 |
