# OLADIMEJI BENJAMIN OLAOLUWA

No 23 Rose Wale, Iwo Road, Ibadan, Oyo State, Nigeria
+234 706 302 6374 · benjaminsolaben@gmail.com
[github.com/ola-ben](https://github.com/ola-ben)

---

## CAREER PROFILE

Junior Full-Stack Developer with hands-on experience designing, building, and deploying production web applications across the entire stack. Currently building **Ajani** — a full-stack hotels, shortlets and event-halls booking platform for Oyo State, with a React + Vite frontend, an Express 5 REST API, MongoDB, JWT-based RBAC, Cloudinary image storage, and Supabase auth — alongside **EatOrder**, a live food delivery + reservations platform on Vercel + Render with Supabase Postgres and Row Level Security. Comfortable with React 18/19, Tailwind v4, Framer Motion, React Query, REST API design, JWT auth, role-based access control, and modern deploy pipelines. Passionate about clean architecture, accessible UX, performance, and solving real-world problems with code.

---

## WORK EXPERIENCE

### Junior Full-Stack Developer

**K3Bot / AjaniAI** — Ibadan, Oyo State, Nigeria · [ajani.ai](https://ajani.ai)
_October 2025 – Present_

- Sole developer on the Ajani platform — own frontend, backend, database, and deploy pipeline end-to-end, reporting directly to the founder.
- Translate product direction into shipped features on a weekly cadence: scope tickets, build, test, deploy, and iterate from daily reviews.
- Architect and ship the React + Vite frontend, Express 5 / MongoDB REST API, JWT-based RBAC, and Cloudinary asset pipeline.
- Build and maintain the three audience surfaces — buyer search & booking flow, vendor portal (listings, availability, payouts, accept/reject), and admin moderation panel.
- Run DevOps for the project: Vercel + Render deploys, env-var management, Resend transactional email, PDFKit receipts, and analytics instrumentation.

### Front-End Engineer | MIS Specialist (Intern)

**State Operations Coordinating Unit (SOCU)** — Oyo State Government Secretariat, Ibadan
_January 2025 – December 2025_

- Support the National Social Safety Nets Project (NASSP) by managing data systems that track poor and vulnerable households across rural communities in Oyo State.
- Design and develop front-end web interfaces using HTML, CSS, JavaScript, and React.js to visualize data collected from field operations.
- Maintain and update the Social Register Database, ensuring data integrity, security, and timely reporting.
- Create dashboards and tools for internal stakeholders to access program data and monitor poverty-alleviation interventions.
- Collaborate with data enumerators, M&E teams, and program officers to streamline data collection, validation, and reporting processes.
- Provide technical support for MIS infrastructure and help automate report generation for improved decision-making.

---

## PROJECTS

### Ajani — Full-stack hotels, shortlets & event-halls booking platform for Oyo State

**[ajani.ai](https://ajani.ai)**
_React 18 · Vite · Tailwind v4 · Framer Motion · React Query · React Router 7 · Express 5 · MongoDB / Mongoose · Supabase Auth · Cloudinary · Resend · JWT_

- Architected and built an end-to-end booking marketplace covering customer search, vendor onboarding, admin moderation, payment, reviews, and AI-assisted price intelligence — three audiences (buyers, vendors, admins) on one codebase.
- Designed a layered **Express 5 REST API** (`routes → middlewares → controllers → services → models`) with JWT auth, role-based access control, helmet, CORS allow-listing, express-rate-limit, hpp, mongo sanitization, and centralized error handling.
- Modeled domain entities (`User`, `Listing`, `Booking`, `Review`, `Payment`, corporate accounts) in MongoDB via Mongoose; integrated **Cloudinary** for image uploads with multer and **Resend / nodemailer** for transactional email + PDF receipts via `pdfkit`.
- Engineered a **Vite + React 18** frontend with route-level code splitting, **TanStack React Query** caching, **Framer Motion** layout animations (Airbnb-style search popovers with `layoutId` shared-element transitions), and SEO-friendly slugs.
- Built an Airbnb-inspired hero search with portal-rendered Where / When / Who popovers, two-month range calendar, location autocomplete, and a sequential check-in → check-out → guests flow — fully responsive with a separate mobile flow.
- Shipped a **vendor portal** (listing form with AI description generator, availability calendar with touch-drag selection, payouts, discounts, booking accept/reject by email link) and an **admin panel** (dashboard overview, AI controls, automation, booking control, data control, field agents, AI Price Intelligence modal with Facility Insights).
- Implemented **Phase 1 + Phase 2 analytics**: search/click/view/booking event tracking, IntersectionObserver impression batching, multi-step booking funnel — ready for downstream BI.
- Built a `/booking-action` result page so vendors can approve or reject bookings from a one-click email link, with state persistence and friendly success/error UX.
- Cross-cutting concerns: SEO slug gate, sitemap route, accessible category filters, custom 404 pages (admin + global) matching brand colours, Tailwind v4 canonical class compliance.

### EatOrder — Full-stack food delivery + reservations platform

**[eatorder-green.vercel.app](https://eatorder-green.vercel.app)** · [github.com/ola-ben/eatorder](https://github.com/ola-ben/eatorder)
_React · Express · Supabase · PostgreSQL · Vercel · Render_

- Built and deployed an end-to-end food delivery platform with real-time customer ordering, table reservations, role-gated admin panel, and a query-based AI assistant — covering 15+ restaurants in Ibadan.
- Designed Postgres schema (`orders`, `order_items`, `reservations`) with **Row Level Security** policies and an auth-aware `SECURITY DEFINER` function — customers query Supabase directly while admin actions route through an Express service-role API on Render.
- Engineered a **Vite + React 19** frontend with route-level code splitting, **persisted React Query cache** (localStorage, 5-min staleTime), and skeleton loaders — eliminating perceived cold-start latency on Render's free tier.
- Implemented **Framer Motion** micro-interactions, mobile-first responsive design (5-tab bottom nav / desktop top nav), JWT-based RBAC via `app_metadata.role`, and a custom animated toast system using `useToaster()`.
- Wrote a layered Express backend (`routes → middleware → controllers → db`) with helmet, CORS allow-listing, and centralized error handling — deployed via GitHub auto-deploys.

### Omnifood — Responsive marketing landing page

**[omini-food-iota.vercel.app](https://omini-food-iota.vercel.app)**
_React 18 · Vite · Tailwind CSS · React Hooks_

- Refactored a single 800-line static HTML/Tailwind page into a **React 18 + Vite SPA**, splitting each section (Navbar, Hero, HowItWorks, Meals, Testimonials, Gallery, Pricing, Features, CTA, Footer) into its own component for reusability and easier iteration.
- Extracted all copy, meals, testimonials, pricing plans, and footer links into a **centralized `data/site.js` module** so structure and content evolve independently — no more duplicated markup.
- Added a **sticky, scroll-aware Navbar** with mobile hamburger drawer and smooth-scroll anchors, plus a **controlled signup form** with React state and a friendly success state — features the original static page lacked.
- Tightened the visual system: custom Tailwind brand palette, consistent eyebrow + heading pattern via a shared `SectionHeading` primitive, hover-lift meal cards, and a "Best value" pricing ribbon — fully responsive and cross-browser tested.

---

## EDUCATION

**B.Sci Economics** — Ladoke Akintola University of Technology, Ogbomoso, Oyo State, Nigeria
_Dec 2020 – Mar 2024_

**Diploma, Front-End Web Development** — Udemy _(2023)_
**Diploma, Facebook Front-End Web Development** — Coursera _(2024)_

---

## TECHNICAL SKILLS

**Frontend** · React 18 / 19, Vite, Tailwind CSS v4, Framer Motion, React Router 7, TanStack React Query, React Hook Form, Lucide / React Icons, Leaflet, JavaScript (ES6+), HTML5, CSS3
**Backend** · Node.js, Express 4 / 5, REST API design, Mongoose, Multer, Helmet, express-rate-limit, express-validator, hpp, mongo-sanitize
**Database & Auth** · MongoDB, PostgreSQL, Supabase (Auth, Database, Row Level Security), JWT, bcrypt
**Email & PDF** · Resend, Nodemailer, PDFKit
**Cloud & Tooling** · Cloudinary, Vercel, Render, cPanel, Git, GitHub, npm
**AI / Productivity** · Claude (Sonnet, Opus) for pair-programming and code review, Claude Code CLI, DeepSeek, ChatGPT, Cursor — comfortable scoping and shipping features alongside an AI agent
**Practices** · Role-based access control (RBAC), JWT authentication, route-level code splitting, persisted client caching, responsive mobile-first design, accessibility, analytics instrumentation, SEO-friendly slugs

---

## SOFT SKILLS

Communication · Problem Solving · Creativity · Teamwork · Time Management · Attention to Detail · Continuous Learning

---

## PORTFOLIO

GitHub · [github.com/ola-ben](https://github.com/ola-ben)
Live demo · [eatorder-green.vercel.app](https://eatorder-green.vercel.app)

---

## REFERENCES

Available upon request.

---

_Open to junior / mid front-end and full-stack opportunities (remote or Ibadan-based)._
