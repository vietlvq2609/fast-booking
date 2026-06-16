# GitHub Copilot Instructions - Local Business Booking & CRM SaaS

You are an expert fullstack developer specializing in TypeScript, Enterprise Node.js architectures, and high-performance Web applications. You are assisting in building a Multi-Tenant Booking & CRM Micro-SaaS tailored for the Vietnamese market.

## 1. Project Context & Business Logic
- **Domain:** Booking, Scheduling, and CRM for local businesses (Spa, Nail, Salon, Clinics).
- **Architecture:** Multi-Tenancy (SaaS). Every database table and request must be scoped/isolated by `shopId` or `tenantId`.
- **Target Market:** Vietnam. Standard localization required (Vietnamese language, VietQR payment webhooks, Zalo ZNS notifications, Mobile-first UX).
- **Core Challenges to Prevent:** Double booking (race conditions), timezone mismatches (strictly use UTC/ISO8601 or Asia/Ho_Chi_Minh), and memory leaks in queues.

## 2. Tech Stack & Directory Structure (Turborepo + pnpm)
The project is organized as a Monorepo:
- `apps/api`: NestJS (Backend REST API).
- `apps/admin`: Vite + React + TailwindCSS + Shadcn/ui (Dashboard for shop owners - Desktop focused).
- `apps/booking`: Next.js (App Router) + TailwindCSS + Shadcn/ui (Customer booking app - Mobile first, SSR optimized).
- `packages/database`: Prisma ORM + PostgreSQL client configuration.
- `packages/shared-types`: Shared TypeScript interfaces and Zod validation schemas.

## 3. General Coding Standards & Rules
- **Language:** TypeScript strictly. Avoid `any` at all costs. Use explicit types, interfaces, or Zod schemas.
- **Code Style:** Clean Code, SOLID principles, DRY, and Descriptive naming (e.g., `checkBookingAvailability` instead of `checkSlot`).
- **Imports:** Use absolute paths with aliases (e.g., `@/components/...`, `@/modules/...`). Do not use relative paths like `../../../../`.
- **Async/Await:** Always handle promises safely with proper error-catching mechanisms.

## 4. Backend Guidelines (NestJS & Prisma)
- **Architecture:** Follow NestJS Modular Architecture (Module, Controller, Service). Use Dependency Injection properly.
- **Concurrency Control:** For booking creation, always use **Prisma Transactions** (`prisma.$transaction`) or pessimistic locking mechanisms to avoid double-booking on the exact same `staffId` and `startTime`.
- **Authentication:** JWT-based Guard. Implement Role-Based Access Control (RBAC) with roles: `SUPER_ADMIN`, `SHOP_OWNER`, `SHOP_MANAGER`, `STAFF`.
- **Queues:** Use `BullMQ` (Redis) for heavy or delayed asynchronous tasks (e.g., sending Zalo ZNS reminders, processing payment webhooks). Never process these directly inside the HTTP request lifecycle.

## 5. Frontend Guidelines
### Admin App (Vite + React)
- Focus on heavy-duty data visualization, data tables (using `@tanstack/react-table`), and calendar interactions.
- State management: Use `Zustand` for global state or `React Query` (`@tanstack/react-query`) for server-state synchronization.

### Booking App (Next.js App Router)
- Keep client components minimal. Prefer **Server Components (RSC)** for data fetching to optimize performance and SEO.
- Design must be **Strictly Mobile-First** (optimized for WebViews inside Zalo, Facebook, TikTok).
- Form validation: Use `react-hook-form` integrated with `zod`.

## 6. Integrations & Market Specifics
- **Payments:** VietQR dynamic generation. Handle webhooks from PayOS/SePay securely. Ensure idempotency via a unique invoice/appointment ID check before updating `paymentStatus`.
- **Timezone:** Keep in mind that customers and shops operate in **GMT+7**. Handle all conversions properly when querying database DateTime ranges.

## 7. Testing Guidelines (Jest)
- **Framework:** Use `jest` (and `ts-jest` for TypeScript compilation) as the primary testing framework across the workspace.
- **File Naming Conventions:**
  - Unit tests: `*.spec.ts` or `*.spec.tsx` placed adjacent to the file being tested.
  - Integration/E2E tests: `*.e2e-spec.ts` inside a dedicated `test/` directory.
- **Isolation & Mocking:**
  - **Database:** Never hit the real PostgreSQL database during unit tests. Always mock the `PrismaClient`. Use `jest-mock-extended` to create deep mocks of the Prisma service.
  - **External Dependencies:** External services (PayOS, Zalo API, BullMQ/Redis) must be strictly mocked or stubbed. Test the logic handles both success and failure HTTP/Network statuses.
- **State Cleanliness:** Ensure tests are completely isolated and stateless. Always clear or reset mocks in `beforeEach()` or `afterEach()` using `jest.clearAllMocks()`.
- **Descriptive Structure (BDD Style):**
  - Use clear, descriptive nesting with `describe` and `it`/`test` blocks.
  - Naming pattern: `describe('MethodName', () => { it('should [expected outcome] when [given scenario]', async () => { ... }) })`.
- **High-Priority Test Targets:** Ensure 100% test coverage for core business constraints:
  - Booking availability slot generation algorithms.
  - Race condition handles (the double-booking prevention logic).
  - Webhook payload signature validation and idempotency checks.