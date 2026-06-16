import { pgTable, text, boolean, index } from 'drizzle-orm/pg-core';
import { shops } from './shops';
import { users } from './users';
import { auditTimestamps } from './helpers';

export const staff = pgTable(
  'staff',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    shopId: text('shop_id')
      .notNull()
      .references(() => shops.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    phone: text('phone'),
    avatarUrl: text('avatar_url'),
    isActive: boolean('is_active').notNull().default(true),
    ...auditTimestamps,
  },
  (t) => [index('staff_shop_id_idx').on(t.shopId)],
);
