# Chargeback Manager

A single-page app for tracking credit card chargeback disputes through their
lifecycle — from initial inquiry to arbitration — with evidence uploads,
deadline tracking, and a full audit timeline.

Built as a frontend portfolio project: React + TypeScript on Vite, styled
with Tailwind, state managed with Zustand and persisted to `localStorage`.

## Features

- **Case dashboard** — search, filter by stage/status, at-a-glance stats
  (total/won/lost/win rate), and a deadline countdown that turns yellow/red
  as a case approaches its response window.
- **Case lifecycle** — move a case through `inquiry → chargeback →
  pre-arbitration → arbitration`, with status tracking (`open`, `pending`,
  `won`, `lost`).
- **Evidence** — drag-and-drop upload, a lightbox viewer with next/prev
  navigation, image/PDF preview, and download.
- **Timeline** — every field change, stage/status update, evidence upload,
  and manual note is recorded as a timestamped, diff-based audit event.
- **Persistence** — cases survive a page reload (backed by `localStorage`
  via Zustand's `persist` middleware); no backend required to try it out.
- **Responsive** — a collapsible mobile nav and a scrollable table keep the
  dashboard usable down to phone width.

## Tech stack

| Layer      | Choice                                   |
|------------|-------------------------------------------|
| Framework  | React 19 + TypeScript, built with Vite    |
| Routing    | React Router v7                           |
| State      | Zustand (with `persist` middleware)       |
| Styling    | Tailwind CSS v4                           |
| Testing    | Vitest + React Testing Library            |
| Tooling    | ESLint, `typescript-eslint`               |

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

Other scripts:

```bash
npm run build       # type-check + production build
npm run lint        # ESLint
npm run preview     # preview the production build locally
npm run test        # run the test suite once
npm run test:watch  # run tests in watch mode
```

## Project structure

```
src/
  components/   # Reusable UI pieces (badges, selectors, evidence, timeline, modals)
  layouts/      # App shell (MainLayout)
  pages/        # Route-level views: Dashboard, NewCase, CaseDetail, EditCase
  store/        # Zustand store (useCases) — single source of truth for case data
  types/        # Shared domain types (CaseItem, CaseStage, CaseStatus, ...)
  utils/        # Pure helpers (e.g. form validation), unit-tested in isolation
  test/         # Vitest setup (jest-dom matchers)
```

`*.test.ts` / `*.test.tsx` files sit next to the code they cover rather than
in a separate `__tests__` tree.

## Known limitations

This is a frontend-only demo — there is intentionally no backend yet:

- Data lives in the browser's `localStorage`, scoped to one device/browser.
- Evidence files are stored as base64 data URLs in that same store, so very
  large files or many uploads can approach browser storage limits.
- There's no multi-user support, auth, or server-side validation.

These are the natural next steps if this grows past a portfolio piece: a
real database, file storage for evidence, and an API layer behind the
existing UI (the Zustand store's interface was kept deliberately close to
what a REST/RPC client would look like, to make that swap easier later).

## License

MIT
