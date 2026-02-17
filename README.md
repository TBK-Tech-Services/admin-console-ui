# TBK Tech Services — Admin Dashboard

**Live:** [https://tbkvillasapp.online/login](https://tbkvillasapp.online/login)

A full-featured villa management admin console built with React and TypeScript. It supports three distinct user roles — **Admin**, **Owner**, and **Agent** — each with their own set of views, permissions, and navigation.

---

## Features

### Admin
- **Dashboard** — Real-time stats: total villas, bookings, revenue, and guests. Includes recent bookings, upcoming check-ins, revenue trends, and villa occupancy.
- **Calendar** — Full calendar view of all bookings across villas.
- **New Booking** — Create bookings with villa selection, guest info, date ranges, guest count, custom rates, GST pricing configuration, and a booking summary.
- **Manage Bookings** — View, filter, search, edit, approve, and delete bookings. Export to PDF/CSV. Preview and send vouchers via email or WhatsApp.
- **Villas** — List all villas. Drill into individual villa pages with tabs for overview, bookings, calendar, revenue, and settings.
- **Expenses** — Track and categorize expenses per villa. Add, edit, delete, and export expense reports.
- **Finance Dashboard** — Profit & loss overview, monthly income vs expenses charts, villa performance breakdown, and downloadable financial reports.
- **Settings** — General business settings, user management (invite/edit/delete users), villa owner management (assign/unassign villas), and security settings.

### Owner
- **Owner Dashboard** — Personal stats, villa performance cards, bookings list, and finances summary.
- **Calendar** — Monthly calendar view scoped to the owner's villas.
- **Analytics** — Monthly trends and villa-level performance analytics.

### Agent
- **Agent Landing Page** — Villa availability showcase with a modal for details and a call-to-action for bookings.

### Authentication
- Login, Forgot Password, and Change Password pages.
- Session-based auth using HTTP-only cookies (`withCredentials: true`).
- Automatic redirect to `/login` on 401 responses.
- Role-based route guards (`Admin`, `Owner`, `Agent`).

---

## Tech Stack

| Category | Libraries |
|---|---|
| Framework | React 19, TypeScript |
| Routing | React Router v6 |
| Bundler | Vite |
| Styling | Tailwind CSS, Shadcn UI (Radix UI primitives) |
| State Management | Redux Toolkit, redux-persist |
| Server State | TanStack Query (React Query v5) |
| HTTP Client | Axios |
| Forms & Validation | React Hook Form, Zod |
| Charts | Recharts |
| Animations | Framer Motion |
| Date Utilities | date-fns, react-day-picker |
| Icons | Lucide React |
| Notifications | Sonner |
| Image Uploads | Cloudinary |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A running backend API (defaults to `http://localhost:8000`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TBK-Tech-Services/admin-console-ui.git
   cd "Admin Dashboard/tbk-admin"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** — create a `.env` file in `tbk-admin/`:
   ```env
   VITE_API_URL=http://localhost:8000
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will start at `http://localhost:5173`.

### Other Scripts

```bash
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

---

## Folder Structure

```
tbk-admin/src/
├── App.tsx                  # Route definitions for all roles
├── main.tsx                 # App entry point
├── components/
│   ├── common/              # Shared layout, routing guards, loaders, navigation
│   ├── ui/                  # Shadcn UI primitives
│   ├── dashboard/           # Dashboard-specific components
│   ├── booking/             # All booking form and list components
│   ├── villa/               # Villa card, tabs, and detail components
│   ├── expense/             # Expense table, modals, and filters
│   ├── finance/             # Finance charts and metrics
│   ├── settings/            # General, user, and villa owner settings
│   ├── owner/               # Owner dashboard, calendar, and analytics
│   ├── agent/               # Agent landing page components
│   ├── calendar/            # Admin calendar components
│   ├── home/                # Home page widgets
│   └── auth/                # Auth form components
├── page/                    # Top-level page components (one per route)
├── store/
│   ├── store.ts             # Redux store setup
│   ├── persist.ts           # redux-persist config (auth, villas, bookings, amenities, expenses)
│   └── slices/              # authSlice, villasSlice, bookingsSlice, amenitiesSlice, expensesSlice
├── services/                # Axios-based API modules per domain
│   ├── api.service.ts       # Base Axios instance with interceptors
│   ├── auth.service.ts
│   ├── booking.service.ts
│   ├── villa.service.ts
│   ├── expense.service.ts
│   ├── finance.service.ts
│   ├── dashboard.service.ts
│   ├── ownerDashboard.service.ts
│   ├── ownerCalendar.service.ts
│   ├── ownerAnalytics.service.ts
│   ├── agent.service.ts
│   ├── reports.service.ts
│   ├── generalSettings.service.ts
│   ├── userManagementSettings.service.ts
│   └── villaOwnerManagementSettings.service.ts
├── hooks/                   # Custom React hooks (per domain + global)
├── types/                   # TypeScript type definitions
├── utils/                   # Helper functions (date formatting, GST calc, PDF export, etc.)
├── config/
│   └── cloudinary.config.ts # Cloudinary upload configuration
└── lib/                     # Shared library utilities (cn helper, etc.)
```

---

## Route Map

| Role | Path | Page |
|---|---|---|
| Public | `/login` | Login |
| Public | `/forgot-password` | Forgot Password |
| Public | `/change-password` | Change Password |
| Admin | `/` | Dashboard |
| Admin | `/calendar` | Calendar |
| Admin | `/booking` | New Booking |
| Admin | `/bookings` | Manage Bookings |
| Admin | `/villas` | Villa List |
| Admin | `/villas/:id` | Villa Detail |
| Admin | `/expenses` | Manage Expenses |
| Admin | `/finance` | Finance Dashboard |
| Admin | `/settings` | Settings |
| Owner | `/owner-dashboard` | Owner Dashboard |
| Owner | `/owner/calendar` | Owner Calendar |
| Owner | `/owner/analytics` | Owner Analytics |
| Agent | `/agent` | Agent Landing |
| Any | `/home` | Role-based redirect |
| Any | `/unauthorized` | Unauthorized |
| Any | `*` | 404 Not Found |

---

## API Integration

All API calls go through `src/services/api.service.ts`, which wraps Axios with:
- Base URL from `VITE_API_URL` (fallback: `http://localhost:8000`)
- Cookie-based session auth (`withCredentials: true`)
- Automatic toast notifications for success/error responses
- Auto-redirect to `/login` on `401 Unauthorized`
- Centralized error handling for `403` and `5xx` responses

Ensure the backend server is running and accessible before starting the frontend.
