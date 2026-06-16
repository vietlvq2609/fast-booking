import { pgTable, text, boolean, varchar, unique } from 'drizzle-orm/pg-core';
import { shops } from './shops';
import { dayOfWeekEnum } from './enums';

export const workingHours = pgTable(
  'working_hours',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    shopId: text('shop_id')
      .notNull()
      .references(() => shops.id, { onDelete: 'cascade' }),
    dayOfWeek: dayOfWeekEnum('day_of_week').notNull(),
    /** Opening time in HH:mm format (local to shop timezone). */
    openTime: varchar('open_time', { length: 5 }).notNull(),
    /** Closing time in HH:mm format (local to shop timezone). */
    closeTime: varchar('close_time', { length: 5 }).notNull(),
    isOpen: boolean('is_open').notNull().default(true),
  },
  (t) => [unique('working_hours_shop_day_unique').on(t.shopId, t.dayOfWeek)],
);
