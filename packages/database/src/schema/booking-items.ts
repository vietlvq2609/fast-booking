import { pgTable, text, decimal } from 'drizzle-orm/pg-core';
import { bookings } from './bookings';
import { services } from './services';

export const bookingItems = pgTable('booking_items', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  bookingId: text('booking_id')
    .notNull()
    .references(() => bookings.id, { onDelete: 'cascade' }),
  serviceId: text('service_id')
    .notNull()
    .references(() => services.id),
  /** Snapshot price at time of booking – service price may change later. */
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
});
