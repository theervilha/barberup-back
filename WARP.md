# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

TypeScript/Node backend for BarberUp, using Express 5, Prisma (PostgreSQL), Jest, ESLint, and Prettier. The app exposes a REST API under `/api`, with domain modules for `auth`, `shop`, `service`, and `appointment`.

## Common Commands

All commands are run from the project root (`back`).

### Install dependencies

- `npm install`

### Development server

- Start dev server with hot reload (ts-node + nodemon):
  - `npm run dev`
- Default port is `3001` (configurable via `PORT` in `.env`).

### Build

- Type-check and compile TypeScript to `dist/`:
  - `npm run build`
- `prebuild` automatically runs lint before build.

### Run compiled server

- Build then run compiled Express server from `dist/index.js`:
  - `npm start`

### Linting & formatting

- Lint all `.ts` files with ESLint:
  - `npm run lint`
- Lint and auto-fix:
  - `npm run lint:fix`
- Format with Prettier:
  - `npm run format`

### Tests

Jest is configured via `jest.config.js` and uses `ts-jest`.

- Run full test suite with coverage:
  - `npm test`

To run a **single test file**, use Jest's `--runTestsByPath` flag, for example:

- `npx jest --runTestsByPath src/modules/service/service.test.ts`
- `npx jest --runTestsByPath src/modules/appointment/service.test.ts`
- `npx jest --runTestsByPath src/modules/shop/service.test.ts`

You can also filter tests by name using `-t`:

- `npx jest src/modules/service/service.test.ts -t "create service"`

### Database (Prisma + PostgreSQL)

The Prisma schema lives in `prisma/schema.prisma` and expects `DATABASE_URL` in `.env`.

- Generate Prisma client:
  - `npm run db:generate`
- Push schema changes to the database (non-destructive where possible):
  - `npm run db:push`
- Create and apply a new migration in dev:
  - `npm run db:migrate`
- Apply pending migrations in non-dev environments:
  - `npm run db:migrate:deploy`
- Open Prisma Studio (DB browser):
  - `npm run db:studio`

## High-level Architecture

### Entry point and server setup

- `src/index.ts`
  - Loads environment variables via `dotenv`.
  - Resolves `PORT` and starts the Express server.
- `src/app.ts`
  - Creates the Express app.
  - Applies `express.json()`.
  - Mounts the main router at `/api`.

### Routing layer

- `src/routes/index.ts`
  - Central router for the API, mounted at `/api`.
  - Aggregates domain routes:
    - `/api/auth` → `src/modules/auth/routes.ts`
    - `/api/appointments` → `src/modules/appointment/routes.ts`
    - `/api/shop` → `src/modules/shop/routes.ts`
    - `/api/service` → `src/modules/service/routes.ts`
  - Exposes a simple health/hello endpoint at `/api`.

### Domain modules

Each domain under `src/modules` follows a consistent pattern:

- `src/modules/<domain>/controller.ts`
  - Express-facing layer: translates HTTP requests/responses to service calls.
- `src/modules/<domain>/service.ts`
  - Business logic and orchestration.
  - Uses repositories for persistence and other services for cross-domain logic.
- `src/modules/<domain>/repository.ts`
  - Data access layer, typically wrapping Prisma operations.
- `src/modules/<domain>/routes.ts`
  - Express router that wires HTTP routes to controller methods.
- `src/modules/<domain>/validators/*.schema.ts`
  - Zod schemas for request validation and typed input models.
- `src/modules/<domain>/*.test.ts`
  - Jest unit tests focused on the service layer, using mocked repositories and collaborators.

Domains currently present:

- `auth` — authentication-related flows (see controller/service for details).
- `shop` — barbershop entity, working hours, and related behavior.
- `service` — services offered by shops (duration, price, etc.).
- `appointment` — booking logic across shops and services.

### Dependency injection

- `src/di/container.ts`
  - Manual composition root for domain services and repositories.
  - Instantiates repositories (`AppointmentRepository`, `ServiceRepository`, `ShopRepository`).
  - Instantiates services (`AppointmentService`, `ServicesService`, `ShopService`) with their dependencies injected.
  - Exports ready-to-use service instances for controllers or other entry points.

When adding new modules, prefer following this pattern and wiring them through the DI container if they have cross-domain dependencies.

### Database access

- `src/config/database.ts`
  - Exposes a shared `prisma` client instance.
  - Extends Prisma with `@prisma/extension-accelerate` for performance.
- `prisma/schema.prisma`
  - Defines models: `Shop`, `Service`, `Appointment`, `WorkingHour`, and `User`.
  - Uses PostgreSQL via `DATABASE_URL`.

Repositories should import the shared `prisma` instance instead of creating their own clients.

### Utilities

- `src/utils/time.ts`
  - Time helpers for converting `Date` objects to minutes (local and UTC), used by scheduling logic (e.g., shop working hours and appointment validations).

## Notes for future Warp agents

- Prefer extending the existing module/repository/service/controller structure instead of introducing ad-hoc patterns.
- When adding new endpoints, route them through `src/routes/index.ts` and a dedicated module under `src/modules`.
- Keep database changes in sync with `prisma/schema.prisma` and the migration commands above.
