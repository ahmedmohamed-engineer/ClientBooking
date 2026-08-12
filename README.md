# ClientBooking — Hotel Booking UI (React)

> **This is a frontend/UI demonstration project using static mock data.**
> Build with Vite + React 19 + React Router 7 + Tailwind CSS 4. There is **no connected backend**, no database, and no payment integration. All rooms, bookings, and dashboard numbers are hardcoded fixtures.

## Purpose

A responsive hotel-booking user interface that demonstrates modern React and Tailwind patterns: a landing page, a searchable hotel list with filters, a room detail view with an inline booking form, a "My Bookings" table, and a hotel management dashboard layout. Authentication UI is delegated to **Clerk** (a hosted identity service) — the app itself stores no user or booking data.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Build tool | Vite 7 |
| UI | React 19 |
| Routing | React Router 7 (`react-router`, `react-router-dom`) |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Icons | `react-icons` |
| Auth UI | `@clerk/clerk-react` (hosted sign-in / user button) |
| Language | JavaScript (JSX) |

## Authentication (Clerk)

⚠️ **Correction to an earlier audit:** `@clerk/clerk-react` is **used** in this project — it is not an unused dependency.

- `src/main.jsx` wraps the app in `ClerkProvider`. It reads the publishable key from the `VITE_CLERK_PUBLISHABLE_KEY` environment variable and **throws at load time if that variable is missing**.
- `src/components/Navbar.jsx` uses `useClerk().openSignIn()` for the login button, `useUser()` to detect login state, and `UserButton` for the authenticated user menu (including a "My Booking" shortcut). A "Dashboard" link is only shown for signed-in users.
- `src/components/dashboardF/Navbaar.jsx` renders Clerk's `UserButton` inside the dashboard header.

This is a **client-side integration only**: authentication is handled by Clerk's hosted service, and signing in/out does not connect to any application backend, database, or store.

## Pages & Routing

Routes are defined in `src/App.jsx`:

| Route | Page | Content |
|-------|------|---------|
| `/` | Home | Landing page: `Hero`, `HotelCard`, `Offers`, `Testimonials` |
| `/hotels` | AllHotels | Room cards with filters (room type, price range, minimum rating) + mobile filter toggle |
| `/room/:id` | RoomDetails | Room details, check-in/check-out date inputs, nights & total price calculation, embedded map |
| `/My-Booking` | MyBooking | Table of bookings (hardcoded rows with status badges) |
| `/dashboard` | Dashboard layout | Admin dashboard shell (`Navbaar` + `SideNavbar` + `Outlet`) |
| `/dashboard/addhotel` | AddHotel | "Add hotel" form UI (image upload + fields, no submission/persistence) |
| `/dashboard/hotellist` | HotelList | Static list of hotel rooms (hardcoded data) |

The navbar is hidden on dashboard pages (checked via `useLocation().pathname.includes('/dashboard')` in `App.jsx`).

## UI Features

- **Responsive navbar** — transparent-over-hero styling, scroll-blur transition, mobile slide-in menu
- **Clerk auth UI** — login button, user menu, "Dashboard" shortcut for signed-in users
- **Home sections** — hero banner, hotel cards, offers, testimonials
- **Hotel browsing** — cards with price/rating/location; filter sidebar by room type, price band, and minimum rating (client-side filtering over static data)
- **Room details** — image, price, rating, availability, amenities, date-range booking form with live price calculation, embedded Google Maps iframe
- **My bookings** — static table with confirmed/pending status badges
- **Dashboard** — sidebar layout with a "Total Bookings / Total Revenue" overview card (hardcoded), hotel add/list views (static)

## Mock Data Architecture

All displayed data is static and lives in the source:

- `src/allRooms.js` — 4 hardcoded rooms (`name`, `location`, `perNight`, `rating`, `image`, `isAvailable`, `roomType`, `createdAt`, `updatedAt`, `booking` dates, `amenities`). Room and detail pages read from this module.
- `src/pages/MyBooking.jsx` — a hardcoded array of 2 bookings with a `status` field.
- `src/pages/dashboardHotel/Dashboard.jsx` — hardcoded `totalBooking: '7'` and `totalRevenue: '1500'` (display values only).
- `src/pages/dashboardHotel/HotelList.jsx` — its own hardcoded rooms array.
- Images are committed under `src/assets/` and imported directly.

No fetch calls, no state library, no persistence: nothing is saved, updated, or sent anywhere.

## Installation

Requires Node.js and npm.

```bash
npm install
```

The app expects a Clerk environment variable. Create a `.env` file in the project root:

```bash
# .env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
```

`main.jsx` throws `Add your Clerk Publishable Key to the .env file` if the variable is missing. Get a free key from the Clerk dashboard. Note: your `.env` file must **not** be committed to git (`.env` is listed in the existing `.gitignore`), and there is currently **no `.env.example`** committed in the repository for reference.

## Development

```bash
npm run dev      # Vite dev server (default http://localhost:5173)
npm run preview  # preview of a production build
npm run lint     # ESLint (flat config)
```

## Build Status (as of this documentation)

`npm run build` currently **fails**:

```
error during build:
Could not resolve "./pages/dashboardHotel/dashboard" from "src/App.jsx"
```

`src/App.jsx` imports `./pages/dashboardHotel/dashboard` but the file on disk is `Dashboard.jsx`. On case-sensitive filesystems (Linux, most CI and production hosts) the import cannot be resolved and the production build fails. The dev server starts, but the dashboard route module fails to load for the same reason. **The fix is to change the import in `src/App.jsx` to `./pages/dashboardHotel/Dashboard`** — this documentation task intentionally did not modify application source. ("Hotel Hunt" is the app title in `index.html`.)

## Scripts

| Script | Purpose |
|--------|---------|
| `dev` | Start the Vite dev server |
| `build` | Production build (⚠️ currently fails, see above) |
| `lint` | ESLint |
| `preview` | Preview the production build |

## Limitations

- **Mock/static data only** — bookings, room availability, and dashboard statistics are hardcoded; nothing persists.
- **No connected backend** — no API calls, no database, no payment processing.
- **No app-specific accounts** — authentication is delegated to Clerk for sign-in UI; there is no app backend that issues roles, stores users, or authorizes booking actions.
- **No automated tests.**
- **Not deployed** — no live demo available.
- **Production build is currently broken** (import case mismatch) — see Build Status above.
- Some files carry large blocks of commented-out code from earlier iterations (e.g. `AllHotels.jsx`, `RoomDetails.jsx`, `AddHotel.jsx`) — cosmetic debt; the active implementations are at the bottom of those files.
- Navbar navigation links are plain `<a>` tags (full page reloads) rather than router `Link`s in places.

## Future Backend Integration Possibilities

This UI was designed to be connected to a backend later. Natural next steps:

- Implement a REST API (e.g. Node/Express + PostgreSQL) for hotels, rooms, and bookings, and replace `allRooms.js` with fetched data.
- Persist bookings per authenticated Clerk user (Clerk provides `userId` via `useUser()`).
- Drive the dashboard statistics from real aggregate queries instead of hardcoded numbers.
- Add form submission to `AddHotel` and wire `HotelList` to the same data source.
- Fix the `dashboard` import case and enable a clean production build.