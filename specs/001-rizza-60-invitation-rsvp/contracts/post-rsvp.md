# API Contract: POST /api/rsvp

**Service**: Rizza @ 60 Backend (Node.js/Express on Render)
**Version**: v1 | **Date**: 2026-05-31

---

## Overview

Creates a new RSVP record in the MongoDB database. Called by the frontend RSVP form
on submission. Returns the saved record on success.

---

## Request

**Method**: `POST`
**Path**: `/api/rsvp`
**Content-Type**: `application/json`

### Request Body

```json
{
  "name": "Maria Santos",
  "maxGuests": 2
}
```

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `name` | string | ✅ | Non-empty after trim | Full name of the responding guest |
| `maxGuests` | number | ✅ | Integer ≥ 1 | Total attendees including the respondent |

**Notes**:
- `accepted` is always `true` in v1 and is set server-side (not accepted from client).
- `createdAt` / `updatedAt` are server-generated via Mongoose `timestamps: true`.

---

## Responses

### 201 Created — Success

```json
{
  "success": true,
  "data": {
    "_id": "6659a1f4c2a3b100123abc00",
    "name": "Maria Santos",
    "accepted": true,
    "maxGuests": 2,
    "createdAt": "2026-05-31T12:00:00.000Z",
    "updatedAt": "2026-05-31T12:00:00.000Z"
  }
}
```

### 400 Bad Request — Validation Failure

Returned when `name` is empty/missing or `maxGuests` is absent or < 1.

```json
{
  "success": false,
  "error": "Validation failed",
  "details": "name is required and must be non-empty"
}
```

### 500 Internal Server Error — Database Error

```json
{
  "success": false,
  "error": "An unexpected error occurred. Please try again."
}
```

---

## CORS

Only requests from the origin matching the `ALLOWED_ORIGIN` environment variable
(the production Vercel URL) are permitted. Requests from other origins receive a
CORS policy error.

---

## Frontend Usage (Axios)

```js
const response = await apiClient.post('/api/rsvp', {
  name: formData.name.trim(),
  maxGuests: parseInt(formData.maxGuests, 10),
});
// response.data.data → saved RSVP record
```
