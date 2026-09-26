# Residex — Society Operations & Maintenance Platform

A multi-tenant MERN platform for housing societies and gated communities in Pakistan to manage resident-reported maintenance issues with real accountability — replacing WhatsApp groups, phone calls, and spreadsheets with a trackable, role-based workflow.

## Why

Housing societies typically handle complaints and maintenance requests through fragmented, informal channels with no accountability, no audit trail, and no way to verify work actually got done. Residex centralizes this into a structured system: residents report issues, admins assign staff, staff resolve with photo proof, and residents confirm before anything is marked closed.

## Status

🚧 **Active development — MVP backend in progress.**

This is a self-driven learning project, built to gain hands-on production-level MERN experience beyond coursework. Frontend is starting now; core backend is functional and tested.

## Features implemented so far

- **Authentication & Authorization**
  - Secure registration/login with bcrypt password hashing
  - JWT-based sessions via httpOnly cookies (XSS-resistant, not localStorage)
  - Role-based access control (Resident / Staff / Admin) via custom middleware
- **Multi-tenant architecture**
  - Every resource scoped by `societyId`, enforced at the query level — one society's data is never reachable by another
- **Issue lifecycle management**
  - Full CRUD with per-role visibility (residents see only their own reports; staff/admin see all issues in their society)
  - Status workflow enforced as a real state machine: `New → Assigned → InProgress → Resolved → Closed`, with each transition locked to a specific role and, where relevant, to the specific staff member or resident involved — no arbitrary status jumps
- **Admin-managed staff accounts**
  - Admins can provision staff accounts scoped to their own society (self-registration is resident-only, by design)

## Tech stack

**Backend:** Node.js, Express, MongoDB, Mongoose
**Frontend:** React (Vite), React Router *(in progress)*
**Auth:** JWT, bcrypt, httpOnly cookies
**Database hosting:** MongoDB Atlas

## Architecture

Clean monolithic MERN structure (no premature microservices), layered as:

```
routes → controllers → services → models
```

- **Routes** define endpoints and attach middleware (`protect`, `authorize`)
- **Controllers** handle HTTP concerns only — parsing requests, formatting responses
- **Services** contain all business logic and database access — reusable outside the HTTP layer
- **Models** define Mongoose schemas, validation, and (for User) password-hashing hooks

This separation keeps business logic testable and independent of Express.

## Getting started

### Prerequisites
- Node.js (v18+)
- A MongoDB Atlas account (or local MongoDB instance)

### Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/residex.git
cd residex

# Backend
cd server
npm install
# create a .env file — see below
npm run dev

# Frontend (in a separate terminal)
cd client
npm install
npm run dev
```

### Environment variables (`server/.env`)

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret
NODE_ENV=development
```

## API overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register as a resident |
| POST | `/api/auth/login` | Public | Log in, receive httpOnly session cookie |
| GET | `/api/auth/me` | Authenticated | Get current logged-in user |
| POST | `/api/issues` | Authenticated | Report a new issue |
| GET | `/api/issues` | Authenticated | List issues (scoped by role) |
| GET | `/api/issues/:id` | Authenticated | Get a single issue |
| PATCH | `/api/issues/:id/status` | Authenticated | Advance an issue to its next valid status |
| POST | `/api/users` | Admin only | Create a staff account for the admin's society |

## Roadmap

- [ ] Assignment endpoint (admin selects staff for an issue)
- [ ] Proof-of-work uploads (before/after photos via Cloudinary)
- [ ] Frontend: auth flow, issue reporting, role-based dashboards
- [ ] Admin dashboard analytics
- [ ] Deployment (Vercel + Render + MongoDB Atlas)

## Author

** Muhammad Ahsan** — Software Engineering Student, University of Central Punjab
linkedin.com/muhmadahsan · ahsanshakeel034@gmail.com