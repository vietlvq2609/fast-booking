import { pgTable, text, timestamp, decimal, index } from 'drizzle-orm/pg-core';
import { shops } from './shops';
import { customers } from './customers';
import { staff } from './staff';
import { bookingStatusEnum, paymentStatusEnum, paymentMethodEnum } from './enums';
import { auditTimestamps } from './helpers';

/**
 * Bookings table – race-condition sensitive.
 * Always use transactions on writes with pessimistic locking.
 */
export const bookings = pgTable(
  'bookings',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    shopId: text('shop_id')
      .notNull()
      .references(() => shops.id, { onDelete: 'cascade' }),
    customerId: text('customer_id')
      .notNull()
      .references(() => customers.id),
    staffId: text('staff_id')
      .notNull()
      .references(() => staff.id),
    /** Stored in UTC. Always convert from Asia/Ho_Chi_Minh before writing. */
    startTime: timestamp('start_time', { withTimezone: true, mode: 'date' }).notNull(),
    /** Stored in UTC. Computed from startTime + sum(service durations). */
    endTime: timestamp('end_time', { withTimezone: true, mode: 'date' }).notNull(),
    status: bookingStatusEnum('status').notNull().default('PENDING'),
    totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
    note: text('note'),
    paymentStatus: paymentStatusEnum('payment_status').notNull().default('UNPAID'),
    paymentMethod: paymentMethodEnum('payment_method'),
    /** Unique invoice/appointment ID used for payment idempotency checks. */
    invoiceId: text('invoice_id').unique(),
    ...auditTimestamps,
  },
  (t) => [
    /** Composite index for double-booking prevention queries (staffId + time range). */
    index('bookings_staff_start_idx').on(t.shopId, t.staffId, t.startTime),
    index('bookings_shop_start_idx').on(t.shopId, t.startTime),
    index('bookings_customer_idx').on(t.shopId, t.customerId),
  ],
);
