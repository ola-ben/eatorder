# EatOrder

Full-stack food delivery web app for Ibadan, Nigeria. Browse 15+ local restaurants, save favourites, place real orders that persist to Postgres, and manage everything through a role-gated admin panel.

Built end-to-end as a portfolio project — React + Vite frontend, Express backend, Supabase Auth + Postgres, deployed across Vercel and Render.

> 🌐 **Live frontend** → [eatorder-green.vercel.app](https://eatorder-green.vercel.app)
> 🛠️ **Live API** → [eatorder-backend-fxgc.onrender.com/api/health](https://eatorder-backend-fxgc.onrender.com/api/health)

---

## Quick demo

1. Open the [live site](https://eatorder-green.vercel.app)
2. Sign up (real email, ~30s confirmation)
3. Pick a restaurant → add items → checkout → place an order
4. Visit `/orders` — your order is persisted to Supabase and visible across devices
5. (As an admin) visit `/admin/orders` — see *all* customers' orders, change statuses, watch them update on the customer side too

> Note: the Render free tier sleeps after 15 min of idle. First admin request after a quiet period takes ~30 s while the backend wakes up. Subsequent requests are instant.

---

## Features

### Customer-facing
- Restaurant browser with search, filters, and sort (rating, delivery time, distance)
- Restaurant menus with category tabs (Main Dishes, Proteins, Extras & Drinks)
- Cart with quantity controls (max 10/item) — persisted across sessions
- Favourite restaurants with a dedicated `/favourites` page (heart icon, animated toggle)
- Checkout with pickup or delivery, free delivery over ₦7,000
- Real order placement — writes to Postgres via Supabase, RLS-enforced
- Order history with live status (Pending / Processing / Delivered / Cancelled)
- Reorder button that re-adds items to the cart
- Profile, addresses, referrals, FAQs, wallet preview
- "Benjamin's Assistant" — query-based FAQ chatbot with 40+ knowledge entries, animated UI, sound notification
- Fully responsive — mobile bottom-nav, desktop top-nav with `lg:` breakpoints
- Page transitions, framer-animated toast system, micro-interactions throughout

### Admin panel (`/admin`, role-gated)
- Dashboard — live stats: orders, revenue, users, restaurants
- Orders — table with inline status updates that hit a real PATCH endpoint
- Restaurants — open/close toggle (CRUD scaffold ready for Supabase migration)
- Users — list real Supabase auth users, promote/demote admins via the Auth Admin API

### Auth & security
- Supabase email + password authentication
- Forgot-password reset flow
- Persistent sessions across reloads
- Role-based access: `app_metadata.role === "admin"` checked both client-side and server-side
- Row Level Security policies on every Postgres table — users can only read/write their own data; admins use a service-role key on the backend

---

## Architecture (production)

```
                   https://eatorder-green.vercel.app
                            (Vercel — React + Vite)
                                  │
                                  │  fetch + Bearer JWT
        ┌─────────────────────────┴────────────────────────┐
        │                                                  │
        ▼ Customer reads/writes              Admin actions ▼
   Supabase JS client                  https://eatorder-backend-fxgc.onrender.com
   (uses anon publishable key,                  (Render — Express 4)
    RLS enforces per-user access)                       │
        │                                               │
        │                                               │ Supabase JS
        │                                               │ (service-role key,
        │                                               │  bypasses RLS)
        ▼                                               ▼
        ┌──────────────────────────────────────────────────┐
        │                   Supabase                       │
        │   Auth · Postgres (orders, order_items)          │
        │   RLS · Postgres functions (is_admin)            │
        └──────────────────────────────────────────────────┘
```

### Auth + request flow
1. User signs in via Supabase → gets a JWT access token, stored in browser
2. Customer requests (read own orders, place new order) hit Supabase **directly** with anon key — RLS policies decide what they can see
3. Admin requests hit the **Express backend** with `Authorization: Bearer <token>`
4. Backend `authenticate` middleware validates the JWT via `supabase.auth.getUser(token)`
5. `requireAdmin` middleware checks `app_metadata.role === "admin"`
6. Backend uses the service-role client to bypass RLS and read/update across all rows

### Database schema
Two tables with proper foreign-key relations and indexes:

- `orders` — id (text PK, format `ORD-XXXXXXXX`), user_id (FK → auth.users), full_name, phone, email, delivery_method, address, note, total_price, status, created_at
- `order_items` — bigserial PK, order_id FK, name, price, quantity, photo_name, ingredients

Five RLS policies enforce: customers read/insert their own orders, only admins can update statuses, items follow the parent order's permissions. A `public.is_admin()` SECURITY DEFINER function reads the JWT to enable the policy checks.

---

## Tech stack

| Layer | Tech |
|---|---|
| **Frontend** | React 19 · Vite 7 · React Router 7 · Tailwind CSS v4 · Framer Motion · react-hot-toast · Supabase JS client |
| **Backend** | Node 20+ ESM · Express 4 · Supabase JS · helmet · cors · morgan |
| **Database** | Supabase Postgres (with Row Level Security) |
| **Auth** | Supabase Auth (email + password, JWT) |
| **Hosting** | Vercel (frontend) · Render (backend) · Supabase (db + auth) |
| **Typography** | Plus Jakarta Sans · DM Sans |

---

## Project structure

```
eatorder/
├── public/
│   └── icon.svg
├── src/
│   ├── components/             # BottomNav, TopNav, HomeHero, FeaturedRestaurants,
│   │                           # FavoriteHeart, AnimatedToaster, Chatbot, Pizza, ...
│   ├── pages/
│   │   ├── Homepage.jsx · AllRestaurants.jsx · Favourites.jsx
│   │   ├── Cartpage.jsx · Checkoutpage.jsx · Successpage.jsx
│   │   ├── OrdersPage.jsx · Profile* (sub-pages) · Loginformpage.jsx
│   │   └── admin/              # Layout, Dashboard, Orders, Restaurants, Users, RequireAdmin
│   ├── context/                # CartContext, AuthContext, FavoritesContext
│   ├── hooks/useAuth.js
│   ├── lib/
│   │   ├── supabase.js         # browser Supabase client
│   │   ├── ordersApi.js        # createOrder, listMyOrders, countMyOrders
│   │   └── adminApi.js         # backend API client with auto JWT
│   ├── data/chatbot.js         # FAQ knowledge base + matcher
│   └── App.jsx                 # routes + providers + animated toaster + chatbot
├── backend/                    # See backend/README.md for full layout
│   └── src/
│       ├── server.js · app.js
│       ├── config/env.js       # validated env config
│       ├── db/supabase.js      # admin (service-role) + auth (anon) clients
│       ├── middleware/         # auth · requireAdmin · errorHandler
│       ├── routes/             # health · admin/orders · admin/restaurants · admin/users
│       └── controllers/admin/  # ordersController · restaurantsController · usersController
├── docs/awesome-design-md/     # Design references (Apple · Airbnb · Framer · MongoDB)
├── index.html · vite.config.js · package.json
```

---

## Running locally

Requires **Node 20.19+ or 22.12+** and a Supabase project.

### 1. Clone & install

```bash
git clone https://github.com/ola-ben/eatorder.git
cd eatorder
npm install
```

### 2. Frontend env (`/.env`)

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xxx
VITE_API_BASE_URL=http://localhost:4000/api
```

### 3. Backend env (`/backend/.env`)

```bash
cd backend
npm install
cp .env.example .env
```

Then fill in `backend/.env`:

```env
PORT=4000
NODE_ENV=development
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=sb_publishable_xxx
SUPABASE_SERVICE_ROLE_KEY=sb_secret_xxx     # server-only — never expose to browser
```

### 4. Create the database schema

Run the SQL in [`docs/orders-schema.sql`](./docs/orders-schema.sql) (or copy the `orders`/`order_items`/RLS section from this README's history) into Supabase **SQL Editor**.

### 5. Run the dev servers

Two terminals:

```bash
# Terminal 1 — frontend
npm run dev          # → http://localhost:5173

# Terminal 2 — backend
cd backend
npm run dev          # → http://localhost:4000
```

### 6. Make yourself an admin

Run this in Supabase **SQL Editor** with your email:

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
where email = 'you@example.com';
```

Sign out and back in so the JWT picks up the new role. Visit `http://localhost:5173/admin`.

---

## Deployment

- **Frontend** → Vercel
  - Connect the GitHub repo, framework auto-detected as Vite
  - Add `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_BASE_URL` env vars (all 3 environments)
  - Push → auto-deploys
- **Backend** → Render
  - New Web Service → connect GitHub repo
  - Root directory: `backend`, build: `npm install`, start: `npm start`
  - Add the env vars from `backend/.env` — `SUPABASE_SERVICE_ROLE_KEY` is the critical one
  - Free tier sleeps after 15 min idle; ~30 s cold start
- **Auth URLs (Supabase)** — under Authentication → URL Configuration, add the live frontend URL as Site URL and as a Redirect URL

After both are live, update `VITE_API_BASE_URL` on Vercel to point at the Render URL + `/api`, then redeploy.

---

## What's next

- [x] ~~Migrate orders from `localStorage` to Supabase~~ — done, with RLS
- [x] ~~Deploy backend to Render~~ — live
- [ ] Move the 15 hardcoded restaurants to a Supabase `restaurants` table + admin CRUD
- [ ] Realtime order tracking via Supabase Realtime channels
- [ ] Stripe / Paystack payment integration
- [ ] Image uploads for restaurants and dishes (Supabase Storage)
- [ ] Route-level code splitting (current bundle ≈ 550 KB)
- [ ] Backend integration tests (Vitest + supertest)
- [ ] Move Render to a paid tier or Fly.io to eliminate cold starts

---

## Screenshots

> Placeholder section — drop screenshots into [`docs/screenshots/`](./docs/screenshots/) and reference them here.

```
docs/screenshots/
├── home-mobile.png       # /
├── menu-mobile.png       # /restaurant/:id
├── cart-mobile.png       # /cartpage
├── orders.png            # /orders (after placing one)
├── admin-dashboard.png   # /admin
└── admin-orders.png      # /admin/orders
```

---

## Author

**Benjamin Olaoluwa Oladimeji**
✉️ [ajaniservice1@gmail.com](mailto:ajaniservice1@gmail.com) · 🐙 [@ola-ben](https://github.com/ola-ben)

Design references curated from Apple, Airbnb, Framer, and MongoDB via [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md).

Built solo as a full-stack portfolio project — every line, every commit, every deploy.
