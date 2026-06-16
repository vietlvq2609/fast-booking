import { pgTable, text, boolean, index } from 'drizzle-orm/pg-core';
import { shops } from './shops';
import { userRoleEnum } from './enums';
import { auditTimestamps } from './helpers';

export const users = pgTable(
  'users',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    shopId: text('shop_id')
      .notNull()
      .references(() => shops.id, { onDelete: 'cascade' }),
    email: text('email').notNull().unique(),
    /** bcrypt-hashed password – never store plain text. */
    password: text('password').notNull(),
    name: text('name').notNull(),
    role: userRoleEnum('role').notNull().default('STAFF'),
    isActive: boolean('is_active').notNull().default(true),
    ...auditTimestamps,
  },
  (t) => [index('users_shop_id_idx').on(t.shopId)],
);
