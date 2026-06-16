import { pgTable, text, boolean, integer, decimal, index } from 'drizzle-orm/pg-core';
import { shops } from './shops';
import { auditTimestamps } from './helpers';

export const services = pgTable(
  'services',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    shopId: text('shop_id')
      .notNull()
      .references(() => shops.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    description: text('description'),
    /** Duration of service in minutes. */
    durationMin: integer('duration_min').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    isActive: boolean('is_active').notNull().default(true),
    ...auditTimestamps,
  },
  (t) => [index('services_shop_id_idx').on(t.shopId)],
);
