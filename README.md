# EatOrder

A food delivery web app for Ibadan, Nigeria. Browse 15+ local restaurants, save favourites, place orders, track them in your account, and manage everything through an admin panel.

Built as a full-stack portfolio project — React frontend, Express backend, Supabase auth and database.

> **Live:** [eatorder-green.vercel.app](https://eatorder-green.vercel.app)

---

## Features

**Customer-facing**
- Browse restaurants with search, filters, and sort (by rating, delivery time, distance)
- Restaurant menus with categories (Main Dishes, Proteins, Extras & Drinks)
- Add to cart with quantity controls (max 10/item) — persisted across sessions
- Save favourite restaurants — synced to a dedicated Favourites page
- Checkout flow with pickup or delivery option, free delivery over ₦7,000
- Order history with status tracking (Pending / Processing / Delivered)
- Profile, addresses, referrals, FAQs
- AI-style FAQ chatbot ("Benjamin's Assistant") with 40+ knowledge-base entries
- Fully responsive — mobile bottom-nav, desktop top-nav
- Page transitions, framer-animated toasts, micro-interactions throughout

**Admin panel** (`/admin`, role-gated)
- Dashboard with order/revenue/user/restaurant stats
- Orders table with inline status updates
- Restaurant management (open/close toggle, ratings)
- User management — promote/demote admins via Supabase Auth Admin API

**Auth**
- Supabase email + password authentication
- Forgot-password flow
- Persistent sessions across reloads
- Role-based access control (`app_metadata.role`)

---

## Tech stack

### Frontend ([`/`](./))
- **React 19** + **Vite 7** (JSX, no TypeScript)
- **Tailwind CSS v4** (zero-config, design tokens via `@theme`)
- **React Router 7** with `AnimatePresence` page transitions
- **Framer Motion** for all animations (page transitions, list stagger, micro-interactions)
- **react-hot-toast** with a custom `useToaster()` framer-animated renderer
- **Supabase JS client** for auth
- Plus Jakarta Sans + DM Sans typography

### Backend ([`/backend`](./backend/))
- **Node 20+** ESM, **Express 4**
- **Supabase JS** — anon client for JWT verification, service-role client for admin DB access
- **helmet**, **cors**, **morgan** — security, CORS allowlist, request logging
- Layered structure — `routes → middleware → controllers → db`

### Data
- **Supabase Postgres** — currently auth tables only (orders/restaurants stored client-side as a learning step; migration to Supabase tables is the next milestone)

---

## Architecture

```
┌─────────────────────┐         ┌──────────────────────┐
│  React (Vite)       │         │  Express (Node)      │
│  ─────────────────  │         │  ──────────────────  │
│  • Public routes    │ ──────► │  • /api/health       │
│  • Cart / checkout  │  JWT    │  • /api/me           │
│  • /admin/* (gated) │         │  • /api/admin/*      │
│                     │ ◄────── │    (admin role only) │
└─────────────────────┘  JSON   └──────────────────────┘
        │                                │
        │     Supabase JS (anon)         │  Supabase JS (service-role)
        ▼                                ▼
        ┌──────────────────────────────────┐
        │            Supabase              │
        │  Auth · Postgres · RLS policies  │
        └──────────────────────────────────┘
```

**Auth flow**
1. User signs in via Supabase → gets a JWT access token
2. Frontend includes `Authorization: Bearer <token>` on every API call
3. Backend `authenticate` middleware validates with `supabase.auth.getUser(token)`
4. `requireAdmin` middleware checks `app_metadata.role === "admin"`
5. Service-role client executes the query, bypassing RLS

---

## Project structure

```
eatorder/
├── public/
│   └── icon.svg
├── src/
│   ├── components/         # BottomNav, TopNav, HomeHero, FeaturedRestaurants,
│   │                       # FavoriteHeart, AnimatedToaster, Chatbot, Pizza, ...
│   ├── pages/
│   │   ├── Homepage.jsx
│   │   ├── AllRestaurants.jsx
│   │   ├── Cartpage.jsx
│   │   ├── Checkoutpage.jsx
│   │   ├── Successpage.jsx
│   │   ├── Favourites.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── Profile* (sub-pages)
│   │   ├── Loginformpage.jsx
│   │   └── admin/          # Layout, Dashboard, Orders, Restaurants, Users, RequireAdmin
│   ├── context/            # CartContext, AuthContext, FavoritesContext
│   ├── hooks/useAuth.js
│   ├── lib/
│   │   ├── supabase.js     # client
│   │   └── adminApi.js     # backend API client (auto-attaches JWT)
│   ├── data/chatbot.js     # FAQ knowledge base + matcher
│   └── App.jsx             # routes + providers
├── backend/                # See backend/README.md for details
│   └── src/
│       ├── server.js
│       ├── app.js
│       ├── routes/
│       ├── controllers/
│       ├── middleware/
│       ├── db/supabase.js
│       └── config/env.js
├── docs/awesome-design-md/ # Design system references
├── index.html
├── vite.config.js
└── package.json
```

---

## Running locally

You need **Node 20.19+ or 22.12+** and a Supabase project.

### 1. Clone and install

```bash
git clone <this-repo>
cd eatorder
npm install
```

### 2. Frontend env

Create `.env` in the project root:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-key
VITE_API_BASE_URL=http://localhost:4000/api
```

Copy from [.env.example](./.env.example) for the latest variable list.

### 3. Backend env

```bash
cd backend
npm install
cp .env.example .env
```

Then fill in `backend/.env` (full instructions in [backend/README.md](./backend/README.md)). The backend additionally needs `SUPABASE_SERVICE_ROLE_KEY` — keep this server-side only.

### 4. Run

Two terminals:

```bash
# Terminal 1 — frontend
npm run dev          # → http://localhost:5173

# Terminal 2 — backend
cd backend
npm run dev          # → http://localhost:4000
```

### 5. Make yourself an admin

Run this in Supabase **SQL Editor** with your email:

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
where email = 'you@example.com';
```

Sign out and back in so the JWT picks up the new role, then visit `http://localhost:5173/admin`.

---

## Deployment

- **Frontend** → Vercel. Add the `VITE_*` env vars under Project Settings → Environment Variables, redeploy.
- **Backend** → Render / Railway / Fly. Set root directory to `backend`, build `npm install`, start `npm start`, copy env vars from `backend/.env`.
- After backend deploys, update `VITE_API_BASE_URL` on Vercel to the backend's public URL and redeploy the frontend.

---

## What's next

- Migrate orders from `localStorage` to a Supabase `orders` table with RLS
- Real restaurants table (currently hardcoded)
- Realtime order tracking via Supabase channels
- Stripe / Paystack payment integration
- Image uploads for restaurants and dishes
- Code-splitting (current bundle is ~550 KB)
- Backend integration tests

---

## Author

**Benjamin Olaoluwa Oladimeji**
[ajaniservice1@gmail.com](mailto:ajaniservice1@gmail.com)

Built as a portfolio project — design references curated from Apple, Airbnb, Framer, and MongoDB design systems via [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md).
