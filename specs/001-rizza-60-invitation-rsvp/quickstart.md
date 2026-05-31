# Quickstart: Rizza @ 60 — Digital Invitation & RSVP System

**Date**: 2026-05-31

---

## Prerequisites

Ensure the following are installed locally before running anything:

- **Node.js** v20 LTS — [nodejs.org](https://nodejs.org)
- **npm** v10+ (bundled with Node)
- **Git**
- A **MongoDB Atlas** account with an M0 free cluster created
- A **Vercel** account (for frontend deployment)
- A **Render** account (for backend deployment)

---

## Repository Structure

```
Speckingking/
├── frontend/           # React + Vite SPA (deploy to Vercel)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/       # Static event + entourage constants
│   │   ├── services/   # Axios client
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json     # SPA rewrite rule
├── backend/            # Node.js + Express API (deploy to Render)
│   ├── src/
│   │   ├── models/     # Mongoose RSVP schema
│   │   ├── routes/     # Express routers
│   │   └── index.js    # Entry point
│   └── package.json
└── specs/              # Spec-kit design artifacts (not deployed)
```

---

## 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/Piklar/Rizza-60.git
cd Rizza-60

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

---

## 2. Configure Environment Variables

### Backend (`backend/.env`)

```env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/rizza60?retryWrites=true&w=majority
ALLOWED_ORIGIN=http://localhost:5173
PORT=3001
```

> ⚠️ Replace `<user>`, `<password>`, `<cluster>` with your MongoDB Atlas credentials.
> For production, set `ALLOWED_ORIGIN` to your Vercel deployment URL.

### Frontend (`frontend/.env.local`)

```env
VITE_API_URL=http://localhost:3001
VITE_ADMIN_PIN=rizza60admin
```

> ⚠️ Change `VITE_ADMIN_PIN` to a strong passphrase before production deployment.
> In production, set `VITE_API_URL` to your Render service URL.

---

## 3. Run Locally

Open two terminal windows:

```bash
# Terminal 1 — Backend
cd backend
npm run dev
# Server starts at http://localhost:3001
```

```bash
# Terminal 2 — Frontend
cd frontend
npm run dev
# Vite dev server starts at http://localhost:5173
```

Visit `http://localhost:5173` to view the invitation page.
Visit `http://localhost:5173/admin-dashboard` and enter the PIN to access the admin view.

---

## 4. Verify Core Flows

### Public Invitation Page
- [ ] Hero section shows "Rizza @ 60", date, venue, and dress code
- [ ] All three entourage sections display (16 Roses, 16 Blue Bills, 16 Gifts)
- [ ] Page renders without horizontal overflow at 375px viewport width

### RSVP Form
- [ ] Submit without name → inline validation error appears
- [ ] Submit with maxGuests = 0 → inline validation error appears
- [ ] Submit valid form → SweetAlert2 success modal appears
- [ ] Form is disabled/locked after successful submission
- [ ] Check backend logs / MongoDB Atlas → new document present in `rsvps` collection

### Admin Dashboard
- [ ] Navigate to `/admin-dashboard` without PIN → redirected to `/`
- [ ] Enter correct PIN → dashboard loads
- [ ] RSVP table shows all submitted records with name, status, party size
- [ ] Total headcount reflects sum of all `maxGuests` values

---

## 5. Deploy to Production

### Backend (Render)

1. Create a new **Web Service** on Render, connect the GitHub repo.
2. Set **Root Directory** to `backend`.
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node src/index.js`
5. Add environment variables:
   - `MONGO_URI` — MongoDB Atlas connection string
   - `ALLOWED_ORIGIN` — your Vercel production URL (added after frontend deploy)
   - `PORT` — leave unset (Render assigns automatically)

### Frontend (Vercel)

1. Import the GitHub repo into Vercel.
2. Set **Framework Preset**: `Vite`.
3. Set **Root Directory**: `frontend`.
4. Add environment variables:
   - `VITE_API_URL` — your Render service URL (e.g., `https://rizza-60-api.onrender.com`)
   - `VITE_ADMIN_PIN` — your chosen admin passphrase
5. Deploy. Vercel auto-handles the SPA rewrite via `vercel.json`.

---

## 6. Production Checklist

- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0` (allow all) for Render compatibility
- [ ] `ALLOWED_ORIGIN` on Render set to exact Vercel production URL (no trailing slash)
- [ ] `VITE_ADMIN_PIN` is a strong, non-obvious passphrase
- [ ] Test RSVP submission end-to-end on production URL
- [ ] Test admin dashboard on mobile (≤ 480px) and desktop (≥ 1280px)
- [ ] Verify no console errors in production build
