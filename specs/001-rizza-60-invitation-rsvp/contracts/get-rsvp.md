# API Contract: GET /api/rsvp

**Service**: Rizza @ 60 Backend (Node.js/Express on Render)
**Version**: v1 | **Date**: 2026-05-31

---

## Overview

Retrieves all RSVP records from the MongoDB database. Called exclusively by the
protected admin dashboard on mount. Returns all submissions sorted by creation
date (newest first).

---

## Request

**Method**: `GET`
**Path**: `/api/rsvp`
**Content-Type**: N/A (no request body)
**Authentication**: None server-side (access control is handled client-side via PIN gate)

---

## Responses

### 200 OK — Success

```json
{
  "success": true,
  "count": 3,
  "totalHeadcount": 7,
  "data": [
    {
      "_id": "6659a1f4c2a3b100123abc02",
      "name": "Juan dela Cruz",
      "accepted": true,
      "maxGuests": 3,
      "createdAt": "2026-05-31T14:00:00.000Z",
      "updatedAt": "2026-05-31T14:00:00.000Z"
    },
    {
      "_id": "6659a1f4c2a3b100123abc01",
      "name": "Ana Reyes",
      "accepted": true,
      "maxGuests": 2,
      "createdAt": "2026-05-31T13:00:00.000Z",
      "updatedAt": "2026-05-31T13:00:00.000Z"
    },
    {
      "_id": "6659a1f4c2a3b100123abc00",
      "name": "Maria Santos",
      "accepted": true,
      "maxGuests": 2,
      "createdAt": "2026-05-31T12:00:00.000Z",
      "updatedAt": "2026-05-31T12:00:00.000Z"
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Always `true` on success |
| `count` | number | Total number of RSVP records returned |
| `totalHeadcount` | number | Sum of all `maxGuests` values (pre-computed server-side) |
| `data` | array | Array of RSVP record objects, sorted by `createdAt` descending |

### 200 OK — No Records Yet (Empty State)

```json
{
  "success": true,
  "count": 0,
  "totalHeadcount": 0,
  "data": []
}
```

### 500 Internal Server Error — Database Error

```json
{
  "success": false,
  "error": "Unable to retrieve RSVPs. Please try again."
}
```

---

## Sort Order

Records are sorted by `createdAt` descending (most recent first) to show the latest
responses at the top of the admin table.

---

## Aggregate Computation

`totalHeadcount` is computed server-side:

```js
const totalHeadcount = records.reduce((sum, r) => sum + r.maxGuests, 0);
```

This avoids the frontend having to re-compute it and ensures consistency.

---

## Frontend Usage (Axios)

```js
const response = await apiClient.get('/api/rsvp');
// response.data.data → array of RSVPs
// response.data.totalHeadcount → aggregate headcount integer
// response.data.count → number of records
```
