# EatOrder Backend

Express API for the EatOrder admin panel and any custom server-side logic.
Auth uses Supabase JWTs sent from the frontend; admin queries use the Supabase
service-role key (server-only).

## Stack

- Node 20+
- Express 4
- Supabase JS client (auth verification + admin DB access)
- helmet, cors, morgan

## Folder structure

```
backend/
├── src/
│   ├── server.js              # entry — boots the HTTP listener
│   ├── app.js                 # Express app: middleware + routes
│   ├── config/
│   │   └── env.js             # validated env config
│   ├── db/
│   │   └── supabase.js        # admin + auth Supabase clients
│   ├── middleware/
│   │   ├── auth.js            # verifies Bearer JWT → req.user
│   │   ├── requireAdmin.js    # gates routes to admins only
│   │   └── errorHandler.js    # 404 + central error handler
│   ├── routes/
│   │   ├── index.js           # mounts all route groups
│   │   ├── health.js          # GET /api/health
│   │   └── admin/
│   │       ├── orders.js      # /api/admin/orders
│   │       ├── restaurants.js # /api/admin/restaurants
│   │       └── users.js       # /api/admin/users
│   ├── controllers/
│   │   └── admin/             # business logic per route
│   └── utils/
│       └── asyncHandler.js    # async route wrapper
├── package.json
├── .env.example
└── README.md
```

## Setup

```bash
cd backend
npm install
cp .env.example .env
# Open .env and fill in:
#   SUPABASE_URL                 (same as the frontend)
#   SUPABASE_ANON_KEY            (publishable key)
#   SUPABASE_SERVICE_ROLE_KEY    (secret key — keep it server-only)
#   CORS_ORIGINS                 (your frontend origins, comma separated)
```

## Run

```bash
npm run dev      # nodemon, restarts on change
npm start        # plain node, for production
```

The server listens on `http://localhost:4000` by default.

## Endpoints

| Method | Path                           | Auth        | Notes                          |
|--------|--------------------------------|-------------|--------------------------------|
| GET    | `/api/health`                  | public      | uptime + status                |
| GET    | `/api/me`                      | user        | returns id, email, role        |
| GET    | `/api/admin/orders`            | admin       | list orders (mock data)        |
| GET    | `/api/admin/orders/:id`        | admin       | order detail                   |
| PATCH  | `/api/admin/orders/:id/status` | admin       | body: `{ "status": "..." }`    |
| GET    | `/api/admin/restaurants`       | admin       | list restaurants               |
| PATCH  | `/api/admin/restaurants/:id/open` | admin    | toggle open/closed             |
| GET    | `/api/admin/users`             | admin       | list Supabase auth users       |
| PATCH  | `/api/admin/users/:id/role`    | admin       | body: `{ "role": "admin" }`    |

## Promoting a user to admin

Two options.

**A) From this API** (once you already have one admin):
```
PATCH /api/admin/users/<USER_ID>/role
Authorization: Bearer <admin user's JWT>
Body: { "role": "admin" }
```

**B) Bootstrap your first admin via Supabase dashboard:**
- Authentication → Users → click your user → **Raw User Meta Data**
- Edit it to `{ "role": "admin" }` → Save
- Sign out and back in on the frontend so the JWT picks up the new metadata

## How auth flows

1. Frontend signs in via Supabase → gets an access token (JWT)
2. Frontend calls this API with `Authorization: Bearer <token>`
3. `authenticate` middleware calls `supabase.auth.getUser(token)` to validate
4. `requireAdmin` middleware checks `user.app_metadata.role === 'admin'`
5. Service-role client (`supabaseAdmin`) executes the query, bypassing RLS

## Replacing mock data

The orders/restaurants controllers return hard-coded arrays. To go live:

1. Create the tables in Supabase (SQL editor)
2. Add Row Level Security policies appropriate for each table
3. In the controller, replace the mock array with:
   ```js
   const { data, error } = await supabaseAdmin.from("orders").select("*");
   if (error) throw error;
   res.json({ orders: data });
   ```

## Deploying

This Express server can deploy to Render, Railway, Fly.io, or as a Vercel
Serverless Function (with minor tweaks). For Render:

1. Connect the repo, set root dir to `backend/`
2. Build command: `npm install`
3. Start command: `npm start`
4. Add the same env vars from `.env`
5. After deploy, add the new origin to your frontend's API client base URL
