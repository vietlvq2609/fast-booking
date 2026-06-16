import { pgTable, text, varchar, unique, index } from 'drizzle-orm/pg-core';
import { shops } from './shops';
import { auditTimestamps } from './helpers';

export const customers = pgTable(
  'customers',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    shopId: text('shop_id')
      .notNull()
      .references(() => shops.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    email: text('email'),
    note: text('note'),
    ...auditTimestamps,
  },
  (t) => [
    /** Phone numbers are unique per shop (same person can exist across multiple shops). */
    unique('customers_shop_phone_unique').on(t.shopId, t.phone),
    index('customers_shop_id_idx').on(t.shopId),
  ],
);
